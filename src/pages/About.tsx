import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
        data-testid="aboutHeader"
      >
        About
      </Typography>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <p data-testid="aboutContent">
          Trade store enabled you to see Trades, sort, search trades in on Trade
          Dashboard. It also provides capability to create new trades, edit
          existing trades
        </p>
      </div>
    </Box>
  );
}
