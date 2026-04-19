/* Alexinomia — interactions */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (glow && !("ontouchstart" in window)) {
    document.body.classList.add("has-cursor");
    let rafId = null;
    let tx = 0, ty = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
        rafId = null;
      });
    }, { passive: true });
  }

  /* ---------- Sticky-nav shadow + active link ---------- */
  const nav = document.getElementById("topnav");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
    // active link
    const y = window.scrollY + 120;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current?.id}`);
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Typewriter hero word ---------- */
  const typer = document.getElementById("typer");
  if (typer) {
    const words = ["arrives.", "escapes.", "fits in the mouth.", "feels safe to say."];
    let wi = 0, ci = 0, deleting = false;
    const tick = () => {
      const w = words[wi];
      if (!deleting) {
        ci++;
        typer.textContent = w.slice(0, ci);
        if (ci === w.length) { deleting = true; setTimeout(tick, 1600); return; }
      } else {
        ci--;
        typer.textContent = w.slice(0, ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 40 : 70);
    };
    if (!prefersReduced) setTimeout(tick, 900);
    else typer.textContent = words[0];
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Expandable feature cards ---------- */
  document.querySelectorAll(".fcard").forEach((card) => {
    const toggle = () => card.classList.toggle("open");
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat-num");
  if (counters.length && "IntersectionObserver" in window) {
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10);
      if (prefersReduced) { el.textContent = target; return; }
      const duration = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Self-check quiz ---------- */
  const quizQuestions = [
    {
      q: "How often do you find yourself avoiding saying someone's name, even though you remember it clearly?",
      help: "Think across all channels — in person, on the phone, in messages."
    },
    {
      q: "When you try to say a close person's name, do you feel a spike of anxiety or physical tension?",
      help: "Tight throat, held breath, flushed face — the body noticing the name."
    },
    {
      q: "Is it harder to use the names of people you are close to than the names of strangers or acquaintances?",
      help: "Alexinomia often intensifies with intimacy, unlike ordinary social shyness."
    },
    {
      q: "Have you developed workarounds to avoid using a name — 'hey you', waving, waiting for eye contact, choosing text over speech?",
      help: "Count any strategy, however small, that lets you speak without the name."
    },
    {
      q: "Has anyone close to you ever commented that you rarely — or never — use their name?",
      help: "Partners and parents are the most common source of this feedback."
    },
    {
      q: "Does the difficulty extend to written address — signing cards, starting emails, writing someone's name in a note?",
      help: "Written naming often carries the same charge as spoken naming."
    },
    {
      q: "Has name-avoidance been part of your life for as long as you can remember, rather than starting recently?",
      help: "The research describes alexinomia as typically long-standing rather than episodic."
    }
  ];
  const scale = [
    { label: "Never",        value: 0 },
    { label: "Rarely",       value: 1 },
    { label: "Sometimes",    value: 2 },
    { label: "Often",        value: 3 },
    { label: "Almost always",value: 4 }
  ];

  const stage  = document.getElementById("quizStage");
  const back   = document.getElementById("quizBack");
  const next   = document.getElementById("quizNext");
  const count  = document.getElementById("quizCount");
  const bar    = document.getElementById("quizBar");

  if (stage && back && next && count && bar) {
    const answers = new Array(quizQuestions.length).fill(null);
    let idx = 0;

    const render = () => {
      if (idx >= quizQuestions.length) { renderResult(); return; }
      const q = quizQuestions[idx];
      stage.innerHTML = `
        <p class="quiz-question">${q.q}</p>
        <p class="lede" style="font-size:.92rem;margin-top:-1rem;margin-bottom:1.2rem;">${q.help}</p>
        <div class="quiz-options" role="radiogroup" aria-label="Response scale">
          ${scale.map((s, i) => `
            <button type="button" class="quiz-option${answers[idx] === s.value ? " selected" : ""}"
                    data-value="${s.value}" role="radio"
                    aria-checked="${answers[idx] === s.value}">
              <span class="opt-marker">${String.fromCharCode(65 + i)}</span>${s.label}
            </button>`).join("")}
        </div>`;
      bar.style.width = `${((idx) / quizQuestions.length) * 100 + (100 / quizQuestions.length) * 0.15}%`;
      count.textContent = `Question ${idx + 1} of ${quizQuestions.length}`;
      back.disabled = idx === 0;
      next.disabled = answers[idx] === null;
      next.textContent = idx === quizQuestions.length - 1 ? "See reflection" : "Next";

      stage.querySelectorAll(".quiz-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const v = parseInt(btn.dataset.value, 10);
          answers[idx] = v;
          stage.querySelectorAll(".quiz-option").forEach((b) => {
            b.classList.toggle("selected", b === btn);
            b.setAttribute("aria-checked", b === btn ? "true" : "false");
          });
          next.disabled = false;
        });
      });
    };

    const renderResult = () => {
      const total = answers.reduce((a, b) => a + (b || 0), 0);
      const max = quizQuestions.length * 4;
      let band, body;
      if (total <= 6) {
        band = "Minimal resonance";
        body = "Your answers suggest name-use is not a source of significant anxiety for you. This reflection is still a useful baseline.";
      } else if (total <= 13) {
        band = "Some resonance";
        body = "A few of the patterns described in alexinomia research appear in your answers. Worth noticing, but no cause for alarm.";
      } else if (total <= 21) {
        band = "Strong resonance";
        body = "Many of the themes documented in the 2023 and 2024 studies appear in your answers. If this is affecting your relationships, consider speaking with a qualified mental-health professional.";
      } else {
        band = "Very strong resonance";
        body = "Your answers closely match the pattern described in the alexinomia literature. This reflection is not a diagnosis — but it may be worth sharing with a therapist, especially one familiar with social-anxiety and attachment-focused approaches.";
      }
      stage.innerHTML = `
        <div class="quiz-result">
          <span class="band">${band}</span>
          <div class="score">${total}<span class="score-of"> / ${max}</span></div>
          <h3>What this mirror shows</h3>
          <p>${body}</p>
          <p style="font-size:.88rem;color:var(--ink-muted);margin-top:1.5rem;">
            This reflection is not a diagnostic instrument. It is based on themes from
            Ditye et al. (2023) and Bergert et al. (2024), not a validated clinical scale.
          </p>
        </div>`;
      bar.style.width = "100%";
      count.textContent = `Complete`;
      back.disabled = false;
      next.textContent = "Start over";
      next.disabled = false;
      next.onclick = () => { answers.fill(null); idx = 0; next.onclick = goNext; render(); };
    };

    const goNext = () => {
      if (idx < quizQuestions.length) {
        idx++;
        render();
        document.getElementById("quiz").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    next.onclick = goNext;

    back.addEventListener("click", () => {
      if (idx > 0) { idx--; next.onclick = goNext; render(); }
    });

    render();
  }
})();
