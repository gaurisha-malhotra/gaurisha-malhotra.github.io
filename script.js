/* =========================================================================
   Gaurisha Malhotra — Editorial Portfolio · interactions
   ========================================================================= */
(function () {
  "use strict";
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- THEME */
  const root = document.documentElement;
  const themeBtn = $("#theme");
  const saved = localStorage.getItem("gm-theme");
  if (saved) root.setAttribute("data-theme", saved);

  themeBtn && themeBtn.addEventListener("click", () => {
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") || (sysDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("gm-theme", next);
  });

  /* ---------------------------------------------------------------- MENU */
  const burger = $("#burger");
  const menu = $("#menu");
  const toggleMenu = (open) => {
    const next = open ?? !menu.classList.contains("open");
    menu.classList.toggle("open", next);
    menu.setAttribute("aria-hidden", String(!next));
    burger.setAttribute("aria-expanded", String(next));
  };
  burger && burger.addEventListener("click", () => toggleMenu());
  $$("#menu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------------------------------------------------------------- REVEAL */
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".reveal, .dateline").forEach((el) => io.observe(el));
  } else {
    $$(".reveal, .dateline").forEach((el) => el.classList.add("in"));
  }

  /* ---------------------------------------------------------------- COUNT-UP */
  const countEls = $$(".stat__num");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    const dur = 1400;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCount(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    countEls.forEach((el) => co.observe(el));
  } else {
    countEls.forEach(runCount);
  }

  /* ---------------------------------------------------------------- ROTATOR */
  const rotWord = $(".rotator__word");
  if (rotWord && !reduce) {
    const words = ["act", "give", "care", "believe", "change"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      rotWord.style.transition = "opacity .3s ease, transform .3s ease";
      rotWord.style.opacity = "0";
      rotWord.style.transform = "translateY(-6px)";
      setTimeout(() => {
        rotWord.textContent = words[i];
        rotWord.style.opacity = "1";
        rotWord.style.transform = "none";
      }, 300);
    }, 2600);
  }

  /* ---------------------------------------------------------------- FILTER INDEX */
  const entries = $$(".card");
  const chips = $$(".chip");
  const orgBtns = $$(".seg__btn");
  const search = $("#search");
  const countLbl = $("#count");
  const empty = $("#empty");
  const state = { beat: "all", org: "all", q: "" };

  const apply = () => {
    let shown = 0;
    entries.forEach((el) => {
      const okBeat = state.beat === "all" || el.dataset.beat === state.beat;
      const okOrg = state.org === "all" || el.dataset.org === state.org;
      const okQ = !state.q || el.dataset.title.includes(state.q);
      const show = okBeat && okOrg && okQ;
      el.classList.toggle("hide", !show);
      if (show) shown++;
    });
    if (countLbl) {
      const total = entries.length;
      countLbl.textContent = shown === total
        ? `${total} pieces`
        : `Showing ${shown} of ${total} pieces`;
    }
    if (empty) empty.hidden = shown !== 0;
  };

  chips.forEach((c) =>
    c.addEventListener("click", () => {
      chips.forEach((x) => x.classList.toggle("is-active", x === c));
      state.beat = c.dataset.filter;
      apply();
    })
  );
  orgBtns.forEach((b) =>
    b.addEventListener("click", () => {
      orgBtns.forEach((x) => x.classList.toggle("is-active", x === b));
      state.org = b.dataset.org;
      apply();
    })
  );
  search && search.addEventListener("input", () => { state.q = search.value.trim().toLowerCase(); apply(); });

  const reset = $("#reset");
  reset && reset.addEventListener("click", () => {
    state.beat = "all"; state.org = "all"; state.q = "";
    chips.forEach((x) => x.classList.toggle("is-active", x.dataset.filter === "all"));
    orgBtns.forEach((x) => x.classList.toggle("is-active", x.dataset.org === "all"));
    if (search) search.value = "";
    apply();
  });

  /* beat cards -> filter + scroll */
  $$(".beat").forEach((b) =>
    b.addEventListener("click", () => {
      const slug = b.dataset.goto;
      const chip = chips.find((c) => c.dataset.filter === slug);
      if (chip) {
        chips.forEach((x) => x.classList.toggle("is-active", x === chip));
        state.beat = slug;
        apply();
      }
      const work = $("#work");
      work && work.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    })
  );

  apply();
})();
