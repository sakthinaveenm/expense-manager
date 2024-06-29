import { View, Text, FlatList, Pressable, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import BookEntry from '../../components/BookEntry';
import useResponsive from '../../packages/hooks/useResponsive';
import { useTheme } from '../../themes/ThemeWrapper';
import { useNavigation } from '@react-navigation/native';
import { ENTRY_MANAGER } from '../../constants/Navigation';
import { deleteMultiplePassbooksApi, getAllPassbookApi } from '../../services/api/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../redux/AuthSlice';
import LinearButton from '../../common/components/LinearButton';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from '@react-navigation/native';
import { showToast } from '../../services/utility';


const Dashboard = () => {
  const { wp, hp } = useResponsive();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { storePassbooks,resetAuthState } = AuthActions;
  const isFocused = useIsFocused();

  const containerBackgroundColor = theme.appearance.backgroundColor;
  const txtColor = theme.appearance.txtColor;
  const btnColor = theme.appearance.logBtn;
  const btnColorTxt = theme.appearance.logTxt;
  const data = useSelector(state => state.auth.passbooks);
  const profileImg = useSelector(state => state.auth.photo);
  const userId = useSelector(state => state.auth.userID);

  const [onHoldDatas, setOnHoldDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearOnHoldDatas = () => setOnHoldDatas([]);

  const storeHoldDatas = useCallback((dataId) => {
    setOnHoldDatas(prevOnHoldDatas => {
      if (prevOnHoldDatas.includes(dataId)) {
        return prevOnHoldDatas.filter(id => id !== dataId);
      } else {
        return [...prevOnHoldDatas, dataId];
      }
    });
  }, []);

  const handleConfirmDelete = async() => {
    // Handle delete confirmation
try {
  let body = { ids : onHoldDatas };
  const response = await deleteMultiplePassbooksApi(body)
  console.log(response)
  if (response?.success) {
    clearOnHoldDatas();
    showToast('Passbooks deleted successfully')
  }
getAllPassbooks();
} catch (error) {
  
}
  

  };

  const onPromptDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete this ${onHoldDatas.length} item?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleConfirmDelete() }
      ],
      { cancelable: false }
    );
  };

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          dispatch(resetAuthState())

        } }
      ],
      { cancelable: false }
    );
  };

  const getAllPassbooks = async () => {
    try {
      const response = await getAllPassbookApi(userId);
      if (response && response.success) {
        dispatch(storePassbooks(response.data));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPassbooks();
  }, [userId,isFocused]);

  const showEditOptionsToHeader = onHoldDatas.length > 0;
  const isOnHoldDataSelected = onHoldDatas.length > 0;

  const createNewEntry = () => {
    navigation.navigate(ENTRY_MANAGER);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.appearance.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: txtColor }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: containerBackgroundColor }}>
      <FlatList 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        ListHeaderComponent={
          showEditOptionsToHeader ? (
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <Pressable onPress={clearOnHoldDatas}>
                  <AntDesignIcon color={"#fff"} name='left' size={20} />
                </Pressable>
                <Text style={styles.headerText}>{onHoldDatas.length} items selected</Text>
              </View>
              <Pressable onPress={onPromptDelete}>
                <AntDesignIcon name='delete' color={"#fff"} size={20} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Expense Manager</Text>
              <Pressable onPress={()=>{
                showLogoutAlert();
              }}>
                <Image source={{ uri: profileImg }} style={styles.profileImg} />
              </Pressable>
            </View>
          )
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <BookEntry data={item} isOnHoldDataSelected={isOnHoldDataSelected} onHoldDatas={onHoldDatas} storeHoldDatas={storeHoldDatas} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: txtColor }}>No Entry Books Available</Text>
            <Pressable onPress={createNewEntry} style={styles.createEntryButton}>
              <Text style={styles.createEntryText}>+ Create New Entry</Text>
            </Pressable>
          </View>
        }
        getItemLayout={(data, index) => (
          { length: wp('100%'), offset: wp('100%') * index, index }
        )}
      />
      {!showEditOptionsToHeader && (
        <LinearButton containerStyle={styles.linearButton}
        lGStyle={{ borderRadius : 10 }}
        title='Create New Entry' linearColor={btnColor} titleColor={btnColorTxt} onPress={createNewEntry} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 19,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listContainer: {
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    gap: 20,
  },
  createEntryButton: {
    paddingHorizontal: 5,
  },
  createEntryText: {
    color: 'blue',
  },
  linearButton: {
    margin: 5,
    borderRadius : 10
  },
});

export default Dashboard;
