import {StyleSheet} from 'react-native';

const GlobalStyleSheet = ({wp, hp}) =>
  StyleSheet.create({
    header: {
      fontSize: 30,
      fontWeight: '700',
    },
    black: {
      color: 'black',
    },
    white: {
      color: '#FFFFFF',
    },
    pv5: {
      paddingVertical: hp(5),
    },
    pv2: {
      paddingVertical: hp(2),
    },
    pv3: {
      paddingVertical: hp(3),
    },
    ph3: {
      paddingHorizontal: hp(3),
    },
    ph2: {
      paddingHorizontal: hp(2),
    },
    ph5: {
      paddingHorizontal: wp(5),
    },
    dFlex: {
      display: 'flex',
    },
    FlexRow: {
      flexDirection: 'row',
    },
    JCCenter: {
      justifyContent: 'center',
    },
    JCSBtwn: {
      justifyContent: 'space-between',
    },
    AICenter: {
      alignItems: 'center',
    },
    lineStyle: {
      borderWidth: 1,
      borderColor: 'black',
      margin: 10,
    },
  });

export default GlobalStyleSheet;
