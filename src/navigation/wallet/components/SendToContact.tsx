import React, {useCallback, useState} from 'react';
import {
  CtaContainer as _CtaContainer,
  Hr,
  SearchContainer,
  SearchInput,
} from '../../../components/styled/Containers';
import Button from '../../../components/button/Button';
import styled, {useTheme} from 'styled-components/native';
import {H5, H7, Paragraph} from '../../../components/styled/Text';
import {NeutralSlate} from '../../../styles/colors';
import {useLogger} from '../../../utils/hooks/useLogger';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/core';
import {WalletStackParamList} from '../WalletStack';
import {RootState} from '../../../store';
import {useTranslation} from 'react-i18next';
import haptic from '../../../components/haptic-feedback/haptic';
import {
  ContactTitle,
  ContactTitleContainer,
  SendContactRow,
} from '../screens/send/SendTo';
import ContactsSvg from '../../../../assets/img/tab-icons/contacts.svg';
import SettingsContactRow from '../../../components/list/SettingsContactRow';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {ContactRowProps} from '../../../components/list/ContactRow';
import { Recipient, TxDetailsSendingTo } from '../../../store/wallet/wallet.models';
import { FlatList, View } from 'react-native';
import { RecipientContainer, RecipientList, RecipientRowContainer } from '../screens/SendToOptions';
import { CurrencyImage } from '../../../components/currency-image/CurrencyImage';

const ScrollViewContainer = styled.ScrollView`
  margin-top: 20px;
  padding: 0 15px;
`;

const SendToContactContainer = styled.View`
  margin-top: 20px;
  padding: 0 15px;
`;

const CtaContainer = styled(_CtaContainer)`
  padding: 10px 16px;
`;

const SendToContact = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const allContacts = useAppSelector(({CONTACT}: RootState) => CONTACT.list);
  const placeHolderTextColor = theme.dark ? NeutralSlate : '#6F7782';
  const [searchInput, setSearchInput] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactRowProps>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<WalletStackParamList, 'SendToOptions'>>();
  const {wallet,recipients} = route.params;
  const [recipientList, setRecipientList] = useState<Recipient[]>(
    recipients || [],
  );
  const {
    currencyAbbreviation,
    credentials: {network},
  } = wallet;

  const contacts = allContacts.filter(
    contact =>
      contact.coin === currencyAbbreviation &&
      contact.network === network &&
      (contact.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchInput.toLowerCase())),
  );

  const renderItem = useCallback(
    ({item}) => {
      return (
        <RecipientList recipient={item} wallet={wallet}></RecipientList>
        )
    },
    [wallet],
  );
  
  return (
    <>
      <SendToContactContainer>
        <SearchContainer style={{height: 54}}>
          <SearchInput
            placeholder={t('Search contact')}
            placeholderTextColor={placeHolderTextColor}
            value={searchInput}
            onChangeText={(text: string) => {
              setSearchInput(text);
            }}
          />
        </SearchContainer>
        <View style={{marginTop: 10}}>
          <H5>
            {recipientList?.length > 1 ? t('Recipients') : t('Recipient')}
          </H5>
          <Hr />
          {recipientList && recipientList.length ? (
            <FlatList
              data={recipientList}
              keyExtractor={item => item.address}
              renderItem={renderItem}
            />
          ) : (
            <>
              <RecipientRowContainer>
                <H7>
                  {t(
                    'To get started, you’ll need to enter a valid address or select an existing contact or wallet.',
                  )}
                </H7>
              </RecipientRowContainer>
              <Hr />
            </>
          )}
        </View>

        <ScrollViewContainer>
          {contacts.length > 0 ? (
            <>
              <ContactTitleContainer>
                {ContactsSvg({})}
                <ContactTitle>{'Contacts'}</ContactTitle>
              </ContactTitleContainer>

              {contacts.map((item, index) => {
                return (
                  <SendContactRow key={index}>
                    <SettingsContactRow
                      contact={item}
                      onPress={() => {
                        haptic('impactLight');
                        try {
                          if (item) {
                            setSelectedContact(item);
                            setSearchInput(item.name);
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />
                  </SendContactRow>
                );
              })}
            </>
          ) : null}
        </ScrollViewContainer>
      </SendToContactContainer>
      {contacts.length > 0 ? (
        <CtaContainer>
          <Button
            buttonStyle={'primary'}
            onPress={() => {
              haptic('impactLight');
              navigation.navigate('Wallet', {
                screen: 'SelectInputs',
                params: {
                  recipient: {...selectedContact!, type: 'contact'},
                  wallet,
                },
              });
            }}
            disabled={!selectedContact}>
            {t('Continue')}
          </Button>
        </CtaContainer>
      ) : null}
    </>
  );
};

export default SendToContact;
