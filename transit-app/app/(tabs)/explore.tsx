import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_BASE } from '@/services/vehicleService';

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Real-Time Transit</Text>
        <Text style={styles.subtitle}>Wrocław MPK Tracker</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>API Endpoint</Text>
          <Text style={styles.cardValue}>{API_BASE}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Refresh Interval</Text>
          <Text style={styles.cardValue}>Every 10 seconds</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Data Source</Text>
          <Text style={styles.cardValue}>QueryApiService (.NET)</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Tap any vehicle marker on the map to see the line number, vehicle ID and coordinates.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: '#60a5fa',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 4,
  },
  cardLabel: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardValue: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
    marginTop: 8,
  },
  infoText: {
    color: '#93c5fd',
    fontSize: 14,
    lineHeight: 21,
  },
});
