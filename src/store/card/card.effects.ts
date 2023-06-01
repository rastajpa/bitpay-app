import {DOSH_WHITELIST} from '@env';
import axios from 'axios';
import BitPayIdApi from '../../api/bitpay';
import FastImage from 'react-native-fast-image';
import CardApi from '../../api/card';
import {InitialUserData} from '../../api/user/user.types';
import {sleep} from '../../utils/helper-methods';
import {startOnGoingProcessModal} from '../app/app.effects';
import {Effect} from '../index';
import {LogActions} from '../log';
import {ProviderConfig} from '../../constants/config.card';
import {CardProvider} from '../../constants/card';
import Dosh, {DoshUiOptions} from '../../lib/dosh';
import {isAxiosError} from '../../utils/axios';
import {CardActions} from '.';
import {TTL} from './card.types';
import {Card, DebitCardTopUpInvoiceParams} from './card.models';
import {Invoice} from '../shop/shop.models';
import {BASE_BITPAY_URLS} from '../../constants/config';
import {getAppsFlyerId} from '../../utils/appsFlyer';
import {dismissOnGoingProcessModal} from '../app/app.actions';
import AuthApi from '../../api/auth';
import {isJoinedWaitlist} from './card.actions';

const DoshWhitelist: string[] = [];

if (DOSH_WHITELIST) {
  try {
    DoshWhitelist.push(...DOSH_WHITELIST.split(',').map(email => email.trim()));
  } catch (e) {
    console.log('Unable to parse DOSH_WHITELIST', e);
  }
}

export interface StartActivateCardParams {
  cvv: string;
  expirationDate: string;
  lastFourDigits?: string;
  cardNumber?: string;
  appsFlyerId?: string;
}

export interface AppleWalletProvisioningRequestParams {
  walletProvider: string;
  cert1: any;
  cert2: any;
  nonce: any;
  nonceSignature: any;
}

export const startCardStoreInit =
  (initialData: InitialUserData): Effect<void> =>
  (dispatch, getState) => {
    const {APP} = getState();

    dispatch(CardActions.successInitializeStore(APP.network, initialData));
    try {
      const virtualCardIds = (initialData.cards || [])
        .filter(
          c => c.provider === CardProvider.galileo && c.cardType === 'virtual',
        )
        .map(c => c.id);

      if (virtualCardIds.length) {
        dispatch(startFetchVirtualCardImageUrls(virtualCardIds));
      }
    } catch (err) {
      // swallow error so initialize is uninterrupted
    }

    // Dosh card rewards
    dispatch(LogActions.info('Initializing Dosh...'));

    if (!Dosh) {
      dispatch(LogActions.debug('Dosh module not found.'));
    } else {
      const options = new DoshUiOptions('Card Offers', 'CIRCLE', 'DIAGONAL');

      try {
        Dosh.initializeDosh(options).then(() => {
          dispatch(LogActions.info('Successfully initialized Dosh.'));
          const {doshToken} = initialData;
          if (!doshToken) {
            dispatch(LogActions.debug('No doshToken provided.'));
            return;
          }
          return Dosh.setDoshToken(doshToken);
        });
      } catch (err: any) {
        dispatch(
          LogActions.error('An error occurred while initializing Dosh.'),
        );

        if ((err as any).message) {
          dispatch(LogActions.error((err as any).message));
        } else {
          dispatch(LogActions.error(JSON.stringify(err)));
        }
      }
    }
  };

export const startFetchAll =
  (token: string): Effect =>
  async (dispatch, getState) => {
    try {
      const {APP} = getState();
      const cards = await CardApi.fetchAll(token);

      dispatch(CardActions.successFetchCards(APP.network, cards));
    } catch (err) {
      dispatch(CardActions.failedFetchCards());
    }
  };

export const startFetchOverview =
  (
    id: string,
    options?: {
      pageSize?: number;
      pageNumber?: number;
      startDate?: Date;
      endDate?: Date;
    },
  ): Effect =>
  async (dispatch, getState) => {
    try {
      dispatch(startOnGoingProcessModal('LOADING'));
      dispatch(CardActions.updateFetchOverviewStatus(id, 'loading'));

      const {APP, BITPAY_ID, CARD} = getState();
      let {pageSize, pageNumber, startDate, endDate} = options || {};

      // throttle
      if (Date.now() - CARD.lastUpdates.fetchOverview < TTL.fetchOverview) {
        await sleep(3000);
        return;
      }

      if (!startDate) {
        const card = CARD.cards[APP.network].find(c => c.id === id);
        const dateRange = card
          ? ProviderConfig[card.provider].maxHistoryDateRange
          : 60;

        startDate = new Date();
        startDate.setDate(startDate.getDate() - dateRange);
      }

      const res = await CardApi.fetchOverview(
        BITPAY_ID.apiToken[APP.network],
        id,
        {
          pageNumber,
          pageSize,
          startDate,
          endDate,
        },
      );

      const {overview, topUpHistory} = res.card;
      const {settledTransactions, pendingTransactions} = overview;

      dispatch(
        CardActions.successFetchOverview({
          id,
          balance: res.card.balance,
          settledTransactions,
          pendingTransactions,
          topUpHistory,
        }),
      );
    } catch (err) {
      console.log(`Failed to fetch overview for card ${id}`);
      dispatch(LogActions.error(`Failed to fetch overview for card ${id}`));
      dispatch(LogActions.error(JSON.stringify(err)));
      dispatch(CardActions.failedFetchOverview(id));
    } finally {
      dispatch(dismissOnGoingProcessModal());
    }
  };

export const startCreateDebitCardTopUpInvoice =
  (
    card: Card,
    params: DebitCardTopUpInvoiceParams,
  ): Effect<Promise<{invoiceId: string; invoice: Invoice}>> =>
  async (dispatch, getState) => {
    try {
      const {APP} = getState();
      const {network} = APP;
      const baseUrl = BASE_BITPAY_URLS[network];
      const createInvoiceResponse = await BitPayIdApi.getInstance()
        .request('generateTopUpInvoice', card.token, params)
        .then(res => {
          if (res.data.error) {
            throw new Error(res.data.error);
          }
          return res.data;
        });
      const {data: invoiceId} = createInvoiceResponse as {data: string};
      const getInvoiceResponse = await axios.get(
        `${baseUrl}/invoices/${invoiceId}`,
      );
      const {
        data: {data: invoice},
      } = getInvoiceResponse as {data: {data: Invoice}};
      return {invoiceId, invoice} as {invoiceId: string; invoice: Invoice};
    } catch (err) {
      console.error('Error creating debit card top up invoice', err);
      throw err;
    }
  };

export const startFetchSettledTransactions =
  (
    id: string,
    options?: {
      pageSize?: number;
      pageNumber?: number;
      startDate?: Date;
      endDate?: Date;
    },
  ): Effect =>
  async (dispatch, getState) => {
    try {
      dispatch(startOnGoingProcessModal('LOADING'));

      const {APP, BITPAY_ID, CARD} = getState();
      const token = BITPAY_ID.apiToken[APP.network];
      let {pageSize, pageNumber, startDate, endDate} = options || {};

      if (!startDate) {
        const card = CARD.cards[APP.network].find(c => c.id === id);
        const dateRange = card
          ? ProviderConfig[card.provider].maxHistoryDateRange
          : 60;

        startDate = new Date();
        startDate.setDate(startDate.getDate() - dateRange);
      }

      const transactionPageData = await CardApi.fetchSettledTransactions(
        token,
        id,
        {
          pageSize,
          pageNumber,
          startDate,
          endDate,
        },
      );

      dispatch(
        CardActions.successFetchSettledTransactions(id, transactionPageData),
      );
    } catch (err) {
      let errMsg;

      if (isAxiosError(err)) {
        errMsg = err.response?.data || err.message;
      } else if (err instanceof Error) {
        errMsg = err.message;
      } else {
        errMsg = JSON.stringify(err);
      }

      dispatch(
        LogActions.error(`Failed to fetch settled transactions for ${id}`),
      );
      dispatch(LogActions.error(errMsg || JSON.stringify(err)));
      dispatch(CardActions.failedFetchSettledTransactions(id));
    } finally {
      dispatch(dismissOnGoingProcessModal());
    }
  };

export const startFetchVirtualCardImageUrls =
  (ids: string[]): Effect =>
  async (dispatch, getState) => {
    try {
      const {APP, BITPAY_ID} = getState();

      const urlsPayload = await CardApi.fetchVirtualCardImageUrls(
        BITPAY_ID.apiToken[APP.network],
        ids,
      );

      dispatch(CardActions.successFetchVirtualImageUrls(urlsPayload));

      try {
        const sources = urlsPayload.map(({virtualCardImage}) => {
          return {uri: virtualCardImage};
        });

        FastImage.preload(sources);
      } catch (err) {
        dispatch(LogActions.error('Failed to preload virtual card images.'));
        dispatch(LogActions.error(JSON.stringify(err)));
      }
    } catch (err) {
      dispatch(
        LogActions.error(
          `Failed to fetch virtual card image URLs for ${ids.join(', ')}`,
        ),
      );
      dispatch(LogActions.error(JSON.stringify(err)));
      dispatch(CardActions.failedFetchVirtualImageUrls());
    }
  };

export const startActivateCard =
  (id: string, payload: StartActivateCardParams): Effect =>
  async (dispatch, getState) => {
    try {
      dispatch(CardActions.updateActivateCardStatus(null));

      const {APP, BITPAY_ID} = getState();
      const {network} = APP;
      const token = BITPAY_ID.apiToken[network];
      const appsFlyerId = await getAppsFlyerId();

      payload = {
        ...payload,
        appsFlyerId,
      };

      const {data, errors} = await CardApi.activateCard(token, id, payload);

      if (errors) {
        const errorMsg = errors.map(e => e.message).join('\n');

        throw new Error(errorMsg);
      } else if (data) {
        dispatch(CardActions.successActivateCard());
      } else {
        throw new Error('An unexpected error occurred.');
      }
    } catch (err) {
      let errMsg = JSON.stringify(err);

      if (err instanceof Error) {
        errMsg = err.message;
      }

      dispatch(LogActions.error(`Failed to activate card: ${errMsg}`));
      dispatch(CardActions.failedActivateCard(errMsg));
    }
  };

export const startOpenDosh = (): Effect<void> => async (dispatch, getState) => {
  try {
    const {APP, CARD} = getState();
    const cards = CARD.cards[APP.network];

    if (cards.length) {
      Dosh.present();
    }
  } catch (err) {
    dispatch(
      LogActions.error('Something went wrong trying to open Dosh Rewards'),
    );
    dispatch(LogActions.error(JSON.stringify(err)));
  }
};

export const joinWaitlist =
  (email: string): Effect =>
  async (dispatch, getState) => {
    try {
      const {APP} = getState();
      const {network} = APP;
      const session = await AuthApi.fetchSession(network);
      const baseUrl = BASE_BITPAY_URLS[network];

      const config = {
        headers: {
          'x-csrf-token': session.csrfToken,
        },
      };
      const data = {
        email,
        attribute: 'CFSB Card Waitlist',
      };

      await axios.post(`${baseUrl}/marketing/marketingOptIn`, data, config);
      dispatch(isJoinedWaitlist(true));
    } catch (err) {
      dispatch(LogActions.error(`Error joining waitlist: ${err}`));
      throw err;
    }
  };
