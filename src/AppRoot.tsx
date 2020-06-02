/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from './List';
import { Item } from './Item';
import { GlobalProvider } from './state-mgmt/GlobalState';

const { Screen, Navigator } = createStackNavigator();

export const AppRoot = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GlobalProvider>
        <NavigationContainer>
          <Navigator>
            <Screen name="Home" component={List} />
            <Screen name="Artist" component={Item} />
          </Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </>
  );
};
