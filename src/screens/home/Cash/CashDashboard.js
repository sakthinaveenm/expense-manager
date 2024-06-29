import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllCashbookApi } from '../../../services/api/api.service';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import useResponsive from '../../../hooks/useResponsive';
import { useNavigation } from '@react-navigation/native';
import LinearButton from '../../../common/components/LinearButton';
import { CASH_ENTRY_MANAGER } from '../../../constants/Navigation';
import { useIsFocused } from '@react-navigation/native';


const CashCard = ({item}) => {
  return (
    <View style={{
      backgroundColor: "#f4f4f4",
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: "#f4f4f4",
      margin: 10,
      flexDirection: "row",
      justifyContent: "space-between"
    }}>
      <View>
        <Text>{item.amount}</Text>
        <Text>{item.description}</Text>
      </View>
      <View>
        <AntDesignIcon color={item.type === "in" ? "green" : "red"} name={item.type === "in" ? 'up' : "down"} size={30} />
      </View>
    </View>
  );
}

const Banner = ({ added, used, balance }) => {
  return (
    <View style={{
      backgroundColor: "#ffffff",
      padding: 20,
      borderRadius: 10,
      margin: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: "#000",
            marginBottom: 5
          }}>Added</Text>
          <Text style={{
            fontSize: 18,
            color: "green",
            backgroundColor: "#e6ffe6",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}>{added}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: "#000",
            marginBottom: 5
          }}>Used</Text>
          <Text style={{
            fontSize: 18,
            color: "red",
            backgroundColor: "#ffe6e6",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}>{used}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: "#000",
            marginBottom: 5
          }}>Balance</Text>
          <Text style={{
            fontSize: 18,
            color: "blue",
            backgroundColor: "#e6e6ff",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}>{balance}</Text>
        </View>
      </View>
    </View>
  );
};

const CashDashboard = ({ route }) => {
  const { wp, hp } = useResponsive();
  const passbookId = route.params.cashbookId;
  const cashName = route.params.cashName;
  const [cashData, setCashData] = useState([]);
  const [totals, setTotals] = useState({ added: 0, used: 0, balance: 0 });
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const getAllCashData = async (passbookId) => {
    try {
      const response = await getAllCashbookApi(passbookId);
      console.log(response)
      if (response) {
        if (response.success === true) {
          setCashData(response.data)
          calculateTotals(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const calculateTotals = (data) => {
    let added = 0;
    let used = 0;
    data.forEach(item => {
      if (item.type === 'in') {
        added += item.amount;
      } else if (item.type === 'out') {
        used += item.amount;
      }
    });
    setTotals({ added, used, balance: added - used });
  };

  useEffect(() => {
    getAllCashData(passbookId)
  }, [passbookId,isFocused])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={cashData}
        ListHeaderComponent={
          <View>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#000",
              paddingVertical: hp(2),
              paddingHorizontal: wp(3)
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10
              }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesignIcon name="left" size={20} color={"#fff"} />
                </Pressable>
                <Text style={{
                  fontSize: 20,
                  color: "#fff"
                }}>{cashName}</Text>
              </View>
            </View>
            <Banner added={totals.added} used={totals.used} balance={totals.balance} />
          </View>
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          paddingBottom: 20
        }}
        renderItem={({ item }) => <CashCard item={item} />}
        keyExtractor={(item,index) => index.toString()}
      />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 }}>
        <LinearButton
          onPress={() => navigation.navigate(CASH_ENTRY_MANAGER, {
            passbookid: passbookId,
            type: "in"
          })}
          title='Cash In'
          linearColor={["green", "green", "green"]}
          titleColor='#fff'
          containerStyle={{
            width: "45%",
            borderRadius: 10
          }}
          lGStyle={{
            borderRadius: 10
          }}
        />
        <LinearButton
          onPress={() => navigation.navigate(CASH_ENTRY_MANAGER, {
            passbookid: passbookId,
            type: "out"
          })}
          title='Cashout'
          linearColor={["red", "red", "red"]}
          titleColor='#fff'
          containerStyle={{
            width: "45%",
            borderRadius: 10
          }}
          lGStyle={{
            borderRadius: 10
          }}
        />
      </View>
    </View>
  )
}

export default CashDashboard
