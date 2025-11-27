import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Modal,
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

const packagesData = [
  {
    id: 'Package 39804b1b-da40-4de6-ba67-15e062921814',
    product: 'Malaria Vaccine',
    batch: 'Batch 4209e198-022a-470d-b55f-056d88a7700c',
    quantity: 50,
    status: 'PACKAGE_ALLOCATED',
    sensors: 'Open-Close Sensor, GPS, Temperature',
    qr: 'PKG|39804b1b|4209e198|GPS|Temp|OpenClose',
  },
  {
    id: 'Package f5e741ad-b949-4dbd-953d-1828264b46c4',
    product: 'Chinoform',
    batch: 'Batch 75dc3937-b80d-4e8f-9031-c34d077daffd',
    quantity: 50,
    status: 'PACKAGE_ALLOCATED',
    sensors: 'Open-Close Sensor, GPS, Temperature',
    qr: 'PKG|f5e741ad|75dc3937|GPS|Temp|OpenClose',
  },
  {
    id: 'Package 0adeba2d-d6d3-41ca-a858-12e37845bf96',
    product: 'Pfizer',
    batch: 'Batch 9b971814-20ce-4b26-ab67-781ab355805c',
    quantity: 50,
    status: 'PACKAGE_ALLOCATED',
    sensors: 'GPS, Open-Close Sensor, Temperature',
    qr: 'PKG|0adeba2d|9b971814|GPS|Temp|OpenClose',
  },
  {
    id: 'Package b9318c89-683e-4ad6-9b19-962647c4ead9',
    product: 'Chinoform',
    batch: 'Batch 75dc3937-b80d-4e8f-9031-c34d077daffd',
    quantity: 50,
    status: 'PACKAGE_ALLOCATED',
    sensors: 'Open-Close Sensor, Temperature, GPS',
    qr: 'PKG|b9318c89|75dc3937|GPS|Temp|OpenClose',
  },
];

export default function PackagesScreen() {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const [navOpen, setNavOpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const activeKey = useMemo(
    () => {
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

  const renderRow = (pkg: typeof packagesData[0], idx: number) => (
    <View key={pkg.id} style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
      <View style={[styles.tdContainer, { flex: 2 }]}>
        <Text style={styles.packageTitle}>{pkg.id}</Text>
        <Text style={styles.packageMeta}>
          Product: {pkg.product} - {pkg.batch}
        </Text>
      </View>
      <Text style={[styles.tdText, { width: 70, textAlign: 'center' }]}>{pkg.quantity}</Text>
      <Text style={[styles.tdText, { width: 140 }]}>{pkg.status}</Text>
      <View style={[styles.tdContainer, { flex: 1 }]}>
        <Text style={styles.tdText}>{pkg.sensors}</Text>
      </View>
      <View style={styles.actionsCell}>
        <TouchableOpacity activeOpacity={0.9} style={styles.viewButton} onPress={() => setSelectedQR(pkg.qr)}>
          <Text style={styles.viewButtonText}>View QR</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCard = (pkg: typeof packagesData[0]) => (
    <View key={pkg.id} style={styles.packageCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.packageTitle}>{pkg.id}</Text>
        <Text style={styles.packageMeta}>
          Product: {pkg.product} - {pkg.batch}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Quantity</Text>
        <Text style={styles.cardValue}>{pkg.quantity}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Status</Text>
        <Text style={styles.cardValue}>{pkg.status}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Sensors</Text>
        <Text style={[styles.cardValue, { textAlign: 'left' }]}>{pkg.sensors}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity activeOpacity={0.9} style={styles.viewButton} onPress={() => setSelectedQR(pkg.qr)}>
          <Text style={styles.viewButtonText}>View QR</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dashboardPalette.background }}>
      <View style={styles.container}>
        <HeaderBar onMenuPress={() => setNavOpen(true)} />

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Packages</Text>
            <View style={styles.headerActions}>
              <TextInput
                placeholder="Search packages..."
                placeholderTextColor="#94a3b8"
                style={styles.searchInput}
              />
              <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.primaryText}>Create Package</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isWide ? (
            <View style={styles.tableCard}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2 }]}>Package</Text>
                <Text style={[styles.th, { width: 80, textAlign: 'center' }]}>Quantity</Text>
                <Text style={[styles.th, { width: 140 }]}>Status</Text>
                <Text style={[styles.th, { flex: 1 }]}>Sensors</Text>
                <Text style={[styles.th, { width: 200, textAlign: 'right' }]}>Actions</Text>
              </View>
              {packagesData.map(renderRow)}
            </View>
          ) : (
            <View style={styles.cardsStack}>{packagesData.map(renderCard)}</View>
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

        <Modal visible={!!selectedQR} transparent animationType="fade">
          <View style={styles.qrOverlay}>
            <View style={styles.qrModal}>
              <View style={styles.qrHeader}>
                <Text style={styles.qrTitle}>Package QR</Text>
                <TouchableOpacity onPress={() => setSelectedQR(null)} hitSlop={8}>
                  <Ionicons name="close" size={20} color={dashboardPalette.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={styles.qrBox}>
                <Text style={styles.qrPlaceholder}>[ QR Image ]</Text>
              </View>
              <Text style={styles.qrMeta}>Scan to track product</Text>
              <Text style={styles.qrCode}>{selectedQR}</Text>
            </View>
          </View>
        </Modal>
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
    paddingVertical: 14,
    gap: 8,
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  tdContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  tdText: {
    color: dashboardPalette.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  packageTitle: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  packageMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    width: 200,
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
    fontSize: 12,
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
    fontSize: 12,
  },
  cardsStack: {
    gap: 12,
  },
  packageCard: {
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
    gap: 6,
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
  qrOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrModal: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  qrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  qrBox: {
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  qrPlaceholder: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
  },
  qrMeta: {
    textAlign: 'center',
    color: dashboardPalette.textSecondary,
  },
  qrCode: {
    fontSize: 12,
    color: dashboardPalette.textSecondary,
  },
});
