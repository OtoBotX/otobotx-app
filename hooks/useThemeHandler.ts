import { useColorScheme } from 'react-native';
import { themeStore$ } from '@/stores/themeStore';
import { darkTheme, lightTheme } from '@/theme';
import { use$ } from '@legendapp/state/react';
import { useMemo } from 'react';

export function useThemeHandler() {
  // User-set color scheme, "system" by default
  const selectedThemeMode = use$(() => themeStore$.mode.get());

  // System color scheme
  const systemThemeMode = useColorScheme();

  // Derived mode and theme
  const resolvedThemeMode = useMemo(() => {
    return selectedThemeMode === 'system' ? systemThemeMode : selectedThemeMode;
  }, [selectedThemeMode, systemThemeMode]);

  const theme = useMemo(() => {
    return resolvedThemeMode === 'dark' ? darkTheme : lightTheme;
  }, [resolvedThemeMode]);

  const toggleTheme = () => {
    const next = resolvedThemeMode === 'dark' ? 'light' : 'dark';
    themeStore$.mode.set(next);
  };

  return {
    theme,
    toggleTheme,
  };
}
