import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { t } from '@/i18n/t';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  const theme = useTheme();

  return (
    <List.Section>
      <List.Subheader style={{ color: theme.colors.onSurface, fontWeight: '600' }}>
        {t(title)}
      </List.Subheader>
      {children}
    </List.Section>
  );
}
