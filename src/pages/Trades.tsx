import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type React from "react";
import { useMemo } from "react";
import { useTradesStore } from "../store/useTradesStore";

const Trades: React.FC = () => {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
      },
      {
        field: "version",
        headerName: "Version",
      },
      {
        field: "counterPartyId",
        headerName: "Counter Party Id",
      },
      {
        field: "bookId",
        headerName: "Book ID",
      },
      {
        field: "maturityDate",
        headerName: "Maturity Date",
      },
      {
        field: "createdDate",
        headerName: "Created Date",
      },
      {
        field: "expired",
        headerName: "Expired",
      },
    ],
    []
  );

  const { isLoading, error, data } = useTradesStore();

  if (isLoading) return <CircularProgress />;

  if (error) return <div>Error occured in fetching trades</div>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Trade Dashboard
      </Typography>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
      ></DataGrid>
    </Box>
  );
};

export default Trades;
