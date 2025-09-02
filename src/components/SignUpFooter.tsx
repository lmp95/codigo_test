import { StyleSheet, View } from 'react-native';
import TextButton from './TextButton';
import Button from './Button';

type SignUpFooterProps = {
  onPressNext?: () => void;
  onPressBack?: () => void;
};

export default function SignUpFooter({
  onPressNext,
  onPressBack,
}: SignUpFooterProps) {
  return (
    <View style={styles.footer}>
      <TextButton label="Back" onPress={onPressBack} />
      <Button label="Next" onPress={onPressNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 200,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
