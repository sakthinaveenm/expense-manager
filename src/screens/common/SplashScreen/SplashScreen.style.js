import { StyleSheet } from "react-native";


const StyleSheets = ({ theme , wp, hp }) => StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : theme.appearance.backgroundColor,
    justifyContent : "center",
    alignItems : "center"
  },
  logoContainer : {
    flex : 1,
    backgroundColor : theme.appearance.backgroundColor,
    justifyContent : "center",
    alignItems : "center",
    gap : 20
  },
  splashImage : {
    width : wp(30),
    height : hp(30)
  }
})


export default StyleSheets;