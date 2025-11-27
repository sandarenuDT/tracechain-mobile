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

const batches = [
  {
    id: 'Batch 9b971814-20ce-4b26-ab67-781ab355805c',
    product: 'Pfizer',
    facility: 'Plant B',
    quantity: '2000',
    window: '28 Nov 2025 - 6:48 to 1 Dec 2025 - 6:48',
    expiry: '11 Apr 2026 - 5:30',
  },
  {
    id: 'Batch 75dc3937-b80d-4e8f-9031-c34d077daffd',
    product: 'Chinoform',
    facility: 'Plant B',
    quantity: '5000',
    window: '29 Nov 2025 - 6:47 to 6 Dec 2025 - 6:47',
    expiry: '10 Jan 2026 - 5:30',
  },
  {
    id: 'Batch 4209e198-022a-470d-b55f-056d88a7700c',
    product: 'Malaria Vaccine',
    facility: 'Plant A',
    quantity: '1000',
    window: '19 Nov 2025 - 6:45 to 26 Nov 2025 - 6:45',
    expiry: '6 Dec 2025 - 5:30',
  },
  {
    id: 'Batch 1e068523-e174-418b-ad6c-2baddb631881',
    product: 'Pfizer',
    facility: 'Plant A',
    quantity: '5000',
    window: '29 Oct 2025 - 14:01 to 6 Nov 2025 - 14:01',
    expiry: '30 Oct 2025 - 5:30',
  },
];

export default function ManageScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [navOpen, setNavOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('manage')) return 'manage';
      if (pathname?.includes('packages')) return 'packages';
      if (pathname?.includes('categories')) return 'categories';
      if (pathname?.includes('shipments')) return 'shipments';
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

  const toggleDetails = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
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
            <Text style={styles.title}>Batches</Text>
            <View style={styles.headerActions}>
              <TextInput
                placeholder="Search batches..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
              <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.primaryText}>Create Batch</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isWide ? (
            <View style={styles.tableCard}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Batch</Text>
                <Text style={[styles.th, { flex: 1 }]}>Product</Text>
                <Text style={[styles.th, { flex: 1 }]}>Facility</Text>
                <Text style={[styles.th, { flex: 1 }]}>Quantity</Text>
                <Text style={[styles.th, { width: 160, textAlign: 'center' }]}>Actions</Text>
              </View>

              {batches.map((batch, idx) => (
                <View key={batch.id}>
                  <View style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
                    <View style={[styles.tdContainer, { flex: 2 }]}>
                      <Text style={styles.batchId}>{batch.id}</Text>
                      <Text style={styles.batchMeta}>Tap details to expand</Text>
                    </View>
                    <View style={[styles.tdContainer, { flex: 1 }]}>
                      <Text style={styles.tdText}>{batch.product}</Text>
                    </View>
                    <View style={[styles.tdContainer, { flex: 1 }]}>
                      <View style={styles.pillMuted}>
                        <Ionicons name="business-outline" size={14} color={dashboardPalette.textSecondary} />
                        <Text style={styles.pillText}>{batch.facility}</Text>
                      </View>
                    </View>
                    <View style={[styles.tdContainer, { flex: 1 }]}>
                      <View style={styles.pillInfo}>
                        <Ionicons name="cube-outline" size={14} color={dashboardPalette.brand} />
                        <Text style={styles.pillTextStrong}>{batch.quantity}</Text>
                      </View>
                    </View>
                    <View style={[styles.actionsCell, { width: 170 }]}>
                      <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
                        <Text style={styles.viewButtonText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => toggleDetails(batch.id)}
                        style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>
                          {expanded[batch.id] ? 'Hide' : 'Details'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {expanded[batch.id] && (
                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Production window</Text>
                        <Text style={styles.detailValue}>{batch.window}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Expiry</Text>
                        <Text style={styles.detailValue}>{batch.expiry}</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.cardsStack}>
              {batches.map((batch) => (
                <View key={batch.id} style={styles.batchCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.batchId}>{batch.id}</Text>
                      <Text style={styles.batchMeta}>Auto-generated - Traceable QR</Text>
                    </View>
                    <View style={styles.chipInfo}>
                      <Ionicons name="cube-outline" size={14} color={dashboardPalette.brand} />
                      <Text style={styles.chipInfoText}>{batch.quantity}</Text>
                    </View>
                  </View>

                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Product</Text>
                    <Text style={styles.cardValue}>{batch.product}</Text>
                  </View>

                  <View style={styles.cardRow}>
                    <Text style={styles.cardLabel}>Facility</Text>
                    <View style={styles.pillMuted}>
                      <Ionicons name="business-outline" size={14} color={dashboardPalette.textSecondary} />
                      <Text style={styles.pillText}>{batch.facility}</Text>
                    </View>
                  </View>

                  {expanded[batch.id] && (
                    <>
                      <View style={styles.cardRow}>
                        <Text style={styles.cardLabel}>Production window</Text>
                        <Text style={styles.cardValue}>{batch.window}</Text>
                      </View>

                      <View style={styles.cardRow}>
                        <Text style={styles.cardLabel}>Expiry</Text>
                        <View style={styles.pillWarn}>
                          <Ionicons name="time-outline" size={14} color="#b45309" />
                          <Text style={styles.pillTextStrong}>{batch.expiry}</Text>
                        </View>
                      </View>
                    </>
                  )}

                  <View style={styles.cardActions}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={styles.detailsButton}
                      onPress={() => toggleDetails(batch.id)}>
                      <Text style={styles.detailsButtonText}>
                        {expanded[batch.id] ? 'Hide' : 'Details'}
                      </Text>
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
    paddingVertical: 12,
    gap: 8,
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  detailRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#f8fafc',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  detailLabel: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    fontSize: 12,
  },
  detailValue: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },
  tdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tdText: {
    color: dashboardPalette.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  batchId: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  batchMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    backgroundColor: '#fff',
  },
  detailsButtonText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  cardsStack: {
    gap: 12,
  },
  batchCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e5edff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipInfoText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
    fontSize: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    textAlign: 'right',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  pillMuted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f1f5f9',
  },
  pillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e5edff',
  },
  pillWarn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fff7ed',
  },
  pillText: {
    color: dashboardPalette.textSecondary,
    fontWeight: '600',
    fontSize: 12,
  },
  pillTextStrong: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
    fontSize: 12,
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
