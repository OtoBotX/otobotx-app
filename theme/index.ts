// theme/index.ts
import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { themeStore } from '@/stores/themeStore';
import { useColorScheme } from 'react-native';
import { useComputed } from '@legendapp/state/react';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    secondary: '#625B71',
    background: '#F7F7F7',
    onBackground: '#000000', // text on background
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#D0BCFF',
    secondary: '#CCC2DC',
    background: '#121212',
    onBackground: '#FFFFFF', // text on background
  },
};

export function useAppTheme(): MD3Theme {
  const system = useColorScheme();

  const computed = useComputed(() => {
    const mode = themeStore.mode.get();
    const resolved = mode === 'system' ? system : mode;
    console.log('⚙️ Resolved theme:', resolved); // add this!
    return resolved === 'dark' ? darkTheme : lightTheme;
  });

  return computed.get(); // ✅ .get() here is important
}
