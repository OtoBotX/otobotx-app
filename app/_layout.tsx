import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useThemeHandler } from "@/hooks/useThemeHandler";
import { useAuthListener } from "@/hooks/useAuthListener";
import { useUserHandler } from "@/hooks/useUserHandler";
import ThemedSnackbar from "@/components/theme/ThemedSnackbar";

export default function Layout() {
  useAuthListener(); // 👈 Mount session sync
  const { snack, setSnack } = useUserHandler();
  const { theme } = useThemeHandler();
  return (
    <PaperProvider theme={theme}>
      <Slot />
      <ThemedSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </PaperProvider>
  );
}
