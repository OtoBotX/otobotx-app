// components/SettingsPage.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import SettingsView from '@/components/settings/SettingsView';
import SettingsSection from '@/components/settings/SettingsSection';
import SettingsOption from '@/components/settings/SettingsOption';
import { t } from '@/i18n/t';
import { useRouter } from 'expo-router';
import config from '@/app.config';
import { useUserHandler } from '@/hooks/useUserHandler';

export default function SettingsPage() {
  const { handleLogout} = useUserHandler()
  const router = useRouter();

  return (
    <SettingsView>
      <SettingsSection title={t('settings.account')}>
        <SettingsOption 
          icon="account" 
          label={t('settings.profile')} 
          onPress={() => router.push('/(settings)/profile')} 
        />
        <SettingsOption 
          icon="shield-account" 
          label={t('settings.officeRoles')} 
          onPress={() => router.push('/(settings)/office-roles')}
        />
        <SettingsOption
          icon="email-edit"
          label={t('settings.changeEmail')}
          onPress={() => router.push('/(settings)/change-email')}
        />
        <SettingsOption
          icon="lock-reset"
          label={t('settings.changePassword')}
          onPress={() => router.push('/(settings)/change-password')}
        />
        <SettingsOption
          icon="logout"
          label={t('settings.logout')}
          onPress={handleLogout}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.preferences')}>
        <SettingsOption
          icon="theme-light-dark"
          label={t('settings.theme')}
          onPress={() => router.push('/(settings)/theme')}
        />
        <SettingsOption
          icon="translate"
          label={t('settings.language')}
          onPress={() => router.push('/(settings)/language')}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.appInfo')}>
        <SettingsOption
          icon="file-document"
          label={t('settings.terms')}
          onPress={() => router.push('/(settings)/terms')}
        />
        <SettingsOption
          icon="shield-lock"
          label={t('settings.privacy')}
          onPress={() => router.push('/(settings)/privacy')}
        />
        <SettingsOption
          icon="alert-circle"
          label={t('settings.reportProblem')}
          onPress={() => router.push('/(settings)/report-problem')}
        />
        <SettingsOption
          icon="information"
          label={t('settings.version')}
          pressable={false}
          value={"v"+config.expo.version}
        />
      </SettingsSection>
    </SettingsView>
  );
}
