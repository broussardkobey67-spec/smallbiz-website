/* Cedar & Stone — small, dependency-free interactions.
   Everything is progressive enhancement: the page is fully usable without JS. */
(() => {
  "use strict";

  /* ---- Current year in the footer ---- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Mobile navigation toggle ---- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    // Close the menu after tapping a link (mobile).
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
  }

  /* ---- Scroll-reveal using IntersectionObserver ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in")); // graceful fallback
  }

  /* ---- Testimonial rotator (auto-advance + clickable dots) ---- */
  const rotator = document.querySelector("[data-rotator]");
  const dotsWrap = document.querySelector(".dots");
  if (rotator && dotsWrap) {
    const quotes = [...rotator.querySelectorAll(".quote")];
    let index = 0;
    let timer;

    quotes.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Review ${i + 1}`);
      dot.addEventListener("click", () => {
        show(i);
        restart();
      });
      dotsWrap.appendChild(dot);
    });
    const dots = [...dotsWrap.children];

    const show = (i) => {
      index = (i + quotes.length) % quotes.length;
      quotes.forEach((q, n) => q.classList.toggle("is-active", n === index));
      dots.forEach((d, n) => d.setAttribute("aria-selected", String(n === index)));
    };
    const next = () => show(index + 1);
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    };

    show(0);
    restart();
  }

  /* ---- Accessible contact-form validation ---- */
  const form = document.querySelector(".contact-form");
  if (form) {
    const note = form.querySelector("[data-form-note]");

    const showError = (input, message) => {
      const field = input.closest(".field");
      const slot = form.querySelector(`.error[data-for="${input.id}"]`);
      field?.classList.toggle("invalid", Boolean(message));
      if (slot) slot.textContent = message;
      input.setAttribute("aria-invalid", message ? "true" : "false");
    };

    const validate = (input) => {
      const value = input.value.trim();
      if (input.required && !value) return "This field is required.";
      if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address.";
      return "";
    };

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", () => showError(input, validate(input)));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll("input, textarea").forEach((input) => {
        const msg = validate(input);
        showError(input, msg);
        if (msg && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      // Demo: no backend wired up. Show a friendly note and reset.
      if (note) note.hidden = false;
      form.reset();
    });
  }
})();
