# Alexinomia — The Unspoken Name

An immersive, single-page educational site about **alexinomia**: the anxiety-driven inability to use personal names. Built around the three peer-reviewed papers that currently define the field (2023 · 2024 · 2025).

## Files

| File | Purpose |
|---|---|
| `index.html` | All content and structure — hero, experience, research timeline, impact, self-check, support, references |
| `style.css` | Editorial warm theme (cream / burgundy / forest / gold); responsive, reduced-motion safe |
| `script.js` | Cursor glow, typewriter hero, scroll reveal, expandable cards, animated counters, 7-question reflection quiz |
| `memory.md` | Notes from the prior build session (kept for provenance) |

No build step. No dependencies. Open `index.html` in any modern browser.

## Sources cited (all peer-reviewed, verified April 2026)

1. **Ditye, T., Rodax, N., & Welleschik, L. (2023).** Alexinomia: The fear of using personal names. *Frontiers in Psychology, 14,* 1129272. [doi:10.3389/fpsyg.2023.1129272](https://doi.org/10.3389/fpsyg.2023.1129272) · [PubMed 37020910](https://pubmed.ncbi.nlm.nih.gov/37020910/) · [PMC10069083](https://pmc.ncbi.nlm.nih.gov/articles/PMC10069083/)
2. **Bergert, A., Welleschik, L., & Ditye, T. (2024).** "Why can't I say people's names?" Alexinomia as a widespread psychological phenomenon. *Acta Psychologica, 246,* 104279. [doi:10.1016/j.actpsy.2024.104279](https://doi.org/10.1016/j.actpsy.2024.104279) · [PubMed 38643557](https://pubmed.ncbi.nlm.nih.gov/38643557/)
3. **Ditye, T., Sartorio, M., & Welleschik, L. (2025).** Name avoidance in social anxiety: Understanding alexinomia. *Journal of Anxiety Disorders, 109,* 102958. [doi:10.1016/j.janxdis.2024.102958](https://doi.org/10.1016/j.janxdis.2024.102958) · [PubMed 39721365](https://pubmed.ncbi.nlm.nih.gov/39721365/)

Secondary hub: the authors' research group at Sigmund Freud Private University Vienna maintains [alexinomia.org](https://alexinomia.org/) and a publications page at [psychologie.sfu.ac.at/en/research/alexinomia](https://psychologie.sfu.ac.at/en/research/alexinomia/).

## Publish to GitHub Pages

From this folder:

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial alexinomia site"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build from branch → `main` / root → Save**. The site will be live at `https://<your-user>.github.io/<your-repo>/` within a minute or two.

## Design notes

- **Theme:** editorial warm (cream `#f6efe4`, burgundy `#6b2d3a`, forest `#2e4a3d`, gold `#c69c4c`). Chosen to feel like a printed long-form article rather than a clinical pamphlet.
- **Typography:** Cormorant Garamond (serif display) for headings and pull quotes, Inter for running text — loaded from Google Fonts.
- **Motion:** every animation respects `prefers-reduced-motion`; the cursor glow is disabled on touch devices.
- **Accessibility:** full keyboard navigation for cards and quiz; visible focus ring; semantic landmarks; sufficient colour contrast on the cream background.

## Disclaimer

This is an independent educational site. It is not affiliated with the cited authors or publishers, and the self-check is a reflection tool only — it is not a diagnostic instrument.
