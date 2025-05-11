import { useColorScheme } from "react-native";
import { themeStore$ } from "@/stores/themeStore";
import { darkTheme, lightTheme } from "@/theme";
import { use$ } from "@legendapp/state/react";
import { useMemo } from "react";

export function useThemeHandler() {
  // User-set color scheme, "system" by default
  const themeMode = use$(() => themeStore$.mode.get());

  const setThemeMode = themeStore$.mode.set;

  // System color scheme
  const systemThemeMode = useColorScheme(); 

  // Derived mode and theme
  const resolvedThemeMode = useMemo(() => {
    return themeMode === "system" ? systemThemeMode : themeMode;
  }, [themeMode, systemThemeMode]);

  const theme = useMemo(() => {
    return resolvedThemeMode === "dark" ? darkTheme : lightTheme;
  }, [resolvedThemeMode]);

  return {
    theme,
    themeMode,
    setThemeMode
  };
}
