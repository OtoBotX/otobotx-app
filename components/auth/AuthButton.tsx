import { Button, useTheme } from "react-native-paper";
import React from "react";

export default function AuthButton(props: React.ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      style={{ marginTop: 8 }}
      contentStyle={{ backgroundColor: theme.colors.primary }}
      {...props}
    >
      {props.children}
    </Button>
  );
}
