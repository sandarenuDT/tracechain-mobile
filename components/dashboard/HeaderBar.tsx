import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { dashboardPalette } from '@/constants/dashboard';

type Props = {
  onMenuPress?: () => void;
};

export function HeaderBar({ onMenuPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.brandBlock}>
        <View style={styles.brandIcon}>
          <Ionicons name="cube-outline" size={18} color="#fff" />
        </View>
        <View>
          <Text style={styles.brandTitle}>TrackChain</Text>
          <Text style={styles.brandSubtitle}>Supply Chain DApp</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {onMenuPress && (
          <TouchableOpacity style={styles.menuButton} onPress={onMenuPress} activeOpacity={0.9}>
            <Ionicons name="menu" size={18} color={dashboardPalette.textPrimary} />
          </TouchableOpacity>
        )}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitial}>P</Text>
          </View>
          <View>
            <Text style={styles.userName}>Pfizer Manufacturing</Text>
            <Text style={styles.userRole}>Manufacturer</Text>
          </View>
        </View>

        <View style={styles.iconPill}>
          <Ionicons name="notifications-outline" size={18} color={dashboardPalette.textPrimary} />
        </View>
        <View style={styles.iconPill}>
          <Ionicons name="settings-outline" size={18} color={dashboardPalette.textPrimary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef1f7',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    backgroundColor: dashboardPalette.brand,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: dashboardPalette.textPrimary,
  },
  brandSubtitle: {
    fontSize: 12,
    color: dashboardPalette.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    flexShrink: 0,
    flexWrap: 'wrap',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: dashboardPalette.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInitial: {
    color: '#fff',
    fontWeight: '700',
  },
  userName: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  userRole: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  iconPill: {
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
});
