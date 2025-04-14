import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";

export const userStore$ = observable({
  email: "",
  password: "",
  loading: false,
  snack: "",
});

syncObservable(
    userStore$,
    persistOptions({
        persist: {
        name: "userStore$",
        },
    }),
);