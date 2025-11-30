import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Trade from "./Trade";
import { trades } from "../mocks/tradesConst";
import { format, startOfDay, subDays } from "date-fns";

const mockNavigate = vi.fn(); // Create a mock function for useNavigate
const tradeState = {
  id: "T8",
  version: 1,
  counterPartyId: "CP-2",
  bookId: "B2",
  maturityDate: format(startOfDay(new Date()), "yyy-MM-dd"),
  createdDate: format(startOfDay(new Date()), "yyy-MM-dd"),
};

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = (await importOriginal()) as object;
  return {
    ...mod,
    useLocation: vi.fn(() => ({ state: tradeState })),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../store/useTradesStore", () => ({
  useTradesStore: vi.fn(() => ({
    data: trades,
    updateRemoteTrade: vi.fn(), // Mock the function returned by the hook
    addRemoteTrade: vi.fn(), // Mock the function returned by the hook
  })),
}));

describe("Trade Compnent", () => {
  describe("Edit Trade", () => {
    beforeEach(() => {
      mockNavigate.mockClear(); // Clear mock calls before each test

      render(<Trade />);
    });

    it("Header is Visible", () => {
      const tradeHeader = screen.getAllByTestId("tradeHeader");
      expect(tradeHeader[0]).toBeVisible();
      expect(tradeHeader[0]).toHaveTextContent("Edit Trade");
    });

    it("Required Validation", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");
      const version = screen.getByTestId("version") as HTMLInputElement;
      const couterPartyId = screen.getByTestId(
        "couterPartyId"
      ) as HTMLInputElement;
      const bookId = screen.getByTestId("bookId") as HTMLInputElement;
      const maturityDate = screen.getByTestId(
        "maturityDate"
      ) as HTMLInputElement;

      await userEvent.clear(version);
      await userEvent.clear(couterPartyId);
      await userEvent.clear(bookId);
      await userEvent.clear(maturityDate);
      await userEvent.click(tradeSubmit);
      await waitFor(() => {
        const versionError = screen.getByTestId("versionError");
        expect(versionError).toBeVisible();
        expect(versionError).toHaveTextContent("This field is required");
        const couterPartyIdError = screen.getByTestId("couterPartyIdError");
        expect(couterPartyIdError).toBeVisible();
        expect(couterPartyIdError).toHaveTextContent("This field is required");
        const bookIdError = screen.getByTestId("bookIdError");
        expect(bookIdError).toBeVisible();
        expect(bookIdError).toHaveTextContent("This field is required");
        const maturityDateError = screen.getByTestId("maturityDateError");
        expect(maturityDateError).toBeVisible();
        expect(maturityDateError).toHaveTextContent("This field is required");
      });
    });

    it("Trade Version should be greater Validation", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");

      await userEvent.click(tradeSubmit);
      await waitFor(() => {
        const versionError = screen.getByTestId("versionError");
        expect(versionError).toBeVisible();
        expect(versionError).toHaveTextContent(
          "Updated Vesrion should be greater than or equal to save version"
        );
      });
    });

    it("When the version is greated than saved version no error shuld be shown", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");
      const version = screen.getByTestId("version") as HTMLInputElement;
      await userEvent.type(version, "7");
      await userEvent.click(tradeSubmit);
      await waitFor(() => {
        const versionError = screen.queryByTestId("versionError");
        expect(versionError).not.toBeInTheDocument();
      });
    });

    it("Maturity Date lesser than today should through error ", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");
      const maturityDate = screen.getByTestId(
        "maturityDate"
      ) as HTMLInputElement;
      const yesterday = format(
        startOfDay(subDays(new Date(), 1)),
        "yyyy-MM-dd"
      );
      await userEvent.clear(maturityDate);
      await userEvent.type(maturityDate, yesterday);
      await userEvent.click(tradeSubmit);

      await waitFor(() => {
        const maturityDateError = screen.getByTestId("maturityDateError");
        expect(maturityDateError).toBeVisible();
        expect(maturityDateError).toHaveTextContent(
          "Maturity Date should be greater or equal to today's date"
        );
      });
    });

    it("Edit Trade submit", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");
      const version = screen.getByTestId("version") as HTMLInputElement;
      await userEvent.type(version, "7");
      await userEvent.click(tradeSubmit);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled();
      });
    });

    it("Edit Trade submit with same version", async () => {
      const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
      const tradeSubmit = screen.getByTestId("tradeSubmit");
      const version = screen.getByTestId("version") as HTMLInputElement;
      await userEvent.clear(version);
      await userEvent.type(version, "5");
      await userEvent.click(tradeSubmit);

      await waitFor(() => {
        expect(confirmSpy).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalled();
      });
    });
  });
});
