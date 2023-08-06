import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from '@navigation/theme';
import {MainNavigator} from '@navigation/MainNavigator';

export function Router() {
  return (
    <NavigationContainer theme={theme}>
      <MainNavigator />
    </NavigationContainer>
  );
}
