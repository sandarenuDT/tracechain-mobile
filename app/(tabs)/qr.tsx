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
  useWindowDimensions,
} from 'react-native';

import { HeaderBar } from '@/components/dashboard/HeaderBar';
import { NavRail } from '@/components/dashboard/NavRail';
import { dashboardPalette } from '@/constants/dashboard';

type ScanPayload = {
  code: string;
  product: string;
  batch: string;
  status: 'Validated' | 'Rejected';
  timestamp: string;
  location: string;
};

type Verification = {
  id: string;
  summary: string;
  status: 'Validated' | 'Rejected';
  time: string;
  location: string;
};

const quickSteps = [
  {
    title: 'Quick flow',
    description: 'Point the camera at the QR label or paste the string manually. Works in seconds.',
  },
  {
    title: 'Offline ready',
    description: 'Captures the payload locally when signal is weak and syncs when back online.',
  },
  {
    title: 'Built on blockchain',
    description: 'Every verification is anchored to an immutable ledger for end-to-end trust.',
  },
];

export default function QrScannerScreen() {
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [lastScan, setLastScan] = useState<ScanPayload | null>(null);
  const [recentVerifications, setRecentVerifications] = useState<Verification[]>([
    {
      id: 'VR-3021',
      summary: 'Payload VR-3021 accepted at cold chain intake',
      status: 'Validated',
      time: '2m ago',
      location: 'Dock 3 · Berlin',
    },
    {
      id: 'VR-3018',
      summary: 'Signature confirmed for batch PF-2024-001',
      status: 'Validated',
      time: '14m ago',
      location: 'Edge reader A · Hamburg',
    },
    {
      id: 'VR-3012',
      summary: 'Checksum mismatch flagged for payload MOD-2024-002',
      status: 'Rejected',
      time: '29m ago',
      location: 'Tablet · Munich',
    },
  ]);

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('qr')) return 'qr';
      if (pathname?.includes('manage')) return 'manage';
      if (pathname?.includes('packages')) return 'packages';
      if (pathname?.includes('categories')) return 'categories';
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

  const handleLaunchScan = () => {
    const now = new Date();
    const payload: ScanPayload = {
      code: `TC-${now.getTime().toString().slice(-6)}`,
      product: 'mRNA-1273 Booster',
      batch: 'PF-2024-001',
      status: 'Validated',
      timestamp: now.toLocaleString(),
      location: 'Dock scanner · Berlin',
    };

    setLastScan(payload);
    setRecentVerifications((prev) => [
      {
        id: payload.code,
        summary: `Payload ${payload.code} accepted`,
        status: payload.status,
        time: 'just now',
        location: payload.location,
      },
      ...prev,
    ].slice(0, 5));
  };

  const isStacked = width < 1040;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dashboardPalette.background }}>
      <View style={styles.container}>
        <HeaderBar onMenuPress={() => setNavOpen(true)} />
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.trustBadge}>
              <Ionicons name="shield-checkmark-outline" size={16} color={dashboardPalette.brand} />
              <Text style={styles.trustBadgeText}>Trusted QR Validation</Text>
            </View>
            <Text style={styles.heroTitle}>All-in-one QR verification hub</Text>
            <Text style={styles.heroSubtitle}>
              Scan encrypted payloads, confirm authenticity, and keep handovers moving. Built for every role, optimized for the devices your teams already use.
            </Text>
          </View>

          <View style={[styles.grid, isStacked && styles.gridStacked]}>
            <View style={styles.stepCard}>
              <Text style={styles.stepLabel}>STEP 1</Text>
              <Text style={styles.stepTitle}>Scan encrypted QR</Text>
              <Text style={styles.stepCopy}>
                Works across mobile and desktop. Submit encrypted data to validate shipment movement instantly.
              </Text>

              <View style={styles.scanPanel}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={styles.scanHeading}>Ready to scan?</Text>
                  <Text style={styles.scanSub}>Tap the button and point your camera at the encrypted QR label.</Text>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={styles.launchButton} onPress={handleLaunchScan}>
                  <Ionicons name="scan-outline" size={18} color="#fff" />
                  <Text style={styles.launchButtonText}>Launch scanner</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.scanResult, !lastScan && styles.scanResultEmpty]}>
                {lastScan ? (
                  <>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultLabel}>Encrypted payload</Text>
                      <View
                        style={[
                          styles.statusPill,
                          lastScan.status === 'Validated'
                            ? styles.statusPillSuccess
                            : styles.statusPillDanger,
                        ]}>
                        <Ionicons
                          name={lastScan.status === 'Validated' ? 'checkmark-circle' : 'alert-circle'}
                          size={14}
                          color={lastScan.status === 'Validated' ? '#166534' : '#b91c1c'}
                        />
                        <Text
                          style={[
                            styles.statusText,
                            lastScan.status === 'Validated' ? styles.statusTextSuccess : styles.statusTextDanger,
                          ]}>
                          {lastScan.status}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.resultRow}>
                      <Ionicons name="qr-code-outline" size={18} color={dashboardPalette.textSecondary} />
                      <Text style={styles.resultValue}>{lastScan.code}</Text>
                    </View>
                    <View style={styles.resultRow}>
                      <Ionicons name="cube-outline" size={18} color={dashboardPalette.textSecondary} />
                      <Text style={styles.resultValue}>{lastScan.product}</Text>
                    </View>
                    <View style={styles.resultMetaRow}>
                      <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <Ionicons name="pricetag-outline" size={14} color={dashboardPalette.textSecondary} />
                        <Text style={styles.resultMeta}>Batch {lastScan.batch}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <Ionicons name="time-outline" size={14} color={dashboardPalette.textSecondary} />
                        <Text style={styles.resultMeta}>{lastScan.timestamp}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                      <Ionicons name="location-outline" size={16} color={dashboardPalette.textSecondary} />
                      <Text style={styles.resultMeta}>{lastScan.location}</Text>
                    </View>
                  </>
                ) : (
                  <Text style={styles.emptyState}>
                    No scans yet. Your encrypted payload will appear here after the first scan.
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.stepCard}>
              <Text style={styles.stepLabel}>STEP 3</Text>
              <Text style={styles.stepTitle}>Recent verifications</Text>
              <Text style={styles.stepCopy}>Quick glance at the latest backend responses.</Text>
              <Text style={styles.timelineLabel}>Response timeline</Text>

              <View style={styles.timeline}>
                {recentVerifications.map((item) => (
                  <View key={item.id} style={styles.timelineRow}>
                    <View
                      style={[
                        styles.timelineDot,
                        item.status === 'Validated' ? styles.timelineDotSuccess : styles.timelineDotDanger,
                      ]}
                    />
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text style={styles.timelineSummary}>{item.summary}</Text>
                      <Text style={styles.timelineMeta}>{item.location}</Text>
                    </View>
                    <Text style={styles.timelineTime}>{item.time}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.flowCard}>
            <View style={{ gap: 6 }}>
              <Text style={styles.flowHeading}>Quick flow</Text>
              <Text style={styles.flowSub}>Designed so field teams can operate confidently in seconds.</Text>
            </View>
            <View style={styles.flowSteps}>
              {quickSteps.map((step, idx) => (
                <View key={step.title} style={styles.flowStep}>
                  <View style={styles.flowBadge}>
                    <Text style={styles.flowBadgeText}>{idx + 1}</Text>
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.flowStepTitle}>{step.title}</Text>
                    <Text style={styles.flowStepDesc}>{step.description}</Text>
                  </View>
                </View>
              ))}
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
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 14,
    paddingBottom: 24,
  },
  hero: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    gap: 8,
  },
  trustBadge: {
    alignSelf: 'flex-start',
    backgroundColor: dashboardPalette.brandMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustBadgeText: {
    color: dashboardPalette.brand,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  heroSubtitle: {
    color: dashboardPalette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridStacked: {
    flexDirection: 'column',
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  stepLabel: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    letterSpacing: 1.6,
    fontSize: 12,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  stepCopy: {
    color: dashboardPalette.textSecondary,
    lineHeight: 20,
  },
  scanPanel: {
    borderWidth: 1,
    borderColor: '#d6e3ff',
    backgroundColor: '#f6f9ff',
    borderStyle: 'dashed',
    padding: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scanHeading: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 15,
  },
  scanSub: {
    color: dashboardPalette.textSecondary,
    fontSize: 13,
  },
  launchButton: {
    backgroundColor: dashboardPalette.brand,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  launchButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  scanResult: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    gap: 10,
  },
  scanResultEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusPillSuccess: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  statusPillDanger: {
    backgroundColor: '#fef2f2',
    borderColor: '#f87171',
  },
  statusText: {
    fontWeight: '800',
    fontSize: 12,
  },
  statusTextSuccess: {
    color: '#166534',
  },
  statusTextDanger: {
    color: '#991b1b',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultValue: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
  },
  resultMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  emptyState: {
    color: dashboardPalette.textSecondary,
    textAlign: 'center',
    fontSize: 13,
  },
  timelineLabel: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  timeline: {
    gap: 10,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 4,
  },
  timelineDotSuccess: {
    backgroundColor: '#22c55e',
  },
  timelineDotDanger: {
    backgroundColor: '#ef4444',
  },
  timelineSummary: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    lineHeight: 18,
  },
  timelineMeta: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  timelineTime: {
    color: dashboardPalette.textSecondary,
    fontWeight: '700',
    fontSize: 12,
  },
  flowCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: dashboardPalette.border,
    gap: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  flowHeading: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
    fontSize: 18,
  },
  flowSub: {
    color: dashboardPalette.textSecondary,
  },
  flowSteps: {
    gap: 10,
  },
  flowStep: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  flowBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowBadgeText: {
    color: '#1d4ed8',
    fontWeight: '800',
  },
  flowStepTitle: {
    color: dashboardPalette.textPrimary,
    fontWeight: '800',
  },
  flowStepDesc: {
    color: dashboardPalette.textSecondary,
    lineHeight: 18,
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
