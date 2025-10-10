import App from "./App";
import { render } from "@testing-library/react";

test("test App component", () => {
  const { container } = render(<App />);

  expect(
    container.querySelectorAll(".App-header"),
  ).toHaveLength(1);
  expect(
    container.querySelectorAll(".App-body"),
  ).toHaveLength(1);
  expect(
    container.querySelectorAll(".App-footer"),
  ).toHaveLength(1);
});
