---
target: src/app/page.tsx
total_score: 27.5
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-08-03T18-39-14Z
slug: src-app-page-tsx
---
# Impeccable Critique — Ayush Jha Portfolio (run 4, post-fix-pass)

**Method: dual-agent (A: design review deleg_885bf9cf/task-0 · B: detector+browser deleg_885bf9cf/task-1)**

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3.5 | Availability pulse, active tab, copied-state, hover lifts; no scroll-progress indicator |
| 2 | Match System / Real World | 3.5 | Jargon (agentic, LangGraph, 36-hour sprints) but audience-appropriate for US startup founders |
| 3 | User Control and Freedom | 3 | Single page, back works; carousels have no jump-to-project; no exit affordance from Cal iframe |
| 4 | Consistency and Standards | 3 | `//` label system missing from 3 sections; heading scale varies (text-2xl vs 3xl); bento fan deviates without teaching itself |
| 5 | Error Prevention | 3.5 | Minimal inputs; email-copy triple fallback; rel=noopener; nothing destructive (was 2: 14 unnamed links — now 0) |
| 6 | Recognition Rather Than Recall | 3 | Consistent nav + eyebrows help; 8-project carousel and fan require remembered interaction |
| 7 | Flexibility and Efficiency | 3 | Keyboard tab arrows implemented; no accelerators, no jump links beyond 3 anchors |
| 8 | Aesthetic and Minimalist Design | 2 | Dense surface for a conversion page: 5-card fan + 8-item carousel + 9 win entries + 9 footer icons + dot-grid + mesh + 4 floating hero cards + marquee |
| 9 | Error Recovery | 3 | Nothing to recover from on static surface; copy-email prompt fallback handled (was 2) |
| 10 | Help and Documentation | n/a | Single-page Experience surface; page short and self-evident |
| **Total** | | **27.5/36** | **76% — Good** |

## Design Specificity Verdict

**Substance ≈ 80% specific, Form ≈ 30% specific → weighted ~60/40.**

The content is genuinely this product: "20+ cold conversations with founders • 1 product shipped solo • 0 specs", "I've sat in the user call AND written the code", shin-splints, Bihar→Mumbai, "reduce monetary stress for my parents", honest HSC 63%, real ratings (1572/1308/1633), 9 named wins. No template produced this — a person, not a persona.

The form is category-interchangeable 2026 AI-dev-portfolio vocabulary: bento grid, `// SECTION` mono eyebrows, Geist + JetBrains Mono, blue-on-cream, dark-card alternation, tech marquee, zig-zag timeline, Cal.com embed, carousel. Nothing in the design language encodes "India", "solo operator", "agent builder", "late-night builder" — identity lives entirely in copy. The one form-level element with personality (the fanned bento cards) is the least discoverable interaction on the page.

**Deterministic scan:** detector `[]` — zero findings, exit 0 (registry covers 40+ antipatterns incl. tiny text, overflow, low-contrast, auto-scrolling marquee). Additional browser evidence: 0 overflow, 0 console errors, 0 unnamed links, 0 missing alts, 58/58 visible focus, 3 sub-11px elements (all intentional ↗ ornaments), 4 sub-12px (+ the approved hero chip).

**Visual overlays:** vision provider rejected image input; screenshots captured for human review (`browser_screenshot_f5e61db78e5c4669a8cd4520224c177d.png`, `browser_screenshot_39dd05666cab4e34999336faba2671a6.png`). Fallback signal used: DOM + computed-style measurements.

## Overall Impression

A portfolio with a real moat (narrative + verifiable evidence) wearing a generic AI-portfolio shell. The conversion plumbing is complete and now mechanically clean — every a11y/typography/overflow defect from run 3 is gone — but the highest-leverage remaining problems are trust-level (numbers that don't reconcile), mobile-level (nav clips on small phones), and ending-level (the site closes on a bare calendar after its warmest content).

## What's Working

1. **Genuine narrative specificity.** The founder positioning, the honesty (63% HSC shown, "0 specs"), family motivation, physical details — this is the site's moat; no category template produces it.
2. **Evidence density.** Nearly every claim carries a number: 80%/30%/40%/100GB at Aligned, 5,000+ users, three platform ratings, 9 named wins with organizers. Recruiters can verify — which is what converts.
3. **A complete, working conversion funnel.** Availability badge → CTAs → verified Cal.com embed → email-copy with fallback → résumé → 9 touchpoints. The plumbing functions (embed rendering confirmed in browser).

## Priority Issues

1. **[P1] Mobile navbar clips the primary CTA ≤375px.** Navbar content ≈375px against a 95% (≈370px) budget with `whitespace-nowrap` everywhere; `overflow-x:hidden` on `<html>` amputates the right edge of "Book a Call" (~9px at 375px, ~24px at 360px — iPhone SE/Android territory). **Why:** target audience opens links from phones; the primary conversion action is cut. **Fix:** drop Blog link below `sm`, shrink CTA to "Book", or a real mobile menu; test at 360/375/390. → `$impeccable adapt`
2. **[P1] Numbers don't reconcile.** "7 Hackathon wins" (BentoGrid.tsx:9) vs 2× 1st + 7× 2nd = **9 achievements** (Achievements.tsx); "5K+" badge vs "5,000+" prose (minor). **Why:** recruiters actively reconcile numbers; the first inconsistency poisons trust in everything else, including the real 5,000 users. **Fix:** "9 competition wins" or count exactly. → `$impeccable clarify`
3. **[P1] Dead affordances + undiscoverable carousels.** `cursor-pointer` on non-interactive Growth & Discipline / Scenic landscape cards; hover-lift on non-interactive timeline nodes; both carousels have no dots/counter/hint; the bento fan (5 cards) gives zero signal it's interactive; nav "Work" → `#work` lands on Featured Projects, **skipping the Work History section** (Experience.tsx has no id). **Why:** dead interactivity reads as sloppiness; the site's most distinctive interaction (the fan) goes undiscovered. **Fix:** remove false cursor/hover; add "1/8" counter or dots to projects; microcopy on the fan; give Experience `id="experience"` and retarget nav. → `$impeccable clarify` + `$impeccable layout`
4. **[P2] Cold ending; no call context.** The final viewport is a bare calendar + icon grid — no line says what the call is, how long, what to expect. **Why:** peak-end is the single highest-leverage conversion moment, currently an un-framed widget. **Fix:** 2–3 framing lines above the embed ("20 minutes, no pitch deck — let's talk about your problem and how agents fit it") + warm sign-off. → `$impeccable clarify`
5. **[P2] AA contrast misses at the core text scale.** `#2563EB` labels on cream 4.46:1; gray-500 journey subtitles on dark 4.39:1; `white/60` blog body ~3.7:1 — all at 12px. **Why:** marginal failures compound over a 6,000px page. **Fix:** `#1D4ED8` for text roles, gray-400 on dark, or bump to 13–14px; add designed `focus-visible` rings to nav. → `$impeccable typeset`

## Persona Red Flags

- **Jordan (first-timer):** No name or role in the hero headline (name only in the small navbar; the big "AYUSH JHA" block is below the fold). The bento fan looks static → skips the founder/hackathon story entirely. HSC-63% dossier appears *before* the achievements that reframe it. Three equal-weight hero CTAs split the first decision.
- **Riley (stress tester):** 7-vs-9 win reconciliation fails; dead `cursor-pointer` cards confirm "fake interactivity"; two "Coming Soon" posts contradict the shipping narrative; "Active" LeetCode chip is ambiguous; five fragmented handles (`@aj-codespy`, `@aj-codess`, `@aj_livess`, `aj.codes.py`, `@aj_ayushhh`) complicate identity verification; "Corporate Coding" is vague next to the internship's excellent numbers.
- **Casey (mobile):** Navbar CTA clipped ≤375px; bento fan ~416px wide on a 390px screen → outer cards amputated; the two strongest copy cards ("My edge", "FastAPI · LangGraph · Firebase") are `hidden sm:block` — mobile users lose the best positioning line; carousel arrows 40×40 (below 44px target); 520px Cal embed scrolls internally (gesture trap); hover-only interactions dead on touch.

## Minor Observations

- Two 2026 timeline nodes ("Corporate Coding", "Shipped First SaaS") — duplicate-year zig-zag reads oddly.
- H4 "Pune, India" semantically nested under the Mindset H3 (it's a sibling card).
- 10px `↗` characters on education links are nearly invisible.
- "Find Me Online" row still carries dead `bgColor/username/subtitle` config — the rich-card layout is gone, so the section over-promises (implies handles, delivers tooltips).
- `aria-live="polite"` sits on the copy button itself — unusual, works, noise-prone.
- "FEATURED PROJECTS" eyebrow lacks the `//` prefix used by 7 other sections.
- Marquee is well-built (aria-hidden track + sr-only list); brands are re-announced in the TECH STACK list, so no information loss.
- `focusRulesCount: 0` — Tailwind focus utilities aren't compiled in the dev build; nav relies on the default UA outline (visible but un-designed).

## Questions to Consider

1. If a founder reads only hero + status card, do they remember "he'll understand my problem" or "he ships fast" — and does the H1 undersell the real proof (getPlaced, 9 wins)?
2. Why is the single best positioning line ("sat in the user call AND written the code") on a card hidden on mobile — the exact device your target opens the link on?
3. Nine social destinations at the end: helping a founder choose, or broadcasting? Which two actually convert US remote roles?
4. The site's last word is a calendar. Should the last word be the origin story, with the calendar as a means rather than the ending?
5. Do two "Coming Soon" posts strengthen the shipping story or hand Riley a count of unshipped promises?
6. Five different handles across platforms — is "AJ" a brand or an accident?

## Synthesis Notes

- Assessments agree on cleanliness: A's mechanical checks and B's deterministic scan both show the run-3 defects (unnamed links, overflow, microtype) are gone; P0 count 1 → **0**.
- B corrected a false positive: a naive static focus-outline check reported 58/58 missing; the dynamic focused-state check shows all 58 have `:focus`-only outlines — 58/58 visible.
- A's heuristic 8 (Aesthetic, 2) is the outlier vs run 3 (3): the ending and achievements got quieter this pass, but the total surface density (fan + carousel + marquee + mesh) still reads busy to a demanding director — a judgment of the incumbent visual world, not a regression.
- The marquee's whole track (both copies) is `aria-hidden`; acceptable since the 9 brands are announced in the TECH STACK list.
