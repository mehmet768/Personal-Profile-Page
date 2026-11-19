// Mobil Menü Aç/Kapat
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navIcons = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // İkon değişimi: çarpı / menü
  const isActive = navLinks.classList.contains("active");
  navIcons.className = isActive ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

// Linklere tıklandığında menüyü kapat
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navIcons.className = "fa-solid fa-bars";
  });
});

// Kaydırma esnasında aktif linki güncelle
const sections = document.querySelectorAll("section");
const navLinkItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/*Back to top */
function animateToTop(e) {
  e.preventDefault();
  let scrollToTop = window.setInterval(function () {
    let pos = window.pageYOffset;
    if (pos > 0 && pageYOffset >= 10) {
      window.scrollTo(0, pos - 20);
      document.querySelector(".scrolimg").style.visibility = "visible";
    } else {
      window.clearInterval(scrollToTop);
      document.querySelector(".scrolimg").style.visibility = "visible";
    }
  }, 9);
}

// === Sayaç Animasyonu ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 500; // Daha yavaş için arttır

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / speed;

          const updateCount = () => {
            const curr = +counter.innerText;
            if (curr < target) {
              counter.innerText = Math.ceil(curr + increment);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
});
