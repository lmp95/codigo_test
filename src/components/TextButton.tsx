import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type TextButtonProps = {
  label: string;
  onPress?: () => void;
};
export default function TextButton({ label, onPress }: TextButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 100,
  },
  btnText: {
    color: '#F5624E',
    fontWeight: 'bold',
  },
});
