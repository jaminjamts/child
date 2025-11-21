import { View, StyleSheet } from 'react-native';
import { DiaryScreen } from '../screens/Diary/DiaryScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <DiaryScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
