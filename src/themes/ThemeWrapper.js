import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import themes, { themeNames, themeOptions } from './themes';

export const ThemeContext = React.createContext();


export const useTheme = () => React.useContext(ThemeContext);


const ThemeWrapper = ({children}) => {

  const [theme,setTheme] = useState(themes[0]);

  const getTheme = (themeName) => {
    let returnValue = themes[0];
    switch (themeName) {
        case themeNames.light:
            returnValue = themes[0]            
            break;
        case themeNames.dark:
            returnValue = themes[1]            
            break;
        
        default:
            break;
    }
    return returnValue;
  }

  const switchTheme = (themeName) => {
    const themeValue = getTheme(themeName);
    setTheme(themeValue)
  }

  return (
    <ThemeContext.Provider value={{ theme , switchTheme , themeOptions }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeWrapper

const styles = StyleSheet.create({})