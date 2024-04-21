import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import BookEntry from '../../components/BookEntry'
import useResponsive from '../../packages/hooks/useResponsive'

const Dashboard = () => {

  const { wp,hp} = useResponsive();

  
  const data = [{
    name : "June",
    income: 30,
    expense : 20
  },
  {
    name : "June",
    income: 30,
    expense : 20
  },{
    name : "June",
    income: 30,
    expense : 20
  },
]

  return (
   <FlatList 
    data={data}
    keyExtractor={(item,index)=>index.toString()}
    contentContainerStyle={{ padding : 10, gap : 10 }}
    renderItem={({item})=><BookEntry data={item} />}
    ListEmptyComponent={
      <View style={{
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        height : hp("50%"),
        gap : 20
      }}>
        <Text>No Entry Books Available</Text>
        <Pressable onPress={()=>{}} style={[{paddingHorizontal : 5}]}>
          <Text style={{ color : "blue"}}>+{" "}Create New Entry</Text>
        </Pressable>
      </View>}
   />
  )
}

export default Dashboard