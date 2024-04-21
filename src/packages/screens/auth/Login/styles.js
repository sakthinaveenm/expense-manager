import {StyleSheet} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet';

const StyleSheets = ({wp, hp}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: hp('100%'),
      justifyContent: 'space-between',
    },
  });

export default StyleSheets;
