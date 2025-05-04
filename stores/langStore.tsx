import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";

export const langOptions = [
  { label: "EN", value: "en" },
  { label: "TR", value: "tr" },
] as const;

type langType = typeof langOptions[number]["value"];

export const langStore$ = observable({
  mode: "tr" as langType,
});

syncObservable(
    langStore$,
  persistOptions({
    persist: {
      name: "langStore$",
    },
  }),
);
