import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "./App";

describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    render(<App />);

    screen.debug();
  });
});
