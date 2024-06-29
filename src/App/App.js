import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppProvider from './AppProvider'
import Dashboard from '../screens/Dashboard/Dashboard'
import AppNavigation from '../navigations/AppNavigation'

const App = () => {
  return (
    <AppProvider>
        <AppNavigation />
    </AppProvider>
  )
}

export default App

const styles = StyleSheet.create({})