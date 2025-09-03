import { StyleSheet, Text, View } from 'react-native';
import Typography from '../../../components/Typography';

import OnBoardingImg from '../../../../assets/images/onboarding.svg';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function OnBoarding() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography size="xl" weight="semiBold">
          Welcome to DailyVita
        </Typography>
        <Typography weight="semiBold">
          Hello, we are here to make your life healthier and happier
        </Typography>
        <OnBoardingImg width="100%" height={350} />
        <Typography>
          We will ask couple of questions to better understand your vitamin
          need.
        </Typography>
      </View>
      <View style={styles.footer}>
        <Button
          label="Get started"
          onPress={() => navigation.navigate('HealthConcern')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3F3E6',
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 1,
    paddingVertical: 24,
    gap: 16,
  },
  footer: {
    flex: 0.2,
  },
});
