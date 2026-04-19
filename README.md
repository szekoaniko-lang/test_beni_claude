# Alexinomia — Interactive Informational Website

An immersive, evidence-based educational website about **alexinomia** — the psychological phenomenon of fear and avoidance of using personal names. Built with plain HTML, CSS, and JavaScript. No dependencies or build step required.

---

## Publishing to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository** (top right, the `+` icon).
3. Name it something like `alexinomia` (or any name you prefer).
4. Set it to **Public**.
5. Do **not** initialise with a README (you already have files).
6. Click **Create repository**.

### Step 2 — Upload the files

**Option A — via the GitHub website (simplest):**

1. On the empty repository page, click **uploading an existing file**.
2. Drag and drop all three files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Scroll down and click **Commit changes**.

**Option B — via Git (if you have Git installed):**

```bash
cd "path/to/your/folder"
git init
git add index.html style.css script.js
git commit -m "Initial commit: alexinomia website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings** (top menu bar).
2. In the left sidebar, click **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch: `main`, folder: `/ (root)`.
5. Click **Save**.

GitHub will display a URL like:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

It may take **1–2 minutes** to go live. Refresh the Pages settings tab to see the live URL appear.

---

## File Structure

```
.
├── index.html    # All site content and structure
├── style.css     # Immersive dark-theme styling + responsive layout
├── script.js     # Scroll animations, quiz, counters, particles
└── README.md     # This file
```

---

## Sources

All content is grounded in published, peer-reviewed research:

1. Ditye, T., Rodax, N., & Welleschik, L. (2023). Alexinomia: The fear of using personal names. *Frontiers in Psychology*, 14, 1129272. https://doi.org/10.3389/fpsyg.2023.1129272

2. Bergert, A., Welleschik, L., & Ditye, T. (2024). "Why can't I say people's names?" Alexinomia as a widespread psychological phenomenon. *Acta Psychologica*, 246, 104279. PMID: 38643557

3. Ditye, T., Sartorio, M., & Welleschik, L. (2025). Name avoidance in social anxiety: Understanding alexinomia. *Journal of Anxiety Disorders*. PMID: 39721365
