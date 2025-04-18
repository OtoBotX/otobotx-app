import { use$ } from "@legendapp/state/react";
import { langStore$ } from "@/stores/langStore";

export const useLangHandler = () => {
  const mode = use$(langStore$.mode); 

  const toggleLang = () => {
    const current = langStore$.mode.get();
    langStore$.mode.set(current === "tr" ? "en" : "tr");
  };

  return {
    mode,
    toggleLang
  };
};
