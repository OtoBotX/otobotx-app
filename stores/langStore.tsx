import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";

export const langStore$ = observable({
  mode: "tr" as "tr" | "en",
});

syncObservable(
    langStore$,
  persistOptions({
    persist: {
      name: "langStore$",
    },
  }),
);
