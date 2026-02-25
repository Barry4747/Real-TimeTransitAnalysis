import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';

import { useVehicles } from '@/hooks/useVehicles';
import VehicleMarker from '@/components/map/VehicleMarker';
import ErrorBanner from '@/components/map/ErrorBanner';
import StatsOverlay from '@/components/map/StatsOverlay';
import MapHeader from '@/components/map/MapHeader';

const WROCLAW_REGION = {
  latitude: 51.107885,
  longitude: 17.038538,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function MapScreen() {
  const { vehicles, error, lastUpdated, isLoading, refresh } = useVehicles();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={WROCLAW_REGION}
        showsUserLocation
        showsCompass={false}
        showsScale={false}
        customMapStyle={darkMapStyle}
      >
        {vehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id ?? vehicle.vehicleId}
            vehicle={vehicle}
          />
        ))}
      </MapView>

      <MapHeader />

      {error && <ErrorBanner message={error} />}

      <StatsOverlay
        count={vehicles.length}
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
});

/**
 * Dark "Aubergine" style for Google Maps.
 * Generated via: https://mapstyle.withgoogle.com
 */
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#64779e' }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#4b6878' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry.stroke', stylers: [{ color: '#334e87' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#023e58' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6f9ba5' }] },
  { featureType: 'poi', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#023e58' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#3C7680' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
  { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2c6675' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#255763' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#b0d5ce' }] },
  { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: '#023747' }] },
  { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#98a5be' }] },
  { featureType: 'transit', elementType: 'labels.text.stroke', stylers: [{ color: '#1d2c4d' }] },
  { featureType: 'transit.line', elementType: 'geometry.fill', stylers: [{ color: '#283d6a' }] },
  { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#3a4762' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4e6d70' }] },
];
