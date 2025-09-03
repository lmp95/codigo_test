import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import OnBoarding from '../screens/apps/StateManagement/OnBoarding';
import HealthConcerns from '../screens/apps/StateManagement/signUp/HealthConcerns';
import Diets from '../screens/apps/StateManagement/signUp/Diets';
import Allergies from '../screens/apps/StateManagement/signUp/Allergies';
import Questions from '../screens/apps/StateManagement/signUp/Questions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

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
          name="HealthConcern"
          component={HealthConcerns}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Diets"
          component={Diets}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Allergies"
          component={Allergies}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Questions"
          component={Questions}
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
