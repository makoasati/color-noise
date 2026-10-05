# Meta scrape list — cultural gaps, Chicago 2026

Companion to `research/meta-scrape-list.md`. These are **cultural events with no article and no eyewitness posts** — found Oct 2026 by cross-referencing `content/summer-2026/` against the dossier and then searching for what the dossier never indexed at all.

Target: **40 eyewitness posts per event** from Facebook, Instagram and Threads. Machine-readable twin: `research/meta-scrape-list-cultural.csv`.

All dates **2026**, all locations **Chicago** unless noted. Every dated event below has already happened, so posts are retrospective.

**Refs continue the dossier numbering at D131.** They are not yet in `research/chicago-summer-2026-events.md` — add them there if these become articles, so `build-event-files.js` picks them up.

**Handle confidence is marked.** ✅ = seen in search results as the official account. ⚠️ = derived from the organisation name or website, unverified — check before relying on it. Hashtags without a ✅ are derived from the event name and unverified, same convention as the main list.

**Priority:** D131 first. It has a documented news peg (city permit denied twice, forced off July 4 weekend), a named source, and it pairs with the immigration-enforcement thread already running through D42/D43/D44/D55.

---

## Primary — not in the dossier at all

| # | Event | Dates (2026) | Venue | Neighborhood | Cat | Hashtags / handles to try | Scrape window |
|---|---|---|---|---|---|---|---|
| D131 | African/Caribbean International Festival of Life, 33rd + 10th Jerk, Seafood & Vegan Fest | Sept 25 – 27, 2026, noon–10pm daily | Union Park, 1501 W. Randolph St | West Town | nightlife | ⚠️ @festivaloflife @ifolchicago · keywords `Festival of Life` `IFOL` `JSVFest` `Ephraim Martin` · #festivaloflife #jerkfest | Sept 24 – Oct 3 |
| D132 | Taste of Polonia | Sept 4 – 7, 2026 | Copernicus Center, 5216 W. Lawrence Ave | Jefferson Park | food | ⚠️ @copernicuscenterchicago @tasteofpolonia · #tasteofpolonia #topchicago #polonia | Sept 3 – 11 |
| D133 | Chicago Caribbean Carnival (+ ChiCarnival weekend, 7 events) | Sat Aug 15, 2026, 10am–9pm; parade noon. Weekend Aug 13 – 16 | Midway Plaisance, 1130 Midway Plaisance | Hyde Park / Woodlawn | nightlife | ✅ @chicagocaribbeancarnival · #chicagocaribbeancarnival #chicarnival #caribbeancarnival | Aug 12 – 21 |
| D134 | Fiesta Boricua "De Bandera a Bandera", 33rd | Sept 5 – 6, 2026, 12–8pm | Paseo Boricua, Division St between Western and California | Humboldt Park | nightlife | ⚠️ @prcc_chgo · FB page `Fiesta Boricua Chicago` ✅ · #fiestaboricua #paseoboricua #debanderaabandera | Sept 4 – 12 |
| D135 | India Day Parade | Sun Aug 23, 2026, 10:30am | Devon Ave, Western to California | West Ridge | nightlife | ⚠️ organiser handle unidentified · #indiadayparade #devonave #devonavenue | Aug 22 – 29 |
| D136 | Lincoln Park Greek Fest | Jun 5 – 7, 2026 | N. Sheffield Ave | Lincoln Park | food | ⚠️ @lincolnparkgreekfest · #lincolnparkgreekfest #greekfest | Jun 4 – 12 |
| D137 | Korean National Treasures: 2,000 Years of Art | ⚠️ run dates unconfirmed | Art Institute of Chicago, 111 S. Michigan Ave | Loop | art | ⚠️ @artinstitutechi · #artinstitutechicago #koreanart | confirm dates first |
| D138 | Ensemble Español — American Spanish Dance & Music Festival (48th) + 50th anniversary in residence | ⚠️ two weeks in June 2026, exact dates unconfirmed | NEIU, North Shore Center for the Performing Arts, Old Town School | North Park + suburbs | art | ⚠️ @ensembleespanol · #ensembleespanol #spanishdancefestival #flamencochicago | confirm dates first |
| D139 | Dance in the Parks, 18th season | ⚠️ summer 2026, dates unconfirmed | Neighborhood parks citywide | Citywide | art | ⚠️ @danceintheparks · #danceintheparks #nightoutintheparks | confirm dates first |

### Handling notes

- **D131** — the permit denial is reported fact from [WBEZ, May 28, 2026](https://www.wbez.org/arts-culture/2026/05/28/chicagos-african-caribbean-fest-denied-permit-dcase-move-september-july-4). Handle it straight, not as colour. Expect posts from the original **July 3 – 5** dates too, from people who had planned around the cancelled edition — those are worth collecting separately as part of the story.
- **D134** — the organiser's own URL slug still reads `august-28-29`, so the festival moved. Confirm Sept 5 – 6 before publishing, and scrape **both** windows.
- **D136** — your calendar carries a conflicting `Greek Fest` row dated Jun 26 that matches neither this nor Taste of Greektown (D59, which already has an article). Resolve the date before scraping.
- **D137 / D138 / D139** — dates could not be established. Scraping against a wrong window returns nothing, so confirm first: the Art Institute press office, Ensemble Español (ensembleespanol.org, in residence at NEIU), and danceintheparks.org respectively.
- **D135** — no organiser account identified. The Federation of Indian Associations is the likely host; a location-tag sweep on Devon Ave for Aug 23 will probably beat any handle search here.

---

## Secondary — in the dossier, but as unsplit clusters with no article and no posts

These three are flagged `is_cluster` in `research/events.json` and were skipped by both the post scrape and the calendar import. Each needs splitting into real events before it can be scraped.

| # | Cluster | What's inside | Cat |
|---|---|---|---|
| D70 | Also on the lakefront / citywide | Jazzin' at the Shedd, and others | music |
| D71 | Heritage and parade events not yet listed | **Ecuadorian Parade**, and others — the dossier's own admission of this exact gap | — |
| D84 | Art Institute of Chicago, summer exhibitions | *Beyond Form: Abstraction at Midcentury*, 22 Korean works, and D137 above | art |

---

## What this list is missing

Zero results in both the calendar and the article set, and no 2026 Chicago edition surfaced in search — so these are **plausible holes, not confirmed ones**. Worth a pass before anyone calls this list complete:

Irish American Heritage Festival · Ukrainian Village Fest · Filipino · Vietnamese · Arab · Persian · Serbian · Turkish

The underlying pattern: the dossier covers Mexican, Puerto Rican, Black, Chinese and Japanese Chicago well, and barely touches Polish, Caribbean, South Asian, Greek and Spanish Chicago.
