import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
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

const fieldStyle = {
  backgroundColor: '#f8fafc',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#e2e8f0',
  paddingHorizontal: 12,
  paddingVertical: 12,
  fontSize: 14,
  color: dashboardPalette.textPrimary,
};

export default function RegisterScreen() {
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();
  const isWide = width >= 1000;
  const [navOpen, setNavOpen] = useState(false);

  const activeKey = useMemo(
    () => {
      if (pathname?.includes('manage')) return 'manage';
      if (pathname?.includes('register')) return 'register';
      if (pathname?.includes('products')) return 'products';
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
          contentContainerStyle={[
            styles.contentContainer,
            !isWide && styles.contentContainerStacked,
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Organization Registration</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Organization Type</Text>
              <View style={styles.selectRow}>
                <Text style={styles.selectText}>Manufacturer</Text>
                <Ionicons name="chevron-down" size={16} color={dashboardPalette.textSecondary} />
              </View>
            </View>

            <TouchableOpacity style={styles.checkboxRow} activeOpacity={0.8}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Register for another wallet</Text>
            </TouchableOpacity>

            <View style={styles.twoCol}>
              <View style={styles.col}>
                <Text style={styles.label}>Legal Name</Text>
                <TextInput placeholder="Organization Legal Name" placeholderTextColor="#cbd5e1" style={styles.input} />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Business Reg. No</Text>
                <TextInput placeholder="REG-12345" placeholderTextColor="#cbd5e1" style={styles.input} />
              </View>
            </View>

            <View style={styles.twoCol}>
              <View style={styles.col}>
                <Text style={styles.label}>Country of Incorporation</Text>
                <View style={styles.selectRow}>
                  <Text style={styles.selectText}>Select country</Text>
                  <Ionicons name="chevron-down" size={16} color={dashboardPalette.textSecondary} />
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="info@organization.example"
                  placeholderTextColor="#cbd5e1"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.twoCol}>
              <View style={styles.col}>
                <Text style={styles.label}>Contact Person</Text>
                <TextInput placeholder="Jane Doe" placeholderTextColor="#cbd5e1" style={styles.input} />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Designation</Text>
                <TextInput placeholder="Operations Manager" placeholderTextColor="#cbd5e1" style={styles.input} />
              </View>
            </View>

            <View style={styles.twoCol}>
              <View style={styles.col}>
                <Text style={styles.label}>Phone</Text>
                <TextInput placeholder="+1-555-123-0000" placeholderTextColor="#cbd5e1" style={styles.input} />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  placeholder="200 Logistics Way, Oakland, CA"
                  placeholderTextColor="#cbd5e1"
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Date of Registration</Text>
              <View style={styles.dateRow}>
                <TextInput placeholder="dd/mm/yyyy" placeholderTextColor="#cbd5e1" style={[styles.input, { flex: 1, marginBottom: 0 }]} />
                <Ionicons name="calendar-outline" size={18} color={dashboardPalette.textSecondary} />
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit Registration</Text>
            </TouchableOpacity>
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
  contentContainerStacked: {
    paddingHorizontal: 2,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8ef',
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
    gap: 14,
  },
  formTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: dashboardPalette.textPrimary,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: dashboardPalette.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    ...fieldStyle,
  },
  selectRow: {
    ...fieldStyle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: dashboardPalette.textPrimary,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    color: dashboardPalette.textPrimary,
    fontSize: 14,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    gap: 6,
  },
  dateRow: {
    ...fieldStyle,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitButton: {
    backgroundColor: dashboardPalette.brand,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
