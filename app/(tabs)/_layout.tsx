import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedTabs } from "@/components/theme/ThemedTabs";
import { t } from "@/i18n/t";
import { use$ } from "@legendapp/state/react";
import { langStore$ } from "@/stores/langStore"; // or wherever you store language

export default function TabsLayout() {
  // Only re-renders if the return value changes
  use$(langStore$.mode)
  return (
    <ThemedTabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t("tabs.dashboard"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: t("tabs.browse"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </ThemedTabs>
  );
}
