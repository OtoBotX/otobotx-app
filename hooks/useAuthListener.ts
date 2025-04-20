import { useEffect } from "react";
import supabase from "@/utils/supabase";
import { userStore$ } from "@/stores/userStore";

export function useAuthListener() {
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const session = userStore$.session.get();

    const maybeRestoreSession = async () => {
      if (!session) return;

      const isExpired = session?.expires_at !== undefined && session.expires_at < now;
      const hasRefresh = !!session.refresh_token;

      if (isExpired && hasRefresh) {
        try {
          const { data, error } = await supabase.auth.setSession({
            refresh_token: session.refresh_token,
            access_token: session.access_token,
          });

          if (error) {
            console.warn("🔒 Failed to refresh session:", error.message);
            userStore$.session.set(null);
          } else if (data.session) {
            console.log("🔁 Session refreshed successfully");
          } else {
            console.warn("⚠️ No session returned after refresh");
            userStore$.session.set(null);
          }
        } catch (err) {
          console.error("❌ Unexpected error during session refresh", err);
          userStore$.session.set(null);
        }
      }
    };

    // Subscribe to Supabase auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth Event:", event);
      if (event === "INITIAL_SESSION") {
        console.log("Initial Supabase session from storage is loaded");
        maybeRestoreSession();
      } else if (event === "SIGNED_IN") {
        userStore$.session.set(session);
      } else if (event === "SIGNED_OUT") {
        userStore$.session.set(null);
      } else if (session){
        console.warn("Unaccounted auth event occured!");
        userStore$.session.set(session);
      } else if (!session) {
        console.warn("⚠️ Auth event occurred but no session provided");
        userStore$.session.set(null);
      }
    });

    return () => {
      try {
        subscription?.subscription?.unsubscribe?.();
      } catch (err) {
        console.warn("🧹 Failed to clean up auth subscription", err);
      }
    };
  }, []);
}
