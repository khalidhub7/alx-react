// check if running in a browser
const checker = [typeof window, typeof document];
if (checker.includes("undefined")) {
  process.exit(0);
}

import $ from "jquery";
import { debounce } from "lodash";
import "./body.css";

$(() => {
  $("body").append("<button>Click here to get started</button>");
  $("body").append('<p id="count"></p>');

  let count = 0;
  const updateCounter = () => {
    count += 1;
    $("#count").text(`${count} clicks on the button`);
  };
  const debouncedFunc = debounce(updateCounter, 500);
  $("button").on("click", debouncedFunc);
});
