import { tr } from "./locales/tr";
// import { en } from "./locales/en";

const lang = tr;

export const t = (key: string): string => {
  const parts = key.split(".");
  let current: unknown = lang;

  for (const part of parts) {
    if (typeof current === "object" && current !== null && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }

  return typeof current === "string" ? current : key;
};
