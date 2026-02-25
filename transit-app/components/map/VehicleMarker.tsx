import React, { memo } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { Vehicle } from '@/services/vehicleService';

interface Props {
    vehicle: Vehicle;
}

function VehicleMarker({ vehicle }: Props) {
    const key = vehicle.id ?? vehicle.vehicleId;

    return (
        <Marker
            key={key}
            coordinate={{ latitude: vehicle.lat, longitude: vehicle.lon }}
            anchor={{ x: 0.5, y: 0.5 }}
        >
            {/* Custom pill badge showing line number */}
            <View style={styles.badge}>
                <Text style={styles.badgeText} numberOfLines={1}>
                    {vehicle.line}
                </Text>
            </View>

            {/* Callout shown on tap */}
            <Callout tooltip>
                <View style={styles.callout}>
                    <Text style={styles.calloutLine}>Line {vehicle.line}</Text>
                    <Text style={styles.calloutMeta}>ID: {vehicle.vehicleId}</Text>
                    <Text style={styles.calloutMeta}>
                        {vehicle.lat.toFixed(5)}, {vehicle.lon.toFixed(5)}
                    </Text>
                </View>
            </Callout>
        </Marker>
    );
}

export default memo(VehicleMarker);

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#1D72F0',
        borderRadius: 10,
        paddingHorizontal: 7,
        paddingVertical: 3,
        minWidth: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 4,
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    callout: {
        backgroundColor: '#1a1a2e',
        borderRadius: 12,
        padding: 12,
        minWidth: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    calloutLine: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 4,
    },
    calloutMeta: {
        color: '#a0aec0',
        fontSize: 12,
        marginTop: 2,
    },
});
