import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import OnBoarding from '../screens/apps/StateManagement/OnBoarding';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import SignUp from '../screens/apps/StateManagement/signUp/indext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StateManagementNavigation() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3F3E6',
  },
});
