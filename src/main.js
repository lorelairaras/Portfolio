document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  const currentTheme = savedTheme || (prefersDarkScheme.matches ? "dark" : "light");

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    themeToggleBtn.textContent = "☀️";
  } else {
    document.documentElement.classList.remove("dark");
    themeToggleBtn.textContent = "🌙";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";

    themeToggleBtn.classList.add("animate-spin");
    setTimeout(() => themeToggleBtn.classList.remove("animate-spin"), 300);

    document.body.classList.add("transition-colors", "duration-500");
  });

  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.classList.add("opacity-0", "translate-y-10");
    observer.observe(section);
  });

  const copyBtn = document.getElementById("copy-email");
  const copyMsg = document.getElementById("copy-msg");

  if (copyBtn && copyMsg) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("lorelairaras@gmail.com");
      copyMsg.classList.remove("hidden");
      setTimeout(() => copyMsg.classList.add("hidden"), 2000);
    });
  }

  const hireBtn = document.getElementById("hire-me");
  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      window.location.href = "mailto:lorelairaras@gmail.com?subject=Hiring Inquiry";
    });
  }
});
