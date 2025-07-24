import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 120,
          },
          default: {
            height: 120,
          },
        }),
        tabBarIconStyle: {
          marginTop: 14,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Aid Distribution list',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', letterSpacing: 1 },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Aid Distribution Dashboard',
          headerStyle: { backgroundColor: '#2563eb' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', letterSpacing: 1 },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.pie.fill" color={color} />, 
        }}
      />
    </Tabs>
  );
}
