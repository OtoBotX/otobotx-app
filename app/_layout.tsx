import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useThemeHandler } from '@/hooks/useThemeHandler';

export default function Layout() {
  const { theme } = useThemeHandler();
  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
