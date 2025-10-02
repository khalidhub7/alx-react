// check if running in a browser
const checker = [typeof window, typeof document];
if (checker.includes("undefined")) {
  process.exit(0);
}

import $ from "jquery";
import "./footer.css";

$(() => {
  $("body").append("<p>Copyright - ALX</p>");
});
