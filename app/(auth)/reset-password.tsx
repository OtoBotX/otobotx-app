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
import { Pressable } from "react-native";
import { use$ } from "@legendapp/state/react";

export default function ResetPasswordScreen() {

  const {email, password, snack, loading, passwordResetRequested, passwordResetToken,
    setSnack, setEmail, setPassword, setPasswordResetToken, 
    handlePasswordUpdate,setPasswordResetRequested,
    handlePasswordReset} = useUserHandler();
  
  const $ = use$(() => ({
    modeTitle: !passwordResetRequested ? t("auth.passwordResetRequest") : t("auth.newPassword"),
    modeButton: !passwordResetRequested ? t("auth.passwordResetRequest") : t("auth.newPassword"),
    modeHandler: !passwordResetRequested ? handlePasswordReset : handlePasswordUpdate,
  }));

  return (
    <AuthView>

        <ThemedText type="title">{$.modeTitle}</ThemedText>

        <ThemedInput
            label={t("auth.email")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />

        {passwordResetRequested && (
        <>
        <ThemedInput
            label={t("auth.passwordResetToken")}
            value={passwordResetToken}
            onChangeText={setPasswordResetToken}
        />
        <ThemedInput
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        </>
        )}

      <ThemedButton onPress={$.modeHandler} loading={loading}>
        {$.modeButton}
      </ThemedButton>

      <Pressable onPress={() => {
            setPasswordResetRequested(false),
            router.back(); 
            }} style={{ paddingVertical: 8 }}>
            <ThemedText type="link" style={{ textAlign: "center" }}>
            {t("auth.backtoLogin")}
            </ThemedText>
        </Pressable>

      <ThemedSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </AuthView>
  );
}
