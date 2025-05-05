import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

type ThemedPressableProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  borderless?: boolean;
  rippleColor?: string;
};

export default function ThemedPressable({
  onPress,
  children,
  style,
  borderless = true,
  rippleColor,
}: ThemedPressableProps) {
    
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={onPress}
      style={[styles.container, style]}
      borderless={borderless}
      rippleColor={rippleColor || theme.colors.primary}
    >
      {children}
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});
