import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import useResponsive from '../../packages/hooks/useResponsive';
import { useNavigation } from '@react-navigation/native';
import { CASH_MANAGER } from '../../constants/Navigation';

const BookEntry = ({ data, isOnHoldDataSelected, storeHoldDatas, onHoldDatas }) => {
  const { wp, hp } = useResponsive();
  const navigation = useNavigation();

  const seeCashBooks = (cashID, cashName) => {
    navigation.navigate(CASH_MANAGER, { cashbookId: cashID, cashName: cashName });
  };

  const isSelected = onHoldDatas.includes(data._id);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isSelected ? '#e8f0fd' : '#f8f8f8' }
      ]}
      onPress={() => {
        if (isOnHoldDataSelected) {
          storeHoldDatas(data._id);
        } else {
          seeCashBooks(data._id, data.name);
        }
      }}
      onLongPress={() => {
        storeHoldDatas(data._id);
      }}
    >
      <View>
        <Text style={styles.bookName}>{data?.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Net Balance</Text>
          <Text style={styles.netBalance}>₹{data.netBalance}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Income</Text>
          <Text style={styles.income}>₹{data?.totalIncome}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Expense</Text>
          <Text style={styles.expense}>₹{data.totalExpense}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '94%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  bookName: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 0.5,
    borderColor: '#787878',
    paddingVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoLabel: {
    color: '#787878',
    fontSize: 16,
  },
  netBalance: {
    color: 'green',
    fontSize: 16,
  },
  income: {
    color: 'green',
    fontSize: 16,
  },
  expense: {
    color: 'red',
    fontSize: 16,
  },
});

export default BookEntry;
