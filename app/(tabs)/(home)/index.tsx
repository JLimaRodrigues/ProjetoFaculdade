import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

  const DEFAULT_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<Location.LocationObject | undefined>(undefined);

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

  const handleMapPress = (event: any) => {
    const { nativeEvent } = event;
    const { coordinate }  = nativeEvent;

    setSelectedLocation({
      coords: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      }
    } as Location.LocationObject);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location 
          ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
          : DEFAULT_REGION}
        onPress={handleMapPress}
      >
        {location && (
          <Marker 
            style={styles.markerCircle}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            description={"Localização do Usuário"}
          >
            <Ionicons name={'person-sharp'} style={styles.markerIcon} size={20} />
          </Marker>
        )}
        {selectedLocation && (
          <Marker 
            coordinate={{
              latitude: selectedLocation.coords.latitude,
              longitude: selectedLocation.coords.longitude
            }}
            title='Local Selecionado'
          />
        )}
      </MapView>
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
  markerCircle: {
    backgroundColor: 'green',
    borderRadius: 30 / 2, // Ajustado para um círculo perfeito
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Adiciona sombra para um efeito 3D
  },
  markerIcon: {
    color: 'white',
  },
});
