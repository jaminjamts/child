import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ffd33d' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hүүр',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={focused ? '#ffd33d' : color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Мэдээллэх',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'shield' : 'shield-outline'}
              color={focused ? '#ffd33d' : color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dairy"
        options={{
          title: 'Тэмдэглэл',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'book' : 'book-outline'}
              color={focused ? '#ffd33d' : color}
              size={20}
            />
          ),
        }}
      />
    </Tabs>
  );
}
