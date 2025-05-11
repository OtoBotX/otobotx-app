import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import persistOptions from "./persistConfig";

export const themeOptions = [
  { text:"settings.themeModes.light", value: "light" },
  { text:"settings.themeModes.dark", value: "dark" },
  { text:"settings.themeModes.system", value: "system" },
] as const;

export type themeType = typeof themeOptions[number]["value"];

export const themeStore$ = observable({
  mode: "system" as themeType,
});

syncObservable(
  themeStore$,
  persistOptions({
    persist: {
      name: "themeStore$",
    },
  }),
);
