import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";
import type { Session } from "@supabase/supabase-js";

export const userStore$ = observable({
  email: "",
  passwordTemp: "",
  loading: false,
  snack: "",
  session: null as Session | null, // 🔐 persist session
});

// Persist only specific fields:
syncObservable(
  userStore$.email,
  persistOptions({
    persist: { name: "email" },
  }),
);

syncObservable(
  userStore$.session,
  persistOptions({
    persist: { name: "session" },
  }),
);