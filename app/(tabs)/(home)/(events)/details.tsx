import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsEventsScreen() {
  return (
    <View style={styles.container}>
      <Text>Details Events Screen</Text>
      <Link href="/(tabs)/(home)/(events)/(users)">Users</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
