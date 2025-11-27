import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
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
import { MetricCard } from '@/components/dashboard/MetricCard';
import { NavRail } from '@/components/dashboard/NavRail';
import { SectionCard } from '@/components/dashboard/SectionCard';
import {
  alerts,
  dashboardMetrics,
  dashboardPalette,
  recentProducts,
} from '@/constants/dashboard';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  const activeKey = useMemo(
    () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dashboardPalette.background }}>
      <View style={styles.container}>
        <HeaderBar onMenuPress={() => setNavOpen(true)} />
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.title}>Supply Chain Dashboard</Text>
            <Text style={styles.subtitle}>
              Track and monitor your products across the entire supply chain
            </Text>
          </View>

          <View style={styles.metricsGrid}>
            {dashboardMetrics.map((metric) => (
              <MetricCard key={metric.key} metric={metric} />
            ))}
          </View>

          <View style={styles.sectionGrid}>
            <SectionCard title="Recent Products" style={styles.sectionCard}>
              {recentProducts.map((product, idx) => (
                <View key={`${product.id}-${idx}`} style={styles.productRow}>
                  <View style={styles.productIcon}>
                    <Ionicons name="cube-outline" size={18} color={dashboardPalette.brand} />
                  </View>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={styles.productTitle}>{product.id}</Text>
                    <Text style={styles.productSubtitle}>Tap to view product details</Text>
                  </View>
                  <View style={styles.productActions}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>{product.action}</Text>
                    </TouchableOpacity>
                    <Ionicons name="chevron-forward" size={16} color={dashboardPalette.textSecondary} />
                  </View>
                </View>
              ))}
            </SectionCard>

            <SectionCard title="Recent Alerts" style={styles.sectionCard}>
              {alerts.map((alert) => (
                <TouchableOpacity key={alert.id} activeOpacity={0.9} style={styles.alertRow}>
                  <View
                    style={[
                      styles.alertIcon,
                      alert.severity === 'warning' && { backgroundColor: '#fef3c7' },
                      alert.severity === 'danger' && { backgroundColor: '#fee2e2' },
                      alert.severity === 'success' && { backgroundColor: '#dcfce7' },
                    ]}>
                    <Ionicons
                      name={
                        alert.severity === 'danger'
                          ? 'alert-circle'
                          : alert.severity === 'warning'
                          ? 'warning'
                          : 'checkmark-circle'
                      }
                      size={18}
                      color={
                        alert.severity === 'danger'
                          ? '#ef4444'
                          : alert.severity === 'warning'
                          ? '#d97706'
                          : '#16a34a'
                      }
                    />
                  </View>
                  <View style={{ flex: 1, gap: 6 }}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertTime}>{alert.timestamp}</Text>
                  </View>
                  <View
                    style={[
                      styles.severityPill,
                      alert.severity === 'warning' && { backgroundColor: '#fff7ed', borderColor: '#fbbf24' },
                      alert.severity === 'danger' && { backgroundColor: '#fef2f2', borderColor: '#f87171' },
                      alert.severity === 'success' && { backgroundColor: '#f0fdf4', borderColor: '#4ade80' },
                    ]}>
                    <Text
                      style={[
                        styles.severityText,
                        alert.severity === 'warning' && { color: '#92400e' },
                        alert.severity === 'danger' && { color: '#991b1b' },
                        alert.severity === 'success' && { color: '#166534' },
                      ]}>
                      {alert.severity === 'warning'
                        ? 'Warning'
                        : alert.severity === 'danger'
                        ? 'Critical'
                        : 'Info'}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={dashboardPalette.textSecondary} />
                </TouchableOpacity>
              ))}
            </SectionCard>
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
    gap: 12,
    paddingBottom: 20,
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
  hero: {
    gap: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  subtitle: {
    color: dashboardPalette.textSecondary,
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  metricsGridStacked: {
    flexDirection: 'column',
  },
  sectionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionGridStacked: {
    flexDirection: 'column',
  },
  sectionCard: {
    flex: 1,
    minHeight: 200,
  },
  productRow: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTitle: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  productSubtitle: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    backgroundColor: dashboardPalette.brand,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  alertIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  severityPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f8fafc',
  },
  severityText: {
    fontWeight: '700',
    fontSize: 12,
  },
  alertTitle: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  alertTime: {
    color: dashboardPalette.textSecondary,
    fontSize: 12,
  },
});
