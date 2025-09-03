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
};

export default function SignUpFooter({
  hideBackBtn = false,
  confirmLabel = 'Next',
  onPressNext,
  onPressBack,
}: SignUpFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {!hideBackBtn && <TextButton label="Back" onPress={onPressBack} />}
        <Button label={confirmLabel} onPress={onPressNext} />
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
});
