import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type React from "react";
import { useMemo, useState } from "react";
import { useTradesStore } from "../store/useTradesStore";
import { type ITrade } from "../store/useTradesStore";
import { isBefore, startOfDay } from "date-fns";

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
        renderCell: (params: GridRenderCellParams<ITrade>) => {
          const row = params.row;
          const isExpired = isBefore(
            startOfDay(row.maturityDate),
            startOfDay(new Date())
          );
          return (
            <>
              {isExpired && <Chip label="Expired" color="error" />}
              {!isExpired && <Chip label="Live" color="success" />}
            </>
          );
        },
      },
    ],
    []
  );

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5, // Initial page size
    page: 0,
  });

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
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
      ></DataGrid>
    </Box>
  );
};

export default Trades;
