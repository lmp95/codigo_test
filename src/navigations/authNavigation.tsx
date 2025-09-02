import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import { navigationOptions } from './navigationOptions';
import OnBoarding from '../screens/OnBoarding';
import HealthConcerns from '../screens/signUp/HealthConcerns';
import Diets from '../screens/signUp/Diets';
import Allergies from '../screens/signUp/Allergies';
import Questions from '../screens/signUp/Questions';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigation() {
  return (
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
  );
}
