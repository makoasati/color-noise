# Color&Noise — Article Standards

**Status:** binding. Every article must pass this before status goes to `published`.
**Scope:** everything *except* voice. Voice lives in [../voice/](../voice/README.md) — one guide per byline.
**Companion:** [BANNED.md](BANNED.md) — the prose ban list. Section 12 of this document is the enforcement hook.

Precedence when documents conflict: **Article Standards → BANNED.md → author voice guide.** A voice tic never justifies breaking a standard. If Jude's signature construction collides with a ban, the ban wins and Jude finds a new sentence.

---

## 1. Required CMS fields

Field names are exact, from [components/ArticleEditor.js:18](../../components/ArticleEditor.js#L18).

| Field | Required | Rule |
|---|---|---|
| `title` | **Yes** (enforced) | See §2 |
| `excerpt` | **Yes** (enforced) | See §4 |
| `author_name` | **Yes** | Must be an existing byline: `Jude`, `Julian Vane`, `Mora`. Never `admin` — see §14. |
| `category` | **Yes** | `review` → Heard · `news` → Around · `spotlight` → Seen. Must match the author's beat. |
| `date` | **Yes** | See §3 |
| `neighborhood` | **Yes** | Pick from the existing list in the combo box. Do not invent a new spelling of an existing neighborhood. |
| `venue` | Yes for Heard and Seen | Optional for Around only when the neighborhood *is* the subject |
| `cover_image` | **Yes** | See §5 |
| `body` | **Yes** | See §6 |
| `featured` | No | Editor's call |

Only two of these are enforced in code (`title`, `excerpt`). The rest are enforced by this document — check them by hand.

## 2. Title and slug

- **Length:** 30–75 characters. Every live title uses the house form `Hook: Specific Subject at Specific Place` — *"The Quiet Intensity of Skullcrusher at Maurer Hall"*, *"The Pier's Purge: Curatorial Clarity at EXPO Chicago 2026"*. Keep it.
- **The title must name a real proper noun** — an artist, a venue, an exhibition, or a neighborhood. No title may be generic enough to fit another article.
- **The title is the clickable link.** It renders as the `<h1>` on the article page and as the card link on the homepage. Never paste a URL into the title, never end it with a period, and never wrap it in quotes.
- **Never repeat the title as the first line of the body.** The page already renders it. *(Violated today by the LENS 2026 piece, which opens with its own headline as a body heading.)*
- **The slug is frozen at first save.** It is generated from the title by `slugify()` and a suffix, and editing the title later does **not** regenerate it. So the title must be final before the first save.
  - **Live failure:** the Bruce Goff article's URL is `/article/-gemini-said-the-michelangelo-of-kitsch-...`. The title pasted into the CMS was `Gemini said: The Michelangelo of Kitsch...`. The title was cleaned up; the slug kept the receipt. **Fix this URL with a redirect, and never paste a chat transcript into the title field.**
  - Before saving, read the slug preview out loud. If it contains `gemini`, `said`, `chatgpt`, `claude`, `draft`, `final`, `v2`, `copy`, `untitled`, or a leading hyphen, stop.

## 3. Dates

- `date` is the **publication date**, `YYYY-MM-DD`, and it is what appears in the dateline.
- **The event date goes in the body, explicitly**, and it is never the same sentence as the publication date. The live pieces do this well: *"They essentially annexed it (April 6–7, 2026)"*, *"April 3rd and 4th saw over 100 vendors"*, *"EXPO Chicago returns this weekend (April 9–12)"*.
- **Every article must make its tense legible.** A preview says *returns this weekend*; a review says *this past Saturday*. A reader must never have to check the dateline to know whether the thing already happened.
- Ranges use an en dash and no spaces: `April 9–12`. Single dates in body prose use `March 29th` / `April 4th` (house style — the live corpus is consistent on this).
- Forward-looking pieces must include a **Show Details** or equivalent block with venue, dates, and time. See the Twin Peaks piece.
- No relative-only time references. *"Last week"* is fine **with** a date attached; alone it rots.

## 4. Excerpt

- **Required by the save handler** — the article will not save without it.
- 25–40 words, one or two sentences. It does double duty: the homepage card blurb **and** the `<meta name="description">` on the article page ([app/article/[slug]/page.js:25](../../app/article/[slug]/page.js#L25)).
- **Must be written, not pasted.** Do not copy the first sentence of the body. The excerpt is read *before* the body and next to sixteen other cards; its job is to differentiate.
- Must name the subject and the place. No teaser that withholds ("You won't believe what happened at Thalia Hall").
- No trailing ellipsis. No question. No "Read on".

## 5. Images — minimum 4 per article

**The floor is 4 images: 1 cover + 3 in the body.** Longer pieces should carry 5–6.

Today **8 of 17 live articles have only the cover image**. Those are below standard and should be backfilled.

### 5.1 Sourcing and format

- **Upload through the editor.** Both the cover field and the body image tool upload to the `article-images` Supabase bucket and insert a public URL — use them. ([CoverImageField.js:6](../../components/CoverImageField.js#L6), [RichTextEditor.js:198](../../components/RichTextEditor.js#L198))
- **Never paste an image into the body.** Pasting embeds a base64 `data:` URI directly into the article HTML. This is currently wrecking four live pages:

  | Article | Base64 images | Page weight |
  |---|---|---|
  | Small Wonders / Trinket Fest | 4 | **17.1 MB** |
  | The Human Aperture / LENS 2026 | 2 | **9.2 MB** |
  | Green City Market & Clark St. | 1 | 2.4 MB |
  | Biscuits, Beets | 1 | 2.3 MB |

  A normal Color&Noise page is **27–31 KB**. A 17 MB article is unopenable on transit Wi-Fi, uncacheable, and unindexable. `scripts/migrate-images.js` only ever migrated *cover* images, so body base64 is still sitting in the database.
- **Formats:** JPEG or WebP. No PNG for photographs. No GIF.
- **Budget:** ≤ 250 KB per image, ≤ 1600 px on the long edge, **total page weight under 600 KB.**
- **No AI-generated or AI-upscaled images, ever.** No stock photography of a generic concert crowd. If you did not shoot it and cannot credit it, do not publish it.

### 5.2 Every image needs three things

1. **Alt text** — describes what is in the frame for someone who cannot see it. Not the caption, not the title. *"Tulips in front of the Chicago skyline at the Lincoln Park Zoo gardens"*, not *"zoo"*.
2. **A caption** — the site's existing convention is a bare name line under the image (`Anticonquista Café`, `Lost Soul Found`, `Eagle Columns`). For artwork, use `Artist / Title, Year`, as the EXPO recap does: `Yvette Mayorga / Self Portrait of the Artist After Élisabeth Louise Vigée Le Brun, 2025`.
3. **A credit** — photographer or institution. The Goff piece does it right: `Bruce Goff in his office at the University of Oklahoma, about 1954 / Philip B. Welch`. Press images must be credited to the press office. Your own photos get `Photo: [name]`.

**Known gap:** the cover image is rendered with a hardcoded `alt=""` at [app/article/[slug]/page.js:66](../../app/article/[slug]/page.js#L66). Every cover on the site is invisible to a screen reader. This needs a code fix and an `alt` field — see §14.

### 5.4 Embedded social posts

Where a licensed photograph cannot be obtained, an embedded post is an acceptable substitute and counts toward the 4-image minimum. This **reverses** the earlier guidance in this section that embeds were "fine as a supplement, bad as a primary art strategy" — for the summer 2026 package they *are* the primary strategy, because the licensing pathways for 2026 performance photography are mostly ASK or PAID and the alternative is publishing with no art at all. That is a deliberate trade, and these are its terms.

- **Build every embed with [content/summer-2026/embeds.js](../../content/summer-2026/embeds.js).** Do not hand-write iframe markup.
- **Iframes only.** The body renders through `dangerouslySetInnerHTML`, so injected `<script>` never executes — Instagram's `embed.js` blockquote and X's `widgets.js` approach cannot work here. The helper uses each platform's script-free iframe endpoint instead.
- **Allowed hosts:** `www.instagram.com`, `www.tiktok.com`, `www.youtube.com`, `www.facebook.com`. The seed script rejects any other iframe host.
- **X/Twitter has no script-free iframe — link it, never embed it.** `accountLink()` renders a credited link-out.
- **An account feed is not a post.** Only embed a specific permalink. A profile URL gets a link, not an iframe.
- **Every embed carries a visible credit line with a live permalink**, so the attribution survives the iframe breaking. The helper enforces this; the seed script re-checks it.
- **Never put load-bearing information inside an embed.** If the creator deletes the post or goes private, the article must still make sense. Embeds illustrate; they do not report.
- **Embeds cannot fill `cover_image`.** That field needs a real hosted URL. Covers must come from a genuinely free source — Wikimedia Commons, the Choose Chicago library, or DVIDS for anything military.
- **Verify before shipping.** Instagram returns HTTP 200 for missing posts, so a status check is not proof. Confirm the payload contains real post content.
- Embed captions are excluded from the body word count. They are body text, not writing.

**Known code gap:** `cover_credit` and `cover_alt` are recorded in the content files but there are no such columns in `articles`, so the seed script drops them. They are documentation until the schema gains those fields — see §14.

### 5.3 Placement

- Cover image sits above the title; it carries the card and should be the strongest frame you have.
- Body images go **after** the paragraph they illustrate, never before.
- Never two images back to back with no prose between them.
- Never end the article on an image. *(The EXPO recap does — its last element is an uncaptioned Sarah Nsikak credit with no closing prose. Don't copy that.)*

## 6. Body

- **Length: no upper cap.** The old 400–650 ceiling is retired. Pick a form and commit to it:

  | Form | Words |
  |---|---|
  | Dispatch / Notice / Walk | 400–700 |
  | Standard | 700–1,500 — **the default** |
  | Long | 1,500–3,000 |

  **400 words is still the floor.** Length is earned by reporting, not by prose: more words means more stops, more names, more numbers, more hours on site. A 2,000-word piece built from a 500-word visit is worse than the 500-word piece. The per-byline skills in `.claude/skills/` define the form tiers and the reporting each one requires.
- **Paragraphs: 3–6 sentences.** No one-sentence paragraphs used for drama.
- **Subheads:** optional, `<h3>`, 2–5 words. Use them if the piece has discrete parts (acts, sections, artists). Do not use them to break up 400 words of continuous argument. If you use one, use at least three.
- **Bold is for waypoints, not emphasis** — venue and business names (Around), artist names (Seen), act and song labels (Heard). Never bold a sentence for intensity.
- **Every proper noun gets its full form once**, then a short form. `The Old Town School of Folk Music` → `Maurer Hall`. `Kate Sierzputowski`, not `Sierzputowski` on first mention.
- **Diacritics are mandatory and must be checked:** `Nausicaä`, `Élisabeth Louise Vigée Le Brun`, `Anticonquista Café`, `Nuevo Leon Bakery`. Copy them from the institution's own page, not from memory.
- Song and exhibition titles in quotes; album, book, and film titles in italics. **Italics via the editor's italic button — never `*asterisks*`.** *(Live violation: the Hisaishi piece renders `*Nausicaä of the Valley of the Wind*` and `*My Neighbor Totoro*` with literal asterisks on the page. Markdown pasted into a rich-text field does not become italics; it becomes garbage.)*

## 7. Links

- **Minimum 3 outbound links per article**, on first mention: the venue, the artist or institution, and any business or organization named.
- Link to the primary source — the venue's own event page, the gallery, the artist's site. Not to a wire aggregator, not to a ticket reseller, not to another Color&Noise article as filler.
- **Link text is the thing's name.** Never "click here", never "read more", never a bare URL in prose.
- Check every link resolves before publishing. A dead venue link on a listings site is worse than no link.
- Internal links to related Color&Noise pieces are encouraged where genuinely related — the two EXPO 2026 pieces should link to each other and currently don't.

## 8. Facts to verify before publishing

Verify each against a primary source and be able to say which one:

- [ ] Artist, curator, and venue names — spelling **and** diacritics
- [ ] Job titles and institutional affiliations (*"the Detroit Institute of Arts' Katie A. Pfohl"*)
- [ ] Event dates, including which day of the week they fell on
- [ ] Street addresses and neighborhood assignment (`1817 N. Clark St.`)
- [ ] Capacity, attendance, submission, and price figures — every number in the piece
- [ ] Song, album, exhibition, and film titles
- [ ] Anything historical. The buried-history aside is Mora's signature and the highest-risk sentence on the site. *"Started back in 1868 with just a pair of swans"* and *"the City Cemetery"* must each trace to a real source.

**No number, date, or quote may enter an article from memory.** If you cannot source it, cut it — a missing detail is invisible, a wrong one is permanent.

## 9. Typography and mechanics

Hard rules. All of these are checkable with a search:

- **Em dash `—`** for parenthetical breaks, closed up or spaced consistently within a piece. **Never a hyphen standing in for a dash.** *(Live violation in the EXPO recap: `galleries-none older than twelve year-` and `pink-specifically`.)*
- **En dash `–`** for ranges: `April 9–12`, `2013–2019`.
- **Curly quotes and apostrophes only** — `’` `“` `”`. The corpus currently mixes straight and curly within single articles; pick curly and keep it.
- **No space before punctuation.** Currently violated 26 times across the corpus (`Material Worlds , the first`, `West End Girl ,`) — an artifact of pasting bolded or italicized spans. Search for ` ,` and ` .` before publishing.
- **One space after a period.** No double spaces.
- **No exclamation points.** Zero across all 17 live articles. Keep it that way.
- **Numbers:** spell out one through nine, numerals from 10 up, except with units and in dates. Big round crowd figures as numerals with commas: `23,000`.
- **No emoji. No hashtags. No ALL CAPS for emphasis.**

## 10. Accessibility

- [ ] Alt text on every image (§5.2)
- [ ] Subheads use real `<h3>` elements, not bolded paragraphs
- [ ] Link text is meaningful out of context
- [ ] No information conveyed by color alone
- [ ] No text baked into an image

## 11. Comments

Every article ships with the comments section enabled — it is part of the template. Before publishing, confirm the form renders and the profanity filter ([lib/profanity.js](../../lib/profanity.js)) is in the request path. A reader question at the end of a piece (a Jude move) is a commitment: check the thread within 48 hours.

---

## 12. AI artifacts — hard fail

An article containing any of the following does not publish. No exceptions, no "it's only one".

### 12.1 Mechanical tells — search for these every single time

| Search for | Why |
|---|---|
| `gemini`, `chatgpt`, `claude`, `as an AI`, `I hope this helps`, `Certainly!`, `Here's a`, `Sure,` | Chat scaffolding. **Already live in a URL on this site.** |
| `*` | Markdown asterisks leaking into rich text. **Already live in the Hisaishi piece.** |
| `data:image` | Base64-pasted image. **Already live in four articles.** |
| `[`, `]`, `TK`, `XX`, `TODO`, `INSERT`, `Lorem` | Unfilled placeholder |
| ` ,` and ` .` | Space before punctuation from pasted spans. **26 live instances.** |
| `-` between words where a dash belongs | Unconverted dash. **Live in the EXPO recap.** |
| The headline, inside the body | Duplicated title. **Live in the LENS piece.** |
| Straight `'` and `"` | Unconverted quotes |
| Any en/em dash inside a slug, or a leading hyphen | Slug generated from a dirty title |

### 12.2 Structural tells

- **Title duplicated as the first body heading.**
- **A closing paragraph that summarizes the article instead of ending it.** Every Color&Noise piece ends on an instruction, a question, or an aphorism about the place — never on a recap of what you just read.
- **Symmetrical sections of near-identical length.** Real reporting is lumpy: the thing you actually noticed gets four paragraphs, the rest gets one.
- **A bulleted list where the live corpus uses prose.** Lists appear in exactly three places on this site: setlist appendices, show details, and act-by-act breakdowns. Nowhere else.
- **Hedged attribution** — "reportedly", "some say", "it is often said" — used to launder a fact nobody checked. Mora's *"a few 'residents' reportedly stayed behind"* works because it is flagging folklore *as* folklore. Anything else: source it or cut it.

### 12.3 Prose tells

[BANNED.md](BANNED.md) governs. The bans that bite hardest on arts writing:

- **§2.36 promotional/brochure language** — `nestled`, `in the heart of`, `boasts`, `vibrant`, `bustling`, `stunning`, `breathtaking`, `picturesque`, `hidden gem`, `must-see`, `rich tapestry`. This is the single biggest risk for a listings-adjacent site.
- **§2.35 legacy/importance puffery** — `a testament to`, `serves as a reminder of`, `enduring legacy`, `plays a vital role`, `cannot be overstated`.
- **§2.33 AI vocabulary** — `delve`, `tapestry`, `landscape`, `interplay`, `showcase`, `underscore`, `pivotal`, `crucial`, `profound`, `compelling`, `poignant`, `palpable`, `intricate`, `nuanced`, `visceral`, `seemingly`, `ultimately`, `undeniably`.
- **§2.34 narrator-as-analyst** — any participle that explains the meaning of the thing just described: `highlighting`, `underscoring`, `reflecting`, `emphasizing`, `showcasing`.
- **§1.29 negative parallelism** — `not just X, it's Y` / `not only… but`.
- **§1.28 superficial analysis as narration** and **§1.31 trailing participle pile-up** — no more than two consecutive sentences ending in an `-ing` phrase.
- **§2.32** — `the architecture of [anything]`, `the geometry of`, `the grammar of`.

### 12.4 Where the live corpus already breaks this

Measured across all 17 published articles. These are existing violations, and the reason the ban list is now binding:

| Pattern | Articles affected | Ruling |
|---|---|---|
| `less like X and more like Y` | **7 of 17** | §1.29. Currently the house's most-repeated sentence shape and a textbook depth-simulation device. **Cap: one per article, zero preferred.** |
| `a reminder that` | **7 of 17** | §2.35. Retire the phrase. Show the thing that reminds you. |
| `masterclass` | 5 | Dead intensifier. Max one per author per month. |
| `the weight of` | 4 | §2.2 vague interiority. Banned. |
| `the architecture of [X]` | 2 | §2.32. Banned outright. |
| `vibrant`, `palpable`, `profound`, `intricate`, `visceral`, `compelling` | 2 each | §2.33. Banned. |
| `testament`, `showcases`, `undeniably`, `vital`, `in the heart of` | 1 each | §2.35 / §2.33 / §2.36. Banned. |

Note the distinction the ban list itself draws (§3.1, the Accumulation Principle): a single instance is not the crime. **Density is.** `There is a specific kind of ___` appears in 4 of Jude's 7 pieces and `There's a specific ___` in 3 of Mora's 5. Those are the authors' real signatures, and they are also, at that frequency, the exact pattern that makes prose read as generated. **Rule: a signature construction may appear in no more than half an author's pieces in any rolling quarter.**

### 12.5 The two tests that catch what searching won't

From BANNED.md §3.7:

1. **Specificity test** — could any sentence in this article appear unchanged in an article about a different show, in a different city? If yes, rewrite it.
2. **Consequence test** — does the piece report something that changed? A show happened, a fair got smaller, a market came back outdoors. If nothing changed, there is no article.

---

## 13. Pre-publish checklist

Copy this into the draft and clear every box.

```
FIELDS
[ ] title final BEFORE first save (slug is frozen at save)
[ ] slug preview read and clean — no gemini/chatgpt/draft/leading hyphen
[ ] excerpt written fresh, 25–40 words, not the body's first line
[ ] author_name is Jude / Julian Vane / Mora — never admin
[ ] category matches the author's beat
[ ] date = publication date, YYYY-MM-DD
[ ] neighborhood set, spelled to match existing entries
[ ] venue set (required for Heard and Seen)

IMAGES
[ ] 4+ images: 1 cover + 3 body
[ ] every image uploaded via the editor — zero "data:image" in the body
[ ] every image has alt text, a caption, and a credit
[ ] no image over 250 KB; total page under 600 KB
[ ] no AI-generated, AI-upscaled, or generic stock imagery
[ ] article does not end on an image

BODY
[ ] word count matches a declared form (400–700 dispatch / 700–1,500 standard / 1,500–3,000 long), floor 400
[ ] event date stated in the body, tense unambiguous
[ ] 3+ outbound links, all resolving, link text = the thing's name
[ ] title does NOT appear inside the body
[ ] subheads are real <h3>, 2–5 words, three or more if used at all
[ ] italics via the editor — search for "*" returns nothing
[ ] diacritics checked against the institution's own page

FACTS
[ ] every name, title, date, address, and number verified against a primary source
[ ] historical claims sourced
[ ] nothing in the piece came from memory

MECHANICS
[ ] search " ," and " ." — no hits
[ ] search "  " (double space) — no hits
[ ] em dashes are —, en dashes are –, no hyphens doing dash work
[ ] quotes and apostrophes all curly
[ ] zero exclamation points

AI ARTIFACTS
[ ] §12.1 search list run, all clean
[ ] closing is an instruction / question / aphorism — not a summary
[ ] BANNED.md §2.33, §2.35, §2.36 terms: zero hits
[ ] no more than two consecutive sentences ending in "-ing" phrases
[ ] specificity test passed — no sentence would survive a find-and-replace of the subject
[ ] consequence test passed — something changed

FINAL
[ ] comments render, profanity filter in path
[ ] read aloud once, start to finish
```

---

## 14. Platform gaps that need a code fix

These are standards this document requires that the CMS cannot currently enforce or even permit. Until they are fixed, the standard is met by hand.

1. **Cover images have no alt text.** `alt=""` is hardcoded at [app/article/[slug]/page.js:66](../../app/article/[slug]/page.js#L66). Needs an `alt` column and an editor field. Every cover on the site is currently invisible to assistive tech.
2. **No `og:image`.** `generateMetadata` returns only `title` and `description` ([app/article/[slug]/page.js:18](../../app/article/[slug]/page.js#L18)). Every share of a Color&Noise article is a bare text card even though every article has a cover image.
3. **Body base64 was never migrated.** `scripts/migrate-images.js` handles `cover_image` only. Four articles still carry inline `data:` URIs, one of them 17 MB. Needs a body-scanning equivalent.
4. **Save validation is thin.** Only `title` and `excerpt` are checked ([ArticleEditor.js:57](../../components/ArticleEditor.js#L57)). `neighborhood`, `cover_image`, `date`, and a `data:image` rejection should all be blocking.
5. **`admin` is a live byline.** The EXPO recap is published under the CMS account. Reassign it to Julian Vane or create a real pen name — see [../voice/admin-seen.md](../voice/admin-seen.md).
6. **The `-gemini-said-…` slug is public.** Needs a redirect to a clean slug.
7. **No slug sanitization.** `slugify()` should strip leading hyphens and reject a denylist (`gemini`, `chatgpt`, `claude`, `draft`, `untitled`, `copy`).
