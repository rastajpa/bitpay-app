import React, {useLayoutEffect, useState} from 'react';
import styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ScreenOptions} from '../../../styles/tabNavigator';
import {H7, HeaderTitle} from '../../../components/styled/Text';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {WalletStackParamList} from '../WalletStack';
import SendToAddress from '../components/SendToAddress';
import SendToContact from '../components/SendToContact';
import {
  Recipient,
  TxDetailsSendingTo,
  Wallet,
} from '../../../store/wallet/wallet.models';
import {CurrencyImage} from '../../../components/currency-image/CurrencyImage';
import {ActiveOpacity, Hr} from '../../../components/styled/Containers';
import {TouchableOpacity} from 'react-native';
import WalletIcons from '../components/WalletIcons';
import _ from 'lodash';

export type SendToOptionsParamList = {
  title: string;
  wallet: Wallet;
  context: string;
  recipients?: Recipient[];
};

export const RecipientRowContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 55px;
`;

export const RecipientContainer = styled.View`
  flex-direction: row;
`;

interface RecipientListProps {
  recipient: Recipient;
  wallet: Wallet;
  deleteRecipient: () => void;
}

export const RecipientList: React.FC<RecipientListProps> = ({
  recipient,
  wallet,
  deleteRecipient,
}) => {
  let recipientData: TxDetailsSendingTo;

  if (recipient?.type === 'contact') {
    recipientData = {
      recipientName: recipient?.name,
      recipientAddress: recipient?.address,
      img: recipient?.type,
    };
  } else {
    recipientData = {
      recipientName: recipient.name,
      recipientAddress: recipient.address,
      img: wallet?.img || wallet?.credentials.coin,
    };
  }

  return (
    <>
      <RecipientRowContainer>
        <RecipientContainer>
          <CurrencyImage img={recipientData.img} size={20} />
          <H7
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{marginLeft: 8, width: '60%'}}>
            {recipientData.recipientName || recipientData.recipientAddress}
          </H7>
        </RecipientContainer>
        <TouchableOpacity
          activeOpacity={ActiveOpacity}
          onPress={() => deleteRecipient()}>
          <WalletIcons.Delete />
        </TouchableOpacity>
      </RecipientRowContainer>
      <Hr />
    </>
  );
};

const ImportContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: 10px;
`;

export const SendToOptionsContext = React.createContext({
  recipientList: [] as Recipient[],
  setRecipientListContext: (
    recipient: Recipient,
    removeRecipient?: boolean,
  ) => {},
});

const SendToOptions = () => {
  const {t} = useTranslation();
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<WalletStackParamList, 'SendToOptions'>>();
  const [recipientList, setRecipientList] = useState<Recipient[]>([]);
  
  const setRecipientListContext = (
    recipient: Recipient,
    removeRecipient?: boolean,
  ) => {
    setRecipientList(prev => {
      let newRecipientList: Recipient[] = [];
      if (removeRecipient) {
        newRecipientList = prev.filter(r => r.address !== recipient.address);
      } else if (params?.context === 'selectInputs') {
        newRecipientList = [recipient];
      } else {
        newRecipientList = [...prev, recipient];
      }
      return newRecipientList;
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerTitle: () => <HeaderTitle>{params.title}</HeaderTitle>,
      headerTitleAlign: 'center',
    });
  }, [navigation, t]);

  return (
    <SendToOptionsContext.Provider
      value={{recipientList, setRecipientListContext}}>
      <ImportContainer>
        <Tab.Navigator screenOptions={{...ScreenOptions(150)}}>
          <Tab.Screen
            name={t('Addresses')}
            component={SendToAddress}
            initialParams={params}
          />
          <Tab.Screen
            name={t('Contacts')}
            component={SendToContact}
            initialParams={params}
          />
        </Tab.Navigator>
      </ImportContainer>
    </SendToOptionsContext.Provider>
  );
};

export default SendToOptions;
