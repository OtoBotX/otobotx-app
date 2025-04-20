import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useThemeHandler } from "@/hooks/useThemeHandler";
import { useAuthListener } from "@/hooks/useAuthListener";

export default function Layout() {
  useAuthListener(); // 👈 Mount session sync
  const { theme } = useThemeHandler();
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
