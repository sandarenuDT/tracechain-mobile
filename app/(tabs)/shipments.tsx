import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { HeaderBar } from '@/components/dashboard/HeaderBar';
import { NavRail } from '@/components/dashboard/NavRail';
import { dashboardPalette } from '@/constants/dashboard';

const shipments = [
  { id: 'ef182ee0-515e-48f6-9eb2-9161f21c020d', to: '140c9326-86fa-49cd-b98d-270239270d80', items: 3, status: 'PENDING', legs: 1 },
  { id: 'e3969dbc-899c-42c1-aa42-d8e25da4b339', to: '140c9326-86fa-49cd-b98d-270239270d80', items: 1, status: 'PENDING', legs: 2 },
  { id: '54656c3b-2200-4366-aec8-b7b24b43d132', to: '140c9326-86fa-49cd-b98d-270239270d80', items: 1, status: 'IN_TRANSIT', legs: 2 },
];

const packagesData = [
  { id: '39804b1b-da40-4de6-ba67-15e062921814', qty: 50 },
  { id: 'f5e741ad-b949-4dbd-953d-1828264b46c4', qty: 50 },
  { id: '0adeba2d-d6d3-41ca-a858-12e37845bf96', qty: 50 },
  { id: 'b9318c89-683e-4ad6-9b19-962647c4ead9', qty: 50 },
  { id: 'f27f0562-6123-4e4f-9a4a-fcef58edb012', qty: 50 },
];

export default function ShipmentsScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('shipments')) return 'shipments';
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

  const renderStatus = (status: string) => {
    const color =
      status === 'IN_TRANSIT' ? '#16a34a' : '#15803d';
    return (
      <View style={[styles.statusChip, { backgroundColor: color + '22', borderColor: color }]}>
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dashboardPalette.background }}>
      <View style={styles.container}>
        <HeaderBar onMenuPress={() => setNavOpen(true)} />

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Product Shipments</Text>
              <Text style={styles.subtitle}>Transfer custody across the supply chain</Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton}>
              <Ionicons name="add" size={16} color="#fff" />
              <Text style={styles.primaryText}>New Shipment</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.split}>
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>My Shipments</Text>
              <View style={styles.shipmentList}>
                {shipments.map((s) => (
                  <View key={s.id} style={styles.shipmentCard}>
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.shipmentId}>Shipment: {s.id}</Text>
                      <Text style={styles.shipmentMeta}>To: {s.to}</Text>
                      <Text style={styles.shipmentMeta}>Items: {s.items}</Text>
                      <Text style={styles.shipmentMeta}>Legs: {s.legs}</Text>
                    </View>
                    <View style={styles.shipmentActions}>
                      {renderStatus(s.status)}
                      <View style={styles.actionButtons}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
                          <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Registered Packages</Text>
              <View style={styles.packageList}>
                {packagesData.map((p) => (
                  <View key={p.id} style={styles.packageRow}>
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.packageId}>Package {p.id}</Text>
                      <Text style={styles.packageMeta}>UUID: {p.id}</Text>
                    </View>
                    <View style={styles.qtyChip}>
                      <Text style={styles.qtyText}>Qty {p.qty}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
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
  subtitle: {
    color: dashboardPalette.textSecondary,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  split: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  panel: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    padding: 14,
    gap: 12,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  shipmentList: {
    gap: 10,
  },
  shipmentCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  shipmentId: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  shipmentMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  shipmentActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
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
  statusChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontWeight: '800',
    fontSize: 12,
  },
  packageList: {
    gap: 8,
  },
  packageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  packageId: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  packageMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  qtyChip: {
    backgroundColor: '#e2f3ff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyText: {
    color: '#0f172a',
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
