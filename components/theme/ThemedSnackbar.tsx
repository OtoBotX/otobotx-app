import React from "react";
import { Snackbar, useTheme } from "react-native-paper";

type Props = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
};

export default function ThemedSnackbar({ visible, message, onDismiss }: Props) {
  const theme = useTheme();

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      style={{ backgroundColor: theme.colors.inverseSurface }}
    >
      {message}
    </Snackbar>
  );
}
