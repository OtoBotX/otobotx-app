import { Snackbar } from "react-native-paper";

export default function AuthSnackbar({
  visible,
  onDismiss,
  message,
}: {
  visible: boolean;
  onDismiss: () => void;
  message: string;
}) {
  return (
    <Snackbar visible={visible} onDismiss={onDismiss}>
      {message}
    </Snackbar>
  );
}
