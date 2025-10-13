import { render } from "@testing-library/react";
import Notifications from "./Notifications";

test("test Notifications component", () => {
  const { container } = render(<Notifications />);

  expect(
    container.querySelectorAll(
      ".Notifications > ul:first-of-type > li",
    ),
  ).toHaveLength(3);

  expect(
    container.querySelector(".Notifications > p").textContent,
  ).toBe("Here is the list of notifications");
});
