import { View, Text } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigations/AppNavigation'
import Dashboard from './src/screens/Dashboard/Dashboard'

const App = () => {
  return (
    <View style={{flex :1}}>
      {/* <AppNavigation /> */}
      <Dashboard />
    </View>
  )
}

export default App