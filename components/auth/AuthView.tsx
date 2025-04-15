import React from "react";
import ThemedView from "@/components/theme/ThemedView";

export default function AuthView({ children }: { children: React.ReactNode }) {

  return (
    <ThemedView
      style={{
        justifyContent: "center",
        padding: 24,
      }}
    >
      {children}
    </ThemedView>
  );
}
