import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Trade from "./Trade";
import { trades } from "../mocks/tradesConst";
import { format, startOfDay } from "date-fns";

const mockNavigate = vi.fn(); // Create a mock function for useNavigate
const mockLocation = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = (await importOriginal()) as object;
  return {
    ...mod,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

vi.mock("../store/useTradesStore", () => ({
  useTradesStore: vi.fn(() => ({
    data: trades,
    updateRemoteTrade: vi.fn(), // Mock the function returned by the hook
    addRemoteTrade: vi.fn(), // Mock the function returned by the hook
  })),
}));

describe("Trade Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Clear mock calls before each test
    mockLocation.mockClear();

    render(<Trade />);
  });
  describe("Create Trade", () => {
    it("Header is Visible", () => {
      const tradeHeader = screen.getAllByTestId("tradeHeader");
      expect(tradeHeader[0]).toBeVisible();
      expect(tradeHeader[0]).toHaveTextContent("Add Trade");
    });

    it("Required Validation", async () => {
      const tradeSubmit = screen.getByTestId("tradeSubmit");

      await userEvent.click(tradeSubmit);
      await waitFor(() => {
        const idError = screen.getByTestId("idError");
        expect(idError).toBeVisible();
        expect(idError).toHaveTextContent("This field is required");
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

    it("Trade Id Unique Validation", async () => {
      const id = screen.getByTestId("id") as HTMLInputElement;
      const tradeSubmit = screen.getByTestId("tradeSubmit");

      await userEvent.type(id, "T1");
      await userEvent.click(tradeSubmit);
      await waitFor(() => {
        const idError = screen.getByTestId("idError");
        expect(idError).toHaveTextContent(
          "Trade Id already exists. Please enter another trade id."
        );
      });
    });

    it("Form is submitted for valid input", async () => {
      const id = screen.getByTestId("id") as HTMLInputElement;
      const version = screen.getByTestId("version") as HTMLInputElement;
      const couterPartyId = screen.getByTestId(
        "couterPartyId"
      ) as HTMLInputElement;
      const bookId = screen.getByTestId("bookId") as HTMLInputElement;
      const maturityDate = screen.getByTestId(
        "maturityDate"
      ) as HTMLInputElement;
      const tradeSubmit = screen.getByTestId("tradeSubmit");

      await userEvent.type(id, "T99");
      await userEvent.type(version, "1");
      await userEvent.type(couterPartyId, "CP-1");
      await userEvent.type(bookId, "B2");
      await userEvent.type(
        maturityDate,
        format(startOfDay(new Date()), "yyyy-MM-dd")
      );
      await userEvent.click(tradeSubmit);

      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
