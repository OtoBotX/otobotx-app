// components/navigation/ThemedTabs.tsx
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import React from "react";

export function ThemedTabs(props: React.ComponentProps<typeof Tabs>) {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.surfaceVariant,
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 4,
          height: 64,
        },
        tabBarLabelStyle: {
          color: theme.colors.onSurface,
          fontSize: 12,
          paddingBottom: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
      {...props}
    />
  );
}
