import React from 'react';
import SettingsView from '@/components/settings/SettingsView';
import { t } from '@/i18n/t';
import ThemedInput from '@/components/theme/ThemedInput';
import { useUserHandler } from '@/hooks/useUserHandler';

export default function ProfilePage() {

const {
    email,
    first_name,
    last_name,
  } = useUserHandler();

  return (
    <SettingsView withBack title={t('settings.profile')}>
      <ThemedInput label={t('auth.email')} value={email} editable={false} />
      <ThemedInput label={t('auth.firstName')} value={first_name} editable={false} />
      <ThemedInput label={t('auth.lastName')} value={last_name} editable={false} />
    </SettingsView>
  );
}