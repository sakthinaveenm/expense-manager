import { View, Text } from 'react-native'
import React from 'react'
import Login from './src/screens/auth/Login/Login'
// import AppNavigation from './src/navigations/AppNavigation'
// import Dashboard from './src/screens/Dashboard/Dashboard'

const App = () => {
  return (
    <View style={{flex :1}}>
      <Login />
    </View>
  )
}

export default App