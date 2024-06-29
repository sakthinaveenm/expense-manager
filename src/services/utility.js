import { Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';

export const IS_TABLET = true;


export const showToast = message => {
    if(Platform.OS !== "windows"){
   Snackbar.show({
      text: String(message),
      duration: Snackbar.LENGTH_SHORT,
      action: {
        text: 'Close',
        textColor: 'green',
        onPress: () => {},
      },
    });
    }
  };
  


export const generateOTP = length => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};