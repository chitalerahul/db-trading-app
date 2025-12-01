import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Menu from "./Menu";
import { BASE } from "../mocks/tradesConst";

const mockNavigate = vi.fn(); // Create a mock function for useNavigate
const mockLocation = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: object = await importOriginal(); // Import actual exports from react-router-dom
  return {
    ...actual, // Keep other exports as they are
    useNavigate: () => mockNavigate, // Replace useNavigate with your mock
    useLocation: () => mockLocation,
  };
});
describe("Menu Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Clear mock calls before each test
    mockLocation.mockClear();
    render(<Menu />);
  });
  it("Menu is Visible", () => {
    const menuHeader = screen.getAllByTestId("menu");
    expect(menuHeader[0]).toBeVisible();
    expect(menuHeader[0]).toHaveTextContent("Menu");
  });
  it("Menu Items list is visible", () => {
    const menuItems = screen.getAllByTestId("menuItems");
    expect(menuItems[0]).toBeVisible();
  });

  describe("MenuItems", () => {
    it("Menu list items are visible", () => {
      const menuItemTradesDashboard = screen.getAllByTestId(
        "menuItemTrades Dashboard"
      );
      const menuItemCreateTrade = screen.getAllByTestId("menuItemCreate Trade");
      const menuItemAbout = screen.getAllByTestId("menuItemAbout");
      expect(menuItemTradesDashboard[0]).toBeVisible();
      expect(menuItemCreateTrade[0]).toBeVisible();
      expect(menuItemAbout[0]).toBeVisible();
    });
    it("Trades Dashboard click navigates to Trades Dasshboard", () => {
      const menuButtonTradesDashboard = screen.getAllByTestId(
        "menuButtonTrades Dashboard"
      );
      menuButtonTradesDashboard[0].click();
      expect(mockNavigate).toHaveBeenCalledWith(BASE + "trades");
    });
    it("Create Trade click navigates to Create Trade", () => {
      const menuButtonCreateTrade = screen.getAllByTestId(
        "menuButtonCreate Trade"
      );
      menuButtonCreateTrade[0].click();
      expect(mockNavigate).toHaveBeenCalledWith(BASE + "createtrade");
    });
    it("Create Trade click navigates to About", () => {
      const menuButtonAbout = screen.getAllByTestId("menuButtonAbout");
      menuButtonAbout[0].click();
      expect(mockNavigate).toHaveBeenCalledWith(BASE + "about");
    });
  });
});
