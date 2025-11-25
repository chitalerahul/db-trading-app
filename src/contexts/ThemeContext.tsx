// src/ThemeContext.tsx
import React, { useState, useMemo, type ReactNode } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "../hooks/useThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const t =
      mode === "light"
        ? {
            primary: {
              main: "#3f51b5",
            },
            secondary: {
              main: "#f50057",
            },
          }
        : {
            primary: {
              main: "#3f51b5",
            },
            secondary: {
              main: "#f50057",
            },
          };
    return createTheme({
      palette: {
        mode,
        ...t,
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {/* Resets CSS and provides a consistent baseline */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
