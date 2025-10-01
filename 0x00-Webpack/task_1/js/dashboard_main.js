// check if running in a browser
const checker = [typeof window, typeof document];
if (checker.includes("undefined")) {
  process.exit(0);
}

import $ from "jquery";
import { debounce } from "lodash";

$(() => {
  $("body").append("<p>ALX Dashboard</p>");
  $("body").append("<p>Dashboard data for the students</p>");
  $("body").append("<button>Click here to get started</button>");
  $("body").append('<p id="count"></p>');
  $("body").append("<p>Copyright - ALX</p>");

  let count = 0;
  const updateCounter = () => {
    count += 1;
    $("#count").text(`${count} clicks on the button`);
  };

  const debouncedFunc = debounce(updateCounter, 300);

  $("button").on("click", debouncedFunc);
});
