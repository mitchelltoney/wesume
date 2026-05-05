# Project Specification — Personal Portfolio / Scrollytelling Resume

> **Instructions for Claude Code:** This document is the source of truth. Build the entire site from this spec. Where you see `[TBD]` or `[OWNER:]`, ask me before assuming. Where the spec gives you latitude ("designer's choice"), exercise taste — do not produce a generic template. Read the **Non-Goals** section before you start; it's load-bearing.

---

## 1. Project Overview

**What this is:** a single-page, scroll-driven personal site that functions as both a résumé and a narrative portfolio. It should feel like a piece of editorial design, not a CV PDF in a browser. Think *The Pudding* / *NYT Interactive* / *Linear's release pages* / *Vercel's product pages* — high signal, low chrome, choreographed.

**What this is not:** a SaaS landing page, a Bootstrap-y "developer portfolio template," or anything that uses the word "Innovate" in the hero.

**Primary goals (in order):**
1. Get the reader to feel something specific about the subject within the first 5 seconds.
2. Communicate trajectory: where I've been → where I am → where I'm going.
3. Showcase technical taste through *the site itself* as much as through listed projects.
4. Provide a frictionless path to the résumé PDF, GitHub, LinkedIn, and email.

**Audience:** recruiters, professors, future collaborators, friends. Optimize for the recruiter skim *and* the friend who reads the whole thing.

---

## 2. Subject — Base Bio

Use this as the source content. I will refine copy in a follow-up pass; treat the *facts* as fixed and the *prose* as a starting draft to iterate on.

**Identity**
- Name: `[OWNER: full name]`
- Tagline / one-liner: `[OWNER: provide; placeholder = "Software engineer working close to the metal."]`
- Location: Orange County, CA (relocating to San Diego, Fall 2026)
- Pronouns: `[OWNER: optional]`

**Education**
- **UC San Diego** — M.S. Computer Science, starting Fall 2026 (admitted, accepted)
- **Chapman University** — B.S. Software Engineering, `[OWNER: graduation date / year]`

**Experience**
- **Nokia (Sunnyvale, CA)** — Software Engineering Co-op
  - Embedded systems and network tooling
  - `[OWNER: 2–4 bullets of concrete contributions; ask me for specifics if not provided]`

**Technical focus areas**
- Systems-leaning: C++, embedded, low-level (mutexes/semaphores, memory architecture)
- ML / data: scikit-learn, Weka, ensemble methods, evaluation metrics
- Data analytics: Alteryx Designer Cloud, Tableau
- Bioinformatics: protein structure prediction, AlphaFold, Cytoscape network analysis
- General: Python, `[OWNER: list current daily-driver languages]`

**Selected projects (replace/expand)**
- Brawl Stars counter-pick calculator
- `[OWNER: add 2–4 more — Claude Code, ask if not provided]`

**Outside of work** (use sparingly — one section, tasteful)
- Competitive FPS / hero shooters (Marvel Rivals, Overwatch 2, Deadlock)
- Japanese language study (WaniKani)
- Strength training, skincare nerdery, film
- Enjoys: orbital mechanics, AI forecasting, philosophy

**Links**
- GitHub: `[OWNER]`
- LinkedIn: `[OWNER]`
- Email: `[OWNER]`
- Résumé PDF: `/resume.pdf` (place in `public/`)

---

## 3. Tech Stack

Pick **one** of the two stacks below. Default to **Stack A** unless I tell you otherwise.

**Stack A — Next.js (default)**
- Next.js 15+ with App Router
- React 19
- TypeScript (strict mode on)
- Tailwind CSS v4
- Motion (formerly Framer Motion) for component-level animation
- GSAP + ScrollTrigger for choreographed scroll sequences
- Lenis for smooth scroll (configurable; respect `prefers-reduced-motion`)
- shadcn/ui only where genuinely useful (buttons, dialogs) — do not rely on it for anything that should feel custom
- Optional: React Three Fiber + drei for the hero only, if it earns its weight (see §6)

**Stack B — Astro (alternative if I request it)**
- Astro 5+ with islands for interactive sections
- Same animation libs
- Better for pure-content sites; pick only if I confirm

**Quality tooling (required either way)**
- ESLint + Prettier
- TypeScript strict
- `pnpm` (or `bun` if you prefer; not npm)
- Husky + lint-staged for a pre-commit hook
- Lighthouse CI config in repo

**Hosting:** Vercel. Configure for edge where it makes sense.

---

## 4. Architecture & File Layout

```
/app
  /(site)
    page.tsx                  # the single scroll page; composes sections
    layout.tsx                # fonts, theme, lenis provider
  /api
    [only if needed]
/components
  /sections                   # one folder per scroll section, e.g. Hero/, Trajectory/
    Hero/
      index.tsx
      HeroCanvas.tsx          # if using R3F
      hero.module.css         # only if Tailwind isn't enough
  /ui                         # primitives
  /motion                     # animation hooks, ScrollTrigger setups
/lib
  scroll.ts                   # Lenis + GSAP wiring
  cn.ts
  data.ts                     # all bio/projects/experience as typed objects
/content
  projects.ts                 # typed project data
  experience.ts
  education.ts
/public
  resume.pdf
  /images
  /og
```

**Rules:**
- All copy and structured data lives in `/content/*.ts` as typed exports. No hard-coded strings in JSX for résumé content.
- Each section is self-contained: its own folder, its own animation logic, its own types. Sections must be reorderable in `page.tsx` with no cross-coupling.
- No prop-drilling more than one level. Use Zustand only if absolutely needed — most state should be local.

---

## 5. Design System

**Philosophy:** restrained palette, bold typography, generous whitespace, one or two memorable visual motifs that recur. The page should look like one designer made every choice.

**Typography**
- Pair **one display serif** with **one geometric or neutral sans** and **one mono**.
- Suggested starting point (you may swap if you have a better idea — *justify in PR*):
  - Display: *Fraunces* or *Editorial New* (variable, axis play allowed)
  - Sans: *Inter* or *Geist Sans*
  - Mono: *JetBrains Mono* or *Geist Mono*
- Use a fluid type scale via `clamp()`. Display sizes should be unapologetically large at desktop (think 12–18rem for hero).

**Color**
- Default to a **dark mode primary** experience with a near-black background (`#0a0a0a`–`#111`), warm off-white text, and a single accent color.
- Accent: pick one (e.g. electric blue, acid green, sodium-lamp orange) — no rainbow gradients, no purple-to-pink SaaS.
- Provide a light mode toggle that *actually looks designed in light mode*, not just inverted.
- Use `color-mix()` and `oklch()` for tints/shades. No legacy hex-only palettes.

**Spacing & layout**
- 8px base grid, 12-column at desktop, single column at mobile.
- Sections should breathe — minimum 100vh per major beat, often more.

**Motifs (pick 1–2 and use them throughout)**
- A repeating geometric mark (e.g. a subtle grid, an ASCII glyph, a custom monogram) that ties sections together.
- A signature transition (e.g. text that "develops" like a Polaroid, a horizontal wipe, a numeric counter) used 3–4 times across the page.

**Cursor:** custom cursor on desktop, *only* if it adds something. If not, leave the system cursor alone. Do not build a glowing trailing dot — that's been done to death.

---

## 6. Page Structure — Scroll Sequence

The site is one long page divided into the beats below. Each beat has a **purpose**, a **scroll behavior**, and **acceptance criteria**. Build them in order; commit after each one passes its criteria.

### Beat 1 — Hero (≈100vh, pinned briefly)
- **Purpose:** establish identity and tone. Reader should know within 3 seconds: name, what I do, that this site is going to be different.
- **Visual:** large display type with the name. One supporting element — designer's choice — examples: a slowly-rotating low-poly object (R3F), an animated SVG monogram, a typographic kinetic loop, a noise/grain shader background. **Pick one. Don't combine.**
- **Scroll behavior:** subtle scroll-cued reveal of a tagline; on continued scroll, hero gracefully gives way to Beat 2 (no abrupt cut). Consider a single pinned beat where the hero "compresses" into a navigation bar.
- **Acceptance:** loads in <1s on fast 4G; LCP element is text, not the canvas; scrolling feels weighty (Lenis tuned), not laggy.

### Beat 2 — The Premise (sticky text + evolving visual)
- **Purpose:** a 2–3 sentence narrative hook. Who I am beyond the résumé.
- **Pattern:** classic NYT scrollytelling — text pinned on one side, a visual on the other side that progresses through 3 states as the reader scrolls. The visual could be a stylized map (OC → SD), a transcript-style code-to-words morph, or a timeline seed.
- **Acceptance:** all three visual states are reachable by scroll; reversing scroll reverses cleanly; works on mobile (stacked, with scroll-snap if needed).

### Beat 3 — Trajectory (timeline, scroll-drawn)
- **Purpose:** education + work, told as a single arc.
- **Pattern:** vertical or diagonal path that draws itself as the reader scrolls (SVG `stroke-dashoffset` tied to scroll progress). Milestones reveal as the path passes them: Chapman → Nokia co-op → UCSD MS.
- **Each milestone:** date, place, role, 1–3 bullet outcomes. Tap/click to expand for more detail.
- **Acceptance:** path drawing is butter-smooth at 60fps; respects reduced-motion (instantly fills in); milestone copy is set in `/content/experience.ts`.

### Beat 4 — Stack / Toolkit (kinetic typography or constellation)
- **Purpose:** show technical range without it being a wall of logos.
- **Pattern (pick one):**
  - **Kinetic marquee:** technologies scroll horizontally at scroll-velocity-coupled speed; hover/tap a tech for a one-line "where I used it."
  - **Constellation:** technologies as nodes clustered by domain (systems / ML / data / web), edges drawn between related ones. Hover highlights the cluster.
- **No logo soup.** Set technology names in the chosen typeface. Logos only if iconic and only as monochrome glyphs.
- **Acceptance:** layout is hand-tuned, not random; adding a new tech in `/content` updates the visual without breaking it.

### Beat 5 — Selected Work (pinned, horizontal scroll or stacked cards)
- **Purpose:** 3–5 projects, each given real estate.
- **Pattern:** the section pins; horizontal scroll progresses through project panels (translateX tied to vertical scroll). Each project: title, year, role, 1-paragraph narrative, key visual, link to repo / writeup.
- **Mobile fallback:** vertical stack with scroll-snap; no horizontal pinning.
- **Acceptance:** every project is indexed in `/content/projects.ts`; hero image lazy-loads; the section unpins cleanly when its last panel is reached.

### Beat 6 — Field Notes (interests, lightweight)
- **Purpose:** a glimpse of the human. Kept short — this is seasoning, not a course.
- **Pattern:** a small typographic mosaic / asymmetric grid of 4–6 things I'm into right now. Each is a tile with a one-liner. Examples from my life: orbital mechanics, Japanese kanji study, FPS aim training, film, AI forecasting, lifting.
- **Acceptance:** doesn't overstay its welcome; ≤ 80vh.

### Beat 7 — Coda / Contact
- **Purpose:** strong close + clear paths to act.
- **Pattern:** a hero-scale closing line ("Let's build something." or my own choice — designer's call), then four links: Email, GitHub, LinkedIn, Résumé PDF. Treat them as typographic objects, not buttons.
- **Optional flourish:** a final scroll-triggered gesture — e.g. the page's recurring motif resolves / completes here.
- **Acceptance:** email link uses a real `mailto:` with a subject prefilled; PDF link has `download` attribute; all four are keyboard-reachable.

### Persistent UI
- Minimal top nav that appears after Hero compresses. Section anchors. Theme toggle. No hamburger menu unless mobile actually requires it.
- A scroll progress indicator — but make it interesting (e.g. a vertical hairline that fills with the accent color, or a numeric percentage in mono type at the corner). No default progress bars.

---

## 7. Animation & Interaction Rules

- **Scroll smoothing:** Lenis with `lerp: 0.1`–`0.12`, disabled when `prefers-reduced-motion: reduce`.
- **GSAP ScrollTrigger:** use one master timeline per section, registered/cleaned up via React `useEffect` with proper teardown. No leaked triggers between routes (we have one route, but still).
- **Easing:** never use the default `ease`. Pick 2–3 named eases (e.g. `expo.out`, `power3.inOut`, a custom cubic-bezier) and stick to them.
- **Durations:** small UI ≤ 300ms, large hero/section transitions 600–1200ms. Avoid the dreaded slow-fade.
- **Reduced motion:** all scroll-coupled animations have a static or minimal-motion fallback. Test with the OS toggle.
- **Hover:** desktop only; never gate critical content behind hover.
- **CSS scroll-driven animations:** use them where they're cleaner than JS (e.g. progress bar, simple parallax). Don't bolt on GSAP for things `animation-timeline: scroll()` can do natively.
- **View Transitions API:** in-page section anchors should use the View Transitions API where supported.

---

## 8. Performance Budget

- **LCP:** < 1.8s on a 4G simulated throttle.
- **CLS:** < 0.05.
- **JS:** initial route < 180KB gzipped. R3F / 3D bundle, if used, must be code-split and only loaded when the hero is in view.
- **Images:** `next/image`, AVIF/WebP, defined dimensions. No layout shift on load.
- **Fonts:** `next/font` self-hosted. `font-display: swap`. Subset to Latin (+ extras only if needed).
- **Lighthouse mobile:** ≥ 95 Performance, 100 Accessibility, 100 Best Practices, ≥ 95 SEO.

---

## 9. Accessibility

- All interactive elements keyboard-navigable in logical order.
- Visible focus rings — designed, not the browser default; do not remove them.
- All animations respect `prefers-reduced-motion`.
- Color contrast: AA minimum on all body text, AAA where feasible on display.
- `<main>`, proper heading hierarchy (one `<h1>`), skip-to-content link.
- Custom cursor (if used) must not interfere with screen readers / pointer-coarse devices.
- Alt text on all images; decorative images use `alt=""`.

---

## 10. SEO & Meta

- `<title>`: `Name — short tagline`
- Meta description: one-sentence summary.
- Open Graph + Twitter card with a custom OG image (`/public/og/default.png`, 1200×630). Generate it programmatically with `next/og` route based on `data.ts`.
- `application/ld+json` Person schema in the head.
- `sitemap.xml` and `robots.txt` (Next.js conventions).
- Favicons (light + dark + apple-touch).

---

## 11. Build, Lint, Deploy

- `pnpm dev` / `pnpm build` / `pnpm start`.
- GitHub Actions: lint + typecheck + build on PR. Lighthouse CI on main.
- Deploy: Vercel. Add `vercel.json` only if needed (e.g. headers, redirects).
- Add a brief `README.md` covering: dev quickstart, where to edit content, how to add a project, how to redeploy.

---

## 12. Content I'll Provide in Follow-up

These are the slots I'll fill after you scaffold. Build with sensible placeholders so the site works end-to-end before I supply them.

- [ ] Final tagline / one-liner
- [ ] Nokia co-op bullets (specific contributions)
- [ ] Final project list with descriptions, links, and hero imagery
- [ ] Headshot or chosen hero visual (or confirmation to proceed without one)
- [ ] Final contact email / handles
- [ ] Résumé PDF
- [ ] Tone preference: more academic? more personality? more deadpan? (default: deadpan with dry wit)

---

## 13. Acceptance Criteria — "Done" Definition

The first delivery is "done" when:
1. All seven beats are scaffolded with placeholder content where I haven't supplied final copy.
2. Scroll choreography works on Chrome, Safari, Firefox (latest two versions).
3. Mobile experience is genuinely good — not just "responsive," but considered. Test on a real iPhone if possible.
4. Reduced-motion mode produces a fully usable, dignified static version.
5. Lighthouse mobile scores meet the budget in §8.
6. README explains how to add a new project (single-source-of-truth in `/content/projects.ts`).
7. Repo passes lint + typecheck + build with zero warnings.

---

## 14. Non-Goals (read this twice)

Do not include or build any of the following without explicit request:

- A blog, CMS, or MDX setup. Not needed.
- Authentication, comments, analytics dashboards, or admin panels.
- A "particles" background (snow, stars, floating shapes).
- A glowing trail cursor or chromatic-aberration-on-everything.
- "Glassmorphism" panels stacked on a colorful gradient.
- A pricing page, testimonials section, or "trusted by" logo wall.
- AI chatbot of myself. Absolutely not.
- Lottie animations as a substitute for design.
- More than one accent color.
- Skeuomorphic résumé (fake paper / fake desk / fake typewriter).
- Music auto-play, video auto-play with sound, or any unsolicited audio.

If you find yourself reaching for one of these, stop and re-read §1.

---

## 15. Process Expectations

- Scaffold first (routing, layout, fonts, Lenis, content schemas), then build beats in order.
- After each beat, commit with a clear message and a short note in PR description on what's "designer's choice" so I can review.
- Where the spec gives latitude, *make a choice and justify it briefly* in code comments or PR notes. Don't ask me 14 small questions — ask me 1 batched question per beat at most.
- If something here conflicts with itself or with a request I make later, my latest message wins.

---

*End of spec.*
