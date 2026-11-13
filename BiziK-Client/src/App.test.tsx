import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: () => Promise.resolve({ data: [] }) },
}));

beforeAll(() => {
  // jsdom has no matchMedia; the dark-mode hook needs it
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    } as unknown as MediaQueryList);
});

test("guests can open the public cards directory without signing in", () => {
  window.history.pushState({}, "", "/all-cards");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /all bizik cards/i })
  ).toBeInTheDocument();
});
