import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import type { TextProps, MD3Theme } from 'react-native-paper';

type VariantType = 'headlineMedium' | 'bodyMedium' | 'labelLarge';

type ThemedTextProps = TextProps<VariantType> & {
  type?: 'title' | 'body' | 'label';
};

export function ThemedText({ type = 'body', style, ...props }: ThemedTextProps) {
  const theme = useTheme<MD3Theme>();

  const variantMap: Record<NonNullable<ThemedTextProps['type']>, VariantType> = {
    title: 'headlineMedium',
    body: 'bodyMedium',
    label: 'labelLarge',
  };

  return (
    <Text
      variant={variantMap[type]}
      style={[{ color: theme.colors.onBackground }, style]} // ✅ text color changes
      {...props}
    />
  );
}
