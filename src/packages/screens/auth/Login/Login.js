import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment, useContext, useRef, useState} from 'react';
import useResponsive from '../../../hooks/useResponsive';
import StyleSheets from './styles';
import GlobalStyleSheet from '../../../constants/Styles';
import CInput from '../../../components/common/CInput';
import LinearButton from '../../../components/common/LinearButton';
import {useNavigation} from '@react-navigation/native';
import {REGISTER_AUTH} from '../../../constants/Navigation';
import {ThemeContext} from '../../../theme';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CONFIG from '../../../config';
import {SocialIcon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {
  GoogleLoginApi,
  LoginAccountByUserNameApi,
  LoginApi,
} from '../../../services/api/api.service';
import {showToast} from '../../../services/utility';
import {AuthActions} from '../../../redux/AuthSlice';
import {useSelector, useDispatch} from 'react-redux';
import GoogleLoader from 'react-native-whc-loading';

const Login = () => {
  const {wp, hp} = useResponsive();
  const styles = StyleSheets({wp, hp});
  const GlobalStyle = GlobalStyleSheet({wp, hp});
  const navigation = useNavigation();
  const {THEME} = useContext(ThemeContext);
  const CONTAINER_COLOR = THEME.CONTAINER_COLOR;
  const AUTH_BUTTON_BG = THEME.AUTH_BUTTON_BG;
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
  console.log('CONFIG.GOOGLE_WEBCLIENT_ID', CONFIG.GOOGLE_WEBCLIENT_ID);
  // Google Signin Configuration
  GoogleSignin.configure({
    scopes: ['email'],
    webClientId: CONFIG.GOOGLE_WEBCLIENT_ID,
    offlineAccess: true,
  });

  const fetchGoogleAuth = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('====================================');
      console.log('userInfo', userInfo);
      console.log('====================================');
      const body = {
        email: userInfo?.user.email,
        fullName: userInfo?.user.name,
        userName: userInfo?.user.id,
        photo: userInfo?.user.photo,
        AppID: CONFIG.APP_ID,
      };
      // googleLoaderRef.current.show();
      console.log('====================================');
      console.log('body', body);
      console.log('====================================');
      const response = await GoogleLoginApi(body);
      console.log('====================================');
      console.log('response', response);
      console.log('====================================');
      if (response) {
        if (response.success == true) {
          const {_id, username, photo} = response.data;
          dispatch(
            setProfileViaLogin({
              userID: _id,
              username,
              password: '',
              phone: '',
              photo,
            }),
          );
        } else if (response.success == false) {
          showToast(response.error);
        }
        // googleLoaderRef.current.show(false);
      }
    } catch (error) {
      console.error(error);
      // googleLoaderRef.current.show(false);
      showToast('Something went wrong ! ' + String(error));
    }
    setLoading(false);
  };

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setloggedIn(false);
  //     setuserInfo([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const LoginFun = async body => {
    setLoading(true);
    try {
      body.AppID = CONFIG.APP_ID;
      const response = await LoginAccountByUserNameApi(body);
      console.log('====================================');
      console.log(response);
      console.log('====================================');
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
              onPress={fetchGoogleAuth}
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
