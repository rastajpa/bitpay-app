import {ReactElement} from 'react';

export type ZLKey = {
  keyName: string | undefined;
  keyId: string;
  checked: boolean;
  showWallets: boolean;
  wallets: ZLWallet[];
};

export type ZLWallet = {
  id: string;
  walletName: string | undefined;
  currencyName: string;
  receiveAddress: string | undefined;
  hideWallet: boolean | undefined;
  hideBalance: boolean | undefined;
  fiatBalance: string;
  img: string | ((props?: any) => ReactElement);
  badgeImg: string | ((props?: any) => ReactElement) | undefined;
  checked: boolean;
};

export type ZLRequestWalletsType = {
  address: string;
  blockchain: string;
  display_name: string;
};
