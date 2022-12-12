import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import styled from 'styled-components/native';
import KeyIcon from '../../../../assets/img/key-icon.svg';
import {H4, Smallest} from '../../../components/styled/Text';
import ZLWalletSelector from '../components/ZLWalletSelector';
import {
  CtaContainerAbsolute,
  ScreenGutter,
} from '../../../components/styled/Containers';
import Button from '../../../components/button/Button';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {
  convertToFiat,
  formatFiatAmount,
  sleep,
} from '../../../utils/helper-methods';
import {toFiat} from '../../../store/wallet/utils/wallet';
import {getZenLedgerUrl} from '../../../store/zenledger/zenledger.effects';
import {
  ZLRequestWalletsType,
  ZLWallet,
} from '../../../store/zenledger/zenledger.models';
import haptic from '../../../components/haptic-feedback/haptic';
import {openUrlWithInAppBrowser} from '../../../store/app/app.effects';
import {
  dismissOnGoingProcessModal,
  showBottomNotificationModal,
  showOnGoingProcessModal,
} from '../../../store/app/app.actions';
import {OnGoingProcessMessages} from '../../../components/modal/ongoing-process/OngoingProcess';
import {CustomErrorMessage} from '../../wallet/components/ErrorMessages';
import {BWCErrorMessage} from '../../../constants/BWCError';
import {BottomNotificationConfig} from '../../../components/modal/bottom-notification/BottomNotification';
import {useNavigation} from '@react-navigation/native';

const ZenLedgerRootContainer = styled.View`
  flex: 1;
  margin-bottom: ${ScreenGutter};
`;

const ZenLedgerTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ZenLedgerRoot: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {keys} = useAppSelector(({WALLET}) => WALLET);
  const defaultAltCurrency = useAppSelector(({APP}) => APP.defaultAltCurrency);
  const {rates} = useAppSelector(({RATE}) => RATE);

  const _allKeys = Object.values(keys).filter(key => key.backupComplete);

  const setFormattedKeys = () => {
    return _allKeys.map(key => {
      const formattedWallet = key.wallets
        .filter(({balance}) => balance.sat)
        .map(wallet => {
          const {
            currencyName,
            currencyAbbreviation,
            chain,
            walletName,
            img,
            badgeImg,
            hideBalance,
            network,
            balance,
            hideWallet,
            receiveAddress,
            id,
          } = wallet;

          const fiatBalance = formatFiatAmount(
            convertToFiat(
              dispatch(
                toFiat(
                  balance.sat,
                  defaultAltCurrency.isoCode,
                  currencyAbbreviation,
                  chain,
                  rates,
                ),
              ),
              hideWallet,
              network,
            ),
            defaultAltCurrency.isoCode,
          );
          return {
            id,
            walletName,
            currencyName,
            receiveAddress,
            hideWallet,
            hideBalance,
            fiatBalance,
            img,
            badgeImg,
            checked: false,
            chain,
          };
        });
      return {
        keyName: key.keyName,
        keyId: key.id,
        checked: false,
        showWallets: false,
        wallets: formattedWallet,
      };
    });
  };
  const [allKeys, setAllkeys] = useState(setFormattedKeys());

  const getRequestWallets = () => {
    let requestWallets: ZLRequestWalletsType[] = [];
    allKeys.forEach(key => {
      key.wallets.forEach(wallet => {
        const {checked, receiveAddress, walletName = '', chain} = wallet;
        if (checked && receiveAddress) {
          requestWallets.push({
            address: receiveAddress,
            blockchain: chain,
            display_name: walletName,
          });
        }
      });
    });
    return requestWallets;
  };

  const showErrorMessage = useCallback(
    async (msg: BottomNotificationConfig) => {
      await sleep(500);
      dispatch(showBottomNotificationModal(msg));
    },
    [dispatch],
  );

  return (
    <ZenLedgerRootContainer>
      <View style={{marginLeft: 20, marginTop: 32}}>
        <ZenLedgerTitleContainer>
          <View style={{marginRight: 8}}>
            <KeyIcon />
          </View>
          <H4>{t('Select a Key or Wallet')}</H4>
        </ZenLedgerTitleContainer>
        <Smallest>
          {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
        </Smallest>
      </View>
      <ZLWalletSelector
        keys={allKeys}
        onPress={(keyId: string, wallet?: ZLWallet) => {
          if (!wallet) {
            setAllkeys(prev => {
              prev &&
                prev.forEach(k => {
                  if (k && k.keyId === keyId) {
                    k.checked = !k.checked;
                    k.wallets?.forEach((w: ZLWallet) => {
                      w.checked = k.checked;
                      return w;
                    });
                  }
                });
              return [...prev];
            });
          } else {
            setAllkeys(prev => {
              prev &&
                prev.forEach(k => {
                  if (k && k.keyId === keyId) {
                    const {wallets} = k;
                    wallets.forEach((w: ZLWallet) => {
                      if (w.id === wallet.id) {
                        w.checked = !w.checked;
                      }
                      return w;
                    });
                    k.checked = Object.values(wallets).every(w => w.checked);
                  }
                });
              return [...prev];
            });
          }
        }}
        onDropdownPress={keyId => {
          setAllkeys(prev => {
            prev &&
              prev.forEach(k => {
                if (k && k.keyId === keyId) {
                  k.showWallets = !k.showWallets;
                }
              });
            return [...prev];
          });
        }}
      />
      <CtaContainerAbsolute>
        <Button
          onPress={async () => {
            try {
              haptic('impactLight');
              dispatch(
                showOnGoingProcessModal(t(OnGoingProcessMessages.LOADING)),
              );
              const {url} = (await dispatch<any>(
                getZenLedgerUrl(getRequestWallets()),
              )) as any;
              dispatch(dismissOnGoingProcessModal());
              await sleep(500);
              dispatch(openUrlWithInAppBrowser(url));
              await sleep(500);
              navigation.goBack();
            } catch (e) {
              dispatch(dismissOnGoingProcessModal());
              await sleep(500);
              await showErrorMessage(
                CustomErrorMessage({
                  errMsg: BWCErrorMessage(e),
                  title: t('Uh oh, something went wrong'),
                }),
              );
            }
          }}
          buttonStyle={'primary'}
          disabled={
            !Object.values(allKeys)
              .flatMap(key => key.wallets)
              .some(w => w.checked)
          }>
          {t('Continue')}
        </Button>
      </CtaContainerAbsolute>
    </ZenLedgerRootContainer>
  );
};

export default ZenLedgerRoot;
