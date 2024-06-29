import {createStackNavigator} from '@react-navigation/stack';
import EntryManager from '../screens/home/EntryBook/EntryManager/EntryManager';
import { CASH_ENTRY_MANAGER, CASH_MANAGER, DASHOARD, ENTRY_MANAGER } from '../constants/Navigation';
import Dashboard from '../screens/Dashboard/Dashboard';
import CashManager from '../screens/home/Cash/CashManager';
import CashDashboard from '../screens/home/Cash/CashDashboard';

const HomeNavigation = () => {
    const HomeStack = createStackNavigator();
    const options = {headerShown: false}
  return (
    <HomeStack.Navigator initialRouteName={DASHOARD}>
      <HomeStack.Screen
        options={options}
        name={DASHOARD}
        component={Dashboard}
      />
      <HomeStack.Screen
        options={options}
        name={ENTRY_MANAGER}
        component={EntryManager}
      />
      <HomeStack.Screen
        options={options}
        name={CASH_MANAGER}
        component={CashDashboard}
      />
        <HomeStack.Screen
        options={options}
        name={CASH_ENTRY_MANAGER}
        component={CashManager}
      />
    </HomeStack.Navigator>
  )
}

export default HomeNavigation