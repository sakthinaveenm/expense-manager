/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {Fragment, useContext, useState} from 'react';
import useResponsive from '../../../hooks/useResponsive';
import StyleSheets from './styles';
// import CInput from '../../../components/common/CInput';
import EntypoIcons from 'react-native-vector-icons/Entypo';
// import {ThemeContext} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {OtpInput} from 'react-native-otp-entry';
// import {
//   CreateAccountByUserNameApi,
//   FindUserByEmailApi,
//   FindUserByPhoneNumberApi,
//   OTPForEmailSendApi,
//   OTPForMobileNoSendApi,
// } from '../../../services/api/api.service';
// import CONFIG from '../../../config';
import {generateOTP, showToast} from '../../../services/utility';
import GlobalStyleSheet from '../../../common/Styles';
import LinearButton from '../../../common/components/LinearButton';
import CInput from '../../../components/BookEntry/common/CInput';
import appConfig from '../../../config/appConfig';
import { useTheme } from '../../../themes/ThemeWrapper';
import { CreateAccountByUserNameApi, FindUserByPhoneNumberApi } from '../../../services/api/api.service';
const RegisterContext = React.createContext();

const RegisterProvider = () => {
  const [FormData, setFormData] = useState({
    RegisterType: 2,
    EmailID: '',
    PhoneNumber: '',
    EmailVerified: false,
    phoneVerified: false,
    userNameVerified: true,
    OTP_TO_BE_TYPED: '',
    USER_OTP: '',
    TO_WHO_OTP_SENT: '',
    userName: '',
    Password: '',
    confirmPassword: '',
  });

  return (
    <RegisterContext.Provider value={{FormData, setFormData}}>
      <Register />
    </RegisterContext.Provider>
  );
};

const Register = () => {
  const {wp, hp} = useResponsive();
  const styles = StyleSheets({wp, hp});
  const GlobalStyle = GlobalStyleSheet({wp, hp});
  const { theme } = useTheme();
  const CONTAINER_COLOR = "#ffffff";
  const AUTH_BUTTON_BG =theme.appearance.logBtn;
  const {FormData, setFormData} = useContext(RegisterContext);
  const navigation = useNavigation();
  const [formStage, setFormStage] = useState(1);

  const setFormValue = obj => {
    setFormData(fd => ({...fd, ...obj}));
  };

  // Conditions
  const REGISTER_PHASE_1 = formStage == 1;
  const REGISTER_PHASE_2 = formStage == 2;
  const REGISTER_PHASE_3 = formStage == 3;

  const REGISTER_TYPE_EMAIL = FormData.RegisterType == 1;
  const REGISTER_TYPE_PHONE_NO = FormData.RegisterType == 2;
  const REGISTER_TYPE_LABEL = `Enter your ${
    REGISTER_TYPE_EMAIL ? 'Email' : 'Phone Number'
  }`;
  const REGISTER_TYPE_VALUE = REGISTER_TYPE_EMAIL
    ? FormData.EmailID
    : FormData.PhoneNumber;

  const IS_USER_ABLE_TO_SEND_OTP = REGISTER_TYPE_PHONE_NO
    ? FormData.phoneVerified
    : REGISTER_TYPE_EMAIL && FormData.EmailVerified;

  const ValidateValidMailOrNum = async value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})([-.\s]?)\d{1,12}$/;

    if (REGISTER_TYPE_EMAIL) {
      setFormValue({EmailID: value});
      const isValidEmail = emailRegex.test(value);
      if (isValidEmail) {
        try {
          const response = await FindUserByEmailApi(appConfig.appId, value);
          if (response) {
            if (String(response.success) === 'true') {
              setFormValue({EmailVerified: true});
            } else if (String(response.success) === 'false') {
              setFormValue({EmailVerified: false});
            }
          }
        } catch (error) {}
      }
    } else if (REGISTER_TYPE_PHONE_NO) {
      setFormValue({PhoneNumber: value});
      const isValidPhoneNumber = phoneRegex.test(value);
      if (isValidPhoneNumber && String(value).length === 10) {
        try {
          const response = await FindUserByPhoneNumberApi(appConfig.appId, value);

          if (response) {
            if (String(response.success) === 'true') {
              setFormValue({phoneVerified: true});
            } else if (String(response.success) === 'false') {
              setFormValue({phoneVerified: false});
              showToast(response.error);
            } else {
              showToast('User Already Exists');
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setFormValue({phoneVerified: false});
      }
    }
  };

  const SendOTP = async () => {
    try {
      const OTP = generateOTP(6);

      console.log(OTP)

      let response;
      if (REGISTER_TYPE_EMAIL) {
        response = await OTPForEmailSendApi(FormData.EmailID);
      } else if (REGISTER_TYPE_PHONE_NO) {
        // const URL = `https://www.fast2sms.com/dev/bulkV2?authorization=${CONFIG.FAST2SMS_API_KEY}&route=otp&variables_values=${OTP}&flash=0&numbers=${FormData.PhoneNumber}`;
        // response = await fetch(URL);
        // let res = await response.json();
        let res = {return: true};
        if (res) {
          if (res.return == true) {
            setFormValue({
              OTP_TO_BE_TYPED: OTP,
              USER_OTP: '',
              TO_WHO_OTP_SENT: `${FormData.PhoneNumber}`,
            });
            setFormStage(formStage + 1);
            console.log('Success', OTP);
          }
        }
      }
    } catch (error) {}
  };

  const REGISTER_BTN_CONDITIONS = REGISTER_PHASE_1
    ? IS_USER_ABLE_TO_SEND_OTP
    : REGISTER_PHASE_2
    ? FormData.USER_OTP.length == 6
      ? true
      : false
    : REGISTER_PHASE_3
    ? FormData.userNameVerified == true &&
      FormData.confirmPassword.length > 0 &&
      FormData.confirmPassword == FormData.Password
    : true;

  const FormSubmitButton = async () => {
    if (REGISTER_PHASE_1) {
      if (IS_USER_ABLE_TO_SEND_OTP) {
        SendOTP();
      }
    } else if (REGISTER_PHASE_2) {
      if (FormData.USER_OTP == FormData.OTP_TO_BE_TYPED) {
        showToast('OTP Verified Successfully');
        setFormStage(formStage + 1);
      } else {
        showToast('Incorrect otp');
      }
    } else if (REGISTER_PHASE_3) {
      try {
        const response = await CreateAccountByUserNameApi(
          REGISTER_TYPE_EMAIL
            ? {
                AppID: appConfig.appId,
                username: FormData.userName,
                password: FormData.Password,
                email: FormData.EmailID,
              }
            : {
                AppID: appConfig.appId,
                username: FormData.userName,
                password: FormData.Password,
                phone: FormData.PhoneNumber,
              },
        );
        if (response) {
          if (String(response.success) === 'true') {
            showToast(response.message);
          } else if (String(response.success) === 'false') {
            showToast(response.error);
          }
        }
      } catch (err) {}
    }
  };

  return (
    <View
      style={[
        styles.container,
        GlobalStyle.ph5,
        GlobalStyle.pv3,
        GlobalStyle.JCSBtwn,
        {gap: 10, backgroundColor: CONTAINER_COLOR},
      ]}>
      <View
        style={[
          GlobalStyle.FlexRow,
          GlobalStyle.AICenter,
          {paddingBottom: hp(1), marginLeft: -wp(5)},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <EntypoIcons
            name="chevron-small-left"
            style={[GlobalStyle.black]}
            size={40}
          />
        </TouchableOpacity>
        <View>
          <Text style={[GlobalStyle.black, GlobalStyle.header]}>Register</Text>
        </View>
      </View>
      <ScrollView>
        {REGISTER_PHASE_1 ? (
          <Fragment>
            <View>
              <Text
                style={[GlobalStyle.black, {fontSize: 15, fontWeight: 'bold'}]}>
                Create Account Via
              </Text>
            </View>
            <View
              style={[
                GlobalStyle.FlexRow,
                {
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: hp(2),
                  gap: 10,
                },
              ]}>
              <LinearButton
                onPress={() => {
                  showToast('Coming Soon...');
                  // setFormValue({RegisterType: 1})
                }}
                title="E-mail"
                linearColor={
                  FormData.RegisterType == 1
                    ? AUTH_BUTTON_BG
                    : ['#f4f4f4', '#f4f4f4']
                }
                titleColor={FormData.RegisterType == 1 ? '#FFF' : '#000'}
                containerStyle={[{borderRadius: 10, width: '48%'}]}
                lGStyle={[{borderRadius: 10, paddingVertical: 10}]}
              />
              <LinearButton
                onPress={() => setFormValue({RegisterType: 2})}
                title="Phone Number"
                linearColor={
                  FormData.RegisterType == 2
                    ? AUTH_BUTTON_BG
                    : ['#f4f4f4', '#f4f4f4']
                }
                titleColor={FormData.RegisterType == 2 ? '#FFF' : '#000'}
                containerStyle={[{borderRadius: 10}, {width: '48%'}]}
                lGStyle={{borderRadius: 10, paddingVertical: 10}}
              />
            </View>
            <CInput
              label={REGISTER_TYPE_LABEL}
              placeholder={REGISTER_TYPE_LABEL}
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
              keyboardType={REGISTER_TYPE_PHONE_NO ? 'phone-pad' : 'default'}
              value={REGISTER_TYPE_VALUE}
              onChange={val => ValidateValidMailOrNum(val)}
            />
          </Fragment>
        ) : REGISTER_PHASE_2 ? (
          <Fragment>
            <View>
              <Text style={[GlobalStyle.black]}>
                Enter the verification code sent to {FormData.TO_WHO_OTP_SENT}
              </Text>
            </View>
            <View style={{paddingVertical: hp(1)}}>
              <OtpInput
                numberOfDigits={6}
                focusColor="#000"
                onTextChange={text => setFormValue({USER_OTP: text})}
              />
            </View>
            <View style={[{alignItems: 'flex-end', paddingHorizontal: wp(2)}]}>
              <View style={[GlobalStyle.FlexRow, {gap: 10}]}>
                <View>
                  <Text>{'00:00'}</Text>
                </View>
                <TouchableOpacity>
                  <Text>Resend otp</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Fragment>
        ) : REGISTER_PHASE_3 ? (
          <Fragment>
            <CInput
              label={'Enter your User Name'}
              placeholder={'Enter your User Name'}
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
              value={FormData.userName}
              onChange={val => setFormValue({userName: val})}
            />
            <CInput
              label={'Enter your Password'}
              placeholder={'Enter your Password'}
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
              value={FormData.Password}
              onChange={val => setFormValue({Password: val})}
            />
            <CInput
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
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
              value={FormData.confirmPassword}
              onChange={val => setFormValue({confirmPassword: val})}
              errResponse={
                FormData.confirmPassword.length > 0 &&
                FormData.confirmPassword != FormData.Password
                  ? 'Password not matched'
                  : ''
              }
            />
          </Fragment>
        ) : null}
      </ScrollView>
      <View>
        <LinearButton
          title={
            formStage == 1
              ? 'Get OTP'
              : formStage == 2
              ? 'Verify OTP'
              : 'Create Account'
          }
          linearColor={REGISTER_BTN_CONDITIONS ? AUTH_BUTTON_BG : undefined}
          titleColor={REGISTER_BTN_CONDITIONS ? '#FFF' : 'grey'}
          containerStyle={{borderRadius: 10}}
          lGStyle={{borderRadius: 10}}
          onPress={() => FormSubmitButton()}
        />
      </View>
    </View>
  );
};

export default RegisterProvider;
