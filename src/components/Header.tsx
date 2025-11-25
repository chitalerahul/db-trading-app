import type React from "react";
import useThemeContext from "../hooks/useThemeContext";
import { Toolbar, Box, Typography, Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Header: React.FC = () => {
  const { toggleColorMode } = useThemeContext();

  return (
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
  );
};

export default Header;
