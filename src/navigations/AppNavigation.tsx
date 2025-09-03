import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import OnBoarding from '../screens/apps/StateManagement/OnBoarding';
import StateManagementNavigation from './StateManagementNavigation';
import Main from '../screens/apps/Main';
import CodeManagementNavigation from './CodeManagementNavigation';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="App">
      <Stack.Screen
        name="App"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StateManagement"
        component={StateManagementNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CodeManagement"
        component={CodeManagementNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
