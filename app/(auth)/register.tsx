import AuthView from "@/components/auth/AuthView";
import AuthText from "@/components/auth/AuthText";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthSnackbar from "@/components/auth/AuthSnackbar";
import { useUserHandler } from "@/hooks/useUserHandler";

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
      <AuthText>Register</AuthText>

      <AuthInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AuthButton onPress={handleRegister} loading={loading}>
        Sign Up
      </AuthButton>

      <AuthSnackbar visible={!!snack} onDismiss={() => setSnack("")} message={snack} />
    </AuthView>
  );
}
