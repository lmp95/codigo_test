import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  App: undefined;
  StateManagement: undefined;
  CodeManagement: undefined;
  OnBoarding: undefined;
  HealthConcern: undefined;
  Diets: undefined;
  Allergies: undefined;
  Questions: undefined;
  Home: undefined;
  MovieDetail: { movieId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
