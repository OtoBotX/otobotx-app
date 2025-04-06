import { Button } from 'react-native-paper';
import ThemedView from '@/components/theme/ThemedView';
import { ThemedText } from '@/components/theme/ThemedText';
import { themeStore } from '@/stores/themeStore';
import { useSelector } from '@legendapp/state/react';

export default function HomeScreen() {
  const currentMode = useSelector(() => themeStore.mode.get()); // ✅ live binding

  const toggleTheme = () => {
    const current = themeStore.mode.get();
    const next = current === 'dark' ? 'light' : 'dark';
    themeStore.mode.set(next);
  };

  console.log('Current mode:', themeStore.mode.get());

  return (
    <ThemedView style={{ justifyContent: 'center', padding: 24 }}>
      <ThemedText type="title">Welcome to OtoBotX</ThemedText>
      <Button mode="contained" style={{ marginTop: 16 }} onPress={toggleTheme}>
        Toggle Theme
      </Button>
    </ThemedView>
  );
}
