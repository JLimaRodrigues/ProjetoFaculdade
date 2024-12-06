import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';

import * as Location from 'expo-location';

export default function HomeScreen() {

  const [location, setLocation] = useState<Location.LocationObject | null>({
    "timestamp":1733523579312.0232,
    "coords":{
      "longitude":-44.44205158856653,
      "altitudeAccuracy":15.380637168884277,
      "speed":-1,
      "accuracy":6.467384207038868,
      "latitude":-22.448562385995793,
      "altitude":441.0697250366211,
      "heading":-1}
    });

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão Negada',
            'A permissão para acessar a localização foi negada. Usando localização padrão.'
          );
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível obter a localização.');
        console.error(error);
      }
     
    }

    getCurrentLocation();
  }, []);

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
