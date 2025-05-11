import React from 'react';
import SettingsView from '@/components/settings/SettingsView';
import { t } from '@/i18n/t';
import { Text } from 'react-native-paper';

export default function ProfilePage() {
  return (
    <SettingsView withBack title={t('settings.profile')}>
      <Text>Hey</Text>
    </SettingsView>
  );
}
