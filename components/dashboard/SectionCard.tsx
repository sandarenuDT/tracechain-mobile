import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { dashboardPalette } from '@/constants/dashboard';

type Props = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SectionCard({ title, children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  title: {
    color: dashboardPalette.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    gap: 10,
  },
});
