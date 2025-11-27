import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DashboardMetric, dashboardPalette } from '@/constants/dashboard';

type Props = {
  metric: DashboardMetric;
};

export function MetricCard({ metric }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBadge, { backgroundColor: metric.tintBackground }]}>
        <Ionicons name={metric.icon} size={20} color={metric.tint} />
      </View>
      <Text style={styles.label}>{metric.label}</Text>
      <Text style={styles.value}>{metric.value}</Text>
      <Text style={styles.delta}>{metric.delta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    flex: 1,
    minWidth: 150,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    color: dashboardPalette.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
  delta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
});
