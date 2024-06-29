import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../../themes/ThemeWrapper'
import StyleSheets from './EntryManager.style.';
import CFormInput from '../../../../components/BookEntry/common/CFormInput';
import useResponsive from '../../../../hooks/useResponsive';
import CInput from '../../../../components/BookEntry/common/CInput';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';
import LinearButton from '../../../../common/components/LinearButton';
import { showToast } from '../../../../services/utility';
import { useSelector } from 'react-redux';
import { CreatePassbookApi } from '../../../../services/api/api.service';
const EntryManager = () => {    

  const { theme } = useTheme();
  const { wp,hp } = useResponsive();
  const btnColor = theme.appearance.logBtn;
  const btnColorTxt = theme.appearance.logTxt;
  const userId = useSelector(state=>state.auth.userID)
  const [expenseBook,setExpenseBook] = useState({
    name : "",
    members : [userId],
    createdBy : userId,
  })

  // styleSheets
  const styles = StyleSheets({ theme,wp })
  const navigation = useNavigation();

  const createExpenseBook = async() => {
try {
const body = expenseBook;
console.log(body)
const response = await CreatePassbookApi(body);
console.log(response)
if(response){
  if(response.success === true){
    showToast(response.message);
    navigation.goBack();
  }
}
} catch (error) {
}}

  return (
    <View style={[styles.container]}>
      <View style={{ gap : 10 }}>
      <View style={{ flexDirection : "row" , gap : 10 }}>
      <Pressable onPress={()=>navigation.goBack()}>
        <AntDesignIcon name="left" color="#000"  size={20} />
      </Pressable>
      <View>
      <Text style={[styles.headerTxt]}>Create New Book</Text>
      </View>
      </View>
      <CInput
        label={"Enter your Expense Book Name"}
        labelStyle={styles.labelTitle}
        placeholder={'Enter your Expense Book Name'}
        containerStyle={{
          width : "100%"
        }}
        onChange={(value)=>setExpenseBook({...expenseBook,name : value })}
        value={expenseBook.name}
        editable={true}
        placeholderTextColor={theme.appearance.inputPlaceHolder}
      />
      </View>
      <View>
        <LinearButton 
          title='Create Expense Book'
          linearColor={btnColor}
          titleColor={btnColorTxt}
          onPress={()=>createExpenseBook()}
        />
      </View>
    </View>
  )
}

export default EntryManager