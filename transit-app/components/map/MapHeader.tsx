import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
    title?: string;
}

export default function MapHeader({ title = 'Wrocław Transit' }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.dot} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.live}>LIVE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 56,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(15, 15, 30, 0.88)',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        zIndex: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4ade80',
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
    },
    title: {
        color: '#f1f5f9',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.2,
    },
    live: {
        color: '#4ade80',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginLeft: 2,
    },
});
