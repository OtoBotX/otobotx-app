import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";
import type { Session } from "@supabase/supabase-js";

export const userStore$ = observable({
  // 🔐 Shared Auth State
  email: "",
  passwordTemp: "",
  loading: false,
  snack: "",
  isLogin: true,
  session: null as Session | null,

  // 👤 Registration fields
  first_name: "",
  last_name: "",
  office_id: null as number | null,
  office_role_id: null as number | null,

  // ⬇️ Registration dropdown data
  offices: [] as { id: number; uname: string }[],
  roles: [] as { id: number; name: string }[],
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