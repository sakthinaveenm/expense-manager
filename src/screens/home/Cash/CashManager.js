import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import LinearButton from '../../../common/components/LinearButton';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import apiConfig from '../../../config/apiConfig';

export default function CashManager({ route, navigation }) {
  const { id } = route.params || {};
  const isUpdate = !!id;

  const passbookId = route.params.passbookid;

  const [amount, setAmount] = useState('');
  const [type, setType] = useState(route.params?.type ?? "");
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isUpdate) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/cash/${id}`);
          const result = await response.json();
          if (response.ok) {
            const cash = result.data;
            setAmount(cash.amount.toString());
            setType(cash.type);
            setDescription(cash.description);
          } else {
            setError(result.error);
          }
        } catch (error) {
          setError(error.message);
        }
      };
      fetchData();
    }
  }, [id, isUpdate]);

  const validate = () => {
    if (!amount || isNaN(amount)) return 'Amount must be a number';
    return '';
  };

  const onSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const data = { amount, type, description ,passbookId };
    try {
      const options = {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const url = isUpdate ? `${apiConfig.expenseManagerUrl}/api/v1/cash/cash/${id}` : `${apiConfig.expenseManagerUrl}/api/v1/cash/cash`;
      const response = await fetch(url, options);
      console.log(response)
      const result = await response.json();
      if (response.ok) {
        navigation.goBack();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection : "row", alignItems : "center" , gap : 20 }}>
      <Pressable onPress={()=>navigation.goBack()}>
        <AntDesignIcon name="left" color="#000"  size={20} />
      </Pressable>
      <View>
      <Text style={{ color : "#000" , fontWeight : "400" , fontSize : 18 }}>{isUpdate ? 'Update' : 'Create'}{" "}{type == "in" ? "Cash in" : "Cash out"} Cash Entry</Text>
      </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <LinearButton 
        title={isUpdate ? 'Update' : 'Submit'}
        onPress={onSubmit}
        linearColor={["#000","#000","#000"]}
        titleColor='#fff'
        containerStyle={{
          borderRadius : 10
        }}
        lGStyle={{
            borderRadius : 10
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap : 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
  },
});
