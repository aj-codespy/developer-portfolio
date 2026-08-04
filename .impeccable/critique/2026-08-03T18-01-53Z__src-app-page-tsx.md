---
target: src/app/page.tsx
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-03T18-01-53Z
slug: src-app-page-tsx
---
# Impeccable Critique — Ayush Jha Portfolio (src/app/page.tsx)

**Run 3 — post-fix-pass.** Method: dual-agent (A: design review · B: detector/browser evidence), two isolated parallel sub-agents, no shared output.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Availability pill, status card, LIVE/UP NEXT badges, copy-feedback. No progress/position affordance on 6.5k px page; Cal widget load state invisible. |
| 2 | Match System / Real World | 4 | Voice idiomatically human ("get on the call", "shipped solo"). [Corrected 3→4 at synthesis: A's tel mismatch dock was a redaction false positive — source carries dialable `tel:+918591413107`] |
| 3 | User Control and Freedom | 3 | Anchors, smooth scroll, logo-as-back-to-top, bidirectional carousel. No destructive ops exist. |
| 4 | Consistency and Standards | 3 | Tokenized theme, consistent 2rem radii, mono labels. Three equal white hero CTAs with no primary; headings alternate uppercase/sentence case; two contact CTAs → different destinations (#contact vs #booking). |
| 5 | Error Prevention | 2 | 14 unnamed links (6 empty card overlays + 8 GitHub title-only) defeat the heuristic; copy-email fallback chain is good. |
| 6 | Recognition Rather Than Recall | 3 | Single page, no state to remember. Three near-identical contact CTAs ("Get in touch" / "Book a Call" / "Discuss Opportunities") force recall; tabs/carousel hide content. |
| 7 | Flexibility and Efficiency | n/a | Read-only one-page portfolio; no repeated multi-step task. |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely polished: restrained palette, consistent radii, disciplined spacing. Docked for density: ~40 text-bearing elements ≤11px, 45 links, 7 persuasive goals. |
| 9 | Error Recovery | 2 | Only real error surface — Cal.com booking widget — has zero error treatment (empty 520px box on failure). Copy-email fallback is the sole recovery mechanism. |
| 10 | Help and Documentation | n/a | Read-only surface; resume + contact CTAs are the "help". |
| **Total** | | **23/32** | **Good** |

## Design Specificity Verdict

**Substance: 100% Ayush. Form: ~70% interchangeable.** Copy is irreplaceably singular ("I build like it's my own company", "0 specs — just raw problems", origin story, getPlaced 5K, CodeChef 1633). Composition is a well-executed instance of the 2024–25 AI-engineer-portfolio genre (floating pill navbar, blue-on-cream bento, marquee, tabbed experience, card carousel, Cal booking). No signature visual motif beyond the dot-grid + blue spotlight, which reads as décor. The differentiator is voice — a copy decision, not a design decision.

**Deterministic scan:** detector exit 0, `[]` — zero findings (run 1: 7, run 2: 6). Browser: no horizontal overflow (scrollWidth 1265 < 1280), 0 console errors, 0 missing alts, 0 empty/hash hrefs, 57/57 focusable elements with visible focus, 59 sub-11px font elements (47 leaf, ~40 text-bearing; min 9px), 18 inline-hex styles (7 unique — all hero tech-legend brand dots), 73 uppercase/tracked labels (~47 ≤11px, 7 `//`-comment section labels).

## Overall Impression

A polished, voice-led, engineering-clean portfolio whose content is irreplaceably Ayush's but whose design is replaceable with a find-and-replace. All four original P0s verified fixed; craft discipline and honesty are real. What's not yet: design identity and conversion focus — the hero splits attention 8 ways, and the page ends on a wall of choices instead of one clear action.

## What's Working

1. **Voice is the brand** — deployed at every section boundary, uncloneable.
2. **Engineering-grade craft** — tokenized theme, one accent blue, reduced-motion (CSS + MotionConfig), proper tab/aria-selected/aria-live-on-copy semantics, alt on all images, canonicalized SEO, robots/sitemap prerendered.
3. **Quantified proof** — every claim carries a number (5,000+ users, 9 named wins, GPA 9.3, 80%/30% impact, 1572/1308/1633).
4. **Explicit hiring status** — availability readable in the first 2 seconds; strong reassurance asset.

## Priority Issues

- **[P0] 14 unnamed links.** 6 full-card overlays (getPlaced, Cureify, FinChat, AI Form Builder, LawBuddy, Lead Scraper) have zero accessible name (`aria-label: null, title: ""` — verified in a11y tree: bare `link` entries); 8 GitHub icon links rely on `title="View Source Code"` only. Screen-reader users hear bare links; keyboard users get two unlabeled tab stops per project. Fix: `aria-label="getPlaced — open live site"` on overlays, `aria-label="View getPlaced source on GitHub"` on icons. → `$impeccable harden`
- **[P1] Flat hero CTA hierarchy + overstuffed first viewport.** Three visually identical white CTAs (Get in touch / See my work / Résumé) + photo + 3 floating overlays ≈ 8 competing elements before the fold. The one decision the hero must drive (contact) is not primary. Fix: solid primary for "Get in touch", ghost the others, cut one floating card. → `$impeccable layout`
- **[P1] Sub-AA microtype at scale.** ~40 text-bearing elements at ≤11px (many 10px in gray-500 on cream ≈ 3.5:1 — fails AA), carrying real content (craft skills, education, status). Fix: floor readable content at 12px, darken gray-500→600 below 12px. → `$impeccable typeset`
- **[P2] The ending is a choice wall.** Final 1,000px = booking widget + 8 social cards + copy-email (up to 10 exits), no primary; three contact CTAs with three labels pointing to two destinations. Emotional anti-climax after the origin-story peak. Fix: one primary action (email or booking), collapse socials to a compact icon row, unify CTA labels. → `$impeccable layout` / `clarify` / `quieter`
- **[P3] Genre-standard a11y gaps.** Tabs lack arrow-key navigation + roving tabindex (all tabIndex=0, onClick only); tech marquee not `aria-hidden` (screen readers hear the stack twice — verified in a11y tree); no skip-to-content link; no aria-live on tab/carousel content changes; carousel has no position indicator. → `$impeccable harden`

## Persona Red Flags

- **Jordan (first-timer):** h1 names neither who nor what — "I build like it's my own company" leaves identity to the small nav pill; name absent from the hero headline; three equal CTAs = no CTA; "Class of 2027" + 63% registers before the 9.3 GPA.
- **Riley (stress-tester):** 5+ verifiable defects in 3 minutes — unnamed overlay links, title-only GitHub links, marquee read twice, tabs with no arrow-key support, Cal widget with no loading/error state, no skip link. Each reads as quality-of-work signal.
- **Casey (mobile):** nav pill at 360px is a crowding risk; 5 rotated carousel cards in 375px = visual noise; hero CTAs ~40px hit height (under 44px guideline); 520px booking iframe with inner overflow:scroll = two-scrollbar trap.

## Minor Observations

- h2 "AYUSH JHA" collapses to "AYUSHJHA" in DOM (br); name-as-heading below a nameless h1 is a risky inversion for scanners.
- BlogPreview: 2 of 3 cards "Up Next" link to the same Substack root, not the promised post.
- Achievements: 9 rows with 7× "2nd Prize" undercuts the win count it proves; trim to 4–5.
- TechMarquee: "Next.js" and "Vercel" render identical black dots (looks like a rendering bug); stack appears ~5× across the page.
- Hero credibility strip ("0 specs — just raw problems") is the best voice moment, in the smallest type.
- No skip link; `main` has no id. Booking h2 "Schedule a Session" ≠ nav "Book a Call". Resume is a Google Drive share link (external, no filename).

## Questions to Consider

1. If a recruiter leaves with exactly one memory — the feeling ("builds like it's his own company") or the fact ("5,000 users, 7 wins") — which do you want, and does the page commit to it?
2. Who decided the 63% HSC score stays, and what would removing it cost? Honesty vs. optics for a 10-second recruiter scan.
3. If you had to delete the entire footer except one action, which survives — and what does that tell you about what this page is actually for?
4. What single motif could exist only on Ayush's portfolio — and is leaning on the genre's visual dialect a strategy or a deferral?
