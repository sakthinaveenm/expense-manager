import { View, Text, Pressable } from 'react-native'
import React from 'react'
import StyleSheets from './BookEntry.style'
import useResponsive from '../../packages/hooks/useResponsive'

const BookEntry = ({ data }) => {

 const {wp,hp} = useResponsive();
 const styles = StyleSheets();

  return (
    <Pressable style={{
        width : "100%",
        borderRadius : 10,
        paddingHorizontal : 10,
        paddingVertical : 10,
        gap : 5,
        backgroundColor : "#f8f8f8"
      }}
      onPress={()=>{}}
      >
        <View><Text style={{ color : "#000" , fontSize : 18 , fontWeight : "700" , borderBottomWidth : 0.5 , borderColor:"#787878" ,paddingVertical : 5, }}>{data?.name}</Text></View>
        {/* <View style={{ flexDirection : "row" , alignItems : "center" , gap : 10 ,paddingVertical : 5, borderBottomWidth : 0.5 , borderColor:"#787878" }}>
         <Text style={{ color : "#787878" , fontSize : 16 }}>Net Balance</Text>
          <Text style={{ color : "green" , fontSize : 16 }}>₹30</Text>
        </View> */}
        <View style={{ flexDirection : "row" , alignItems : "center" , gap : 10 }}>
          <View style={{ flexDirection : "row" , alignItems : "center" , gap : 10 ,paddingVertical : 5}}>
         <Text style={{ color : "#787878" , fontSize : 16 }}>Net Balance</Text>
          <Text style={{ color : "green" , fontSize : 16 }}>₹{Number(data?.income) - Number(data?.expense)}</Text>
        </View>
         <View style={{ flexDirection : "row" , alignItems : "center" , gap : 10 }}>
         <Text style={{ color : "#787878" , fontSize : 16 }}>Income</Text>
          <Text style={{ color : "green" , fontSize : 16 }}>₹{data?.income}</Text>
        </View>
        <View style={{ flexDirection : "row" , alignItems : "center" , gap : 10  }}>
          <Text style={{ color : "#787878" , fontSize : 16 }}>Expense</Text>
          <Text style={{ color : "red" , fontSize : 16 }}>₹{data?.expense}</Text>
        </View>
        </View>
      </Pressable>
  )
}

export default BookEntry