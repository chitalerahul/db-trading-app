import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { GridFilterModel } from "@mui/x-data-grid";
import { create } from "zustand";

export interface ITrade {
  id: string;
  version: number;
  counterPartyId: string;
  bookId: string;
  maturityDate: Date;
  createdDate?: Date | "";
}

interface ITradesState {
  data: ITrade[];
  isLoading: boolean;
  error: string | null;
  filterModel?: GridFilterModel;
  sortModel?: GridSortModel;
  paginationModel?: GridPaginationModel;
  fetchTrades: () => Promise<void> | void;
  updateTrade: (t: ITrade) => void;
  setFilterModel: (model: GridFilterModel) => void;
  setSortModel: (model: GridSortModel) => void;
  setPaginationModel: (model: GridPaginationModel) => void;
}

export const useTradesStore = create<ITradesState>((set, get) => ({
  data: [],
  isLoading: false,
  error: null,
  filterModel: undefined,
  sortModel: undefined,
  paginationModel: {
    pageSize: 5, // Initial page size
    page: 0,
  },
  fetchTrades: async () => {
    set({ isLoading: true, error: null }); // Set loading state before fetching
    try {
      const response = await fetch("http://localhost:5173/api/trades");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      set({ data, isLoading: false }); // Update state with fetched data
    } catch (error: unknown) {
      const typedError = error as Error;
      set({ error: typedError.message, isLoading: false }); // Handle errors
    }
  },
  updateTrade: (t) => {
    set({ data: get().data.map((trade) => (trade.id === t.id ? t : trade)) });
  },
  setFilterModel: (model: GridFilterModel) => {
    set({ filterModel: model });
  },
  setSortModel: (model: GridSortModel) => {
    set({ sortModel: model });
  },
  setPaginationModel: (model: GridPaginationModel) => {
    set({ paginationModel: model });
  },
}));
