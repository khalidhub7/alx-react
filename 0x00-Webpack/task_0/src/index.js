// check if running in a browser
const checker = [typeof window, typeof document];
if (checker.includes("undefined")) {
  process.exit(0);
}

import $ from "jquery";

$(() => {
  const p = [
    "ALX Dashboard",
    "Dashboard data for the students",
    "Copyright - ALX",
  ];
  p.map((i) => {
    $("body").append(`<p>${i}</p>`);
  });
});
