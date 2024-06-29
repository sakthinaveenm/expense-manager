import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleAuth = () => {


   // Google Signin Configuration
  // GoogleSignin.configure({
  //   scopes: ['email'],
  //   webClientId: CONFIG.GOOGLE_WEBCLIENT_ID,
  //   offlineAccess: true,
  // });

  // const fetchGoogleAuth = async () => {
  //   setLoading(true);
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('====================================');
  //     console.log('userInfo', userInfo);
  //     console.log('====================================');
  //     const body = {
  //       email: userInfo?.user.email,
  //       fullName: userInfo?.user.name,
  //       userName: userInfo?.user.id,
  //       photo: userInfo?.user.photo,
  //       AppID: CONFIG.APP_ID,
  //     };
  //     // googleLoaderRef.current.show();
  //     console.log('====================================');
  //     console.log('body', body);
  //     console.log('====================================');
  //     const response = await GoogleLoginApi(body);
  //     console.log('====================================');
  //     console.log('response', response);
  //     console.log('====================================');
  //     if (response) {
  //       if (response.success == true) {
  //         const {_id, username, photo} = response.data;
  //         dispatch(
  //           setProfileViaLogin({
  //             userID: _id,
  //             username,
  //             password: '',
  //             phone: '',
  //             photo,
  //           }),
  //         );
  //       } else if (response.success == false) {
  //         showToast(response.error);
  //       }
  //       // googleLoaderRef.current.show(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // googleLoaderRef.current.show(false);
  //     showToast('Something went wrong ! ' + String(error));
  //   }
  //   setLoading(false);
  // };


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

  return (
    <View>
      <Text>GoogleAuth</Text>
    </View>
  )
}

export default GoogleAuth