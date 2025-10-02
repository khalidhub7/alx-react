// check if running in a browser
const checker = [typeof window, typeof document];
if (checker.includes("undefined")) {
  process.exit(0);
}

import $ from "jquery";
import "./header.css";

$(() => {
  $("body").append('<p id="logo"></p>');
  $("body").append("<h1>ALX Dashboard</h1>");

  console.log("Init header");
});
