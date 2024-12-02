import { Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
            options={{
                title: 'Events'
            }}
            name="index" 
        />
      <Stack.Screen 
            options={{
                title: 'Details Event'
            }}
            name="details" 
        />
      <Stack.Screen 
        options={{
            headerShown: false
        }}
        name="(users)" 
      />
    </Stack>
  );
}
