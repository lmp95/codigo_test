import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from '../../components/Typography';

export default function Main() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.appBtn}
        onPress={() => navigation.navigate('StateManagement')}
      >
        <Typography style={styles.btnText}>State Management</Typography>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.appBtn}
        onPress={() => navigation.navigate('CodeManagement')}
      >
        <Typography style={styles.btnText}>Code Management</Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#D3F3E6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  appBtn: {
    width: '40%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  btnText: {
    textAlign: 'center',
  },
});
