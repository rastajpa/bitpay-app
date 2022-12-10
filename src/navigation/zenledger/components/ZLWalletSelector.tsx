import React, {ReactElement} from 'react';
import {H5, TextAlign} from '../../../components/styled/Text';
import {WalletSelectMenuHeaderContainer} from '../../wallet/screens/GlobalSelect';
import ZLKeyWalletsRow from './ZLKeyWalletsRow';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {ScreenGutter} from '../../../components/styled/Containers';

export const ZLKeyWalletCRowContainer = styled.View`
  padding: 0 ${ScreenGutter} 2px;
`;

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

export type WalletConnectIntroParamList = {
  uri?: string;
};

export default ({
  keys,
  onPress,
  onDropdownPress,
}: {
  keys: any;
  onPress: (keyId: string, wallet?: ZLWallet) => void;
  onDropdownPress: (keyId: string) => void;
}) => {
  const {t} = useTranslation();
  return (
    <View style={{marginTop: 12, marginBottom: 80}}>
      {keys && keys.length ? (
        <ZLKeyWalletCRowContainer>
          <ZLKeyWalletsRow
            keys={keys}
            onPress={onPress}
            onDropdownPress={onDropdownPress}
          />
        </ZLKeyWalletCRowContainer>
      ) : (
        <WalletSelectMenuHeaderContainer>
          <TextAlign align={'center'}>
            <H5>{t('No available wallets')}</H5>
          </TextAlign>
        </WalletSelectMenuHeaderContainer>
      )}
    </View>
  );
};
