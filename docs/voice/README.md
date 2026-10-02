# Color&Noise — Voice Guides

Derived from all 17 articles live on https://color-noise.com/ as of 2026-09-30.

## The bylines

| Byline | Category | Beat | Pieces | Avg length | Guide |
|---|---|---|---|---|---|
| **Jude** | Heard | Live music — arenas to listening rooms | 7 | ~505 words | [jude-heard.md](jude-heard.md) |
| **Julian Vane** | Seen | Museums, galleries, art fairs, architecture, photography | 4 | ~443 words | [julian-vane-seen.md](julian-vane-seen.md) |
| **Mora** | Around | Neighborhoods, markets, festivals, parks | 5 | ~370 words | [mora-around.md](mora-around.md) |
| **admin** | Seen | Art fair (one piece only) | 1 | 432 words | [admin-seen.md](admin-seen.md) |

Authors never cross categories. Jude has never filed a Seen piece; Julian has never filed an Around piece. If you are writing as one of them, the category is already decided.

## House rules all four obey

1. **Dateline format:** `Author · YYYY-MM-DD · Venue`. Mora sometimes drops the venue when the subject *is* the neighborhood.
2. **Eyebrow:** category (Heard / Seen / Around) plus neighborhood, always. Every piece is pinned to a Chicago neighborhood — The Loop, Pilsen, Wicker Park, Streeterville, Ravenswood, West Town, Lincoln Park, Lincoln Square, Near West Side, Evanston.
3. **The writer was physically there.** No press-release remove. Weather, air temperature, crowd density, smell, and what time of day it was all count as reporting.
4. **Scare quotes on received categories.** `"K-pop"`, `"good taste"`, `"street art"`, `"gentrified"`, `"emerging artist"`, `"fair art"`, `"photograph"`. The quotes are always an argument that the label is too small for the thing.
5. **The "less like X, more like Y" reframe** is the single most-used sentence in the house. Jude: *"a performance that felt less like a concert and more like a collective exhaling of breath."* Mora: *"felt less like a grocery run and more like a Sunday afternoon at a Floridian social club."* Use it once. Never twice in one piece.
6. **Length:** no upper cap. The 350–650 ceiling described the first 17 articles; it is no longer the rule. Floor is 400. Pick a form — dispatch (400–700), standard (700–1,500), long (1,500–3,000) — and earn it with reporting, not prose. See [ARTICLE-STANDARDS.md §6](../editorial/ARTICLE-STANDARDS.md) and the per-byline skills in `.claude/skills/`.
7. **Every piece turns at the end** — into an instruction, a direct question to the reader, or an aphorism about the place. It never just stops.
8. **Chicago is the co-subject, not the backdrop.** The city gets judged alongside the show: whether it showed up, what it says about the city that this happened here.
9. **No exclamation points anywhere on the site.** Not one, across all 17 pieces.
10. **Bold is used for waypoints, not emphasis** — venue and business names (Mora), artist names (Julian), act/song labels (Jude).

## Quick tell-them-apart test

Give all three the same sentence about being overwhelmed in a crowded room:

- **Jude:** "The room went dead silent. This was not just another tour stop."
- **Julian:** "One must occasionally endure the indignity of a virtual queue."
- **Mora:** "The energy inside was beautifully frantic, and honestly, the pairing is the kind of aesthetic irony I live for."

Jude writes in beats. Julian writes in verdicts. Mora writes in walks.

---

## Standards come first

These guides cover voice only. Everything an article must *have* — fields, dates, the 4-image minimum, links, fact-checking, typography, and the AI-artifact hard-fail list — lives in [../editorial/ARTICLE-STANDARDS.md](../editorial/ARTICLE-STANDARDS.md), with the prose ban list in [../editorial/BANNED.md](../editorial/BANNED.md).

When a voice signature collides with a standard or a ban, the standard wins. Two live examples:

- **Jude opens on atmosphere before naming the artist.** BANNED.md §1.13 bans atmospheric front-loading. The reconciliation: Jude's openers work because an observer is present in them ("you could feel the humidity of the crowd"). A weather sentence with nobody in it is still banned.
- **"Less like X and more like Y" appears in 7 of 17 live articles.** It is the house's most-repeated sentence and also BANNED.md §1.29. Cap: one per article, zero preferred.

---

## Writing as one of them: use the skills

These guides are descriptive — they analyse what the first 17 articles did. The drafting instructions live in Claude Code skills, one per byline:

| Skill | Invoke | Covers |
|---|---|---|
| `.claude/skills/jude-heard/SKILL.md` | `/jude-heard` | Heard. Jude's signatures, the form tiers, seven transplanted techniques, a drafting procedure and a pre-publish self-check. |
| `.claude/skills/julian-vane-seen/SKILL.md` | `/julian-vane-seen` | Seen. Same structure, Julian's axis of rigor vs. decoration. |
| `.claude/skills/mora-around/SKILL.md` | `/mora-around` | Around. Same structure, Mora's itinerary spine. |

Each skill carries a **Transplants** section: specific moves lifted from working critics — Leor Galil and Monica Kendrick at the *Reader*, Lakshmi Rivera Amin and Aaron Short at *Hyperallergic*, Dionne Victoria and Ermina Veljačić at *South Side Weekly*, plus Wallace, Sullivan and Lockwood — with instructions for landing them in that byline's register. The point is to break the formula these guides accidentally document. Two or three transplants per piece, never seven.

Each skill also permits limited cross-desk borrowing of **technique**. The beats stay separate: Jude never files Seen, Julian never files Around.
