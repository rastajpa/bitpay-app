import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HeaderTitle} from '../../components/styled/Text';
import {
  baseNavigatorOptions,
  baseScreenOptions,
} from '../../constants/NavigationOptions';
import ZenLedgerRoot from './screens/ZenLedger';

export type ZenLedgerStackParamList = {
  ZenLedgerRoot: undefined;
};

export enum ZenLedgerScreens {
  ROOT = 'ZenLedgerRoot',
}

const ZenLedger = createStackNavigator<ZenLedgerStackParamList>();

const ZenLedgerStack = () => {
  return (
    <ZenLedger.Navigator
      initialRouteName={ZenLedgerScreens.ROOT}
      screenOptions={{
        ...baseNavigatorOptions,
        ...baseScreenOptions,
      }}>
      <ZenLedger.Screen
        name={ZenLedgerScreens.ROOT}
        component={ZenLedgerRoot}
        options={{
          headerTitle: () => <HeaderTitle>ZenLedger</HeaderTitle>,
        }}
      />
    </ZenLedger.Navigator>
  );
};

export default ZenLedgerStack;
