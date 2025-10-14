import {
  getFullYear,
  getFooterCopy,
  getLatestNotification,
} from "./utils";

test("test getFullYear func", () => {
  expect(getFullYear()).toBe(new Date().getFullYear());
});

test("test getFooterCopy func", () => {
  expect(getFooterCopy(true)).toBe("ALX");
  expect(getFooterCopy(false)).toBe("ALX main dashboard");
});

test("test getLatestNotification func", () => {
  expect(getLatestNotification()).toBe(
    "<strong>Urgent requirement</strong> - complete by EOD",
  );
});
