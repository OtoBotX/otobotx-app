import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { t } from '@/i18n/t';

interface SettingsOptionProps {
  icon: string;
  label: string;
  value?: string;
  pressable?: boolean;
  onPress?: () => void;
}

export default function SettingsOption({ icon, label, value, pressable = true, onPress }: SettingsOptionProps) {
  const theme = useTheme();

  return (
    <List.Item
      title={t(label)}
      description={!pressable && value ? value : undefined}
      left={(props) => <List.Icon {...props} icon={icon} color={theme.colors.primary} />}
      right={(props) =>
        pressable ? <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurface} /> : undefined
      }
      onPress={pressable ? onPress : undefined}
      style={{ backgroundColor: theme.colors.surfaceVariant }}
    />
  );
}
