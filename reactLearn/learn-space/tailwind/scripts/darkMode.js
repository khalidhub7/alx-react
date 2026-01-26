const btn = document.querySelector("#darkMode");

if (btn) {
  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    // console.log(document.documentElement.classList.length);
  });
}
