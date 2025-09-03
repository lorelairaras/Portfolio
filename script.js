const themeToggleBtn = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
});

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 20,
      behavior: "smooth",
    });
  });
});
