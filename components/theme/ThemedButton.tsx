import React from "react";
import { Button, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function ThemedButton(props: React.ComponentProps<typeof Button>) {
  const theme = useTheme();

  return (
    <Button
      mode={props.mode ?? "outlined"}
      buttonColor={theme.colors.primary} // forces contained background
      contentStyle={styles.content}
      style={[styles.button, props.style]}
      labelStyle={{ color: theme.colors.onPrimary }}
      {...props}
    >
    {props.children}
  </Button>

  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 6,
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
});
