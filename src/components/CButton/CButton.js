import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import StyleSheets from './CButton.style'

const CButton = ({ title ,isLoading, onPress }) => {

  const styles = StyleSheets();
  
  return (
    isLoading ?
      <View style={[styles.container]}>
        <ActivityIndicator />
      </View>
      : 
    <Pressable style={[styles.container]} onPress={()=>onPress()}>
    <View>
      <Text>{title}</Text>
    </View>
    </Pressable>
  )
}

export default CButton