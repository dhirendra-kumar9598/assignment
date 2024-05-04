import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './reduxStore/store';
import Authentication from './src/Authentication';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Authentication />
      </PaperProvider>
    </Provider>
  );
}
