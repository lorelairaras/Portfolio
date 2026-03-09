document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const navLinks = document.querySelectorAll("nav a.nav-link");
  const sections = document.querySelectorAll("section[id]");
  const copyBtn = document.getElementById("copy-email");
  const copyMsg = document.getElementById("copy-msg");
  const hireBtn = document.getElementById("hire-me");

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const trails = [...document.querySelectorAll(".cursor-trail")];

  const setTheme = (theme, save = true) => {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);

    if (themeToggleBtn) {
      themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    }

    if (save) {
      localStorage.setItem("theme", theme);
    }
  };

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return prefersDarkScheme.matches ? "dark" : "light";
  };

  setTheme(getPreferredTheme(), false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      setTheme(nextTheme, true);

      themeToggleBtn.classList.add("animate-spin");
      setTimeout(() => themeToggleBtn.classList.remove("animate-spin"), 300);

      body.classList.add("transition-colors", "duration-500");
    });
  }

  prefersDarkScheme.addEventListener("change", (event) => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      setTheme(event.matches ? "dark" : "light", false);
    }
  });

  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => {
      section.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
      revealObserver.observe(section);
    });

    const activeSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => activeSectionObserver.observe(section));
  }

  if (copyBtn && copyMsg) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("lorelairaras@gmail.com");
        copyMsg.classList.remove("hidden");
        setTimeout(() => copyMsg.classList.add("hidden"), 2000);
      } catch (error) {
        copyMsg.textContent = "Could not copy email.";
        copyMsg.classList.remove("hidden");
        setTimeout(() => {
          copyMsg.classList.add("hidden");
          copyMsg.textContent = "Email copied to clipboard!";
        }, 2000);
      }
    });
  }

  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      window.location.href = "mailto:lorelairaras@gmail.com?subject=Hiring Inquiry";
    });
  }

  const isDesktop = window.matchMedia("(min-width: 769px)").matches;
  if (isDesktop && dot && ring && trails.length) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const trailPositions = trails.map(() => ({ x: mouseX, y: mouseY }));

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      let prevX = mouseX;
      let prevY = mouseY;

      trailPositions.forEach((pos, index) => {
        const easing = Math.max(0.08, 0.22 - index * 0.02);
        pos.x += (prevX - pos.x) * easing;
        pos.y += (prevY - pos.y) * easing;

        trails[index].style.transform =
          `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${1 - index * 0.12})`;
        trails[index].style.opacity = `${Math.max(0.08, 0.32 - index * 0.05)}`;

        prevX = pos.x;
        prevY = pos.y;
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();
  }
});