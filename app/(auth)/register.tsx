import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import ThemedButton from "@/components/theme/ThemedButton";
import ThemedInput from "@/components/theme/ThemedInput";
import ThemedSnackbar from "@/components/theme/ThemedSnackbar";
import { useUserHandler } from "@/hooks/useUserHandler";
import { t } from "@/i18n/t";

export default function RegisterScreen() {
  const {
    email,
    password,
    loading,
    snack,
    setEmail,
    setPassword,
    setSnack,
    handleRegister,
  } = useUserHandler();

  return (
    <AuthView>
      <ThemedText type="title">{t("auth.register")}</ThemedText>

      <ThemedInput
        label={t("auth.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <ThemedInput
        label={t("auth.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <ThemedButton onPress={handleRegister} loading={loading}>
        {t("auth.signUp")}
      </ThemedButton>

      <ThemedSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </AuthView>
  );
}
