import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    message: string;
}

export default function ErrorBanner({ message }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        backgroundColor: 'rgba(220, 38, 38, 0.92)',
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    icon: {
        fontSize: 16,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
        flexShrink: 1,
    },
});
