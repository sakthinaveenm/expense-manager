import {StyleSheet} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';

const StyleSheets = ({wp, hp}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: hp('100%'),
    },
    panel: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: hp(1),
      borderWidth: 1,
      borderColor: '#f4f4f4',
    },
  });

export default StyleSheets;
