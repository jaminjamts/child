import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from '../components/BottomNavigation';
import { InformationScreen } from '../screens/InformationScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { DiaryScreen } from '../screens/DiaryScreen';
import { Tab } from '../types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <InformationScreen />;
      case 'report':
        return <ReportScreen />;
      case 'diary':
        return <DiaryScreen />;
      default:
        return <InformationScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />
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
