import { Button } from "react-native-paper";
import ThemedView from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { router } from "expo-router";
import { useThemeHandler } from "@/hooks/useThemeHandler";

export default function HomeScreen() {
  const { toggleTheme } = useThemeHandler();

  const goToLogin = () => router.push("/login");
  const goToRegister = () => router.push("/register");

  return (
    <ThemedView style={{ justifyContent: "center", padding: 24 }}>
      <ThemedText type="title">Welcome to OtoBotX</ThemedText>
      <Button mode="contained" style={{ marginTop: 16 }} onPress={toggleTheme}>
        Toggle Theme
      </Button>
      <Button mode="outlined" style={{ marginTop: 16 }} onPress={goToLogin}>
        Login
      </Button>
      <Button mode="outlined" style={{ marginTop: 16 }} onPress={goToRegister}>
        Register
      </Button>
    </ThemedView>
  );
}
