import ThemedButton from "@/components/theme/ThemedButton";
import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import { router } from "expo-router";
import { t } from "@/i18n/t";

export default function HomeScreen() {

  const goToRegister = () => router.push("/register");

  return (
    <AuthView>
      <ThemedText type="title">{t("onboard.welcome")}</ThemedText>

      <ThemedButton mode="outlined" onPress={goToRegister}>
        {t("onboard.registerlogin")}
      </ThemedButton>

    </AuthView>
  );
}
