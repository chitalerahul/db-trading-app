import type { ReactElement } from "react";

import {
  AppBar,
  Box,
  Button,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import useThemeContext from "../hooks/useThemeContext";
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

const StyledAppbar = styled(AppBar)(() => ({
  width: `calc(100% - ${drawerWidth}px)`,
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleColorMode } = useThemeContext();

  return (
    <div style={{ display: "flex", minHeight: "780px" }}>
      <StyledAppbar>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachMoneyIcon />
            <Typography>Trade App</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            {" "}
            {/* ml: 'auto' pushes to the right */}
            <Button
              sx={{ align: "right" }}
              variant="contained"
              onClick={toggleColorMode}
            >
              Toggle Theme
            </Button>
          </Box>
        </Toolbar>
      </StyledAppbar>
      <StyledDrawer variant="permanent" anchor="left">
        <Menu></Menu>
      </StyledDrawer>
      <div className={styles.pageContent}>
        <div className={styles.contentPusher}>&nbsp;</div>

        {children}
      </div>
    </div>
  );
};

export default Layout;
