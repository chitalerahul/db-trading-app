import { Button, styled, Typography } from "@mui/material";
import useThemeContext from "../hooks/useThemeContext";
import type { ReactElement } from "react";
import Drawer from "@mui/material/Drawer";

import styles from "./Layout.module.css";
import Menu from "./Menu";

interface LayoutProps {
  children: ReactElement;
}

const drawerWidth = 250;

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: "border-box", // Ensure padding/border don't increase total width
  },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleColorMode, mode } = useThemeContext();

  return (
    <div style={{ display: "flex" }}>
      <StyledDrawer variant="permanent" anchor="left">
        <Menu></Menu>
      </StyledDrawer>
      <div className={styles.pageContent}>
        <Typography variant="h4">Current Theme: {mode}</Typography>
        <Button variant="contained" onClick={toggleColorMode}>
          Toggle Theme
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Layout;
