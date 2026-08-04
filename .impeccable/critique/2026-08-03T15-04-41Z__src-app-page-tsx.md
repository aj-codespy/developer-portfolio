---
target: whole developer portfolio frontend
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 5
p2_count: 5
p3_count: 4
timestamp: 2026-08-03T15-04-41Z
slug: src-app-page-tsx
---
# Critique: Ayush Jha Developer Portfolio (src/app/page.tsx)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav scroll-state, carousel active state, copy-email "Email Copied!" feedback are good; slider has no end-of-list indication |
| 2 | Match System / Real World | 4 | Copy speaks human ("I build like it's my own company", "0 specs handed to me"); labels are plain (Work, Journey, Blog) |
| 3 | User Control and Freedom | 3 | Anchors + new-tab externals work; "Book a Call" commits to a 620px third-party calendar with no lightweight exit |
| 4 | Consistency and Standards | 2 | Blog hidden on mobile nav; accent blue vs hard-coded blues vs brand orange (only in TechMarquee); divs as buttons; followers/users metric mix |
| 5 | Error Prevention | 3 | Few user-error surfaces; tel: link ships broken (masked href) — a shipped defect, not a user error |
| 6 | Recognition Rather Than Recall | 3 | Everything on one page; carousel hides 4 of 5 highlights behind hover; achievements list scrolls without a scrollbar cue |
| 7 | Flexibility and Efficiency | n/a | Persuade surface; single scroll narrative, no power-user accelerators required |
| 8 | Aesthetic and Minimalist Design | 2 | First viewport: 3 CTAs + 4 nav items + credibility strip + 2 floating badges + photo; 8-11px text throughout; 5-card overlapping carousel |
| 9 | Error Recovery | 2 | Broken "Call Me" link and "Soon" blog cards linking to Substack root are dead ends with no recovery path |
| 10 | Help and Documentation | n/a | Persuade surface; no help needed; Cal widget carries its own affordances |
| **Total** | | **22/32** | **Acceptable (69%)** |

## Design Specificity Verdict

**Content-specific, visually generic.** The copy is unmistakably authored for Ayush — "I build like it's my own company", "0 specs handed to me", "I've sat in the user call AND written the code", the Bihar→Mumbai origin story. No template would produce that. But the visual language is category-interchangeable: warm-beige + blue accent + JetBrains Mono + bento cards + floating badges + tech marquee + dot grid + zigzag timeline is the standard modern-dev-portfolio recipe. Worse, it contradicts his own stated brand identity (orange #F97316, Geist, Phosphor, "Stripe meets Linear meets Apple" calm): the site is blue #2563EB, JetBrains Mono everywhere, lucide icons. His brand orange appears exactly once — as the FastAPI dot in the marquee.

**Deterministic scan (detect.mjs, exit 2, 7 findings):**
- `codex-grid-background` (advisory, globals.css:50) — the dot-grid is flagged as a recurring generated-UI signature
- `side-tab` ×2 (warning, Experience.tsx:116) — thick left-border on the active tab, "most recognizable tell of AI-generated UIs"
- `ai-color-palette` ×2 (warning, FeaturedProjects.tsx:91,124) — violet/indigo gradients on project icons
- `bounce-easing` (warning, Hero.tsx:148) — the `animate-bounce-subtle` class (which is never defined — dead code AND a naming tell)

**Browser evidence (Playwright, desktop + mobile):** Desktop has real horizontal overflow — scrollWidth 1360 vs clientWidth 1280, caused by the hero floating badge ("Built & scaled getPlaced to 4K+ users" extends to x=1360) and the "FastAPI · LangGraph · Firebase" card (x=1290), masked by `overflow-x: hidden` on html. Mobile (390px) is clean: 390/390, no overflow. Console is clean: 0 first-party errors/warnings (all mobile warnings come from the Cal.com embed). All 4 images load; all have alt text; none have width/height (CLS risk). Focus states: every link gets the browser-default blue outline (visible but unstyled); nav links are only 34px tall (below 44px touch target).

## Cognitive Load Assessment

4 of 8 checklist items fail → moderate-to-high, address soon:
- **Single focus: FAIL** — first viewport competes: 3 CTAs, 4 nav links, credibility strip, 2 floating badges, photo
- **Chunking: PASS** (bento cards group content)
- **Grouping: PASS** (related items visually grouped)
- **Visual hierarchy: FAIL** — 8-11px text everywhere flattens hierarchy; multiple accent-blue elements compete
- **One thing at a time: PASS** (scroll narrative)
- **Minimal choices: FAIL** — 8 options in the first viewport (4 nav + 3 CTAs + Book a Call)
- **Working memory: PASS** (single page)
- **Progressive disclosure: FAIL** — carousel hides 4/5 highlights behind hover; achievements list scrolls with no cue

## Emotional Journey

Strong open: warm beige, personal photo, confident headline. Peak: the origin story ("Born in Bihar and raised in Mumbai… reduce monetary stress for my parents… shin splints") — the most human, memorable moment on the page, buried at ~80% scroll depth in 12px text. Valleys: the dense bento mid-page and the giant 620px Cal.com iframe that ends the page on third-party utility instead of story. Peak-end rule violation: the site ends on "Find Me Online" + 8 loud brand-color social cards, not on the human story or one clear hire path.

## Priority Issues

- **[P1] Factual inconsistencies across the page** — getPlaced is "4,000 followers" (Hero), "4K+ users" (floating badge), "4,000+ active users" (BentoGrid + metadata), "4,000+ users" (timeline + blog). Product description conflicts: "AI resume builder" (BentoGrid) vs "AI-powered interview prep platform" (FeaturedProjects). twitter:creator says @aj_builds, real handle is @aj_livess. Recruiters verify numbers. Fix: pick one metric + one description, sweep every file.
- **[P1] Keyboard-inaccessible interactions** — Copy Email card is a div with onClick (no button/role/tabindex); BentoGrid carousel responds only to hover/click. WCAG 2.1.1. Fix: real `<button>` + aria-pressed for copy; keyboard + focus management for the carousel.
- **[P1] Low-contrast tiny text** — gray-400 (#9CA3AF) on white/beige = 2.2–2.5:1 (fails AA); accent blue 4.46:1 borderline on beige; white/30–40% subtitles on dark cards fail; 8–11px text used throughout (SocialsBar subtitles are 8px). Fix: darken muted tokens, enforce ≥12px, add text opacity floor.
- **[P1] Broken "Call Me" link** — href is `tel:+918\*\*\*\*3107` (masked) while the label shows the real number. The primary phone action is dead. Fix: put the real number in the href.
- **[P1] No prefers-reduced-motion handling** — marquee (25s infinite), 2× animate-ping, pulse-green, 2× animate-pulse, ~24 framer-motion springs, global smooth-scroll — all run unconditionally. WCAG 2.3.3/2.2.2. Fix: motion-safe/motion-reduce variants + a global reduced-motion guard.
- **[P2] Desktop horizontal overflow masked** — hero badge to x=1360 (80px past a 1280 viewport), light card to 1290; `overflow-x: hidden` hides it and kills any scrollbar. Fix: replace the huge negative offsets (md:-right-[206px]) with responsive-safe positioning.
- **[P2] Design-system drift + brand mismatch** — ~30 hard-coded hexes vs the 7 tokens that exist; no dark mode; `* { font-family: var(--font-mono) !important }` global hack; brand orange #F97316 appears once. Fix: consolidate tokens, decide the accent, remove the !important.
- **[P2] AI-generated-UI tells** (detector): dot-grid background, side-tab borders, violet/indigo gradients, bounce naming — design-literate recruiters spot these. Fix: replace with product-structure visuals.
- **[P2] Dead code & image optimization** — `animate-bounce-subtle` undefined; 4 plain `<img>` (~465KB) without next/image (no lazy, no dimensions → CLS); 175KB favicon. Lint fails: 29 errors / 6 warnings.
- **[P3] Minor friction** — Blog nav link hidden on mobile; Experience tabs lack aria-selected; Achievements scroll container has no visible scrollbar/cue; "Soon" blog cards link to the Substack root; 620px booking iframe kills the page ending; 3 redundant "available" indicators (hero pill, Status card, footer pill).

## Persona Red Flags

- **Jordan (first-timer/recruiter)**: "Book a Call" jumps straight into a full scheduling calendar — commitment before context. The carousel hides 4 of 5 highlight cards behind hover. "LangGraph orchestrations" assumes AI fluency. Résumé opens a Google Drive viewer instead of the file.
- **Sam (accessibility)**: Copy Email and the BentoGrid carousel are unreachable by keyboard. gray-400 text unreadable (2.2:1). 8px subtitles. Infinite marquee/pings with no reduced-motion. Nav links are 34px tall — a below-44px touch target. Focus outline is default browser blue on a custom design.
- **Casey (mobile)**: Layout holds (zero overflow verified), but Blog is unreachable from nav, the carousel needs taps on small overlapping cards, and the booking widget forces scrolling inside a fixed 620px frame.

## Minor Observations

- "4,000 followers" vs "4K+ users" appear in the same viewport (Hero body vs floating badge)
- "Discovered hacking basics" (timeline 2019) is odd phrasing for a professional portfolio
- LeetCode card is the only social card with dark-on-orange — breaks the otherwise uniform white-on-brand pattern
- 9 achievements listed vs "7 Hackathon wins" — datathons/quizatron aren't hackathons, defensible but confusing
- The origin story — the best content on the page — is in 12px text at 80% scroll depth
- 3 separate "available for work" indicators across the page
- Pune location card flagged as clipped by the scanner (decorative map-dot graphic, overflow-hidden)

## Questions to Consider

- What if the site used YOUR orange instead of a generic blue?
- What if the origin story were the hero?
- Do you need 8 social links + a booking calendar, or one clear hire path?
- Would a design-literate AI engineer reading this see "authored by Ayush" or "built from a template"?
