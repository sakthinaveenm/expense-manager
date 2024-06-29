import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useContext, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SocialIcon} from 'react-native-elements';
// import {useSelector, useDispatch} from 'react-redux';
import GoogleLoader from 'react-native-whc-loading';
import LinearButton from '../../../common/components/LinearButton';

// files
import useResponsive from '../../../hooks/useResponsive';
import { LoginAccountByUserNameApi } from '../../../services/api/api.service';


import StyleSheets from './styles';
// import {REGISTER_AUTH} from '../../../constants/Navigation';
// import {ThemeContext} from '../../../theme';

import GlobalStyleSheet from '../../../common/Styles';
import CInput from '../../../components/BookEntry/common/CInput';
import { REGISTER_AUTH } from '../../../constants/Navigation';
import { useTheme } from '../../../themes/ThemeWrapper';
import appConfig from '../../../config/appConfig';
import { showToast } from '../../../services/utility';
import { AuthActions } from '../../../redux/AuthSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const {wp, hp} = useResponsive();
  const styles = StyleSheets({wp, hp});
  const GlobalStyle = GlobalStyleSheet({wp, hp});
  const navigation = useNavigation();
  const { theme } = useTheme();
  // const {THEME} = useContext(ThemeContext);
  const CONTAINER_COLOR = "#ffff";
  const AUTH_BUTTON_BG = theme.appearance.logBtn;
  const RegisterFun = () => navigation.navigate(REGISTER_AUTH);
  const [loading, setLoading] = useState(false);
  const {setProfileViaLogin} = AuthActions;
  const dispatch = useDispatch();
  const googleLoaderRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      LoginFun(values);
    },
  });




  const LoginFun = async body => {
    setLoading(true);
    try {
      body.AppID = appConfig.appId;
      const response = await LoginAccountByUserNameApi(body);
      if (response) {
        if (response.success == true) {
          showToast(response.message);
          const {_id, username, password, phone, photo} = response.data;
          dispatch(
            setProfileViaLogin({
              userID: _id,
              username,
              password,
              phone,
              photo,
            }),
          );
        } else if (response.success == false) {
          showToast(response.error);
        }
      } else {
        showToast('Something went wrong !');
      }
    } catch (error) {
      showToast('Something went wrong !');
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <KeyboardAwareScrollView>
        <View
          style={[
            styles.container,
            GlobalStyle.pv5,
            GlobalStyle.ph5,
            {backgroundColor: CONTAINER_COLOR},
          ]}>
          {/* Container One */}
          <View>
            <Text style={[GlobalStyle.header, GlobalStyle.black]}>
              Welcome Back !
            </Text>
            <Text style={[GlobalStyle.black]}>
              Enter your Username and Password
            </Text>
          </View>
          {/* Container Two */}
          <View style={[{gap: hp(1)}]}>
            <CInput
              label={'Enter your Username'}
              placeholder={'Enter your Username'}
              containerStyle={{
                width: wp('90%'),
              }}
              labelStyle={[GlobalStyle.black, {fontSize: 15}]}
              TxtInputStyle={{
                borderColor: '#d9d9d9',
                borderWidth: 1,
                backgroundColor: '#f4f4f4',
                height: 50,
              }}
              name={'username'}
              id={'username'}
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              editable={!loading}
            />
            <CInput
              label={'Enter your Password'}
              labelStyle={[GlobalStyle.black, {fontSize: 15}]}
              placeholder={'Enter your Password'}
              secureTextEntry={true}
              containerStyle={{
                width: wp('90%'),
              }}
              TxtInputStyle={{
                borderColor: '#d9d9d9',
                borderWidth: 1,
                backgroundColor: '#f4f4f4',
                height: 50,
              }}
              name={'password'}
              id={'password'}
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              editable={!loading}
            />
            <LinearButton
              loading={loading}
              onPress={() => formik.handleSubmit()}
              linearColor={AUTH_BUTTON_BG}
              title="Login"
              titleColor="#fff"
              containerStyle={{
                borderRadius: 10,
              }}
              lGStyle={{
                borderRadius: 10,
              }}
            />
            <View style={[GlobalStyle.FlexRow, {paddingVertical: hp(1)}]}>
              <View
                style={[
                  GlobalStyle.lineStyle,
                  {
                    width: wp(40),
                    borderColor: '#D9D9D9',
                  },
                ]}
              />
              <Text style={[GlobalStyle.black]}>or</Text>
              <View
                style={[
                  GlobalStyle.lineStyle,
                  {
                    width: wp(40),
                    borderColor: '#D9D9D9',
                  },
                ]}
              />
            </View>
            <SocialIcon
              title="Continue with Google"
              button
              type="google"
              // onPress={fetchGoogleAuth}
            />
          </View>
          {/* Container Three */}
          <View style={[GlobalStyle.FlexRow, GlobalStyle.JCCenter, {gap: 3}]}>
            <Text style={[GlobalStyle.black]}>Need an account?</Text>
            <TouchableOpacity onPress={() => RegisterFun()}>
              <Text style={[{fontWeight: '800', color: '#367aff'}]}>
                Create one
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <GoogleLoader
        ref={googleLoaderRef}
        backgroundColor={'#00000096'}
        indicatorColor={'#fff'}
      />
    </Fragment>
  );
};

export default Login;
