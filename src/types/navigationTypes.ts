import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  OnBoarding: undefined;
  HealthConcern: undefined;
  Diets: undefined;
  Allergies: undefined;
  Questions: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
