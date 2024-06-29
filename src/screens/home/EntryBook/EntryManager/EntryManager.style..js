import { StyleSheet } from 'react-native';

const StyleSheets = ({ theme, wp }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appearance.backgroundColor,
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap : 20
    },
    headerTxt: {
      color: theme.appearance.txtColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    txtColor: {
      color: theme.appearance.txtColor,
    },
    inputContainer: {
      width: wp(90),
    },
    labelTitle: {
      color: theme.appearance.txtColor,
      fontSize: 20,
      fontWeight: '400',
    },
    btn: {
      paddingVertical: 10,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    btnTxt: {
      color: '#fff',
    },
  });

export default StyleSheets;
