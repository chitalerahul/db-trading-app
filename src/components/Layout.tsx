import type { ReactElement } from "react";

import { AppBar, styled } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import styles from "./Layout.module.css";
import Menu from "./Menu";
import Header from "./Header";

interface LayoutProps {
  children: ReactElement;
}

const drawerWidth = 225;

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
  return (
    <div style={{ display: "flex", minHeight: "780px" }}>
      <StyledAppbar>
        <Header />
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
