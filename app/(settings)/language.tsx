import React from 'react';
import SettingsView from '@/components/settings/SettingsView';
import { t } from '@/i18n/t';
import { RadioButton } from 'react-native-paper';
import { langOptions, langType } from '@/stores/langStore';
import { useLangHandler } from '@/hooks/useLangHandler';

export default function ThemePage() {
  const { lang, setLang } = useLangHandler()
  return (
    <SettingsView withBack title={t('settings.language')}>
      <RadioButton.Group
        onValueChange={(newValue) => (setLang(newValue as langType))}
        value={lang}
      >
        {langOptions.map((option) => (
          <RadioButton.Item
            key={option.value}
            label={option.text}
            value={option.value}
          />
        ))}
      </RadioButton.Group>
    </SettingsView>
  );
}
