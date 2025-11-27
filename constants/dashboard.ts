import { Ionicons } from '@expo/vector-icons';

export const dashboardPalette = {
  brand: '#3563E9',
  brandMuted: '#e9f0ff',
  background: '#f5f7fb',
  card: '#ffffff',
  border: '#e6e8ef',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
};

export type DashboardMetric = {
  key: string;
  label: string;
  value: number | string;
  delta: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  tintBackground: string;
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    key: 'products',
    label: 'Total Products',
    value: 4,
    delta: '+1% from last week',
    icon: 'cube-outline',
    tint: '#1d4ed8',
    tintBackground: '#e0e7ff',
  },
  {
    key: 'shipments',
    label: 'Active Shipments',
    value: 0,
    delta: '+11% from last week',
    icon: 'car-outline',
    tint: '#ca8a04',
    tintBackground: '#fef3c7',
  },
  {
    key: 'alerts',
    label: 'Active Alerts',
    value: 6,
    delta: '+12% from last week',
    icon: 'warning-outline',
    tint: '#ef4444',
    tintBackground: '#fee2e2',
  },
  {
    key: 'doses',
    label: 'Doses Administered',
    value: 0,
    delta: '+16% from last week',
    icon: 'checkmark-done-outline',
    tint: '#22c55e',
    tintBackground: '#dcfce7',
  },
];

export const recentProducts = [
  { id: 'PF-2024-001', action: 'View' },
  { id: 'MOD-2024-002', action: 'View' },
  { id: 'PF-2024-001', action: 'View' },
];

export type AlertSeverity = 'warning' | 'danger' | 'success';

export const alerts: { id: string; title: string; timestamp: string; severity: AlertSeverity }[] = [
  {
    id: '1',
    title: 'Vaccines expiring within 30 days',
    timestamp: '27/11/2025, 07:31:30',
    severity: 'warning',
  },
  {
    id: '2',
    title: 'Critical temperature breach detected',
    timestamp: '27/11/2025, 12:31:30',
    severity: 'danger',
  },
  {
    id: '3',
    title: 'Vaccine inventory below threshold',
    timestamp: '27/11/2025, 09:31:30',
    severity: 'success',
  },
];

export const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'apps-outline' as const, path: '/(tabs)' },
  { key: 'manage', label: 'Manage Products', icon: 'create-outline' as const, path: '/(tabs)/manage', expandable: true },
  { key: 'batches', label: 'Batches', icon: 'briefcase-outline' as const, path: '/(tabs)/manage', parent: 'manage' },
  { key: 'packages', label: 'Packages', icon: 'cube-outline' as const, path: '/(tabs)/packages', parent: 'manage' },
  { key: 'products', label: 'Products', icon: 'cube-outline' as const, path: '/(tabs)/products', parent: 'manage' },
  { key: 'categories', label: 'Product Categories', icon: 'pricetags-outline' as const, path: '/(tabs)/categories', parent: 'manage' },
  { key: 'qr', label: 'QR Scanner', icon: 'qr-code-outline' as const, path: '/(tabs)' },
  { key: 'shipments', label: 'Shipments', icon: 'car-outline' as const, path: '/(tabs)/shipments' },
  { key: 'analytics', label: 'Analytics', icon: 'analytics-outline' as const, path: '/(tabs)' },
  { key: 'settings', label: 'Settings', icon: 'settings-outline' as const, path: '/(tabs)' },
  { key: 'register', label: 'Register', icon: 'person-add-outline' as const, path: '/(tabs)/register' },
  { key: 'logout', label: 'Logout', icon: 'log-out-outline' as const, path: '/(tabs)' },
];
