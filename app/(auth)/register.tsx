import AuthView from "@/components/auth/AuthView";
import ThemedText from "@/components/theme/ThemedText";
import ThemedButton from "@/components/theme/ThemedButton";
import ThemedInput from "@/components/theme/ThemedInput";
import ThemedSnackbar from "@/components/theme/ThemedSnackbar";
import ThemedPicker from "@/components/theme/ThemedPicker";
import { useUserHandler } from "@/hooks/useUserHandler";
import { t } from "@/i18n/t";
import { useObservable, use$ } from "@legendapp/state/react";
import { Pressable } from "react-native";

function formatName(input: string): string {
  return input
    .split(" ")
    .map((word) =>
      word.length === 0
        ? ""
        : word[0].toLocaleUpperCase("tr-TR") +
          word.slice(1).toLocaleLowerCase("tr-TR")
    )
    .join(" ");
}


export default function RegisterLoginScreen() {

  const {
    email,
    password,
    first_name,
    last_name,
    office_id,
    office_role_id,
    loading,
    snack,
    isLogin,
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setOfficeId,
    setOfficeRoleId,
    setSnack,
    setLogin,
    handleRegister,
    handleLogin,
    officeItems,
    officeRoleItems
  } = useUserHandler();

  const $ = use$(() => ({
    modeTitle: isLogin ? t("auth.login") : t("auth.register"),
    modeButton: isLogin ? t("auth.signIn") : t("auth.signUp"),
    modeNext: isLogin ? t("auth.goToRegister") : t("auth.goToLogin"),
    modeHandler: isLogin ? handleLogin : handleRegister,
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

      {!isLogin && (
        <>
          <ThemedInput
            label={t("auth.firstName")}
            value={first_name}
            onChangeText={(v) => setFirstName(formatName(v))}
          />

          <ThemedInput
            label={t("auth.lastName")}
            value={last_name}
            onChangeText={(v) => setLastName(formatName(v))}
          />

          <ThemedPicker
                label={t("auth.office")}
                selectedValue={office_id}
                onValueChange={setOfficeId}
                items={officeItems}
          />

          <ThemedPicker
            label={t("auth.role")}
            selectedValue={office_role_id}
            onValueChange={setOfficeRoleId}
            items={officeRoleItems}
          />
        </>
      )}

      <ThemedButton onPress={$.modeHandler} loading={loading}>
        {$.modeButton}
      </ThemedButton>

      <Pressable onPress={() => {
        setLogin(!isLogin); // handle login / register mode
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
