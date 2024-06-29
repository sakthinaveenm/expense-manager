import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../themes/ThemeWrapper'
import StyleSheets from './SplashScreen.style';
import useResponsive from '../../../hooks/useResponsive';
import { themeNames } from '../../../themes/themes';
import { splashImageDark, splashImageLight } from '../../../assets/images/images';

const SplashScreen = () => {
 
 const { theme } = useTheme();
 const { wp , hp } = useResponsive();
 const styles = StyleSheets({ theme , wp, hp })
 const splashLoaderColor = theme.appearance.splashLoaderColor;
 const splashImage = theme.name === themeNames.light ? splashImageLight : splashImageDark; // prettier-ignore

  return (
    <View style={[styles.container]}>
     <View style={[styles.logoContainer]}>
        <Image source={splashImage} style={[styles.splashImage]} resizeMode='contain' />
        <ActivityIndicator  color={splashLoaderColor} />
      </View>
    </View>
  )
}

export default SplashScreen
