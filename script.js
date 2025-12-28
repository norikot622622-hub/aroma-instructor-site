document.addEventListener("DOMContentLoaded", () => {
  // ハンバーガーメニュー制御
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        const isExternal =
          href.startsWith("http") && !link.href.includes(location.hostname);

        // 外部リンクはメニュー閉じ処理を適用しない
        if (!isExternal) {
          navLinks.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // 現在表示中セクションのハイライト
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((a) => a.classList.remove("active"));
          const activeLink = document.querySelector(
            `.nav-links a[href="#${id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { threshold: 0.6 }
  );
  sections.forEach((section) => observer.observe(section));

  // 画面幅切替時のリセット
  const mq = window.matchMedia("(min-width: 769px)");
  mq.addEventListener("change", (e) => {
    if (e.matches && navLinks && hamburger) {
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // 外部リンク処理
  const externalLinks = Array.from(
    document.querySelectorAll('a[href^="http"]')
  ).filter((link) => !link.href.includes(location.hostname));

  externalLinks.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    link.addEventListener("click", (e) => {
      if (
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        window.open(link.href, "_blank");
      }
    });
  });
});
