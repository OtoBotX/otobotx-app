import { useEffect } from "react";
import supabase from "@/utils/supabase";
import { userStore$ } from "@/stores/userStore";
import { router } from "expo-router";
import { isEmpty } from "@legendapp/state";
import { Linking } from "react-native";

export function useAuthListener() {
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const session = userStore$.session.get();

    const maybeRestoreSession = async () => {

      if (isEmpty(userStore$.session)) {
        console.log("⚠️ No stored session available, user must login!");
        router.replace("/(auth)/register"); // ⬅️ Redirect to register / login
        return;
      }

      const isExpired = session?.expires_at !== undefined && session.expires_at < now;

      if (!isExpired) {
        console.log("✅ Session is still valid!");
        router.replace("/(tabs)/dashboard"); // ⬅️ Redirect to dashboard
        return;
      } else {
        try {
          const { data, error } = await supabase.auth.setSession({
            refresh_token: session.refresh_token,
            access_token: session.access_token,
          });

          if (error) {
            console.log("🔒 Failed to refresh session:", error.message);
            router.replace("/(auth)/register"); // ⬅️ Redirect to register / login
            userStore$.session.set(null);
          } else if (data.session) {
            console.log("🔁 Session refreshed successfully");
            router.replace("/(tabs)/dashboard"); // ⬅️ Redirect to dashboard
          } else {
            console.log("⚠️ No session returned after refresh");
            router.replace("/(auth)/register"); // ⬅️ Redirect to register / login
            userStore$.session.set(null);
          }
        } catch (err) {
          console.log("❌ Unexpected error during session refresh", err);
          router.replace("/(auth)/register"); // ⬅️ Redirect to register / login
          userStore$.session.set(null);
        }
      }
    };

    // Subscribe to Supabase auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth Event:", event);
      if (event === "INITIAL_SESSION") {
        // console.log("Initial Supabase session from storage is loaded");
        const url = await Linking.getInitialURL();
        if (url && url.includes("reset-password")) {
          router.replace("/(auth)/reset-password"); // ⬅️ Redirect to index
          console.log("🔁 Detected reset-password deep link, skipping auto redirect.");
          return;
        }
        await maybeRestoreSession();
      } else if (event === "TOKEN_REFRESHED") {
        userStore$.session.set(session);
        // Do not redirect
      } else if (event === "SIGNED_IN") {
        userStore$.session.set(session);
        router.replace("/(tabs)/settings"); // ⬅️ Redirect to settings
      } else if (event === "SIGNED_OUT") {
        userStore$.session.set(null);
        router.replace("/(auth)/register"); // ⬅️ Redirect to index
      } else if (session){
        console.warn("Unaccounted auth event occured!");
        userStore$.session.set(session);
      } else if (!session) {
        console.error("⚠️ Auth event occurred but no session provided");
        userStore$.session.set(null);
      }
    });

    return () => {
      try {
        subscription?.subscription?.unsubscribe?.();
      } catch (err) {
        console.error("🧹 Failed to clean up auth subscription", err);
      }
    };
  }, []);
}
