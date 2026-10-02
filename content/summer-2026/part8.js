// Pilot rewrites — one per byline, drafted against the .claude/skills/ guides and
// grounded in the eyewitness post sets in research/posts/.
//
// These refs also exist in earlier parts. index.js dedupes on ref, last file wins,
// so these override the originals. Delete an entry here to fall back.
//
// Form: standard (700–1,500). Images: cover + 3 embeds, per ARTICLE-STANDARDS §5.4.
// Every embed is a permalink from the event's post set, built through embeds.js.

const E = require('./embeds')

module.exports = [

{
  ref: 'D11',
  slug: 'the-chosen-few-picnic-made-room-for-juke',  // rewrite: keep the published URL
  title: 'Thirty-Six Years of House, and the Year Juke Got a Slot',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-13',
  event_dates: 'July 11, 2026',
  venue: 'Jackson Park',
  neighborhood: 'Woodlawn',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jackson_Park_Chicago_1.jpg',
  cover_credit: 'Jackson Park, Chicago / Wikimedia Commons',
  cover_alt: 'Open parkland and mature trees in Jackson Park on Chicago’s South Side',
  excerpt: 'In its 36th year the Chosen Few DJs widened the bill to take in ghetto house and juke. Slugo got a daytime slot in Jackson Park, and Terry Hunter watched his own son play the family picnic.',
  body: `<p>By eleven in the morning the grass in Jackson Park was already handing the heat back, and the people who understand how this day works had claimed their shade an hour before that. Folding chairs in closed rings. Coolers with the lids propped open. Aluminum trays going out under white canopy tents, a woman in a battery-powered neck fan moving down the row with a plate in each hand. The banner over the main stage read <strong>36 Years of House</strong> and carried eight names beneath it: <strong>Wayne Williams</strong>, <strong>Jesse Saunders</strong>, <strong>Tony Hatchett</strong>, <strong>Alan King</strong>, <strong>Andre Hatchett</strong>, <strong>Terry Hunter</strong>, <strong>Mike Dunn</strong>, <strong>Kim Parham</strong>.</p>

<p>Saunders is the man generally credited with pressing the first house record. Williams has been running the Chosen Few since 1977, and the picnic has happened every July since 1990, when it was a couple hundred people in a backyard behind the Museum of Science and Industry and nobody was calling it the Woodstock of anything. Nobody on the grass on July 11th needed that recap. General admission ran $89.94, which buys you a field, a sound system and the reasonable expectation that someone you have not seen since the pandemic will find you by three.</p>

<h3>The Widening</h3>

<p>What changed this year was who got a slot. <strong>Alan King</strong>, who programs the day, opened the bill toward ghetto house and juke — the faster, harder, cheaper-sounding strains that came out of the same South Side bedrooms as everything else on that banner and have spent thirty years being treated as house music's embarrassing younger cousin. King's stated reasoning was about being more inclusive of the whole house crowd and keeping the focus local. In practice it meant <strong>DJ Slugo</strong> got a daytime slot at the most establishment event in Chicago house.</p>

<p>He did not ease into it. <strong>"Get Down Lil Mama"</strong> came in at a tempo the lawn chairs were not engineered for, and you could watch the field sort itself in real time — people who knew every word moving toward the barricade, people who did not staying exactly where their coolers were. <strong>"There's Some Hoes in This House"</strong> is thirty years old and still sounds like it was recorded in a basement on purpose, all treble and nerve. <strong>"Let's Go to The Mo"</strong> landed as pure neighborhood shorthand. By <strong>"Let's Juke"</strong> the footwork had started, which at a picnic means a ring opens up on the grass and does not close again for twenty minutes. <strong>Boolu Master</strong> followed in the same register. The ring held.</p>

${E.facebookVideo('https://www.facebook.com/reel/3535499566604042/', {
  caption: 'From inside the crowd, main stage, July 11',
  portrait: true,
})}

<h3>Earth Song, and Somebody's Son</h3>

<p>Terry Hunter has the hardest job on that stage, which is to follow the history lesson with something that works as a party. He did it by mixing Michael Jackson's <strong>"Earth Song"</strong> into a house arrangement — a maximalist, faintly ridiculous choice that a lesser DJ would have played for irony and that Hunter played completely straight. It is a record about ecological grief. On a Saturday in Jackson Park it functioned as a singalong. I do not have a theory for why that worked.</p>

<p>Earlier in the day Hunter had stood off to the side of the booth while his son, <strong>DJ Tai</strong>, played — the youngest DJ ever to get a set at the picnic. That is the whole argument of this event compressed into one sightline: a man who has been on the banner for years, watching from the wings, while the thing he helped build hands itself forward. <strong>Kym Mazelle</strong>, who was the First Lady of House in this city in the mid-eighties before Europe took her, was somewhere in the crowd for her second picnic. <strong>DJ Jazzy Jeff</strong> was there too, posing for selfies near the stage like a man on holiday.</p>

${E.instagram('DasdnCPDpTU', {
  caption: 'Five clips from the field, Jackson Park',
})}

<h3>What the Park Is</h3>

<p>Jackson Park is Frederick Law Olmsted's, laid out as the southern anchor of a system he designed with Calvert Vaux, and it held the World's Columbian Exposition in 1893 — the White City, the fair that gave Chicago its civic self-image and a permanent habit of overbuilding for visitors. The Museum of Science and Industry is the one building left standing from it, which makes the backyard where this picnic started a kind of footnote to a footnote. At the north end the Obama Presidential Center is going up. Whatever that does to this neighborhood, it will do it to the ground this festival stands on.</p>

<p>Which is the case for holding it here rather than in Grant Park, where the city puts the things it wants photographed. Open field, no roof, sound that has to fight the lake air and mostly wins because the system is overspecified for the job. I counted three separate crews in matching shirts within fifty feet of one tent — SMOK'N FEW in cigar-logo grey, JACK MY BODY in a graphic print, the Chi Town Smoke Kings under their own canopy. That is not a crowd. That is a set of standing appointments that happen to coincide.</p>

<p>The sponsor step-and-repeat carried UNCF, V103, the Illinois Lottery and Blue Cross Blue Shield, which tells you this is now an institution with a budget, produced by Special Events Management and insured accordingly. Fine. The programming is still being decided by people who were in the room when the genre started, and this year they used that authority to let the rude cousin in.</p>

<p>Walking back toward Stony Island at seven, past the last tents being folded and a man asleep upright in a camp chair, I heard a woman behind me tell her friend the picnic owed her nothing. She meant it as the highest possible compliment. Thirty-six years in, the Chosen Few are running the only festival in Chicago where the lineup is an argument about lineage and the audience is qualified to judge it.</p>

${E.facebookVideo('https://www.facebook.com/reel/2253775948495694/', {
  caption: 'First-person walk through the 36th annual picnic',
  portrait: true,
})}

<p class="cn-cover-credit">Cover image: Jackson Park, Chicago / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chosen Few DJs', url: 'https://chosenfewdjs.com/' },
    { name: 'Special Events Management — the picnic', url: 'https://chicagoevents.com/event/the-chosen-few-old-school-reunion-picnic/' },
    { name: 'Chicago Park District — Jackson Park', url: 'https://www.chicagoparkdistrict.com/parks-facilities/jackson-park' },
  ],
  photos: [
    { slot: 'cover', subject: 'Jackson Park parkland', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Jackson_Park_Chicago_1.jpg', credit: 'Jackson Park, Chicago / Wikimedia Commons' },
    { slot: 'body-1', subject: 'Crowd at main stage', source: 'Facebook reel — Ladonna Holliman', license: 'EMBED', contact: 'https://www.facebook.com/reel/3535499566604042/', credit: 'Ladonna Holliman via Facebook' },
    { slot: 'body-2', subject: 'Field clips', source: 'Instagram — @budaflycreative', license: 'EMBED', contact: 'https://www.instagram.com/p/DasdnCPDpTU/', credit: 'Mashaune Hardy / @budaflycreative via Instagram' },
    { slot: 'body-3', subject: 'First-person walkthrough', source: 'Facebook reel — James Brown', license: 'EMBED', contact: 'https://www.facebook.com/reel/2253775948495694/', credit: 'James Brown via Facebook' },
    { slot: 'upgrade', subject: 'Terry Hunter and DJ Tai', source: 'Ashley Chappell / Chicago Reader', license: 'ASK', contact: 'Named photographer with a full 2026 set — best single ask for this event', credit: 'Photo: Ashley Chappell' },
  ],
},

{
  ref: 'D62',
  slug: 'renegade-craft-turned-twenty-three-in-the-city-that-made-it',  // rewrite: keep the published URL
  title: 'The $1,065 Booth: Renegade Craft on Division Street',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-09-15',
  event_dates: 'September 12–13, 2026',
  venue: 'Division Street between Damen and Ashland',
  neighborhood: 'Wicker Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flatiron_Arts_Building,_Milwaukee_Avenue_and_North_Avenue,_Wicker_Park,_Chicago,_IL_-_Flickr_-_w_lemay.jpg',
  cover_credit: 'Flatiron Arts Building, Wicker Park / w_lemay via Wikimedia Commons',
  cover_alt: 'The triangular Flatiron Arts Building at Milwaukee and North Avenue in Wicker Park',
  excerpt: 'Renegade Craft has no curator and no jury statement. It has a $30 application and a $750 booth fee, and one textile maker published the arithmetic. That document is the most useful criticism the fair produced.',
  body: `<p>The craft fair is the one art event where nobody pretends to be looking. At a gallery the visitor performs attention; at a fair on a closed street the visitor shops, and the shopping is undisguised. For twenty-three years this has looked like the form's disqualifying weakness. Standing on Division Street on the weekend of September 12th and 13th, between Damen and Ashland, among white tents running four blocks deep, I am prepared to concede that the honesty is the point. One cannot evaluate a fair without first accepting that it is a market, and this one does not insult you by claiming otherwise.</p>

<p>Renegade Craft began in Chicago in 2003 and now calls this city the heart of its community, which is marketing but is also true — the organisation ran three editions here in 2026 alone. The spring market on May 16th and 17th carried more than 250 artists. In July it took Kedzie Boulevard in Logan Square between Fullerton and Palmer Square, eleven to six. By September it was in Wicker Park. Entry is a five-dollar suggestion collected by scanning a code, which is to say entry is free and politely framed.</p>

<h3>The Jury Is a Fee</h3>

<p>There is no curator to credit here, and that absence is the subject. A juried show publishes its numbers: submissions received, works selected, the panel's names and institutions. Renegade publishes a booth fee. The selection mechanism is a thirty-dollar application and the capacity to front seven hundred and fifty dollars for two days of street.</p>

<p>We know those figures precisely because <strong>Liz Marie Mortensen</strong>, who works as Laila Textiles, filmed herself sitting in her studio and reading out the arithmetic after the Logan Square edition. Seven hundred and fifty for the booth. Thirty to apply. Two hundred and thirty-five to hire help across Saturday and Sunday. Fifty for food while working. One thousand and sixty-five dollars in baseline expenses, before her own labour, before materials, before tax. She owned her displays already and noted that a vendor who did not would add five hundred to a thousand more. Against that she processed two hundred and eleven transactions at an average order of fifty-one dollars and twelve cents.</p>

${E.instagram('DbT3j7WJM5P', {
  caption: 'Laila Textiles reads out the cost of a two-day booth',
})}

<p>That video is the most useful piece of criticism the fair produced this year, and no institution commissioned it. It establishes the real entry requirement, which is not talent but working capital. <strong>Sam</strong> of Stokes Jones Studio drove more than seven hundred miles from South Carolina with her husband Fuller doing the unloading and the parking so that she could build the tent — wooden shelves, mugs, bowls, a sign reading MAGNET TRIO $20. Setup weather was rain. It cleared. One does not make that drive on speculation; one makes it because the Chicago market reliably returns the fuel.</p>

<h3>What Is Actually On The Tables</h3>

<p>Glazed stoneware. Felt. Glass bead strands by the hundred. Quilted cotton. Vintage denim in sizes to 4X. Screen-printed paper. Enamel pins.</p>

<p>The inventory is more interesting than its reputation. <strong>Christina Covington</strong> paints animals and florals onto mugs and plates. <strong>Jenna Bean</strong> fills a tent with several hundred small ceramic figures sorted strictly by colour — tomatoes into citrus into lemons into frogs — an arrangement with more curatorial discipline than several West Loop galleries manage. Rabbit Foot Studios hangs quilts as wall work, which is the correct claim. <strong>Kari Lee</strong> makes a framed felt rendering of Cheez-Its and a plush baguette with an angry face, and I walked past these twice before going back, which is a verdict one does not plan to deliver. Lost Girls Vintage, a woman- and immigrant-owned shop on this street since 2013 with Dolly Parton painted in the window, wheeled its own racks out of its own doorway.</p>

${E.instagram('DbwFWp4pU3f', {
  caption: 'Several hundred ceramic figures, sorted by colour',
})}

<p>The best object at the fair cost four quarters. <strong>Hadley</strong> operates a red coin-fed vending machine that dispenses one of eight Chicago prints at random for a dollar. A machine that refuses to let you choose is doing something no booth of carefully arranged prints can do, which is to remove taste from the transaction entirely. The wall text, one notes, is a coin slot. It has declined to explain itself.</p>

<h3>The Thing The Fair Is Inside</h3>

<p>Division Street between Damen and Ashland is not neutral ground for a conversation about what artists can afford. This is the stretch that priced out the painters who made it desirable, in the neighbourhood whose arts-building silhouette still anchors the skyline at Milwaukee and North, and the fair that fills it for a weekend charges a maker a thousand dollars to stand on it. Renegade did not cause that and cannot fix it. It is simply the economics, briefly made visible, on the exact pavement where the question is live.</p>

<p>So the reversal, and it is not the expected one. These are not hobbyists selling trinkets under a tent. They are small manufacturers running two-day retail activations at a cost structure that would make a gallerist flinch, and the ones who return every year have solved a problem of logistics and pricing that most exhibiting artists never have to think about. The rigor is in the spreadsheet.</p>

${E.instagram('DdO8eckO9WR', {
  caption: 'A walk down the September market',
})}

<p>Renegade returns to Chicago next spring. When the tents begin to blur into one long table of pleasant objects, as they will by the third block, I suggest you find Hadley's vending machine, put in four quarters, accept whatever it gives you, and stand there until you notice that you are holding something you did not select and cannot return. That is the only moment at a craft fair when you are not shopping.</p>

<p class="cn-cover-credit">Cover image: Flatiron Arts Building, Wicker Park / w_lemay via Wikimedia Commons</p>`,
  sources: [
    { name: 'Renegade Craft — Chicago', url: 'https://www.renegadecraft.com/city/chicago/' },
    { name: 'Renegade Craft — Chicago Fall', url: 'https://www.renegadecraft.com/event/chicago-fall/' },
    { name: 'Renegade Craft — Chicago Spring', url: 'https://www.renegadecraft.com/event/chicago-spring/' },
    { name: 'Choose Chicago — markets and fashion events', url: 'https://www.choosechicago.com/articles/shopping-and-fashion/chicago-shopping-markets-fashion-events/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Flatiron Arts Building, Wicker Park', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Flatiron_Arts_Building,_Milwaukee_Avenue_and_North_Avenue,_Wicker_Park,_Chicago,_IL_-_Flickr_-_w_lemay.jpg', credit: 'w_lemay via Wikimedia Commons' },
    { slot: 'body-1', subject: 'Vendor cost breakdown', source: 'Instagram — @lailatextiles', license: 'EMBED', contact: 'https://www.instagram.com/reel/DbT3j7WJM5P/', credit: 'Liz Marie Mortensen / @lailatextiles via Instagram' },
    { slot: 'body-2', subject: 'Ceramic figures sorted by colour', source: 'Instagram — @jenna.bean.ceramics', license: 'EMBED', contact: 'https://www.instagram.com/reel/DbwFWp4pU3f/', credit: 'Jenna Bean Ceramics via Instagram' },
    { slot: 'body-3', subject: 'Walk through the September market', source: 'Instagram — @heycaitlouise', license: 'EMBED', contact: 'https://www.instagram.com/reel/DdO8eckO9WR/', credit: '@heycaitlouise via Instagram' },
    { slot: 'upgrade', subject: 'Maker portraits at the booths', source: 'Renegade Craft press image library', license: 'CLEAR', contact: 'https://www.renegadecraft.com/city/chicago/ — well-organised press library, one of the easiest asks', credit: 'Courtesy Renegade Craft' },
  ],
},

{
  ref: 'D47',
  slug: 'chicagos-chinatown-is-growing-and-the-summer-fair-is-the-proof',  // rewrite: keep the published URL
  title: 'Under the Paifang: Chinatown’s 47th Summer Fair on Wentworth',
  category: 'news',
  author_name: 'Mora',
  date: '2026-07-28',
  event_dates: 'July 25–26, 2026',
  venue: 'Wentworth Avenue, Cermak to 24th Place',
  neighborhood: 'Chinatown',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chicago_Chinatown_Wentworth_Avenue.jpg',
  cover_credit: 'Wentworth Avenue, Chinatown / Wikimedia Commons',
  cover_alt: 'Wentworth Avenue in Chicago’s Chinatown, looking north toward the paifang gate',
  excerpt: 'The 47th Chinatown Summer Fair closed Wentworth for two days in July, and the thing worth noticing is not the lion dance. It is that this Chinatown is still getting bigger while most of the country’s are not.',
  body: `<p>It was the kind of July Saturday where the heat sits on a closed street and does not move, about four degrees warmer between the buildings on Wentworth than it had been two blocks east, and by noon on July 25th the paifang gate at Cermak was functioning less as an archway than as a bottleneck. People came through it in waves. The <strong>paifang</strong> has stood there since 1975, blue panels with gold characters reading 天下為公 — Sun Yat-sen's line, usually given in English as <em>all under heaven is for the common good</em> — and this weekend it also carried a vinyl banner with seven sponsor logos on it: McDonald's, AMOA, ComEd, Airbnb, ICASH, the CTA and the Illinois Lottery. Admission was free. The gate told you who paid for that.</p>

<p>I stood under it for most of an hour, which is not something I usually do, and the thing about standing still at an entrance is that you stop seeing a crowd and start seeing arrivals. Families with strollers, mostly, moving slowly because everyone moves slowly under an arch. Three separate groups stopped to take the same photograph from the same spot on the south side, where the characters line up over your head. A woman in a white strapless dress waited out four attempts before she got the one she wanted.</p>

<p>Then a grandmother came through with two kids and did not look up at the gate at all, because she has walked under it her whole life and it is a gate.</p>

<p>Further in, the tents started: red, blue, green, running north toward 24th Place. Grilled skewers. Cotton candy. Aguas frescas, mango and piña colada, which is worth saying plainly because a Chinatown street fair in 2026 is also a Mexican-vendor street fair, and nobody on Wentworth appeared to find this remarkable. <strong>Uni Uni Boba</strong> had a bright yellow pop-up under a HANDCRAFT BUBBLE TEA sign with the dispensers lined up and a list of its other locations taped to the counter. The <strong>Illinois Lottery</strong> tent had hung rows of red paper lanterns under its canopy, a small act of set dressing that mostly succeeded.</p>

${E.instagram('DbQrPWVvzpn', {
  caption: 'Posted 2026-07-26',
})}

<h3>Why It Moved Here</h3>

<p>Chicago's Chinatown is not where it started. The first Chinese community in this city settled around Clark and Van Buren in the Loop in the 1870s, and it left — pushed out by rising rents and by landlords who would not renew, which is a sentence that could be written about four other Chicago neighborhoods this year. Around 1912 a group of merchants organised a move south to Cermak and Wentworth and signed the leases quietly so the prices would not jump. The gate came sixty-three years after the relocation. <strong>Chinatown Square</strong>, the two-level plaza north of Archer where a lot of the fair's overflow ends up, was built in the 1990s on ground that used to be Santa Fe railroad yards.</p>

<p>Which is the context for the only statistic that matters here: most Chinatowns in the United States are shrinking, and this one is growing. It has been adding population and storefronts while San Francisco's and New York's contract. A 47th annual street fair is not a nostalgia event. It is a neighborhood with a reason to keep throwing it.</p>

<h3>The Monks, and the Fair's Actual Hours</h3>

<p>Saturday ran ten in the morning until ten at night, Sunday ten until seven, which is a long second day for vendors who have already done a fourteen-hour one. The Chicago Chinatown Chamber of Commerce runs the fair; the Chicago Chinatown Community Foundation was thanked from the stage by the Illinois Secretary of State, who turned up on the Sunday in a black polo and shorts and spoke for a few minutes about being proud of the neighborhood, as officials do.</p>

<p>Over at Chinatown Square, a man in black streetwear, a durag and sunglasses was photographed standing beside a Buddhist monk in a bright orange robe. The monk was holding a phone. The caption read: “Had to visit the monks for guidance #Living.” I have nothing to add to that.</p>

${E.instagram('DbRuC1sx9bi', {
  caption: 'The gate with the 2026 sponsor banner',
})}

<h3>One Block Off the Fair</h3>

<p>What you eat here is better one block off the fair than on it, which is true of every street festival in this city and especially true where the restaurants are this good. A table inside came out as siu mai, har gow, chicken feet, rice noodle rolls, tea, and a Coca-Cola, because somebody always orders a Coke with dim sum. The skewers on the street are for walking. The dumplings are for sitting down.</p>

<p>By late afternoon the lion dance had been and gone and the kung fu demonstration had drawn the densest ring of the day, hundreds deep where Wentworth narrows, phones up in that solid wall you get when nobody can actually see. The “noise” of a fair like this is mostly a sound system fighting a crowd and losing, and the real register of the afternoon was lower than that: ice in cups, a generator, four conversations in three languages happening across one folding table.</p>

${E.instagram('DbRKBs5GTDi', {
  caption: 'A vendor tent from daylight through to night',
})}

<p>Chinatown will do this again next July, under the same gate, with a different corporate name in front of it. Forty-seven years in, the neighborhood is not commemorating itself. It is still arriving.</p>

<p class="cn-cover-credit">Cover image: Wentworth Avenue, Chinatown / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Chinatown Chamber of Commerce — summer events guide', url: 'https://chicagochinatown.org/map-guide-for-summer-events-2026/' },
    { name: 'Choose Chicago — Chinatown Summer Fair', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
    { name: 'Special Events Management', url: 'https://chicagoevents.com/event/chinatown-summer-fair/' },
    { name: 'Chicago Parent', url: 'https://www.chicagoparent.com/things-to-do/chinatown-summer-fair-chicago' },
  ],
  photos: [
    { slot: 'cover', subject: 'Wentworth Avenue, Chinatown', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Chicago_Chinatown_Wentworth_Avenue.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Entrance walkthrough', source: 'Instagram — @chiwithus', license: 'EMBED', contact: 'https://www.instagram.com/p/DbQrPWVvzpn/', credit: '@chiwithus via Instagram' },
    { slot: 'body-2', subject: 'Paifang gate with sponsor banner', source: 'Instagram — @jaslene.blanca', license: 'EMBED', contact: 'https://www.instagram.com/p/DbRuC1sx9bi/', credit: '@jaslene.blanca via Instagram' },
    { slot: 'body-3', subject: 'Vendor tent, day to night', source: 'Instagram — @uniuni_us', license: 'EMBED', contact: 'https://www.instagram.com/p/DbRKBs5GTDi/', credit: 'Uni Uni via Instagram' },
    { slot: 'upgrade', subject: 'Lion dance and kung fu demonstration', source: 'Chicago Chinatown Chamber of Commerce', license: 'ASK', contact: 'Chamber, plus the performing troupes’ own accounts', credit: 'Courtesy Chicago Chinatown Chamber of Commerce' },
  ],
},

]
