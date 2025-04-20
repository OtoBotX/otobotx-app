import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import ThemedButton from "@/components/theme/ThemedButton";
import ThemedInput from "@/components/theme/ThemedInput";
import ThemedSnackbar from "@/components/theme/ThemedSnackbar";
import { useUserHandler } from "@/hooks/useUserHandler";
import { t } from "@/i18n/t";
import { useObservable, use$ } from "@legendapp/state/react";
import { Pressable } from "react-native";

export default function RegisterLoginScreen() {

  const {
    email,
    password,
    loading,
    snack,
    setEmail,
    setPassword,
    setSnack,
    handleRegister,
    handleLogin
  } = useUserHandler();

  const isLogin = useObservable(true);
  const $ = use$(() => ({
    modeTitle: isLogin.get() ? t("auth.login") : t("auth.register"),
    modeButton: isLogin.get() ? t("auth.signIn") : t("auth.signUp"),
    modeNext: isLogin.get() ? t("auth.goToRegister") : t("auth.goToLogin"),
    modeHandler: isLogin.get() ? handleLogin : handleRegister,
  }));

  return (
    <AuthView>
      <ThemedText type="title">{t("onboard.welcome")}</ThemedText>

      <ThemedText type="title">{$.modeTitle}</ThemedText>

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

      <ThemedButton onPress={$.modeHandler} loading={loading}>
        {$.modeButton}
      </ThemedButton>

      <Pressable onPress={() => {
        isLogin.set(!isLogin.get()); // handle login / register mode
        setPassword(""); // reset password
        }} style={{ paddingVertical: 8 }}>
        <ThemedText type="link" style={{ textAlign: "center" }}>
          {$.modeNext}
        </ThemedText>
      </Pressable>

      <ThemedSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </AuthView>
  );
}
