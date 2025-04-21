
import ThemedView from "@/components/theme/ThemedView";
import { ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
    </ThemedView>
  );
}
