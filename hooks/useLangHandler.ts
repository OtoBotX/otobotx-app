import { use$ } from "@legendapp/state/react";
import { langStore$ } from "@/stores/langStore";

export const useLangHandler = () => {
  const mode = use$(langStore$.mode); 

  const setLang = langStore$.mode.set;

  const setLang = langStore$.mode.set;

  return {
    lang :mode,
    setLang,
  };
};
