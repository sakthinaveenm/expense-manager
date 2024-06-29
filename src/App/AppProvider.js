import { View, Text } from 'react-native'
import React from 'react'
import ThemeWrapper from '../themes/ThemeWrapper'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, { persistor } from '../redux';

const AppProvider = ({children}) => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeWrapper>
     {children}
    </ThemeWrapper>
    </PersistGate>
    </Provider>
  )
}

export default AppProvider