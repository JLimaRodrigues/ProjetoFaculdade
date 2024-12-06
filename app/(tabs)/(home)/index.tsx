import { Link } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Link style={styles.floatingBtn} href="/(tabs)/(home)/(events)">
        <Text style={styles.floatingBtnText}>Eventos</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingBtn: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center', 
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
