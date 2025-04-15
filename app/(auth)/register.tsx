import ThemedView from "@/components/theme/ThemedView";
import { ThemedText } from "@/components/theme/ThemedText";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { use$ } from "@legendapp/state/react";
import { userStore$ } from "@/stores/userStore";
import supabase from "@/utils/supabase";
import { router } from "expo-router";

export default function RegisterScreen() {
  const email = use$(() => userStore$.email.get());
  const password = use$(() => userStore$.password.get());
  const loading = use$(() => userStore$.loading.get());
  const snack = use$(() => userStore$.snack.get());

  const handleRegister = async () => {
    userStore$.loading.set(true);

    const { error } = await supabase.auth.signUp({
      email: userStore$.email.get(),
      password: userStore$.password.get(),
    });

    userStore$.loading.set(false);

    if (error) {
      userStore$.snack.set(error.message);
    } else {
      userStore$.snack.set("Check your email to confirm!");
      router.replace("/login");
    }
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        Register
      </ThemedText>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={userStore$.email.set}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={userStore$.password.set}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />

      <Button mode="contained" onPress={handleRegister} loading={loading}>
        Sign Up
      </Button>

      <Snackbar
        visible={!!snack}
        onDismiss={() => userStore$.snack.set("")}
      >
        {snack}
      </Snackbar>
    </ThemedView>
  );
}
