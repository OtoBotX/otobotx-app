import React from "react";
import { useTheme } from "react-native-paper";
import ThemedView from "@/components/theme/ThemedView";

export default function AuthView({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </ThemedView>
  );
}
