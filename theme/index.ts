import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#000000",
    surface: "#1A1A1A",
    primary: "#800020",
    onPrimary: "#FFFFFF",
    onBackground: "#E0E0E0",
    onSurface: "#CCCCCC",
    secondary: "#CCCCCC",
    outline: "#555555",
    surfaceVariant: "#111111",
    elevation: {
      level0: "transparent",
      level1: "#111111",
      level2: "#1C1C1C",
      level3: "#222222",
      level4: "#2A2A2A",
      level5: "#333333",
    },
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: "#FAFAFA",
    surface: "#FFFFFF",
    primary: "#6200EE", // Paper default purple (or we can tune)
    onPrimary: "#FFFFFF",
    onBackground: "#222222",
    onSurface: "#333333",
    secondary: "#03DAC6",
    outline: "#B0B0B0",
    surfaceVariant: "#F5F5F5",
    elevation: {
      level0: "transparent",
      level1: "#F2F2F2",
      level2: "#E6E6E6",
      level3: "#DDDDDD",
      level4: "#D4D4D4",
      level5: "#CCCCCC",
    },
  },
};
