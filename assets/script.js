document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll('a[href^="#"]');
  const contactForm = document.querySelector(".contact-form");

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, sectionObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          sectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  if (topbar) {
    const handleScroll = () => {
      topbar.classList.toggle("scrolled", window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = contactForm.querySelectorAll("[required]");
      const status = contactForm.querySelector(".form-status");
      let valid = true;

      requiredFields.forEach((field) => {
        const group = field.closest(".form-group");
        const message = group ? group.querySelector(".error-message") : null;

        if (group) {
          group.classList.remove("invalid");
        }

        if (message) {
          message.textContent = "";
        }

        const value = field.value.trim();
        const isEmail = field.type === "email";
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!value || (isEmail && !emailValid)) {
          valid = false;
          if (group) {
            group.classList.add("invalid");
          }

          if (message) {
            message.textContent = isEmail
              ? "Ingresa un correo válido."
              : "Este campo es obligatorio.";
          }
        }
      });

      if (status) {
        status.textContent = valid
          ? "¡Gracias! Tu solicitud fue enviada correctamente."
          : "Por favor revisa los campos marcados.";
      }

      if (valid) {
        contactForm.reset();
      }
    });
  }
});
