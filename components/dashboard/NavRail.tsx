import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { dashboardPalette, navItems } from '@/constants/dashboard';

type Props = {
  activeKey: string;
  orientation?: 'vertical' | 'horizontal';
  collapsed?: boolean;
  onSelect?: (key: string, path?: string) => void;
};

export function NavRail({ activeKey, orientation = 'vertical', collapsed = false, onSelect }: Props) {
  const isVertical = orientation === 'vertical';
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({ manage: true });

  const visibleItems = useMemo(() => {
    const activeParent = navItems.find((i) => i.key === activeKey)?.parent;
    return navItems.filter((item) => {
      if (item.parent) {
        const parentOpen = openParents[item.parent] || activeParent === item.parent || activeKey === item.parent;
        return parentOpen && (!collapsed || activeParent === item.parent || activeKey === item.parent);
      }
      return true;
    });
  }, [activeKey, collapsed, openParents]);

  const toggleParent = (key: string) => {
    setOpenParents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const list = (
    <View style={[styles.list, !isVertical && styles.horizontalList]}>
      {visibleItems.map((item) => {
        const isActive = item.key === activeKey;
        const isParent = item.expandable;
        const hasParent = !!item.parent;
        return (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.85}
            onPress={() => {
              if (isParent) {
                toggleParent(item.key);
              } else {
                onSelect?.(item.key, item.path);
              }
            }}
            style={[
              styles.item,
              isActive && styles.activeItem,
              !isVertical && styles.horizontalItem,
              collapsed && styles.collapsedItem,
              hasParent && styles.childItem,
            ]}>
            <View style={[styles.iconWrap, isActive && styles.activeIconWrap]}>
              <Ionicons
                name={item.icon}
                size={20}
                color={isActive ? dashboardPalette.brand : dashboardPalette.textSecondary}
              />
            </View>
            {!collapsed && (
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                  !isVertical && styles.horizontalLabel,
                ]}>
                {item.label}
              </Text>
            )}
            {!collapsed && isParent && (
              <Ionicons
                name={openParents[item.key] ? 'chevron-down' : 'chevron-forward'}
                size={16}
                color={dashboardPalette.textSecondary}
                style={{ marginLeft: 'auto' }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  if (isVertical) {
    return <View style={[styles.rail, collapsed && styles.railCollapsed]}>{list}</View>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.railHorizontal}>
      {list}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rail: {
    width: 190,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    gap: 8,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  railCollapsed: {
    width: 72,
    alignItems: 'center',
  },
  railHorizontal: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 8,
  },
  list: {
    gap: 8,
  },
  horizontalList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  collapsedItem: {
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: dashboardPalette.brandMuted,
  },
  horizontalItem: {
    paddingHorizontal: 14,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f3f7',
  },
  activeIconWrap: {
    backgroundColor: '#fff',
  },
  label: {
    color: dashboardPalette.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
  activeLabel: {
    color: dashboardPalette.brand,
  },
  horizontalLabel: {
    minWidth: 80,
  },
  childItem: {
    paddingLeft: 30,
  },
});
