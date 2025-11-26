import type React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      text: "Trades Dashboard",
      icon: <DashboardIcon color="secondary" />,
      path: "/trades",
    },
    {
      text: "Create Trade",
      icon: <CreateIcon color="secondary" />,
      path: "/createtrade",
    },
    {
      text: "About",
      icon: <InfoIcon color="secondary" />,
      path: "/about",
    },
  ];
  return (
    <>
      <div style={{ paddingLeft: "16px" }}>
        <Typography variant="h5">Menu</Typography>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.contrast", // Example active background color
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Menu;
