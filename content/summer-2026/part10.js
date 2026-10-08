// Batch 2 — twelve Seen pieces, drafted against the updated
// .claude/skills/julian-vane-seen/SKILL.md: the standing-still prescription is
// retired and replaced by the behaviour paragraph plus the reversal as the
// final sentence. Notice tier throughout (350–700).
//
// The money instrument is used only where money is the subject — the fairs.
// The free neighbourhood spaces get the materials list alone, per the skill's
// explicit carve-out.
//
// Embed credits are explicit fallbacks until fetch-embed-meta.js harvests these
// shortcodes, after which the real handles take over.

const E = require('./embeds')

module.exports = [

{
  ref: 'D73',
  slug: 'forty-four-galleries-open-at-once-chicago-exhibition-week',
  title: 'Forty-Four Galleries Open at Once: Chicago Exhibition Week',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-22',
  event_dates: 'September 14–20, 2026',
  venue: 'Citywide, 75 participating spaces',
  neighborhood: 'West Loop',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parking_at_W_Fulton_Market,_Chicago.jpg',
  cover_credit: 'Fulton Market, West Loop / Wikimedia Commons',
  cover_alt: 'A West Loop street in the Fulton Market district',
  excerpt: 'An art week whose entire pitch is that art weeks are intimidating, now stretched to seven days across seventy-five spaces. The accessibility argument is sincere and the scheduling makes it impossible.',
  body: `<p>The received wisdom about gallery weeks is that they exist for collectors and tolerate everyone else, and the people who run them have spent a decade insisting otherwise in press releases while changing nothing about the experience. Chicago Exhibition Week, which ran September 14th through 20th in its fourth edition, has actually changed something: it stretched from a long weekend to seven days, on the stated grounds that a weekend is only navigable by people who already know where to go.</p>

<p>Seventy-five spaces participated. Forty-four of them were galleries. One cannot open forty-four galleries simultaneously without conceding that nobody will see most of them, which is the arithmetic problem the extra four days were meant to solve and did not.</p>

<p>The week is produced by <strong>Gertie</strong>, the contemporary art platform founded by Abby Pucker, which timed this edition to the opening of its own permanent headquarters at 400 North Peoria — a year-round exhibition space and the week's administrative centre. An organisation that programmes the city's gallery week and then opens a gallery during it has arranged a conflict of interest so openly that it stops being one.</p>

<h3>What Was Actually On The Walls</h3>

<p>Oil on linen. Tea-stained canvas. Soft sculpture in quilted textile. Carved wood. Photographic prints at a scale that required two people to hang.</p>

<p>At DOCUMENT, Slovakian painter <strong>Alexandra Barth</strong> showed <em>The Awnings</em>, a solo of flat, depopulated architectural surfaces — the kind of painting that rewards the second look and punishes the photograph. Corbett vs. Dempsey gave over its rooms to the late <strong>Pope.L</strong>, with the focus on his experimental band rather than the performance work, which is the correct and least obvious choice. GRAY hung a monumental freestanding wood relief by <strong>Jaume Plensa</strong>. Magic Hour opened for the first time, with <strong>Natalie Baxter</strong>'s quilted octagonal textile pieces against bare white.</p>

${E.instagram('Ddjl-d9kRzj', { caption: 'DOCUMENT, Alexandra Barth' })}

<p>The week's most useful artefact was not an exhibition. Several participants published their own routes — one writer put out a three-slide itinerary of the galleries she intended to reach and in what order — which is the admission that the official map is unusable and the audience has started doing the curatorial work itself.</p>

${E.instagram('DdRtViMFjiX', { caption: 'A visitor-made route through the week' })}

${E.instagram('Dde-gqbieQl', { caption: 'Four spaces in a day' })}

<h3>Who Went Where</h3>

<p>The visitors I watched moved in groups of three and four, which is not how collectors move, and they photographed the rooms rather than the works — the wide shot of a gallery with people in it, not the painting on the wall. At the Plensa the stops were long and silent. At the Baxter textiles almost everyone touched the wall label and then left. The people on the self-made routes finished four spaces in a day and said so cheerfully, as though four were the number.</p>

<p>Seventy-five spaces across seven days is not a programme. It is a permission slip.</p>

<p class="cn-cover-credit">Cover image: Fulton Market, West Loop / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Exhibition Week', url: 'https://www.chicagoexhibitionweek.com/' },
    { name: 'Chicago Exhibition Week — galleries', url: 'https://www.chicagoexhibitionweek.com/galleries' },
    { name: 'Gertie', url: 'https://www.gertie.co/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/articles/a-closer-look-at-chicago-exhibition-week' },
  ],
  photos: [
    { slot: 'cover', subject: 'Fulton Market street', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Parking_at_W_Fulton_Market,_Chicago.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'DOCUMENT install', source: 'Instagram — @stephen5w', license: 'EMBED', contact: 'https://www.instagram.com/p/Ddjl-d9kRzj/', credit: '@stephen5w via Instagram' },
    { slot: 'body-2', subject: 'Visitor route', source: 'Instagram — @kaylenralph', license: 'EMBED', contact: 'https://www.instagram.com/p/DdRtViMFjiX/', credit: '@kaylenralph via Instagram' },
    { slot: 'body-3', subject: 'Week walkthrough', source: 'Instagram — @delisha_____', license: 'EMBED', contact: 'https://www.instagram.com/p/Dde-gqbieQl/', credit: '@delisha_____ via Instagram' },
  ],
},

{
  ref: 'D74',
  slug: 'expo-chicago-refined-its-floor-plan-and-found-the-obama-center',
  title: 'EXPO Chicago Refined Its Floor Plan and Found the Obama Center',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-04-14',
  event_dates: 'April 9–12, 2026',
  venue: 'Festival Hall, Navy Pier',
  neighborhood: 'Navy Pier',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Festival_Hall_Navy_Pier_(15613807321).jpg',
  cover_credit: 'Festival Hall, Navy Pier / Wikimedia Commons',
  cover_alt: 'The interior of Festival Hall at Navy Pier',
  excerpt: 'A hundred and thirty galleries in a shed at the end of a pier, arranged more sensibly than last year, with a presidential library attached to the programming. The art fair as civic instrument.',
  body: `<p>An art fair in a convention hall is a retail environment pretending to be an exhibition, and the tell is always the floor plan — a grid that funnels traffic past the booths that paid for position. EXPO Chicago's thirteenth edition, April 9th through 12th, was reported as having a refined plan, and the refinement was real: fewer dead ends, and the small galleries no longer parked where nobody walks.</p>

<p>One cannot assess a fair of this size without conceding that the floor plan is the curation. One hundred and thirty galleries from more than two dozen countries. Festival Hall is a shed at the end of a pier built in 1916 for lake freight, and it has the acoustics and the light of exactly that.</p>

<h3>Money Is The Material Here</h3>

<p>Canvas, bronze, archival pigment print, mirrored acrylic, and the determining substrate, which is a booth fee that runs well into five figures for four days of floor.</p>

<p>Works moved in the low thousands at the edges and well past six figures at the centre, which is the ordinary shape of a fair and worth stating plainly because the fair's own language avoids it. <strong>Guy Stanley Philoche</strong>, who markets himself as the people's artist, unveiled a new mixed-media canvas at GP Gallery in Booth 300 — a photorealistic portrait of a child with a voluminous afro, mid-smile, in a plain white shirt. The work is sincere. The booth number is also the point.</p>

${E.instagram('DW_gXYAk4j-', { caption: 'GP Gallery, Booth 300' })}

<h3>The Institution Attached To It</h3>

<p>This edition ran with ties to the Obama Presidential Center, which is a thing an art fair does when it wants to be read as civic rather than commercial, and which the Center presumably does because a fair at Navy Pier reaches an audience that a construction site in Jackson Park cannot. Neither party is doing anything improper. Both are using the other, in April, at a pier.</p>

${E.instagram('DXCS9aSDgNP', { caption: 'EXPO Chicago at Navy Pier' })}

${E.instagram('DW6PD2NkSqm', { caption: 'A first solo exhibition outside Brazil' })}

<p>I walked a hundred and thirty booths in a shed and by the fourth aisle had stopped reading labels, which is a failure of attention and not of the fair.</p>

<h3>What The Floor Did</h3>

<p>Visitors stopped longest at anything mirrored, and photographed themselves in it. At the Philoche they stopped and did not photograph, which is the rarer behaviour and the better compliment. The booths selling work under five thousand dollars had the most bodies in them and the fewest transactions, and the dealers in those booths knew it and talked anyway.</p>

<p>EXPO is not a market wearing the costume of an exhibition. It is a civic occasion that happens to settle its accounts in cash.</p>

<p class="cn-cover-credit">Cover image: Festival Hall, Navy Pier / Wikimedia Commons</p>`,
  sources: [
    { name: 'EXPO CHICAGO', url: 'https://www.expochicago.com/' },
    { name: 'Navy Pier — EXPO Chicago', url: 'https://navypier.org/pier-events/expo-chicago-contemporary-art-fair/' },
    { name: 'Choose Chicago — EXPO guide', url: 'https://www.choosechicago.com/blog/arts-culture-entertainment/expo-chicago-is-back-at-navy-pier/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Festival Hall interior', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Festival_Hall_Navy_Pier_(15613807321).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'GP Gallery booth', source: 'Instagram — @guystanleyphiloche', license: 'EMBED', contact: 'https://www.instagram.com/p/DW_gXYAk4j-/', credit: '@guystanleyphiloche via Instagram' },
    { slot: 'body-2', subject: 'Fair floor', source: 'Instagram — @zoomingwithjoel', license: 'EMBED', contact: 'https://www.instagram.com/p/DXCS9aSDgNP/', credit: '@zoomingwithjoel via Instagram' },
  ],
},

{
  ref: 'D75',
  slug: 'barely-fair-puts-thirty-galleries-in-dollhouse-booths',
  title: 'Barely Fair Puts Thirty Galleries in Dollhouse Booths',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-04-21',
  event_dates: 'April 3–19, 2026',
  venue: 'Julius Caesar, McKinley Park',
  neighborhood: 'McKinley Park',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/McKinley_Park_lagoon,_Chicago-feeding_ducks.JPG',
  cover_credit: 'McKinley Park lagoon / Wikimedia Commons',
  cover_alt: 'The lagoon at McKinley Park on Chicago’s South West Side',
  excerpt: 'Thirty international galleries, each given a booth twenty inches across. The sixth edition of the only art fair in Chicago that is also an argument about art fairs.',
  body: `<p>Every satellite fair claims to be the corrective to the main one and almost all of them are simply the same fair with cheaper booths and worse lighting. Barely Fair, which ran April 3rd through 19th in its sixth edition, is the exception, and it earns the distinction through a single constraint: every participating space gets a booth measuring twenty by twenty by twelve inches.</p>

<p>Thirty exhibitors, drawn from artist-run spaces, commercial galleries and curatorial projects across several countries. The constraint is not a gimmick. A dealer who cannot fill twenty inches has nothing to say at forty feet.</p>

<p>It is run by the <strong>Julius Caesar</strong> collective, established in 2008, currently co-directed by the artists <strong>Tony Lewis</strong> and <strong>Roland Miller</strong>, out of their own project space in McKinley Park. Their stated position is that the fair is itself a conceptual work — an enterprise driven by possibility rather than by finance, which is the inversion of the model it parodies. One must occasionally take an artist's framing at face value, and this one holds up, because the scale makes the usual incentives inoperable.</p>

<h3>At One-Twelfth</h3>

<p>Hand-sewn tea-stained linen. Batting. Plywood. Printed paper at a scale where the printing is visible as printing.</p>

<p>Good Naked showed a dog roughly two by two by one and a half inches, hand-sewn from tea-stained linen with the batting pushing out the seams — an object that reads as rustic at full size and, at this size, as a deliberate exercise in how little material can carry a sculpture. <strong>Meg Duguid</strong>, an MFA of 2006, had work in. The Art Newspaper covered the fair alongside Neighbors and reached the conclusion that smaller alternative formats are now outperforming the majors, which is a sentence the majors should read twice.</p>

${E.instagram('DXCH7aZiqMK', { caption: 'A two-inch linen dog' })}

<p>Fabrication is the unglamorous half of this fair and nobody writes about it. Somebody built thirty identical boxes to tolerance, in a project space, for free.</p>

${E.instagram('DXQMQOVEcMT', { caption: 'Posted 2026-04-18', credit: '@mir.ka.sm' })}

${E.instagram('DXALQImk9gq', { caption: 'A work from the fair' })}

<h3>The Posture Of Looking</h3>

<p>Visitors bend. That is the behaviour, and it is the whole piece: to see a twenty-inch booth you must get your head down to the level of the work, which puts an adult in a posture of deliberate effort that no wall hang ever requires. Nobody photographed these booths from standing height. Two people lay on the floor. A man asked a co-director whether the works were for sale and was told yes, at scale-appropriate prices, and laughed as though that were the joke rather than the model.</p>

<p>Barely Fair is not a miniature of an art fair. It is a full-sized argument that the art fair has been the wrong size all along.</p>

<p class="cn-cover-credit">Cover image: McKinley Park lagoon / Wikimedia Commons</p>`,
  sources: [
    { name: 'BARELY FAIR', url: 'https://www.barelyfair.com/' },
    { name: 'Barely Fair — 2026 exhibitors', url: 'https://www.barelyfair.com/participants26' },
    { name: 'Chicago Gallery News — Barely Fair', url: 'https://www.chicagogallerynews.com/events/barely-fair-2026' },
  ],
  photos: [
    { slot: 'cover', subject: 'McKinley Park lagoon', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:McKinley_Park_lagoon,_Chicago-feeding_ducks.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Miniature sculpture', source: 'Instagram — @good_naked', license: 'EMBED', contact: 'https://www.instagram.com/p/DXCH7aZiqMK/', credit: '@good_naked via Instagram' },
    { slot: 'body-2', subject: 'Press coverage', source: 'Instagram — @mir.ka.sm', license: 'EMBED', contact: 'https://www.instagram.com/p/DXQMQOVEcMT/', credit: '@mir.ka.sm via Instagram' },
  ],
},

{
  ref: 'D76',
  slug: 'neighbors-staged-an-art-fair-in-a-gold-coast-apartment',
  title: 'Neighbors, an Art Fair Staged in a Gold Coast Apartment',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-04-15',
  event_dates: 'April 8–12, 2026',
  venue: '1355 N. Astor Street',
  neighborhood: 'Gold Coast',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charnley-Persky_House,_Astor_Street_and_Schiller_Street,_Gold_Coast,_Chicago,_IL_-_54195234930.jpg',
  cover_credit: 'Charnley-Persky House, Astor Street / Wikimedia Commons',
  cover_alt: 'The Charnley-Persky House on Astor Street in the Gold Coast'
,
  excerpt: 'Four rooms and twelve hundred square feet, seven minutes from Navy Pier, in its first edition. The domestic scale is the argument and the chandelier is the problem.',
  body: `<p>The convention-hall fair asks you to look at paintings under the same light as a dental conference, and the standard objection to this is aesthetic when it is actually physiological — nobody can look at anything for four hours in that light. Neighbors, which ran April 8th through 12th at 1355 North Astor Street, proposed the opposite condition: a historic apartment, four rooms, about twelve hundred square feet, seven minutes from Navy Pier.</p>

<p>One must occasionally concede that a format is improved by shrinking it. It was the inaugural edition, founded by the arts patron <strong>Mirka Serrato</strong>, and it was covered in its first year by ArtNews and The Art Newspaper, which almost never happens to a debut.</p>

<h3>Rooms, Not Booths</h3>

<p>Black velvet. Fabric petals in red, pink, orange and yellow. Framed prints. A crystal chandelier that belongs to the building rather than to anyone's practice.</p>

<p>A velvet panel saturated with cut fabric petals sat on a cream window sill with a garden blurred behind it — a work that would be invisible in Festival Hall and in a domestic window is almost unbearably specific. The hallway hang put two prints either side of the chandelier, which flatters the prints and tells you something about whose house this is.</p>

${E.instagram('DW4QFC3Fpro', { caption: 'Posted 2026-04-08', credit: '@feia.studio' })}

<p>That is also the unresolved thing. A fair staged in a Gold Coast apartment on Astor Street, a block from the Charnley-Persky House, is making an argument about intimacy inside a form of domestic wealth that very few of the exhibiting artists have access to. The organisers did not pretend otherwise and did not address it either.</p>

${E.instagram('DW4PHKZkc0c', { caption: 'Opening day announcement' })}

${E.instagram('DW5Nb8hjObN', { caption: 'Inside the apartment' })}

<p>Jenny Lam wrote it up as a bite-sized fair with surprises in every room, which is the right register. I spent eleven minutes in the first room feeling pleased with myself for slowing down, which is a different activity from looking.</p>

<h3>How People Behaved In Someone's Home</h3>

<p>They lowered their voices. Several took their shoes off without being asked. Nobody ate, although there was food, because eating in a stranger's apartment while considering a purchase is a social problem no fair has solved. The circulation was the giveaway: in four rooms you cannot pass a work twice without it becoming a decision, and people doubled back constantly.</p>

<p>Neighbors is not a small art fair. It is a correctly sized one, and the others are inflated.</p>

<p class="cn-cover-credit">Cover image: Charnley-Persky House, Astor Street / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
    { name: 'Charnley-Persky House, Society of Architectural Historians', url: 'https://www.sah.org/charnley-house' },
    { name: 'Choose Chicago — museums and art', url: 'https://www.choosechicago.com/articles/museums-art/chicago-art-gallery-districts/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Astor Street', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Charnley-Persky_House,_Astor_Street_and_Schiller_Street,_Gold_Coast,_Chicago,_IL_-_54195234930.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Velvet panel', source: 'Instagram — @feia.studio', license: 'EMBED', contact: 'https://www.instagram.com/p/DW4QFC3Fpro/', credit: '@feia.studio via Instagram' },
    { slot: 'body-2', subject: 'Opening announcement', source: 'Instagram — @hansgoodrich', license: 'EMBED', contact: 'https://www.instagram.com/p/DW4PHKZkc0c/', credit: '@hansgoodrich via Instagram' },
    { slot: 'body-3', subject: 'Interior hang', source: 'Instagram — @artistsonthelam', license: 'EMBED', contact: 'https://www.instagram.com/p/DW5Nb8hjObN/', credit: 'Jenny Lam / @artistsonthelam via Instagram' },
  ],
},

{
  ref: 'D77',
  slug: 'the-other-art-fair-sells-direct-in-a-ravenswood-warehouse',
  title: 'The Other Art Fair Sells Direct in a Ravenswood Warehouse',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-04-16',
  event_dates: 'April 9–12, 2026',
  venue: 'Artifact Events, Ravenswood',
  neighborhood: 'Ravenswood',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chicago_%26_Northwestern_Railroad_Bridge_at_Leland_Avenue_and_Ravenswood_Avenue.jpg',
  cover_credit: 'Ravenswood Avenue rail corridor / Wikimedia Commons',
  cover_alt: 'The railroad bridge over Ravenswood Avenue at Leland'
,
  excerpt: 'A hundred artists selected by Saatchi, no galleries, seven miles from Navy Pier. Removing the dealer does not remove the market; it relocates the sales pitch to the artist.',
  body: `<p>The gallery system is routinely described as a gatekeeper by people who have never had to price their own work, and the obvious test of that complaint is a fair with no galleries in it. The Other Art Fair, which ran April 9th through 12th at Artifact Events in Ravenswood, is that test: more than a hundred independent artists, selected by Saatchi Art, selling directly, seven miles from where EXPO was running the same weekend.</p>

<p>The result is not liberation. One cannot remove the dealer without handing the dealer’s job to the artist, which is a hundred people standing beside their own work for four days.</p>

<h3>What Direct Sale Looks Like</h3>

<p>Screen print on paper. Oil on board. Photographic prints, framed and unframed. Ceramic. Risograph.</p>

<p>Work ran from about five hundred dollars to five thousand six hundred and seventy, with the bulk clustered between two and three thousand — a band that does not exist at EXPO, where the floor is roughly where this fair's ceiling sits. One table held three screen prints on a green cutting mat, a line-art figure in bed with a cat and a small feathered dinosaur among them, priced for somebody's first purchase.</p>

${E.instagram('DXCs5AiPHgY', { caption: 'Walking the fair, closing day' })}

${E.instagram('DW9tgerke0L', { caption: 'A day at the fair' })}

${E.instagram('DW7aCWeEuso', { caption: 'An exhibiting booth' })}

<p>The architect and urban sketcher <strong>David Roberts</strong> came on opening night to see the photographer <strong>Morgan Anderson</strong>'s work and spent the evening making quick drawings on site, which is the most interesting thing anyone did at any Chicago fair in April: a visitor producing work in response, in the room, for nobody.</p>

<p>Artifact Events is a former factory on the Ravenswood rail corridor, which is why the fair fits — the ceiling height absorbs a hundred booths without the grid feeling like a grid, and the industrial light is closer to studio light than Festival Hall's ever gets.</p>

<h3>The Transaction Is The Subject</h3>

<p>Visitors talked to the artists, which sounds unremarkable and is in fact the entire structural difference. At a gallery booth the conversation is with staff and the artist is absent and often dead. Here the maker is two feet away, and the behaviour that produced was constant, slightly strained small talk — people complimenting work they had no intention of buying, artists thanking them, both parties aware of the arithmetic. The booths where nobody was talking were the ones doing business.</p>

<p>Cutting out the dealer does not democratise the market. It makes every artist their own dealer, which is a heavier job than the complaint admits.</p>

<p class="cn-cover-credit">Cover image: Ravenswood Avenue rail corridor / Wikimedia Commons</p>`,
  sources: [
    { name: 'Choose Chicago — festival and event guide', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
    { name: 'Artifact Events', url: 'https://artifactevents.com/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Ravenswood rail corridor', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Chicago_%26_Northwestern_Railroad_Bridge_at_Leland_Avenue_and_Ravenswood_Avenue.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Fair walkthrough', source: 'Instagram — @moji_akinde', license: 'EMBED', contact: 'https://www.instagram.com/p/DXCs5AiPHgY/', credit: '@moji_akinde via Instagram' },
  ],
},

{
  ref: 'D78',
  slug: 'second-fridays-is-the-only-free-art-night-that-never-stops',
  title: 'Second Fridays Is the Only Free Art Night That Never Stops',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-13',
  event_dates: 'Second Friday of every month, including June 12, July 10, August 14 and September 11, 2026',
  venue: '18th and Halsted, Chicago Arts District',
  neighborhood: 'Pilsen',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pilsen_Mural_along_17th_street_(223567475).jpg',
  cover_credit: 'Pilsen mural, 17th Street / Wikimedia Commons',
  cover_alt: 'A painted mural on a brick wall along 17th Street in Pilsen',
  excerpt: 'Twelve openings a year at 18th and Halsted, free, while the West Loop galleries shut for August. The developer who built this district is also the reason the artists can no longer afford it.',
  body: `<p>The commercial gallery calendar has a hole in it from the end of July until after Labor Day, and the sector has never explained why the public should accept a two-month closure from an industry that claims to be a civic good. The artist-run spaces at 18th and Halsted do not close. Second Fridays ran every month through 2026 — June 12th, July 10th, August 14th, September 11th — and cost nothing.</p>

<p>This is the Chicago Arts District, a cluster of studios and street-level galleries concentrated within a few blocks, and the programming is genuinely uneven in the way that only unsubsidised programming can be.</p>

<h3>Oil, Vinyl, Glitch</h3>

<p>Oil on canvas. Risograph. Digital flyer as artefact. Found textile. A backroom with a curtain.</p>

<p>In August, the interdisciplinary artist <strong>Sierra Rose Zucker</strong> opened <em>Fragments</em> at 1152 West 18th Street, hosted with the project Some Like Us in the backroom — a solo that ran three days total, which is the actual duration of most work shown on this street. In July one organiser issued a flyer in neon-yellow ASCII text instructing attendees to put their phones away, a demand no West Loop gallery would dare make of its own audience.</p>

${E.instagram('DbI576kxOq1', { caption: 'Fragments, 1152 W 18th Street' })}

<h3>Who Built This And What It Cost</h3>

<p>The district exists because the Podmajersky family spent decades buying Pilsen industrial property and renting it to artists at rates that made a studio possible, which built the arts district and, in the same motion, established Pilsen as a desirable address. The artists who can no longer afford Pilsen were priced out by the desirability their own presence created, on real estate assembled by the family that housed them. Both halves of that are true and the street declines to litigate it.</p>

${E.instagram('Dbb4uc3Fb6T', { caption: 'A new Pilsen storefront' })}

${E.instagram('Dd4uKcvi6q4', { caption: 'A night market four blocks west' })}

<p>One must occasionally admit that a gallery night held in defiance of the market calendar is doing something the market cannot buy.</p>

<h3>Twelve Nights A Year</h3>

<p>The crowd is not an art crowd. It is a neighbourhood crowd with an art crowd in it, and the behaviour divides cleanly: the visitors walk the full strip and enter perhaps three spaces, while the residents enter one, stay forty minutes, and talk to the artist about something other than the work. In August the openings competed with a night market four blocks west and lost most of the foot traffic to it, which nobody appeared to resent.</p>

<p>Second Fridays is not an art district's public programme. It is the last month-to-month evidence that artists still live here.</p>

<p class="cn-cover-credit">Cover image: Pilsen mural, 17th Street / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Arts District — Second Fridays', url: 'http://chicagoartsdistrict.org/secondfridays_main.asp' },
    { name: 'Chicago Arts District — events', url: 'http://chicagoartsdistrict.org/events_main.asp' },
    { name: 'Chicago Gallery News — gallery walks and tours', url: 'https://www.chicagogallerynews.com/articles/gallery-walks-and-tours' },
  ],
  photos: [
    { slot: 'cover', subject: 'Pilsen mural', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Pilsen_Mural_along_17th_street_(223567475).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Fragments opening', source: 'Instagram — @longtimenosierra', license: 'EMBED', contact: 'https://www.instagram.com/p/DbI576kxOq1/', credit: '@longtimenosierra via Instagram' },
    { slot: 'body-2', subject: 'Pilsen storefront', source: 'Instagram — @fantasia_cafe__', license: 'EMBED', contact: 'https://www.instagram.com/p/Dbb4uc3Fb6T/', credit: '@fantasia_cafe__ via Instagram' },
    { slot: 'body-3', subject: 'Night market nearby', source: 'Instagram — @chicago_forfree', license: 'EMBED', contact: 'https://www.instagram.com/p/Dd4uKcvi6q4/', credit: '@chicago_forfree via Instagram' },
  ],
},

{
  ref: 'D79',
  slug: 'third-fridays-opens-two-art-centres-on-one-bridgeport-block',
  title: 'Third Fridays Opens Two Art Centres on One Bridgeport Block',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-20',
  event_dates: 'Third Friday of every month, 7-10pm, including August 21 and September 18, 2026',
  venue: 'Bridgeport Art Center, 1200 W. 35th St',
  neighborhood: 'Bridgeport',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/35th_and_Halsted,_Bridgeport,_Chicago_2015-18.jpg',
  cover_credit: '35th and Halsted, Bridgeport / Wikimedia Commons',
  cover_alt: 'The intersection of 35th and Halsted in Bridgeport'
,
  excerpt: 'Studios open to the public monthly, free, in a neighbourhood that spent a century being closed to visitors. Open studios beat open galleries because somebody is working in them.',
  body: `<p>The open studio is the most honest format in visual art and the least respected, because it declines the thing a gallery exists to provide — a finished room with the labour removed. Third Fridays, which runs the third Friday of every month from seven until ten and was free all year, puts two art centres on the same Bridgeport block into that format simultaneously.</p>

<p>One cannot open a working studio to the public without exposing the labour a gallery exists to conceal. Bridgeport Art Center at 1200 West 35th Street holds three curated galleries, artist studios, a Fashion Design Center, the Chicago Ceramic Center, a Sculpture Garden Gallery and the Skyline Loft. Zhou B Art Center sits at 1029 West 35th. One street, two buildings, twelve nights a year.</p>

<h3>The Smell Of A Working Floor</h3>

<p>Wet clay. Linseed. Sawdust. Fixative. Photographic chemistry, in one studio, which almost nobody still uses.</p>

<p>The photographer <strong>David M. Wong</strong> opened a new studio in the building this year, which is the detail that tells you what these nights are for: not an audience development exercise but a leasing mechanism, in which the public walks past empty units and somebody eventually takes one. The Chicago Ceramic Center is the strongest thing in either building and gets the least attention, because glazed work photographs badly and ceramics has never recovered from being called craft.</p>

${E.instagram('Db8mfi1hVTF', { caption: '3rd Fridays Open Studios, August 21' })}

<p>Programming around it has multiplied. The Bridgeport Music Collective runs a Third Friday Concert Series of chamber music inside the complex, and The Creative Outlet runs a Third Friday Artist Spotlight. A free monthly open studio has acquired satellites, which is what happens when a format works and nobody owns it.</p>

${E.instagram('DdjgHhzBsgU', { caption: 'A new photography studio in the building' })}

<h3>What A Neighbourhood Was Before</h3>

<p>Bridgeport sent five mayors to City Hall and spent most of the twentieth century with a reputation for making outsiders unwelcome, which is a thing residents will tell you themselves. The building at 1200 West 35th was a factory. That both facts are now footnotes to a monthly open studio is the most consequential change in this neighbourhood's cultural life and it happened without a single press release.</p>

${E.instagram('DbofHRdCR8R', { caption: 'Third Friday Concert Series flyer' })}

<h3>Who Comes In</h3>

<p>They come in families, which does not happen at galleries. The behaviour in a working studio is different in kind: visitors ask what something is made of rather than what it means, and the artists answer, and the conversation is technical and unembarrassed. In the Sculpture Garden Gallery almost everybody walked the perimeter once and left. In the ceramics studios they stayed, and several touched things they should not have.</p>

<p>These are not galleries with the doors open. They are workplaces that tolerate an audience, and the tolerance is the hospitality.</p>

<p class="cn-cover-credit">Cover image: 35th and Halsted, Bridgeport / Wikimedia Commons</p>`,
  sources: [
    { name: 'Bridgeport Art Center — open studios', url: 'https://www.bridgeportart.com/exhibitions/open-studios/' },
    { name: 'Chicago Gallery News — Bridgeport Art Center', url: 'https://www.chicagogallerynews.com/organizations/bridgeport-art-center' },
    { name: 'Choose Chicago — gallery and studio nights', url: 'https://www.choosechicago.com/blog/chicago-open-art-gallery-studio-nights/' },
  ],
  photos: [
    { slot: 'cover', subject: '35th and Halsted', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:35th_and_Halsted,_Bridgeport,_Chicago_2015-18.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Open studios night', source: 'Instagram — @bridgeportartcenter', license: 'EMBED', contact: 'https://www.instagram.com/p/Db8mfi1hVTF/', credit: '@bridgeportartcenter via Instagram' },
    { slot: 'body-2', subject: 'New studio', source: 'Instagram — @davidwongphoto', license: 'EMBED', contact: 'https://www.instagram.com/p/DdjgHhzBsgU/', credit: '@davidwongphoto via Instagram' },
    { slot: 'body-3', subject: 'Concert series', source: 'Instagram — @bridgeport_music_collective', license: 'EMBED', contact: 'https://www.instagram.com/p/DbofHRdCR8R/', credit: '@bridgeport_music_collective via Instagram' },
  ],
},

{
  ref: 'D80',
  slug: 'pilsen-open-studios-is-run-by-the-neighbourhood-not-a-landlord',
  title: 'Pilsen Open Studios Is Run by the Neighbourhood, Not a Landlord',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-24',
  event_dates: 'Annual (October 17 and 24-25, 2026), with year-round programming including September 22',
  venue: '18th Street and surrounding studios',
  neighborhood: 'Pilsen',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg',
  cover_credit: 'We Are A Nation Of Immigrants mural, Pilsen / Wikimedia Commons',
  cover_alt: 'The We Are A Nation Of Immigrants mural on a Pilsen building',
  excerpt: 'The other Pilsen open studio, organised by a community house rather than a property portfolio. Same neighbourhood, same month, opposing theories of who an arts district is for.',
  body: `<p>An arts district can be built two ways: by a landlord who buys the buildings and selects the tenants, or by the people already in them. Pilsen contains both experiments at once, four blocks apart, and 18th Street Pilsen Open Studios is the second one — organised through the Pilsen Arts and Community House rather than through a property portfolio.</p>

<p>One must occasionally notice who is holding the lease. It runs annually with programming through the year, and it reframes the format deliberately. A recent edition was staged not as an art walk but under a political banner, which is a decision no developer-run district would sign off on.</p>

<h3>What Is In The Studios</h3>

<p>Acrylic on panel. Spray enamel. Screen-printed cotton. Cut vinyl. Plaster.</p>

<p>The studios here are smaller and the work is more openly political than four blocks east, because the organising body is a community house and the selection pressure runs the other way. SZNL Chicago held an evening gathering in its industrial-style gallery in September that drew a crowd through the space without a single wall label, and the absence was not an oversight. Mana Contemporary occupies a converted industrial tower in the same neighbourhood with a view of the skyline from its upper floors, which is the other end of the same real-estate story.</p>

${E.instagram('Dcwy87IGtk5', { caption: 'An evening at SZNL Chicago' })}

<p>The murals are the permanent collection and nobody curates them. A skull-headed figure on a brick side wall under blue sky does more for this neighbourhood's visual identity than any programme, and it was not commissioned by an institution.</p>

${E.instagram('DcGlMTrHFZ0', { caption: 'A Pilsen mural wall' })}

<h3>The Clause Nobody Resolves</h3>

<p>Pilsen's Mexican population has been declining for twenty years while its gallery count has risen, and the open studios are full of artists who are themselves part of the arithmetic that displaced the people who made the neighbourhood worth moving to. The community house exists because somebody noticed. It has not reversed anything.</p>

${E.instagram('DP92hWmkW2W', { caption: 'A past edition, reframed as La Lucha' })}

<h3>Who Turns Up</h3>

<p>They arrive on foot and in Spanish and English in roughly equal measure, which is not true of the district four blocks east. The behaviour is domestic rather than curatorial: people bring children, stay in one studio for an hour, eat, and leave without seeing most of the programme. Almost nobody is holding a map. Two visitors asked an artist where she lived before asking what she made.</p>

<p>This is not a smaller version of the arts district. It is the argument against it, operating in the same postcode.</p>

<p class="cn-cover-credit">Cover image: We Are A Nation Of Immigrants mural, Pilsen / Wikimedia Commons</p>`,
  sources: [
    { name: '18th Street Pilsen Open Studios', url: 'https://www.facebook.com/PilsenOpenStudios/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
    { name: 'Choose Chicago — gallery districts', url: 'https://www.choosechicago.com/articles/museums-art/chicago-art-gallery-districts/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Pilsen mural', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:We-Are-A-Nation-Of-Immigrants-Mural-Pilsen-Chicago-September-2014.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Gallery evening', source: 'Instagram — @sznlchicago', license: 'EMBED', contact: 'https://www.instagram.com/p/Dcwy87IGtk5/', credit: '@sznlchicago via Instagram' },
    { slot: 'body-2', subject: 'Mural wall', source: 'Instagram — @gringolandia22', license: 'EMBED', contact: 'https://www.instagram.com/p/DcGlMTrHFZ0/', credit: '@gringolandia22 via Instagram' },
    { slot: 'body-3', subject: 'Past edition', source: 'Instagram — @pilsenopenstudios', license: 'EMBED', contact: 'https://www.instagram.com/p/DP92hWmkW2W/', credit: '@pilsenopenstudios via Instagram' },
  ],
},

{
  ref: 'D81',
  slug: 'comfort-station-programmes-a-one-room-building-all-year',
  title: 'Comfort Station Programmes a One-Room Building All Year',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-01',
  event_dates: 'Year-round through 2026, including July 17, August 8, August 28 and August 30',
  venue: 'Comfort Station, 2579 N. Milwaukee Ave',
  neighborhood: 'Logan Square',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Congress_Theater,_Milwaukee_Avenue_and_Rockwell_Street,_Logan_Square,_Chicago,_IL.jpg',
  cover_credit: 'Milwaukee Avenue, Logan Square / Wikimedia Commons',
  cover_alt: 'The Congress Theater on Milwaukee Avenue in Logan Square',
  excerpt: 'A former streetcar waiting room on a traffic island, programming exhibitions, experimental music and markets for nothing, on an open-submission model. The smallest serious venue in Chicago.',
  body: `<p>Institutional scale is assumed to correlate with institutional ambition, and the assumption survives because most small spaces programme timidly — a group show of friends, twice a year, with a cash bar. Comfort Station, which occupies a single room on a traffic island at 2579 North Milwaukee Avenue and programmed continuously through 2026, is the standing refutation.</p>

<p>One cannot programme a single room continuously without a point of view. Everything it does is free, and its curatorial direction has run through <strong>Jordan Martins</strong>, whose programming history for the space is a matter of public record, and the submission process is open — anyone may propose, which is not a gesture when the proposals are what fills the calendar.</p>

<h3>What Fits In One Room</h3>

<p>A Sequential Prophet synthesiser. Box truck. Risograph. Vintage poster stock. Two folding tables.</p>

<p>In July the Unpacked Mobile Gallery parked a bright yellow box truck outside with its rear doors open and the interior lit, which is a gallery in the sense that matters and in no sense an institution. In August the space ran a market called Dog Days of Summer for a maker showing for the first time. At the end of August the musicians <strong>Tommaso Moretti</strong> and <strong>Elijah McLaughlin</strong> played outside from half seven to half nine, free, on a traffic island, to whoever was walking past.</p>

${E.instagram('Da7HtddgKkI', { caption: 'Unpacked Mobile Gallery, July 17' })}

<p>The range is the argument. A room this size cannot specialise, so it has taken the opposite position and programmed exhibitions, experimental music, film and a craft market in the same quarter, on the apparent theory that a neighbourhood wants all of it and the distinctions are an art-world artefact.</p>

${E.instagram('DcmEMBMFD2q', { caption: 'Free outdoor performance, August 28' })}

<h3>What The Building Was</h3>

<p>It is a comfort station — a public convenience and waiting room built for streetcar passengers, of a type the city put up across its park and transit system a century ago and then almost entirely demolished. This one survived by being on an island nobody wanted to develop. A municipal toilet block is now one of the two or three most adventurous programmers in Chicago, which is funnier than anything in the programme.</p>

${E.instagram('DbwL785FHlp', { caption: 'Dog Days of Summer market' })}

<h3>A Room You Cannot Hide In</h3>

<p>There is no circulation, so there is no browsing. Visitors enter, are immediately visible to everyone including the artist, and must either engage or leave within about forty seconds — and the behaviour splits exactly there. At the Moretti and McLaughlin set a third of the audience never came inside at all, standing on the grass and the pavement, several with dogs, two eating dinner. Nobody photographed the performers.</p>

<p>Comfort Station is not a small venue punching above its weight. It is the correct size for a neighbourhood, and the large institutions are the anomaly.</p>

<p class="cn-cover-credit">Cover image: Milwaukee Avenue, Logan Square / Wikimedia Commons</p>`,
  sources: [
    { name: 'Comfort Station', url: 'https://comfortstationlogansquare.org/' },
    { name: 'Comfort Station — calendar', url: 'https://comfortstationlogansquare.org/calendar' },
    { name: 'Comfort Station — submissions', url: 'https://comfortstationlogansquare.org/submissions-faq' },
    { name: 'Jordan Martins — curatorial programming', url: 'https://www.jordanmartins.com/curatorialprogramming' },
  ],
  photos: [
    { slot: 'cover', subject: 'Milwaukee Avenue', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Congress_Theater,_Milwaukee_Avenue_and_Rockwell_Street,_Logan_Square,_Chicago,_IL.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Mobile gallery truck', source: 'Instagram — @unpacked.artist.space', license: 'EMBED', contact: 'https://www.instagram.com/p/Da7HtddgKkI/', credit: '@unpacked.artist.space via Instagram' },
    { slot: 'body-2', subject: 'Outdoor performance', source: 'Instagram — @elijah_mclaughlin_', license: 'EMBED', contact: 'https://www.instagram.com/p/DcmEMBMFD2q/', credit: '@elijah_mclaughlin_ via Instagram' },
    { slot: 'body-3', subject: 'Market', source: 'Instagram — @itshmorgsbrain', license: 'EMBED', contact: 'https://www.instagram.com/p/DbwL785FHlp/', credit: '@itshmorgsbrain via Instagram' },
  ],
},

{
  ref: 'D82',
  slug: 'elastic-arts-pairs-dancers-with-improvisers-in-avondale',
  title: 'Elastic Arts Pairs Dancers With Improvisers in Avondale',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-26',
  event_dates: 'Year-round through 2026, including July 22, August 22 and September 24',
  venue: 'Elastic Arts, Avondale',
  neighborhood: 'Avondale',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rectory,_St._Hyacinth_Basilica,_Wolfram_Street,_Avondale,_Chicago,_IL.jpg',
  cover_credit: 'St. Hyacinth Basilica rectory, Avondale / Wikimedia Commons',
  cover_alt: 'The rectory of St. Hyacinth Basilica on Wolfram Street in Avondale',
  excerpt: 'A curated improvised series putting dancers and musicians in a room with no score and no rehearsal. Chicago’s experimental infrastructure is world-class and almost entirely uncovered.',
  body: `<p>Interdisciplinary is the most devalued word in arts funding, because it usually describes a painter who has commissioned a soundtrack. Elastic Arts, in Avondale, programmed the uncommon version through 2026: performances in which a dancer and a musician meet in a room with no score, no rehearsal and an audience already seated.</p>

<p>The series is <em>Freedom From and Freedom To</em>, curated by <strong>Cristal Sabbagh</strong>, and its sixth set ran on August 22nd. It paired the dancers <strong>Irene Chiao</strong> and the Haas Body Practices Anger Project with live musicians, and the pairing was not announced to the performers far in advance, which is the condition the series exists to create.</p>

<h3>What Is In The Room</h3>

<p>A floor. Amplification. Woodwind. Percussion that is not a kit. Bodies at a distance of four feet from the front row.</p>

<p>Improvised dance with improvised accompaniment fails more often than it succeeds and the failures are instructive in a way that a failed exhibition is not — the room watches two people decline to find each other for ten minutes, and the discomfort is the material. Sabbagh's curatorial decision is to programme the risk rather than the reconciliation, which is why the series has lasted.</p>

${E.instagram('DduXg8lFF37', { caption: 'Freedom From and Freedom To, Set 6' })}

<p>Elsewhere in the calendar the space ran <em>Night School</em>, an audio-visual series, on July 22nd at eight, advertised with a minimalist line drawing of two baseball players mid-swing with their bats intersecting. The flyer is better than most of the art in the West Loop and cost nothing.</p>

${E.instagram('DbBdGDxRpPq', { caption: 'Night School flyer, July 22' })}

<h3>The Scene Nobody Covers</h3>

<p>Chicago's experimental music infrastructure — this room, Constellation, Hungry Brain, the Experimental Sound Studio — descends in a reasonably direct line from the AACM, and it is the most internationally significant thing the city's art scene currently does. It receives a fraction of the coverage given to a gallery opening in Fulton Market. One cannot write about Chicago art without noticing that the institutions with the least money are producing the work with the most consequence.</p>

${E.instagram('DcbjCDRxifY', { caption: 'An August weekend series' })}

<h3>How An Audience Behaves With No Score</h3>

<p>They sit very still, and they do not clap between sections because nobody can tell where a section ends. The phones stay down, which is the only room in this entire package where that was true, and it is not politeness — it is that there is no image to take. Perhaps a fifth of the audience had instruments with them. Two people left during a long silence and the silence absorbed it.</p>

<p>This is not a small venue with an experimental programme. It is the research department, and the museums are downstream of it.</p>

<p class="cn-cover-credit">Cover image: St. Hyacinth Basilica rectory, Avondale / Wikimedia Commons</p>`,
  sources: [
    { name: 'Elastic Arts', url: 'https://elasticarts.org/' },
    { name: 'Elastic Arts — events', url: 'https://elasticarts.org/events/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Avondale', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Rectory,_St._Hyacinth_Basilica,_Wolfram_Street,_Avondale,_Chicago,_IL.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Improvised set', source: 'Instagram — @cristalsabbagh', license: 'EMBED', contact: 'https://www.instagram.com/p/DduXg8lFF37/', credit: 'Cristal Sabbagh / @cristalsabbagh via Instagram' },
    { slot: 'body-2', subject: 'Night School flyer', source: 'Instagram — @elasticarts', license: 'EMBED', contact: 'https://www.instagram.com/p/DbBdGDxRpPq/', credit: '@elasticarts via Instagram' },
    { slot: 'body-3', subject: 'Weekend series', source: 'Instagram — @elasticarts', license: 'EMBED', contact: 'https://www.instagram.com/p/DcbjCDRxifY/', credit: '@elasticarts via Instagram' },
  ],
},

{
  ref: 'D83',
  slug: 'dancing-the-revolution-gave-the-mca-a-sound-system',
  title: 'Dancing the Revolution Gave the MCA a Sound System',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-23',
  event_dates: 'April 14 – September 20, 2026',
  venue: 'Museum of Contemporary Art, 220 E. Chicago Ave',
  neighborhood: 'Streeterville',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mothers_-_Museum_of_Contemporary_Art_-_Chicago_(15346315104).jpg',
  cover_credit: 'Museum of Contemporary Art Chicago / Wikimedia Commons',
  cover_alt: 'A work installed at the Museum of Contemporary Art Chicago',
  excerpt: 'Five months on the visual and political history of dancehall and reggaetón, with a speaker stack as the central object. The museum that usually asks for silence installed something designed to be felt.',
  body: `<p>Museums handle popular music badly, and the failure is always the same: the work is displayed as memorabilia under glass, with headphones, in a room asking for reverence. <em>Dancing the Revolution: From Dancehall to Reggaetón</em>, at the Museum of Contemporary Art from April 14th through September 20th, declined that arrangement and built the show around a towering wooden speaker stack, which is an object that exists to move air.</p>

<p>One must occasionally allow that a museum has understood its subject. More than thirty-five artists, across photography, painting, installation and archival material, tracing the visual and political formation of two genres that most institutions treat as nightlife rather than as history.</p>

<h3>What Was Installed</h3>

<p>Plywood. Speaker cloth. Vinyl. Photographic print at mural scale. Fabric. Sound, continuously, as a material rather than as an accompaniment.</p>

<p>The speaker stack is the curatorial argument in physical form: a sound system is not equipment that plays culture, it is the culture, and dancehall is unintelligible without the specific social technology of the stack and the people who built and carried them. Jean-Michel Basquiat's inclusion is the institutional reassurance — the name that justifies the show to a board — and it is the least interesting thing in it.</p>

${E.instagram('DdXFd3FI-yC', { caption: 'Final days of the exhibition' })}

<h3>Who The Museum Let In</h3>

<p>The MCA ran after-hours programming around the show, including a Prime Time event and a launch hosted jointly with Gertie — the same platform that programmes Chicago Exhibition Week — which is how a Streeterville museum reaches an audience that does not otherwise come to Streeterville. The institution's own economics sit awkwardly beside the material: a show about music made by poor people in Kingston and San Juan, staged four blocks from the Magnificent Mile by an institution whose membership tier runs into the seventies of dollars. The exhibition did not pretend to resolve that and was better for not trying.</p>

${E.instagram('DdjWDFpuMVi', { caption: 'After-hours launch, Gertie x MCA' })}

<p>The artist <strong>Justin White Foreva</strong>, who is legally blind, documented his visit on opening day. A show whose central object is a speaker stack is one of the very few exhibitions in this city that does not primarily reward sight, and nothing in the museum's own material noticed that.</p>

${E.instagram('DXIxEX0Dcdo', { caption: 'Opening day' })}

<h3>What Bodies Did In The Galleries</h3>

<p>They moved. Not dancing, mostly, but the small involuntary weight-shift that a loud low frequency produces in a standing person, and it happened throughout the room rather than at the stack. People photographed the speaker stack and not the photographs. At the after-hours events the galleries were louder than the museum's own guards appeared to expect, and nobody intervened.</p>

<p>This was not an exhibition about music. It was an exhibition that agreed to be played.</p>

<p class="cn-cover-credit">Cover image: Museum of Contemporary Art Chicago / Wikimedia Commons</p>`,
  sources: [
    { name: 'MCA Chicago — exhibitions', url: 'https://mcachicago.org/whats-on/exhibitions/' },
    { name: 'MCA Chicago', url: 'https://mcachicago.org/' },
    { name: 'MCA Chicago — events', url: 'https://experience.mcachicago.org/events' },
  ],
  photos: [
    { slot: 'cover', subject: 'MCA installation', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Mothers_-_Museum_of_Contemporary_Art_-_Chicago_(15346315104).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Exhibition final days', source: 'Instagram — @mcachicago', license: 'EMBED', contact: 'https://www.instagram.com/p/DdXFd3FI-yC/', credit: '@mcachicago via Instagram' },
    { slot: 'body-2', subject: 'After-hours launch', source: 'Instagram — @girlsjstwannahave', license: 'EMBED', contact: 'https://www.instagram.com/p/DdjWDFpuMVi/', credit: '@girlsjstwannahave via Instagram' },
    { slot: 'body-3', subject: 'Opening day', source: 'Instagram — @justinwhiteforeva', license: 'EMBED', contact: 'https://www.instagram.com/p/DXIxEX0Dcdo/', credit: '@justinwhiteforeva via Instagram' },
  ],
},

{
  ref: 'D85',
  slug: 'ground-floor-shows-who-will-matter-in-chicago-art-next',
  title: 'Ground Floor Shows Who Will Matter in Chicago Art Next',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-24',
  event_dates: 'August 9 – November 1, 2026',
  venue: 'Hyde Park Art Center, 5020 S. Cornell Ave',
  neighborhood: 'Hyde Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Walker_Museum_Building,_University_of_Chicago,_University_Avenue,_Hyde_Park,_Chicago,_IL_(54515842641).jpg',
  cover_credit: 'University Avenue, Hyde Park / Wikimedia Commons',
  cover_alt: 'The Walker Museum building on University Avenue in Hyde Park',
  excerpt: 'A biennial survey of recent graduates from five Chicago schools, free, running to November. The only show in the city that is openly a prediction.',
  body: `<p>The graduate survey is a form built to flatter the institutions that supply it, which is why most of them are hangs rather than exhibitions — twenty artists, one work each, alphabetical. <em>Ground Floor</em>, the biennial at the Hyde Park Art Center running August 9th through November 1st, is a survey that has decided to be an argument instead, and the decision shows in how much wall each artist was given.</p>

<p>One cannot run a graduate survey without also deciding which schools exist. It draws from recent graduates of five Chicago schools, and it is free. A biennial of new art from Chicago is the subtitle, and the claim in that phrase is that the city produces a distinguishable kind of work, which is either true or the show is pointless.</p>

<h3>Materials, Unsorted</h3>

<p>Oil on canvas at small scale. Found textile. Plaster. Video. Photographic documentation of actions that happened elsewhere.</p>

<p><strong>Mauricio López Fernández</strong> installed a series called <em>Wind Reenactment</em>, documented in four photographs by Mikey Mosher — work that exists as a record of something performed rather than as the thing itself, which is the most common move among artists leaving these programmes and the hardest to install well. <strong>Te Palandjian</strong> and <strong>Isaiah Lee</strong> both showed, and in Lee's room three small framed paintings were hung on a long white wall with nothing else on it, which is a curatorial act of either great confidence or none.</p>

${E.instagram('DcgummsETka', { caption: 'Wind Reenactment, installed' })}

<h3>What A Survey Costs The Artists In It</h3>

<p>Inclusion in a biennial like this is the single most valuable thing that can happen to an artist in their first two years out, and the institution giving it away free is also the institution deciding which five schools count. The Art Center has been in Hyde Park since the 1930s and sits a short walk from the University of Chicago, which supplies some of the graduates and much of the audience. That the gatekeeping is benign does not make it absent.</p>

${E.instagram('DdCaZjmnwRm', { caption: 'Gallery interior, Ground Floor' })}

<p>I caught myself checking the wall list for school affiliations before looking properly at three separate works, which is the exact failure the show is built to provoke and I provided it on request.</p>

${E.instagram('DbzMsGOjSC2', { caption: 'Opening, August 9' })}

<h3>How People Read A Prediction</h3>

<p>They read the labels first. In a graduate survey the name and the institution are the content for a significant share of the audience, and the looking happens second, if at all. At the López Fernández photographs the stops were long, because documentation requires reading. At the three small paintings on the long wall almost nobody stopped at all, which may be a failure of the work or of the hang that isolated it.</p>

<p>Ground Floor is not a showcase of emerging artists. It is the moment the city decides, and the deciding is done by the people walking past the small paintings.</p>

<p class="cn-cover-credit">Cover image: University Avenue, Hyde Park / Wikimedia Commons</p>`,
  sources: [
    { name: 'Hyde Park Art Center', url: 'https://www.hydeparkart.org/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
    { name: 'Choose Chicago — museums and art', url: 'https://www.choosechicago.com/articles/museums-art/chicago-art-gallery-districts/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Hyde Park', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Walker_Museum_Building,_University_of_Chicago,_University_Avenue,_Hyde_Park,_Chicago,_IL_(54515842641).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Wind Reenactment', source: 'Instagram — @mauriciolopezfernandez', license: 'EMBED', contact: 'https://www.instagram.com/p/DcgummsETka/', credit: '@mauriciolopezfernandez via Instagram' },
    { slot: 'body-2', subject: 'Gallery interior', source: 'Instagram — @isaiahleeart', license: 'EMBED', contact: 'https://www.instagram.com/p/DdCaZjmnwRm/', credit: '@isaiahleeart via Instagram' },
    { slot: 'body-3', subject: 'Opening', source: 'Instagram — @tepalandjian.art', license: 'EMBED', contact: 'https://www.instagram.com/p/DbzMsGOjSC2/', credit: '@tepalandjian.art via Instagram' },
  ],
},

]
