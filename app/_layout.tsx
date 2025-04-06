import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from '@/theme';
import { useSelector } from '@legendapp/state/react';
import { themeStore } from '@/stores/themeStore';

export default function Layout() {
  const mode = useSelector(() => themeStore.mode.get());
  const theme = useAppTheme();
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
