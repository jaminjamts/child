import { View, StyleSheet } from 'react-native';
import { Home, Shield, BookOpen } from 'lucide-react-native';
import { IconButton } from './button/IconButton';
import { Tab } from '../types';

interface BottomNavigationProps {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
}

export function BottomNavigation({
  activeTab,
  onTabPress,
}: BottomNavigationProps) {
  const isActive = (tab: Tab) => activeTab === tab;
  const activeColor = '#1A3A73';
  const inactiveColor = '#B0B0B0';

  return (
    <View style={styles.container}>
      <IconButton
        icon={
          <Home
            size={28}
            color={isActive('home') ? activeColor : inactiveColor}
          />
        }
        onPress={() => onTabPress('home')}
        style={styles.tab}
      />
      <IconButton
        icon={
          <Shield
            size={28}
            color={isActive('report') ? activeColor : inactiveColor}
          />
        }
        onPress={() => onTabPress('report')}
        style={styles.tab}
      />
      <IconButton
        icon={
          <BookOpen
            size={28}
            color={isActive('diary') ? activeColor : inactiveColor}
          />
        }
        onPress={() => onTabPress('diary')}
        style={styles.tab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});
