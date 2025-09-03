import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  label: string;
  onPress?: () => void;
};

export default function Button({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#F5624E',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    minWidth: 100,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
