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
  useWindowDimensions,
} from 'react-native';

import { HeaderBar } from '@/components/dashboard/HeaderBar';
import { NavRail } from '@/components/dashboard/NavRail';
import { dashboardPalette } from '@/constants/dashboard';

const productRows = [
  {
    id: 'p1',
    name: 'Malaria Vaccine',
    note: 'Keep in temperature condition',
    category: 'Vaccine',
    range: '-5C - 5C',
    updated: 'Not available',
  },
  {
    id: 'p2',
    name: 'Chinoform',
    note: 'keep temperature',
    category: 'Vaccine',
    range: '0C - 10C',
    updated: '18/11/2025, 19:44:00',
  },
  {
    id: 'p3',
    name: 'Pfizer',
    note: 'sdsdsssccsvdfv',
    category: 'Vaccine',
    range: '2C - 8C',
    updated: 'Not available',
  },
];

export default function ProductsScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('packages')) return 'packages';
      if (pathname?.includes('categories')) return 'categories';
      if (pathname?.includes('manage')) return 'manage';
      if (pathname?.includes('shipments')) return 'shipments';
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
            <View>
              <Text style={styles.title}>Products</Text>
            </View>
            <View style={styles.actionsRow}>
              <TextInput
                placeholder="Search products..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
              <TouchableOpacity activeOpacity={0.9} style={styles.secondaryButton}>
                <Text style={styles.secondaryText}>All categories</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.primaryText}>Create Product</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isWide ? (
            <View style={styles.tableCard}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Product</Text>
                <Text style={[styles.th, { flex: 1 }]}>Category</Text>
                <Text style={[styles.th, { flex: 1.2 }]}>Temperature range</Text>
                <Text style={[styles.th, { flex: 1.2 }]}>Updated</Text>
                <Text style={[styles.th, { width: 160, textAlign: 'center' }]}>Actions</Text>
              </View>
              {productRows.map((row, idx) => (
                <View key={row.id} style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
                  <View style={[styles.tdContainer, { flex: 2 }]}>
                    <Text style={styles.productName}>{row.name}</Text>
                    <Text style={styles.productNote}>{row.note}</Text>
                  </View>
                  <Text style={[styles.tdText, { flex: 1 }]}>{row.category}</Text>
                  <Text style={[styles.tdText, { flex: 1.2 }]}>{row.range}</Text>
                  <Text style={[styles.tdText, { flex: 1.2 }]}>{row.updated}</Text>
                  <View style={[styles.actionsCell, { width: 160 }]}>
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
          ) : (
            <View style={styles.cardsStack}>
              {productRows.map((row) => (
                <View key={row.id} style={styles.productCard}>
                  <Text style={styles.productName}>{row.name}</Text>
                  <Text style={styles.productNote}>{row.note}</Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Category</Text>
                    <Text style={styles.cardValue}>{row.category}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Temperature range</Text>
                    <Text style={styles.cardValue}>{row.range}</Text>
                  </View>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Updated</Text>
                    <Text style={styles.cardValue}>{row.updated}</Text>
                  </View>
                  <View style={styles.cardActions}>
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
          )}
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
    backgroundColor: dashboardPalette.background,
    gap: 12,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  subtitle: {
    color: dashboardPalette.textSecondary,
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: dashboardPalette.border,
  },
  secondaryText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
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
  tableCard: {
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
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
    gap: 8,
  },
  th: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
    fontSize: 13,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  tdContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  tdText: {
    color: dashboardPalette.textPrimary,
    fontSize: 13,
  },
  productName: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  productNote: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cardsStack: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    padding: 14,
    gap: 10,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardLabel: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    fontSize: 12,
  },
  cardValue: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
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
