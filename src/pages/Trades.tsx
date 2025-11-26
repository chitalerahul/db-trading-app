import { useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type React from "react";
import { useTradesStore } from "../store/useTradesStore";
import { type ITrade } from "../store/useTradesStore";
import { isBefore, startOfDay } from "date-fns";
import { useNavigate } from "react-router-dom";

const Trades: React.FC = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
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
    {
      field: "Edit",
      headerName: "Edit",
      renderCell: (params: GridRenderCellParams<ITrade>) => {
        return (
          <IconButton
            aria-label="Edit Trade"
            color="primary"
            onClick={() =>
              navigate(`/edittrade/${params.row.id}`, { state: params.row })
            }
          >
            <EditNoteIcon></EditNoteIcon>
          </IconButton>
        );
      },
    },
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
      headerName: "Maturity",
    },
    {
      field: "createdDate",
      headerName: "Created",
    },
  ];

  const {
    isLoading,
    error,
    data,
    filterModel,
    setFilterModel,
    sortModel,
    setSortModel,
    paginationModel,
    setPaginationModel,
  } = useTradesStore();

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
        onPaginationModelChange={(newPaginationModel) =>
          setPaginationModel(newPaginationModel)
        }
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      ></DataGrid>
    </Box>
  );
};

export default Trades;
