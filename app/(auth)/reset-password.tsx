import { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import supabase from "@/utils/supabase";
import ThemedInput from "@/components/theme/ThemedInput";
import ThemedButton from "@/components/theme/ThemedButton";
import ThemedText from "@/components/theme/ThemedText";
import { t } from "@/i18n/t";
import AuthView from "@/components/auth/AuthView";
import { useUserHandler } from "@/hooks/useUserHandler";
import ThemedSnackbar from "@/components/theme/ThemedSnackbar";

export default function ResetPasswordScreen() {
  const { access_token, type } = useLocalSearchParams();
  const {password, snack, loading, setSnack, setPassword, handlePasswordUpdate} = useUserHandler();

  useEffect(() => {
    if (access_token && typeof access_token === "string") {
      supabase.auth.setSession({ access_token, refresh_token: access_token });
    }
  }, [access_token]);

  return (
    <AuthView>
      <ThemedText type="title">{t("onboard.passwordReset")}</ThemedText>

      <ThemedInput
        label={t("auth.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <ThemedButton onPress={handlePasswordUpdate} loading={loading}>
        {t("onboard.passwordReset")}
      </ThemedButton>

      <ThemedSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </AuthView>
  );
}
