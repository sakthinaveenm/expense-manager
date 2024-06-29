import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import SplashScreen from '../screens/common/SplashScreen/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalActions } from '../redux/GlobalSlice';

const AppNavigation = () => {

  const isSplashLoading = useSelector(state => state.global.isSplashLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const {setIsSplashLoading} = GlobalActions;

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsSplashLoading(false));
    }, 2000);
  }, []);
  
  if(isSplashLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  )
}

export default AppNavigation