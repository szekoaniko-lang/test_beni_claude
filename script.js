/* ══════════════════════════════════════════════════════════════
   ALEXINOMIA — SCRIPT
   Features: reveal animations · navbar · particles · counters
             symptom cards · self-check quiz
   ══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Navbar ─── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

/* ─── Scroll Reveal ─── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ─── Hero Particles ─── */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#7c3aed', '#a78bfa', '#c4b5fd', '#ddd6fe', '#f0c040'];
  const count  = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size  = Math.random() * 4 + 1.5;
    const left  = Math.random() * 100;
    const delay = Math.random() * 14;
    const dur   = Math.random() * 12 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${color};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(p);
  }
})();

/* ─── Animated Counters ─── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const animate = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start    = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

/* ─── Symptom Cards (toggle expand) ─── */
(function initSymptomCards() {
  document.querySelectorAll('.symptom-card').forEach(card => {
    const toggle = () => card.classList.toggle('expanded');

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
})();

/* ─── Self-Check Quiz ─── */
(function initQuiz() {
  const questions = [
    {
      q: "You want to start a conversation with a friend or colleague. Does the thought of saying their name out loud feel uncomfortable or anxiety-inducing?",
      options: ["Never — it feels completely natural", "Occasionally, with certain people", "Often — I notice I avoid it", "Almost always — I go to lengths to avoid it"]
    },
    {
      q: "When you need to get someone's attention, do you find yourself using workarounds — like tapping them, saying 'hey,' or waiting — rather than calling them by name?",
      options: ["No, I use their name naturally", "Sometimes, without thinking much about it", "Yes, fairly regularly", "Yes — I am very aware of doing this deliberately"]
    },
    {
      q: "In romantic relationships or close friendships, do you use your partner's or friend's name when speaking directly to them?",
      options: ["Yes, easily and often", "Occasionally — it depends on the moment", "Rarely — it tends to feel too intense", "Almost never — it feels unbearable to say their name"]
    },
    {
      q: "Have you ever felt a physical sensation — tension, freezing, or a 'block' — when you were about to say someone's name?",
      options: ["Never", "Once or twice, in unusual situations", "Sometimes", "Yes, this is a familiar feeling for me"]
    },
    {
      q: "Do you prefer texting or messaging over calling, partly because written communication lets you avoid saying names out loud?",
      options: ["No — I choose based on convenience, not this", "Maybe, but I haven't thought about it that way", "Possibly — now that you mention it", "Yes — this is a reason I favour written communication"]
    },
    {
      q: "Have you ever felt ashamed or confused by your difficulty using names, without knowing why it felt so hard?",
      options: ["No — this is not something I've experienced", "I've had a moment or two of confusion about it", "Yes, I've felt confused or frustrated by it", "Yes — this has caused me significant distress over time"]
    },
    {
      q: "Thinking about the people closest to you: would they say you address them by name regularly?",
      options: ["Yes, definitely", "Probably — though I don't do it constantly", "Unlikely — they may have noticed its absence", "No — I rarely or never say their names directly to them"]
    }
  ];

  /* scoring: option index 0→0, 1→1, 2→2, 3→3 */
  const results = [
    {
      icon: '✨',
      title: 'Little or No Resonance',
      text: 'Your responses suggest that name-related anxiety is not a significant part of your daily experience. That said, alexinomia exists on a spectrum — these reflections may still be useful for understanding others in your life who find name-use difficult.'
    },
    {
      icon: '🤔',
      title: 'Mild Resonance',
      text: 'Some aspects of alexinomia resonate with your experience, though not strongly. It may be worth paying gentle attention to how you use names in your own communication — curiosity, not judgment.'
    },
    {
      icon: '💡',
      title: 'Moderate Resonance',
      text: 'Several experiences described in alexinomia research seem familiar to you. You may find it valuable to explore this further — perhaps by reading the original research papers, or by speaking with a therapist who can help you understand any name-related anxiety you experience.'
    },
    {
      icon: '🌊',
      title: 'Strong Resonance',
      text: 'The experiences described align closely with your own. Knowing that this phenomenon has a name — and that researchers are actively studying it — may itself be meaningful. Consider reaching out to a psychotherapist experienced in social anxiety. You are not alone in this experience.'
    }
  ];

  let current = 0;
  let score   = 0;

  const introScreen    = document.getElementById('quiz-intro');
  const questionsScreen = document.getElementById('quiz-questions');
  const resultScreen   = document.getElementById('quiz-result');
  const progressBar    = document.getElementById('progressBar');
  const counter        = document.getElementById('quizCounter');
  const questionEl     = document.getElementById('quizQuestion');
  const optionsEl      = document.getElementById('quizOptions');
  const resultIcon     = document.getElementById('resultIcon');
  const resultTitle    = document.getElementById('resultTitle');
  const resultText     = document.getElementById('resultText');

  function showScreen(id) {
    [introScreen, questionsScreen, resultScreen].forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function renderQuestion() {
    const q = questions[current];
    progressBar.style.width = `${((current) / questions.length) * 100}%`;
    counter.textContent     = `Question ${current + 1} of ${questions.length}`;
    questionEl.textContent  = q.q;
    optionsEl.innerHTML     = '';

    q.options.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.className     = 'quiz-option';
      btn.textContent   = text;
      btn.dataset.value = idx;
      btn.addEventListener('click', selectOption);
      optionsEl.appendChild(btn);
    });
  }

  function selectOption(e) {
    const btn = e.currentTarget;
    const val = parseInt(btn.dataset.value, 10);

    /* visual feedback */
    optionsEl.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    score += val;

    setTimeout(() => {
      current++;
      if (current < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }, 400);
  }

  function showResult() {
    progressBar.style.width = '100%';

    const max   = questions.length * 3;
    const ratio = score / max;
    let   band  = 0;
    if (ratio >= 0.2) band = 1;
    if (ratio >= 0.45) band = 2;
    if (ratio >= 0.7)  band = 3;

    const r = results[band];
    resultIcon.textContent  = r.icon;
    resultTitle.textContent = r.title;
    resultText.textContent  = r.text;

    showScreen('quiz-result');
  }

  function reset() {
    current = 0;
    score   = 0;
    renderQuestion();
    showScreen('quiz-questions');
  }

  document.getElementById('startQuiz').addEventListener('click', () => {
    renderQuestion();
    showScreen('quiz-questions');
  });

  document.getElementById('retakeQuiz').addEventListener('click', reset);
})();

/* ─── Active nav link highlighting on scroll ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();
