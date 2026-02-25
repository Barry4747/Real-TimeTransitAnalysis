import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

interface Props {
    count: number;
    lastUpdated: Date | null;
    isLoading: boolean;
    onRefresh: () => void;
}

export default function StatsOverlay({ count, lastUpdated, isLoading, onRefresh }: Props) {
    const timeStr = lastUpdated
        ? lastUpdated.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : '—';

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.count}>{count}</Text>
                <Text style={styles.label}>vehicles</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.center}>
                <Text style={styles.updatedLabel}>Last update</Text>
                <Text style={styles.updatedTime}>{timeStr}</Text>
            </View>

            <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh} activeOpacity={0.7}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.refreshIcon}>↻</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 44,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(15, 15, 30, 0.88)',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    left: {
        alignItems: 'center',
    },
    count: {
        color: '#60a5fa',
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 26,
    },
    label: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    divider: {
        width: 1,
        height: 32,
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    center: {
        flex: 1,
    },
    updatedLabel: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    updatedTime: {
        color: '#e2e8f0',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 1,
    },
    refreshBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    refreshIcon: {
        color: '#60a5fa',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22,
    },
});
