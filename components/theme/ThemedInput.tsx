import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { StyleProp, ViewStyle } from "react-native";

type Props = React.ComponentProps<typeof TextInput> & {
  containerStyle?: StyleProp<ViewStyle>;
};

export default function ThemedInput( props: Props) {
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      style={{ marginBottom: 12 }}
      outlineColor={theme.colors.outline}
      activeOutlineColor={theme.colors.primary}
      theme={{ colors: { text: theme.colors.onSurface } }}
      {...props}
    />
  );
}
