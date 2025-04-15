import { TextInput } from "react-native-paper";
import React from "react";

export default function AuthInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      mode="outlined"
      style={[{ marginBottom: 12 }, props.style]}
      {...props}
    />
  );
}
