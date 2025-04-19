import ThemedButton from "@/components/theme/ThemedButton";
import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import { router } from "expo-router";
import { useThemeHandler } from "@/hooks/useThemeHandler";
import { useLangHandler } from "@/hooks/useLangHandler";
import { t } from "@/i18n/t";

export default function HomeScreen() {
  const { toggleTheme } = useThemeHandler();
  const { toggleLang } = useLangHandler();

  const goToRegister = () => router.push("/register");

  return (
    <AuthView>
      <ThemedText type="title">{t("onboard.welcome")}</ThemedText>

      <ThemedButton mode="contained" onPress={toggleTheme}>
        {t("onboard.toggleTheme")}
      </ThemedButton>

      <ThemedButton mode="contained" onPress={toggleLang}>
        {t("onboard.toggleLanguage")}
      </ThemedButton>

      <ThemedButton mode="outlined" onPress={goToRegister}>
        {t("onboard.registerlogin")}
      </ThemedButton>
    </AuthView>
  );
}
