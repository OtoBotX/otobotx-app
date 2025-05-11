import React from 'react';
import SettingsView from '@/components/settings/SettingsView';
import { t } from '@/i18n/t';
import { Text } from 'react-native-paper';

export default function OfficeRolesPage() {
  return (
    <SettingsView withBack title={t('settings.officeRoles')}>
      <Text>Hey</Text>
    </SettingsView>
  );
}
