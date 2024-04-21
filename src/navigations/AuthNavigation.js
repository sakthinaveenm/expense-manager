import {createStackNavigator} from '@react-navigation/stack';
import { LOGIN_AUTH, REGISTER_AUTH } from '../constants/Navigation';
import Login from '../screens/auth/Login/Login';
import Register from '../screens/auth/Register';

const AuthNavigation = () => {
    const AuthStack = createStackNavigator();
    const options = {headerShown: false}
  return (
    <AuthStack.Navigator initialRouteName={LOGIN_AUTH}>
      <AuthStack.Screen
        options={options}
        name={LOGIN_AUTH}
        component={Login}
      />
      <AuthStack.Screen
        options={options}
        name={REGISTER_AUTH}
        component={Register}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigation