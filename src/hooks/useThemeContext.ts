import { createContext, useContext } from "react";

interface ThemeContextType {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export default useThemeContext;
