import React from 'react';
import SettingsView from '@/components/settings/SettingsView';
import { t } from '@/i18n/t';
import { RadioButton } from 'react-native-paper';
import { themeOptions, themeType } from '@/stores/themeStore';
import { useThemeHandler } from '@/hooks/useThemeHandler';

export default function ThemePage() {
  const { themeMode, setThemeMode } = useThemeHandler()
  return (
    <SettingsView withBack title={t('settings.theme')}>
      <RadioButton.Group
        onValueChange={(newValue) => (setThemeMode(newValue as themeType))}
        value={themeMode}
      >
        {themeOptions.map((option) => (
          <RadioButton.Item
            key={option.value}
            label={t(option.text)}
            value={option.value}
          />
        ))}
      </RadioButton.Group>
    </SettingsView>
  );
}
