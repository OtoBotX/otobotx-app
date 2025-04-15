import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { ThemedText } from "@/components/theme/ThemedText";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function AuthText({ children, style }: Props) {
  const theme = useTheme();

  return (
    <ThemedText
      type="title"
      style={[
        {
          marginBottom: 16,
          color: theme.colors.onBackground,
        },
        style,
      ]}
    >
      {children}
    </ThemedText>
  );
}
