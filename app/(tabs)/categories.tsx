import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBar } from '@/components/dashboard/HeaderBar';
import { NavRail } from '@/components/dashboard/NavRail';
import { dashboardPalette } from '@/constants/dashboard';

const categories = [
  { id: 'fish', name: 'Fish' },
  { id: 'vaccine', name: 'Vaccine' },
];

export default function CategoriesScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('categories')) return 'categories';
      if (pathname?.includes('packages')) return 'packages';
      if (pathname?.includes('manage')) return 'manage';
      if (pathname?.includes('products')) return 'products';
      if (pathname?.includes('register')) return 'register';
      return 'dashboard';
    },
    [pathname]
  );

  const handleNavSelect = (_key: string, path?: string) => {
    if (path) {
      router.replace(path as any);
      return;
    }
    router.replace('/(tabs)');
  };

  const navRailExpanded = useMemo(
    () => (
      <NavRail
        activeKey={activeKey}
        orientation="vertical"
        collapsed={false}
        onSelect={handleNavSelect}
      />
    ),
    [activeKey]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dashboardPalette.background }}>
      <View style={styles.container}>
        <HeaderBar onMenuPress={() => setNavOpen(true)} />

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Product Categories</Text>
            <View style={styles.headerActions}>
              <TextInput
                placeholder="Search categories..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
              <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.primaryText}>Create Category</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listCard}>
            <View style={styles.listHeader}>
              <Text style={styles.headerText}>Category</Text>
              <Text style={styles.headerText}>Actions</Text>
            </View>
            {categories.map((cat, idx) => (
              <View key={cat.id} style={[styles.row, idx % 2 === 1 && styles.rowAlt]}>
                <Text style={styles.rowText}>{cat.name}</Text>
                <View style={styles.actionsCell}>
                  <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {navOpen && (
          <View style={styles.navOverlay}>
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setNavOpen(false)} />
            <View style={styles.navModal}>
              <View style={styles.navModalHeader}>
                <Text style={styles.navModalTitle}>Navigation</Text>
                <TouchableOpacity onPress={() => setNavOpen(false)} hitSlop={8}>
                  <Ionicons name="close" size={20} color={dashboardPalette.textSecondary} />
                </TouchableOpacity>
              </View>
              {navRailExpanded}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: dashboardPalette.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minWidth: 180,
    color: dashboardPalette.textPrimary,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: dashboardPalette.brand,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
    overflow: 'hidden',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f8fafc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  headerText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowAlt: {
    backgroundColor: '#f9fafb',
  },
  rowText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  viewButtonText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  editButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  navOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navModal: {
    marginTop: 20,
    marginLeft: 14,
    marginRight: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    width: 240,
    shadowColor: '#0f172a',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  navModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: dashboardPalette.border,
    marginBottom: 8,
  },
  navModalTitle: {
    fontWeight: '700',
    color: dashboardPalette.textPrimary,
    fontSize: 15,
  },
});
