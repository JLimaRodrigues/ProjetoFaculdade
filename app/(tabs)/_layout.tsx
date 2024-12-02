import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen 
      name="(home)" 
      options={{
        title: 'Inicio',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ),
      }}
      />
      <Tabs.Screen 
      name="settings" 
      options={{
        title: 'Configurações',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
        ),
      }}
      />
    </Tabs>
  );
}
