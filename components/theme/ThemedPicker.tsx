import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Menu, TextInput, useTheme } from "react-native-paper";

type PickerItem = {
  label: string;
  value: number;
};

type Props = {
  label: string;
  selectedValue: number | null;
  onValueChange: (val: number) => void;
  items: PickerItem[];
};

export default function ThemedPickerMenuWorking({
  label,
  selectedValue,
  onValueChange,
  items,
}: Props) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const selectedLabel =
    items.find((i) => i.value === selectedValue)?.label ?? "";

  return (
    <View style={styles.container}>
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
              right={<TextInput.Icon icon="menu-down" onPress={() => setVisible(true)} />}
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
