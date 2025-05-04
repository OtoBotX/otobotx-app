import React, { useState } from "react";
import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { Menu, TextInput, useTheme } from "react-native-paper";

type PickerItem<T extends string | number> = {
  label: string;
  value: T;
};

type Props<T extends string | number> = {
  label: string;
  selectedValue: T | null;
  onValueChange: (val: T) => void;
  items: readonly PickerItem<T>[];
  icon?: string;
  style?: ViewStyle;
};

export default function ThemedPickerMenuWorking<T extends string | number>({
  label,
  selectedValue,
  onValueChange,
  items,
  icon,
  style,
}: Props<T>) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const selectedLabel =
    items.find((i) => i.value === selectedValue)?.label ?? "";

  return (
    <View style={[styles.container, style]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable onPress={() => setVisible(true)}>
            <TextInput
              label={label}
              value={selectedLabel}
              mode="outlined"
              editable={false}
              pointerEvents="none"
              right={icon ? (
                <TextInput.Icon icon={icon} onPress={() => setVisible(true)}/>
              ) : (
                <TextInput.Icon icon="menu-down" onPress={() => setVisible(true)}/>
              )}
              outlineColor={theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
              theme={{ colors: { text: theme.colors.onSurface } }}
            />
          </Pressable>
        }
      >
        {items.map((item) => (
          <Menu.Item
            key={item.value}
            title={item.label}
            onPress={() => {
              onValueChange(item.value);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
});
