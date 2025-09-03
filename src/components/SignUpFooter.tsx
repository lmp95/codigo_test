import { StyleSheet, View } from 'react-native';
import TextButton from './TextButton';
import Button from './Button';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type SignUpFooterProps = {
  hideBackBtn?: boolean;
  confirmLabel?: string;
  onPressNext?: () => void;
  onPressBack?: () => void;
  currentStep?: number;
};

export default function SignUpFooter({
  hideBackBtn = false,
  confirmLabel = 'Next',
  onPressNext,
  onPressBack,
  currentStep = 0,
}: SignUpFooterProps) {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(currentStep / 4, {
      duration: 500,
    });
  }, [currentStep]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {!hideBackBtn && <TextButton label="Back" onPress={onPressBack} />}
        <Button label={confirmLabel} onPress={onPressNext} />
      </View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    borderRadius: 1,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2F435D',
    borderRadius: 1,
  },
});
