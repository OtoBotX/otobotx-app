import { use$ } from "@legendapp/state/react";
import { userStore$ } from "@/stores/userStore";
import supabase from "@/utils/supabase";
import { router } from "expo-router";
import { t } from "@/i18n/t";

export const useUserHandler = () => {

    const $ = use$(() => ({
        email: userStore$.email.get(),
        password: userStore$.passwordTemp.get(),
        loading: userStore$.loading.get(),
        snack: userStore$.snack.get(),
    }));

    const setEmail = userStore$.email.set;
    const setPassword = userStore$.passwordTemp.set;
    const setSnack = userStore$.snack.set;

    const handleRegister = async () => {
        userStore$.loading.set(true);

        const { error } = await supabase.auth.signUp({
        email: userStore$.email.get(),
        password: userStore$.passwordTemp.get(),
        });

        userStore$.loading.set(false);

        if (error) {
        userStore$.snack.set(error.message);
        } else {
        userStore$.snack.set(t("auth.checkEmail"));
        }
    };

    const handleLogin = async () => {
        userStore$.loading.set(true);
      
        const { error } = await supabase.auth.signInWithPassword({
          email: userStore$.email.get(),
          password: userStore$.passwordTemp.get(),
        });
      
        userStore$.loading.set(false);
      
        if (error) {
          userStore$.snack.set(error.message);
        } else {
          userStore$.snack.set(t("auth.welcomeBack"));
          userStore$.passwordTemp.set(""); // 🔐 cleanup
          router.replace("/(tabs)/dashboard"); // ⬅️ Redirect to home or dashboard
        }
    };      

    return {
        ...$,
        setEmail,
        setPassword,
        setSnack,
        handleRegister,
        handleLogin
    };
};
