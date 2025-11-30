import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./About";

describe("About Component", () => {
  it("Header is Visible", () => {
    render(<About />);
    const aboutHeader = screen.getAllByTestId("aboutHeader");
    expect(aboutHeader[0]).toBeVisible();
    expect(aboutHeader[0]).toHaveTextContent("About");
  });
  it("Content is visible", () => {
    render(<About />);
    const aboutContent = screen.getAllByTestId("aboutContent");
    expect(aboutContent[0]).toBeVisible();
  });
});
