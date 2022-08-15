import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapsScreen from './components/MapsScreen';
import ProfileScreen from './components/ProfileScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MapsScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
