import { Button } from "react-native-paper";
import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import { router } from "expo-router";
import { useThemeHandler } from "@/hooks/useThemeHandler";
import { useLangHandler } from "@/hooks/useLangHandler";
import { t } from "@/i18n/t";

export default function HomeScreen() {
  const { toggleTheme } = useThemeHandler();
  const { toggleLang } = useLangHandler();

  const goToLogin = () => router.push("/login");
  const goToRegister = () => router.push("/register");

  return (
    <AuthView>
      <ThemedText type="title">{t("onboard.welcome")}</ThemedText>

      <Button mode="contained" onPress={toggleTheme}>
        {t("onboard.toggleTheme")}
      </Button>

      <Button mode="contained" onPress={toggleLang}>
        {t("onboard.toggleLanguage")}
      </Button>

      <Button mode="outlined" onPress={goToLogin}>
        {t("onboard.login")}
      </Button>

      <Button mode="outlined" onPress={goToRegister}>
        {t("onboard.register")}
      </Button>
    </AuthView>
  );
}
