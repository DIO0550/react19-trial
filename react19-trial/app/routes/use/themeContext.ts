import { createContext, useContext } from "react";

export const Theme = {
  light: "light",
  dark: "dark",
} as const;
export type Theme = (typeof Theme)[keyof typeof Theme];

type ThemeContextValue = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);
export const useThemeContext = () => useContext(ThemeContext);
