import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

export default function ThemedView(props: ViewProps) {
  const theme = useTheme<MD3Theme>();

  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background, // ✅ this will change
        },
        props.style,
      ]}
    />
  );
}
