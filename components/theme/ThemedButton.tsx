import React from "react";
import { Button, useTheme } from "react-native-paper";

export default function ThemedButton(props: React.ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      contentStyle={{
        backgroundColor: theme.colors.primary,
      }}
      style={{ borderRadius: 8, marginTop: 16 }}
      labelStyle={{ color: theme.colors.onPrimary }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
