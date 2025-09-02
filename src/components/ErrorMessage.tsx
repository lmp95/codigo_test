import { StyleSheet, Text } from 'react-native';

type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <Text style={styles.errorMessage}>{message}</Text>;
}

const styles = StyleSheet.create({
  errorMessage: {
    color: '#ff3030',
    fontSize: 14,
    fontWeight: '500',
  },
});
