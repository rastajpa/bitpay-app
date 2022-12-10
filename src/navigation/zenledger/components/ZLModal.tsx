import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {
  ActionContainer,
  ScreenGutter,
  WIDTH,
} from '../../../components/styled/Containers';
import {LightBlack, White} from '../../../styles/colors';
import Button from '../../../components/button/Button';
import {
  H4,
  HeaderTitle,
  Paragraph,
  TextAlign,
} from '../../../components/styled/Text';
import {useTranslation} from 'react-i18next';
import ZenLedgerLogo from '../../../../assets/img/zenledger/zenledger-logo.svg';
import {View} from 'react-native';

const ZenLedgerModalContainer = styled.View`
  justify-content: center;
  width: ${WIDTH - 16}px;
  background-color: ${({theme: {dark}}) => (dark ? LightBlack : White)};
  border-radius: 10px;
  padding: ${ScreenGutter};
`;

const ZenLedgerDescription = styled(Paragraph)`
  color: ${({theme}) => theme.colors.text};
  margin: 10px 0;
  text-align: center;
`;

const ZenLedgerLogoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 16px 0;
`;

interface ZenLedgerModalConfig {
  isVisible: boolean;
  onDismiss: (openWalletSelector: boolean) => any;
}

const ZenLedgerModal = (props: ZenLedgerModalConfig) => {
  const {t} = useTranslation();
  const {isVisible, onDismiss} = props;

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}
      style={{
        alignItems: 'center',
      }}>
      <ZenLedgerModalContainer>
        <ZenLedgerLogoContainer>
          <ZenLedgerLogo height={45} />
        </ZenLedgerLogoContainer>

        <TextAlign align={'center'}>
          <H4>{t('Be prepared for tax season')}</H4>
        </TextAlign>
        <View style={{marginBottom: 16}}>
          <ZenLedgerDescription>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
            }
          </ZenLedgerDescription>
        </View>

        <ActionContainer>
          <Button onPress={() => onDismiss(true)}>{t('Get Started')}</Button>
        </ActionContainer>
        <ActionContainer>
          <Button
            onPress={() => onDismiss(false)}
            buttonStyle={'secondary'}
            buttonType={'link'}
            buttonOutline={true}>
            {t('Cancel')}
          </Button>
        </ActionContainer>
      </ZenLedgerModalContainer>
    </Modal>
  );
};

export default ZenLedgerModal;
