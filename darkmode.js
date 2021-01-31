let theme_btn = document.querySelector("#theme-type");

let user_theme = localStorage.getItem("MATERIALSOUL_THEME");
if (user_theme == null) {
  localStorage.setItem("MATERIALSOUL_THEME", "dark");
} else if (user_theme == "light") {
  document.documentElement.classList.remove("is_dark");
  theme_btn.checked = true;
}


theme_btn.addEventListener("change", () => {

  if (theme_btn.checked) {
    document.documentElement.classList.remove("is_dark");
    localStorage.setItem("MATERIALSOUL_THEME", "light");

  } else {
    document.documentElement.classList.add("is_dark");
    localStorage.setItem("MATERIALSOUL_THEME", "dark");

  }
});