import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ThemedView from '../theme/ThemedView';

interface SettingsViewProps {
  children: React.ReactNode;
  withBack?: boolean;
  title?: string;
  style?: ViewStyle;
}

export default function SettingsView({ children, withBack = false, title, style }: SettingsViewProps) {
  const router = useRouter();
  const theme = useTheme();
  return (
    <ThemedView>
        <ScrollView
        contentContainerStyle={[
            {
            paddingHorizontal: 24,
            paddingTop: withBack ? 0 : 24,
            flexGrow: 1,
            justifyContent: 'flex-start',
            },
            style,
        ]}
        >
        {withBack && (
            <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => router.push('/(tabs)/settings')} color={theme.colors.onSurface} />
            <Appbar.Content title={title ?? ''} titleStyle={{ color: theme.colors.onSurface }} />
            </Appbar.Header>
        )}
        {children}
        </ScrollView>
    </ThemedView>
  );
}