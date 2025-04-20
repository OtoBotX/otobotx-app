import ThemedView from "@/components/theme/ThemedView";
import ThemedText from "@/components/theme/ThemedText";
import ThemedButton from "@/components/theme/ThemedButton";
import { useThemeHandler } from "@/hooks/useThemeHandler";
import { useLangHandler } from "@/hooks/useLangHandler";
import { useUserHandler } from "@/hooks/useUserHandler";
import { t } from "@/i18n/t";

export default function SettingsScreen() {
  const { toggleTheme } = useThemeHandler();
  const { toggleLang } = useLangHandler();
  const { handleLogout } = useUserHandler();

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <ThemedText type="title" style={{ marginBottom: 24 }}>
        {t("settings.title")}
      </ThemedText>

      <ThemedButton onPress={toggleTheme}>
        {t("settings.toggleTheme")}
      </ThemedButton>

      <ThemedButton onPress={toggleLang}>
        {t("settings.toggleLang")}
      </ThemedButton>

      <ThemedButton onPress={handleLogout} mode="outlined">
        {t("settings.logout")}
      </ThemedButton>

    </ThemedView>
  );
}
