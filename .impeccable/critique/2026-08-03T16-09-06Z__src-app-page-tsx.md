---
target: whole developer portfolio frontend (re-run for consistency)
total_score: 16
max_score: 32
na_heuristics: 7,10
p0_count: 3
p1_count: 3
p2_count: 2
timestamp: 2026-08-03T16-09-06Z
slug: src-app-page-tsx
---
# Critique: Ayush Jha Developer Portfolio (src/app/page.tsx) — pre-revamp baseline

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Copy-email flips to "Email Copied!" (good); but 4 redundant "available" indicators (Hero pill, Craft card, Status card, footer pill) over-communicate |
| 2 | Match System / Real World | 3 | Copy is conversational-business; meta is dev-speak: "// PROFESSIONAL EXPERIENCE" ×7, "18.52° N, 73.85° E", "MAX RATING" |
| 3 | User Control and Freedom | 2 | BentoGrid fan carousel: 5 absolute-positioned cards swap on hover with no dots, no close, no keyboard affordance; 4/5 highlights hidden |
| 4 | Consistency and Standards | 1 | Type scale lawless: 9×8px, 14×9px, 138×10px elements; buttons differ (rounded-xl black Hero vs rounded-full Navbar vs rounded-2xl blue Status); getPlaced is "AI resume builder" in BentoGrid, "interview prep platform" in FeaturedProjects |
| 5 | Error Prevention | 1 | `SocialsBar.tsx:179` Call Me tile: `href="tel:+918****3107"` — masked in source, non-dialable, while the real number +91 85914 13107 is displayed publicly |
| 6 | Recognition Rather Than Recall | 2 | 8 sections, nav covers 4 (Experience + Achievements unreachable); getPlaced metric stated 3 ways ("4,000 followers" / "4,000+ users" / "4K+ users") |
| 7 | Flexibility and Efficiency | n/a | Single-page persuade surface; no expert-use workflows to optimize |
| 8 | Aesthetic and Minimalist Design | 2 | Warm canvas + strong B&W portrait are good; 39 uppercase tracking-widest labels, 175 sub-11px elements, 3 overlapping hero cards, 9-tile rainbow social row |
| 9 | Error Recovery | 2 | `handleCopyEmail` has an empty catch (silent failure); Cal.com widget fails silently if it never loads |
| 10 | Help and Documentation | n/a | Portfolio needs no docs; hover/label affordances are the help layer |
| **Total** | | **16/32** | **Acceptable (50%, bottom edge)** |

## Design Specificity Verdict

**Split personality — the copy is authored for Ayush; the visual system is template-grade.** The voice is genuinely specific ("I build like it's my own company.", "I've sat in the user call AND written the code.", "My drive is to reduce monetary stress for my parents", "training my body to run through shin splints"). The composition is category-interchangeable: globals.css is literally headed "Color Palette from Blueprint" — warm-offwhite + white cards + #2563EB + JetBrains Mono is the stock 2024 dev-portfolio recipe. The fan carousel, mono-everything type, "// SECTION" labels, and rainbow social tiles are a genre, not a person.

**Brand mismatch (matters):** stated identity = Stripe/Linear/Apple, brand orange #F97316, Geist. Live build = **137 accent-blue references vs 3 orange** (orange exists only as a FastAPI dot in TechMarquee); **Geist is never loaded** — `layout.tsx` imports only JetBrains Mono and `globals.css` forces `*{font-family:var(--font-mono)!important}` on everything including h1. The calm-editorial ambition and the terminal execution are contradictory identities. This is the single biggest signal the site was assembled from a blueprint, not designed.

**Deterministic scan (detect.mjs --json src, exit 2, 6 findings, 0 critical):**
- `codex-grid-background` (advisory, globals.css:50) — hairline grid mesh background, flagged generated-UI signature
- `side-tab` ×2 (warning, Experience.tsx:116) — border-l-2/border-l-4 on the active tab, "most recognizable tell of AI-generated UIs"
- `ai-color-palette` ×2 (warning, FeaturedProjects.tsx:91,124) — violet/indigo gradients on project icons
- `bounce-easing` (warning, Hero.tsx:148) — animate-bounce naming

**Browser evidence (live at 1280px + prior Playwright at 390px, source unmodified):**
- Desktop overflow is REAL but masked: scrollWidth 1349 vs clientWidth 1265 (+84px), `overflow-x:hidden` on html. Two true offenders: hero badge "Built & scaled getPlaced to 4K+ users" (right=1349, ~28% of its 299px width clipped off-screen), tech-stack card (right=1279, +14px). Marquee chips (to 2170) and carousel slides (to 3309) are inside overflow-hidden/auto containers — intentional, false positives.
- Mobile: scrollWidth 390 = clientWidth 390, no page overflow; only decorative ≤14px bleeds inside clipping parents.
- Console: 0 JS errors / 0 page errors. Warnings: markdownToSafeHTML client import (first-party), zustand deprecation, Cal.com font preloads (third-party).
- Images: 4/4 with alt text, none broken; all links show visible focus outline (bare UA blue, unstyled).
- Tiny text measured live: 8 leaf elements at 10px including a real paragraph ("The tools change. What doesn't: understanding the actual problem…") and the "AI Engineer & Builder" kicker.

## Overall Impression

A warm, confident, genuinely authored portfolio wearing a blueprint's clothes. The person is unmistakable; the design system is interchangeable. The revamp's job is not to find a new voice — it's to make the visuals finally match the voice that's already there.

## What's Working

1. **Authored voice & positioning.** "I build like it's my own company." + "I've sat in the user call AND written the code." is a differentiated thesis no template generates. This is the revamp's foundation.
2. **Proof density.** getPlaced 4K users, 9 named hackathon wins, platform ratings, GPA 9.3/10, quantified intern impact (80% validation automation, 30% quality reduction, 100GB+ NASCAR preprocessing).
3. **Competent motion & warm canvas.** Mouse-tracked DotGrid, marquee with fade edges + hover-pause, timeline line-grow, layoutId tab transitions; #F0EEE9 + white + black is a restful base. Sound document outline (1 h1, 26 headings), JSON-LD Person schema, lazy-loaded Cal embed, alt text on all images.

## Priority Issues

- **[P0] Identity missing above the fold.** Hero headline is a claim, no name; Navbar has no wordmark ("Home Work Journey Blog Book a Call"). "Ayush" appears only in `img alt` and the below-fold identity card. Jordan can't tell whose portfolio this is without reading the tab title. Fix: wordmark in Navbar + name in the Hero H1 or a name eyebrow.
- **[P0] Brand-color conflict.** 137 blue refs vs 3 orange; Geist never loaded; mono `!important` on h1. Fix: decide the accent deliberately (user chose: keep blue) and consolidate tokens; load the intended font stack; remove the global !important.
- **[P0] Desktop hero overflow.** Badge `xl:-right-[206px]` and light card push to x=1349/1279 > 1280 viewport; masked by overflow-x:hidden, badge visibly cut ~28%. Fix: constrain offsets to the photo wrapper or place cards inside image bounds.
- **[P1] One font, no scale.** `*{font-family:mono !important}`; Geist never loaded; --font-sans/--font-display both alias the mono var. Fix: load Geist, remove !important, define a scale (display sans / body sans / mono for meta only), minimum 12px.
- **[P1] Micro-type & contrast.** 175 elements ≤11px (9×8px, 14×9px, 138×10px); gray-400 on white = 2.54:1 (fails AA) in Craft card sublines; text-[8px] white/40 on dark tiles. Fix: 12px floor, recolor gray-400 ≥4.5:1, retire 8–9px.
- **[P1] SocialsBar rainbow + broken phone.** 9 tiles in 9 brand colors, 8px subtitles, `tel:+918****3107` non-dialable. Fix: monochrome tiles with single-accent hover, valid or removed phone, 12px minimum.
- **[P2] Narrative inconsistencies.** getPlaced "resume builder" vs "interview prep"; metric in 5 strings + a unit conflict ("4,000 followers" vs "4K+ users" vs "4,000+ active users" vs "4k+ users" vs "4,000+ users"); timeline "Lockdown Freelancing" dated 2019 (lockdowns were 2020); Aligned Automation 2025 vs 2026. Fix: one canonical positioning + metric; date-check the timeline.
- **[P2] Content hiding.** BentoGrid fan shows 1 of 5 highlights, keyboard-inert divs with onClick, no role/tabIndex, no affordance. Fix: show all 5 as a grid or a real carousel with dots.

## Persona Red Flags

- **Jordan (first-timer recruiter, ~15s scan):** no name in the first viewport — can't tell whose portfolio this is; "//" labels, coordinates, and "MAX RATING" jargon; flagship product described two different ways → sloppiness signal; "0 specs handed to me" risks reading as *can't follow specs*; 45 links = no obvious next step.
- **Sam (accessibility):** 8px/9px/10px text (161 elements), 2.54:1 gray-400, white/40-on-dark at 8px; BentoGrid content changes on hover with no keyboard path (divs, no tabIndex/role); focus ring is bare UA outline (present, unstyled); marquee + animate-ping + framer-motion ignore prefers-reduced-motion; marquee reads the tech stack twice in the a11y tree.
- **Casey (mobile):** hero badge partially cut at the top edge (prior mobile vision); BentoGrid fan cards bleed past the viewport (x=-14, x=404) inside overflow-hidden — content clipped at both edges with no scroll cue; Blog link dropped from mobile nav; Experience tabs collapse to a horizontal scroll strip; body text 10–12px.

## Minor Observations

- `group-hover:scale-135` / `scale-130` in JourneyTimeline are invalid Tailwind utilities — silently dead code.
- Three background systems coexist: DotGrid.tsx mouse spotlight, `.dot-grid` mask, `.mesh-bg` — redundant noise layers.
- "2nd Prize (Winner)" across Achievements undercuts the wins; 8 of 9 rows are 2nd place — curate or reframe.
- 4 "available" indicators across the page (Hero pill, Craft card, Status card, footer pill).
- OG image is a portrait 800×1067 — will crop awkwardly on summary_large_image.
- Good micro-details: marquee pauses on hover, aria-hidden on dot grid, sound heading outline, JSON-LD Person, lazy Cal embed, alt text on all 4 images.
- Console dev noise: markdownToSafeHTML client-import warning, zustand deprecation.

## Questions to Consider

1. If the stated brand is "Stripe meets Linear meets Apple," why does the live site scream terminal? Which is the real Ayush — the mono-space hacker or the calm operator? (User decision: keep blue; the calm direction stays.)
2. "0 specs handed to me" — founder flex or risk flag to a hiring manager who needs scope execution? Consider "I don't wait for a spec."
3. The strongest proof is getPlaced (4K users) — why is it called a resume builder in one section and interview prep in another?
4. The emotional peak is the origin story at 75% scroll depth — should the human beat move up right after the hero?
5. Does a 620px booking calendar belong on the same page as a 9-tile "Find Me Online" grid — or should the close be one action (email)?
6. Who is the 8px text for? If Sam can't read it, it's decoration pretending to be information.
7. Timeline opens at 2007 (age ~1). Memorable origin or first-thing-that-can-be-dated? What's the first fact a stranger needs to know?
