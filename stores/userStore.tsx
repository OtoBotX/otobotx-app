import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";

export const userStore$ = observable({
  email: "",
  passwordTemp: "",
  loading: false,
  snack: "",
});

syncObservable(
    userStore$.email,
    persistOptions({
        persist: {
        name: "userStore$",
        },
    }),
);