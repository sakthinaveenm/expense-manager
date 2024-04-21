import {createStackNavigator} from '@react-navigation/stack';

const HomeNavigation = () => {
    const HomeStack = createStackNavigator();
    const options = {headerShown: false}
  return (
    <HomeStack.Navigator initialRouteName={LOGIN_AUTH}>

    </HomeStack.Navigator>
  )
}

export default HomeNavigation