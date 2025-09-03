import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';
import OnBoarding from '../screens/apps/StateManagement/OnBoarding';
import HealthConcerns from '../screens/apps/StateManagement/signUp/HealthConcerns';
import Diets from '../screens/apps/StateManagement/signUp/Diets';
import Allergies from '../screens/apps/StateManagement/signUp/Allergies';
import Questions from '../screens/apps/StateManagement/signUp/Questions';
import Home from '../screens/apps/CodeManagement/Home';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieDetail from '../screens/apps/CodeManagement/MovieDetail';
import Typography from '../components/Typography';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function CodeManagementNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Typography>Back</Typography>
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}
