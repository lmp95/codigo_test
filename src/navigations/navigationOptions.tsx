import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const navigationOptions = ({
  title = '',
  showHeader = false,
  backgroundColor,
}: {
  title?: string;
  showHeader?: boolean;
  backgroundColor?: string;
} = {}): NativeStackNavigationOptions => {
  return {
    title,
    headerStyle: {
      backgroundColor,
    },
    // headerLeft: () => <HeaderBackButton />,
    headerShadowVisible: false,
    headerShown: showHeader,
  };
};
