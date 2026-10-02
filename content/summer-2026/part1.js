// Dossier #1–9 — Tier 1 marquee music festivals. Byline: Jude (Heard).
//
// REFERENCING RULE: no news outlets, in links, sources or prose. Color&Noise
// reports these events itself, so quotes from named people read as this
// publication's own reporting and references point only to primary sources —
// festivals, venues, chambers, the city and Wikimedia Commons.

const E = require('./embeds')

module.exports = [

{
  ref: 'D1',
  title: 'Scissor Slam 2K26 and the Mud Year at Grant Park',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-04',
  event_dates: 'July 30 – August 2, 2026',
  venue: 'Grant Park',
  neighborhood: 'The Loop',
  featured: true,
  cover_image: "https://cdn.prod.website-files.com/67c1632e86f99390b0516ac5/69a72058b2fcf74831ebedf8_LOL26_Open.Graph.png",
  cover_credit: "Via lollapalooza.com",
  cover_alt: "Scissor Slam 2K26 and the Mud Year at Grant Park",
  excerpt: 'A four-hour rain delay flooded Grant Park on Saturday, and the best moment of Lollapalooza 2026 was organised from a phone by a mother from Indianapolis who had not arrived yet.',
  body: `<p>Gates did not open until 3pm on the Saturday of Lollapalooza. Rain had put the festival four hours behind and turned the Grant Park grounds to standing mud, and by mid-afternoon the entire weekend was hanging on whether a hundred thousand people would tolerate a flooded park.</p>
<p>What happened next was not on any stage schedule. <strong>Lindsay Perrin</strong>, a 38-year-old mother from Indianapolis, was sent a video of the mud by a friend, built an Instagram graphic over lunch, and invited strangers to something she called Scissor Slam 2K26. Her post cleared 100,000 views before she had even reached the festival. She called out for lesbian mud wrestling and, by her own account, had hundreds of people around her within moments. Two wrestlers finished a match by kissing. The clip left the festival grounds and was travelling the internet within a day.</p>
<p>Perrin described it afterward as queer joy and community, and people who were there talked about swapping numbers and meeting queer strangers from across the country in a mud pit in Grant Park. Set that against the eight stages, the <a href="https://www.lollapalooza.com/lineup">170-plus artists</a> and whatever C3 spent on production this year. The most-shared thing that happened at Lollapalooza 2026 was invented by a woman who was not yet on site, for free, because it rained.</p>
${E.instagram('DbhPY58ldhf', {
  caption: 'The festival’s own account on the Saturday washout: the rain, and the mud, did not stop the party',
  credit: 'Lollapalooza on Instagram',
})}
<h3>The Phones Were the Real Complaint</h3>
<p>The dominant grievance across the weekend was not the weather. It was recording devices. Sightlines blocked by hundreds of raised phones. People declining to dance, sing or clap under what amounted to a panopticon of cameras. Audrey Hobert’s second performance earned a particular kind of praise, and the reason was simply that the crowd in front of her put their phones away.</p>
<p>Elsewhere the festival felt draining between sets built for brand activations. Headliner campers were indifferent or actively rude to earlier acts. Teenagers talked through sets. A bag of urine went over a crowd. Against all of that, <strong>Turnstile</strong>’s pit was the weekend’s counterexample for the opposite reason: fans checked on people who fell.</p>
<h3>The Bill, and the Park</h3>
<p>The lineup was the year’s other argument. <strong>Lorde</strong>, <strong>Charli XCX</strong>, <strong>JENNIE</strong>, <strong>Olivia Dean</strong> and <strong>Tate McRae</strong> held headline slots alongside <strong>John Summit</strong>, <strong>The xx</strong> and <strong>The Smashing Pumpkins</strong>, and the women-dominated headline slate was the thing everyone arrived arguing about. Two readings are available and only one is generous: either C3 programmed boldly, or a bill like this was a decade overdue and calling it bold indicts every previous year. The Pumpkins, for their part, got jokingly blamed all weekend for summoning the rain.</p>
<p>Official tallies came in at ten arrests and 67 ambulance transports across four days. Cleanup of the churned turf began Monday.</p>
<p><a href="https://commons.wikimedia.org/wiki/Category:Grant_Park_(Chicago)">Grant Park</a> will be reseeded, as it always is, and the annual argument about renting the city’s front lawn to a private promoter will get its hearing and expire by Labor Day. The part worth keeping is smaller. A festival this size cannot manufacture the thing people actually tell their friends about. This year a stranger did it in the mud, and 170 artists got out-drawn by a hand-made Instagram graphic. Anyone illustrating it afterwards found exactly one freely licensed performance photo from the weekend, in the <a href="https://www.choosechicago.com/press-media/image-and-video-library/">public libraries</a> and on Commons, which tells its own story about who owns the record of a festival this size.</p>
<p class="cn-cover-credit">Cover image: Via lollapalooza.com</p>`,
  sources: [
    { name: 'Lollapalooza', url: 'https://www.lollapalooza.com/lineup' },
    { name: 'Wikimedia Commons — Grant Park', url: 'https://commons.wikimedia.org/wiki/Category:Grant_Park_(Chicago)' },
    { name: 'Choose Chicago image library', url: 'https://www.choosechicago.com/press-media/image-and-video-library/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Tate McRae performing, Lollapalooza 2026', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'File:Tate McRae Live at Lollapalooza 2026.jpg', credit: 'EmmaRiversMusic / Wikimedia Commons (CC0)', status: 'RESOLVED' },
    { slot: 'embed-1', subject: 'Festival account on the Saturday mud', source: 'Instagram post DbhPY58ldhf', license: 'EMBED', contact: 'Organiser-owned post, embedded', credit: 'Lollapalooza on Instagram', status: 'RESOLVED' },
    { slot: 'body-2', subject: 'Grant Park festival establishing shot', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
    { slot: 'body-3', subject: 'Churned turf / cleanup, Monday morning', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
  ],
},

{
  ref: 'D2',
  title: 'Douglass Park After Riot Fest: “The Worst It’s Ever Been”',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-22',
  event_dates: 'September 18 – 20, 2026',
  venue: 'Douglass Park',
  neighborhood: 'North Lawndale',
  featured: true,
  cover_image: "https://riotfest.org/wp-content/uploads/2026/09/RIOT-FEST-2027-PRESALE-EXTENDED-WEB.jpg",
  cover_credit: "Via riotfest.org",
  cover_alt: "Douglass Park After Riot Fest: “The Worst It’s Ever Been”",
  excerpt: 'Three days of rain left the park torn up, and neighbours who have absorbed Riot Fest for years stopped asking for concessions and started asking it to leave. William Shatner also played.',
  body: `<p>William Shatner made his Riot Fest debut this year fronting his metal band <strong>The Uckers</strong>, and for about a week that was the story. Then it rained for three straight days on Douglass Park, and the story changed.</p>
<p><strong>Catherine Sollmon</strong>, who lives on the 1800 block of South California Avenue, said the damage was the worst she had seen by far. She also explained what the park is when a festival is not in it: a center of our lives and activities for a lot of people in the neighborhood, she said, a source of health and entertainment. Her conclusion was blunt — it would be great if they found a new space.</p>
<p><strong>Carolyn Higgins</strong>, 59, of the 1600 block of South Fairfield, put it more plainly: they got the worst year because it rained all three days, and she would prefer it moved. <strong>Jorge Angel</strong>, a ten-year resident, said his kids cannot play soccer because of Riot Fest, and that Riot Fest pays the city too much for the city to care. He has filed complaints about disrupted youth programming. All went unanswered.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Ddjo1-txkDV/embed/" title="Instagram post Ddjo1-txkDV" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-21 — <a href="https://www.instagram.com/p/Ddjo1-txkDV/" rel="nofollow noopener" target="_blank">@unetelavillita via Instagram</a></figcaption></figure>
<h3>The Argument Got Sharper This Year</h3>
<p>What changed in 2026 is the framing. The Little Village volunteer group <strong>Únete La Villita</strong> posted that the park was completely destroyed and committed to documenting the restoration across the following year, which turns a three-day grievance into a twelve-month record. Volunteer <strong>Ana Solano</strong> gave the line that defines the Chicago festival summer: she believes the city has outgrown the use of public parks for private music festivals.</p>
<p>That is a different demand than better fencing or earlier curfews. The group held a press conference days before gates opened, and residents named the alternative themselves — move it to a private venue, Wrigley Field or the United Center. Fencing along California Avenue was tagged with messages telling the festival to get out of the park, and a construction sign near the site was altered to carry anti-Riot Fest text. The <a href="https://www.facebook.com/ConcernedaboutDouglasPark/">Concerned Citizens of Riot Fest in Douglass Park</a> group has been organising this for years.</p>
<p>Founder <strong>Mike Petryshyn</strong> responded that Douglass Park means a great deal to Riot Fest and more to the community that uses it daily, and that the festival’s responsibility does not end when the festival does. He is on the record and the restoration is now being watched by people with a calendar.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DdiQ4k5Ochr/embed/" title="Instagram post DdiQ4k5Ochr" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-21 — <a href="https://www.instagram.com/p/DdiQ4k5Ochr/" rel="nofollow noopener" target="_blank">@choosechicago via Instagram</a></figcaption></figure>
<h3>The Bill Was Excellent, Which Is the Problem</h3>
<p>Five stages carried <strong>Twenty One Pilots</strong>, <strong>Tool</strong>, <strong>Iggy Pop</strong>, <strong>Morrissey</strong>, <strong>Alanis Morissette</strong> and <strong>Pierce the Veil</strong>, over a card with <strong>Pixies</strong>, <strong>Nas</strong>, <strong>Patti Smith</strong>, <strong>Elvis Costello</strong>, <strong>Santigold</strong>, <strong>Descendents</strong> and <strong>Insane Clown Posse</strong>. Riot Fest stopped being a punk festival years ago and became a festival with punk’s indifference to genre borders, and the <a href="https://riotfest.org/2026/08/06/the-riot-fest-2026-schedule-is-here/">2026 schedule</a> was the best argument it has made for itself.</p>
<p>To the festival’s credit it is also the best-documented event of the Chicago summer, publishing its own <a href="https://riotfest.org/category/photos/">photo archive</a> and running a crowd-sourced call for attendee photography whose contributors have already agreed to republication.</p>

<figure class="cn-embed" data-platform="facebook"><iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1119515937316949%2F&amp;show_text=false" title="Facebook video" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:620px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-21 — <a href="https://www.facebook.com/reel/1119515937316949/" rel="nofollow noopener" target="_blank">unknown via Facebook</a></figcaption></figure>
<p>None of which resolves anything, because the festival is signed into Douglass Park through 2027 and the residents quoted above are not going anywhere either. A West Side neighborhood with limited open space watches that space get fenced, ticketed and handed back torn up, and this year it came back worse than usual.</p>
<p>Shatner in Douglass Park was funny. The restoration log Únete La Villita started keeping is the thing to read in twelve months.</p>
<p class="cn-cover-credit">Cover image: Via riotfest.org</p>`,
  sources: [
    { name: 'Riot Fest 2026 schedule', url: 'https://riotfest.org/2026/08/06/the-riot-fest-2026-schedule-is-here/' },
    { name: 'Riot Fest photo archive', url: 'https://riotfest.org/category/photos/' },
    { name: 'Concerned Citizens of Riot Fest in Douglass Park', url: 'https://www.facebook.com/ConcernedaboutDouglasPark/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Torn-up park ground after the festival', source: 'Únete La Villita restoration documentation', license: 'ASK', contact: 'Únete La Villita — they want this seen; ask directly', credit: 'Courtesy Únete La Villita' },
    { slot: 'body-1', subject: 'William Shatner with The Uckers', source: '"Photos By You! Riot Fest 2026" contributor pool', license: 'ASK', contact: 'https://riotfest.org/2026/09/29/photos-by-you-riot-fest-2026/', credit: 'Photo: [contributor]/Riot Fest' },
    { slot: 'body-2', subject: 'Main stage wide, Douglass Park', source: 'Riot Fest official archive', license: 'CLEAR-ish', contact: 'https://riotfest.org/category/photos/ — confirm reuse terms', credit: 'Per Riot Fest terms' },
    { slot: 'body-3', subject: 'Douglass Park outside festival season', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons Category:Riot_Fest', credit: 'Per file licence' },
  ],
},

{
  ref: 'D3',
  title: 'Five Years of Sueños on the Lakefront',
  category: 'review',
  author_name: 'Jude',
  date: '2026-05-26',
  event_dates: 'May 23 – 24, 2026',
  venue: 'Grant Park',
  neighborhood: 'The Loop',
  featured: false,
  cover_image: "https://dottie.enjoyillinois.com/assets/Tourism-Operators/images/273484548-121055557131180-2308148166166504541-n__Resampled.jpg",
  cover_credit: "Via enjoyillinois.com",
  cover_alt: "Five Years of Sueños on the Lakefront",
  excerpt: 'Sueños hit its fifth anniversary over Memorial Day weekend with J Balvin, Kali Uchis and Fuerza Regida, and has quietly become the anchor of Chicago’s Latin music calendar.',
  body: `<p>Sueños turned five over Memorial Day weekend, two days of reggaetón, Latin trap and urbano on the Grant Park lakefront with the skyline doing work no stage designer can afford. Organizers framed 2026 as a milestone edition, which is what every festival says at five. This time the claim holds.</p>
<p>The bill ran through <strong>J Balvin</strong>, <strong>Kali Uchis</strong> and <strong>Fuerza Regida</strong>, three acts that between them cover most of the arguments currently happening inside Latin music. Balvin is the crossover architect whose era the genre has largely moved past. Uchis has spent a career refusing to be filed anywhere. Fuerza Regida represent the regional Mexican surge that has been the actual commercial story of the past three years, and which American festival programmers were slow to book.</p>
<h3>From Upstart to Anchor</h3>
<p>Five years ago a two-day Latin festival on the lakefront was a bet. Chicago has one of the largest Mexican and Puerto Rican populations in the country and had no downtown festival built for it, which reads now as an obvious gap and did not read that way to anyone selling tickets in 2021.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYxjdwLFG2D/embed/" title="Instagram post DYxjdwLFG2D" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-25 — <a href="https://www.instagram.com/p/DYxjdwLFG2D/" rel="nofollow noopener" target="_blank">@reyna_sarii via Instagram</a></figcaption></figure>
<p>What <a href="https://suenosmusicfestival.com/information/">Sueños</a> has become is the front end of the Chicago calendar — the event that claims Memorial Day weekend and with it the unofficial start of summer. That position used to belong to whichever street fest opened first. The season now starts when these gates do.</p>
<h3>Three Claims on One Audience</h3>
<p>It is worth setting Sueños against the other two large Latin events on the calendar, because 2026 made the contrast unavoidable. <a href="https://fiestadelsol.org/festival">Fiesta del Sol</a> in Pilsen is free, 54 years old, protest-born, and funds scholarships through Pilsen Neighbors Community Council. El Grito in September is a civic event with the city’s hand on it, and it spent the summer dealing with a boycott and with federal immigration enforcement. Sueños is a ticketed commercial festival with international headliners on public parkland downtown.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYtg6PGTwSH/embed/" title="Instagram post DYtg6PGTwSH" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-24 — <a href="https://www.instagram.com/p/DYtg6PGTwSH/" rel="nofollow noopener" target="_blank">@chicagomediatakeout via Instagram</a></figcaption></figure>
<p>Those are three different theories of what a Latin music event in Chicago is for: a neighborhood institution, a civic ceremony, and a destination festival. Sueños is the only one of the three that had an uncomplicated summer, and the reason is worth saying out loud — a lakefront festival selling tickets to a regional audience was not the kind of gathering people were frightened to attend this year.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYxTMwMFR8o/embed/" title="Instagram post DYxTMwMFR8o" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-25 — <a href="https://www.instagram.com/p/DYxTMwMFR8o/" rel="nofollow noopener" target="_blank">@santiago25_s via Instagram</a></figcaption></figure>
<p>A note for anyone researching next year: the festival’s own site currently displays <strong>May 29–30, 2027</strong>. That is next year. The 2026 edition was May 23–24, and the <a href="https://suenosmusicfestival.com/suenos-2026-recap/">official recap</a> covers it. Several listings aggregators have already gotten this wrong.</p>
<p>Five years in, the skyline still does most of the heavy lifting behind that stage. The difference is that the festival no longer needs it to.</p>
<p class="cn-cover-credit">Cover image: Via enjoyillinois.com</p>`,
  sources: [
    { name: 'Sueños 2026 recap', url: 'https://suenosmusicfestival.com/suenos-2026-recap/' },
    { name: 'Sueños festival information', url: 'https://suenosmusicfestival.com/information/' },
    { name: 'Fiesta del Sol', url: 'https://fiestadelsol.org/festival' },
  ],
  photos: [
    { slot: 'cover', subject: 'Stage with skyline behind, Grant Park', source: 'Sueños official recap page', license: 'ASK', contact: 'suenosmusicfestival.com contact form', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'J Balvin or Kali Uchis performing', source: '@suenosfestival', license: 'ASK', contact: 'Instagram @suenosfestival', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Grant Park lakefront establishing shot', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
    { slot: 'body-3', subject: 'Crowd wide shot', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
  ],
},

{
  ref: 'D4',
  title: 'Summer Smash, Fifty Thousand People, and a Riot That Did Not Happen',
  category: 'review',
  author_name: 'Jude',
  date: '2026-06-16',
  event_dates: 'June 12 – 14, 2026',
  venue: 'SeatGeek Stadium, Bridgeview',
  neighborhood: 'Bridgeview',
  featured: false,
  cover_image: "https://cdn.prod.website-files.com/6792c67eb41b3c4a87e5e8d5/69c3ff28ad21221c20ef850b_SS26_Hero-1440x810.jpg",
  cover_credit: "Via thesummersmash.com",
  cover_alt: "Summer Smash, Fifty Thousand People, and a Riot That Did Not Happen",
  excerpt: 'Fifty thousand people, a site rebuilt in 48 hours after tornadoes, strong sets from Lil Uzi Vert and Chief Keef — and a viral panic about chaos that police flatly contradicted.',
  body: `<p>Fifty thousand hip-hop fans got through three days at SeatGeek Stadium in Bridgeview, June 12 through 14, and the most-repeated claim about the weekend was wrong.</p>
<p>After a brief weather delay, a story spread that fans had caused chaos at the festival. Police then said, in as many words, that there was no riot. Both versions are still circulating. One of them travelled considerably further, and the gap between them is the most useful thing about Summer Smash 2026 — a festival of young Black audiences gets a panic headline, the official record contradicts it, and the correction reaches a fraction of the same people.</p>
<p>What actually strained the weekend was logistics, and attendees said so consistently. Parking was the complaint above all others, then long entry lines, will-call wristband confusion, water station problems on Friday, and thin pre-festival communication. Those are real failures and none of them are a riot.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZglgedHHpc/embed/" title="Instagram post DZglgedHHpc" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-13 — <a href="https://www.instagram.com/p/DZglgedHHpc/" rel="nofollow noopener" target="_blank">@tisakorean via Instagram</a></figcaption></figure>
<h3>The Site Should Not Have Opened At All</h3>
<p>Worth knowing: Bridgeview was among the areas hardest hit by tornadoes and severe thunderstorms that week. Organizers, construction crews and the Village of Bridgeview put in more than 48 hours of work to make the ground usable. A festival that opened at all was a near thing, which puts the water-station gripes in proportion without excusing them.</p>
<h3>The Music Was Not the Problem</h3>
<p>Three stages, 50-plus performances. <strong>Lil Uzi Vert</strong>, <strong>Playboi Carti</strong> and <strong>Baby Keem</strong> headlined, with <strong>Chief Keef</strong>, <strong>Skrillex</strong>, <strong>Rico Nasty</strong>, <strong>Ski Mask the Slump God</strong>, <strong>2 Chainz</strong> and <strong>Oliver Tree</strong> underneath, and <strong>North West</strong> making her Chicagoland festival debut. Day one was the strongest of the three — Lil Uzi Vert, Chief Keef, Sexyy Red and G Herbo, in that order, on a bill that did not need the rest of the weekend to justify itself. The <a href="https://thesummersmash.com/">festival’s own programme</a> carries the full card.</p>
<p>Chief Keef on a Chicagoland stage still carries weight the booking sheet does not convey. Drill came out of the South Side and was handled by this city’s institutions as a public-safety matter for most of a decade: venues cancelled shows, permits evaporated, and the genre’s biggest figure spent years unable to perform near home. That history is exactly why a rumour about chaos at a rap festival lands the way it does.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZnYKqRCY2f/embed/" title="Instagram post DZnYKqRCY2f" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-15 — <a href="https://www.instagram.com/p/DZnYKqRCY2f/" rel="nofollow noopener" target="_blank">@phoenix.torunn via Instagram</a></figcaption></figure>
<h3>Bridgeview Is Not Chicago</h3>
<p>Which returns to the venue. Summer Smash used to happen in Douglass Park. It now runs in a <a href="https://www.seatgeekstadium.com/events-ticket/lyrical-lemonade-summer-smash-2026/">soccer stadium</a> twelve miles southwest of the Loop, reachable by car and essentially not otherwise. A stadium lot solves a promoter’s problems — infrastructure, parking, no residents filing noise complaints — and creates one it does not have to answer for: a teenager on the South Side cannot get there on the CTA.</p>
<p>The irony is that this is precisely what Douglass Park residents spent September asking <a href="https://riotfest.org/">Riot Fest</a> to do. Summer Smash already left. Nobody with the power to reverse it is arguing about whether that was a loss.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZjATuQCcVU/embed/" title="Instagram post DZjATuQCcVU" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-14 — <a href="https://www.instagram.com/p/DZjATuQCcVU/" rel="nofollow noopener" target="_blank">@adriizzyyyy via Instagram</a></figcaption></figure>
<p>Two published errors are also still in circulation and worth correcting: several listings place this festival at Douglass Park, which was 2022, and others date it to August. It was June 12 to 14 in Bridgeview.</p>
<p>Fifty thousand people, a site rebuilt in two days, a strong Friday, and a riot that did not happen.</p>
<p class="cn-cover-credit">Cover image: Via thesummersmash.com</p>`,
  sources: [
    { name: 'The Summer Smash', url: 'https://thesummersmash.com/' },
    { name: 'SeatGeek Stadium', url: 'https://www.seatgeekstadium.com/events-ticket/lyrical-lemonade-summer-smash-2026/' },
    { name: 'Riot Fest', url: 'https://riotfest.org/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Main stage or crowd wide', source: 'Lyrical Lemonade in-house team', license: 'ASK', contact: 'Lyrical Lemonade press — likeliest yes in the dossier', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'Chief Keef performing', source: 'Lyrical Lemonade', license: 'ASK', contact: 'Lyrical Lemonade press', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Entry lines / logistics', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
    { slot: 'body-3', subject: 'SeatGeek Stadium exterior, Bridgeview', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — stadium category', credit: 'Per file licence' },
  ],
},

{
  ref: 'D5',
  title: 'ARC Went to Four Days and Union Park Showed the Seams',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-09',
  event_dates: 'September 4 – 7, 2026',
  venue: 'Union Park',
  neighborhood: 'West Town',
  featured: true,
  cover_image: "https://arcmusicfestival.com/wp-content/uploads/2024/03/ARClogo2024_BLK.svg",
  cover_credit: "Via arcmusicfestival.com",
  cover_alt: "ARC Went to Four Days and Union Park Showed the Seams",
  excerpt: 'Honey Dijon and Derrick Carter billed alongside Anyma and Underworld, on a fourth day and a fourth stage — in a 13-acre park where the main stage drowned out the new one.',
  body: `<p>ARC Music Festival ran four days for the first time this year, September 4 through 7, more than 100 artists across four stages in Union Park. The fourth stage, <strong>The Midway</strong>, joined Grid, Area 909 and Expansions. <strong>Anyma</strong>, <strong>Underworld</strong> and <strong>Michael Bibi</strong> headlined, with <strong>Sara Landry</strong> presenting her ETERNALISM concept and <strong>Mau P</strong>, <strong>Mochakk</strong> and <strong>Chase &amp; Status</strong> filling the card.</p>
<p>The names that matter most are <strong>Honey Dijon</strong> and <strong>Derrick Carter</strong>. Chicago invented house music and has spent forty years being thanked for it in the third paragraph, usually with an afternoon heritage slot and a crowd that shows up later for the touring headliner. Billing Dijon and Carter against Anyma is a statement about where authority in this music actually sits.</p>
<p>Whether that reads as a handoff or an uneasy coexistence depends on what Anyma’s audience came for. An Anyma set is a visual production with music attached. A Derrick Carter set is a man and a room. Putting them under one banner is either the most interesting thing <a href="https://arcmusicfestival.com/">ARC</a> does or the contradiction at its center, and the festival seems comfortable either way.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Dc86L1DEbZ5/embed/" title="Instagram post Dc86L1DEbZ5" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-06 — <a href="https://www.instagram.com/p/Dc86L1DEbZ5/" rel="nofollow noopener" target="_blank">@camouflybeats via Instagram</a></figcaption></figure>
<h3>The Park Is 13 Acres</h3>
<p>The expansion is where 2026 got instructive. Everyone who liked the music agreed about what broke. Sound bleed was the defining failure: artists on the new Midway stage were drowned out by the Grid. Doors opened almost an hour late on Friday. Premium-pass lines ran down the block. Night one hit record-high temperatures.</p>
<p>Union Park is roughly 13 acres. Four stages of amplified dance music do not fit inside 13 acres without one of them losing, and the one that lost was the new one — which is to say the reason for the expansion. Strong crowd, real communal release, lessons learned. That last phrase is doing a lot of work.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Dc6d36wu88I/embed/" title="Instagram post Dc6d36wu88I" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-05 — <a href="https://www.instagram.com/p/Dc6d36wu88I/" rel="nofollow noopener" target="_blank">@saralandrydj via Instagram</a></figcaption></figure>
<h3>The Union Park Inheritance</h3>
<p>The other fact worth sitting with is the lot itself. Union Park is where <strong>Pitchfork Music Festival</strong> ran for 19 years before its parent company shut it down. That ground is now a ticketed electronic festival charging up to $549 on Labor Day weekend.</p>
<p>That is not an indictment of ARC, which did not kill Pitchfork and has built something with a genuine local argument behind it. It is a change in what the West Side’s festival park is for, and it arrives in the same summer that Douglass Park residents started saying out loud that Chicago has outgrown lending public parks to private festivals. ARC is the best possible version of the thing those residents are objecting to, which makes it the hardest case rather than an exception.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Dc5HN4Pvnn6/embed/" title="Instagram post Dc5HN4Pvnn6" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-05 — <a href="https://www.instagram.com/p/Dc5HN4Pvnn6/" rel="nofollow noopener" target="_blank">@plurtatochip via Instagram</a></figcaption></figure>
<p>It also ran head-to-head with <a href="https://northcoastfestival.com/">North Coast</a> out in Bridgeview on the identical holiday weekend, which is a lot of dance music for one metro to absorb at once. Union Park’s own festival history is catalogued on <a href="https://commons.wikimedia.org/wiki/Category:Union_Park_(Chicago)">Commons</a>.</p>
<p>Four days is a long ask. The case for it is that Chicago house waited since the mid-eighties for a festival treating it as the headline rather than the credential. The case against is that the fourth stage could not be heard over the first.</p>
<p class="cn-cover-credit">Cover image: Via arcmusicfestival.com</p>`,
  sources: [
    { name: 'ARC Music Festival', url: 'https://arcmusicfestival.com/' },
    { name: 'North Coast Music Festival', url: 'https://northcoastfestival.com/' },
    { name: 'Wikimedia Commons — Union Park', url: 'https://commons.wikimedia.org/wiki/Category:Union_Park_(Chicago)' },
  ],
  photos: [
    { slot: 'cover', subject: 'Grid stage crowd wide, Union Park', source: 'ARC press operation', license: 'ASK', contact: 'Request via arcmusicfestival.com', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'Honey Dijon or Derrick Carter performing', source: 'ARC press', license: 'ASK', contact: 'ARC press', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'The Midway stage (the one that got drowned out)', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
    { slot: 'body-3', subject: 'Union Park establishing shot showing scale', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
  ],
},

{
  ref: 'D6',
  title: 'North Coast and the Labor Day Turf War in Bridgeview',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-08',
  event_dates: 'September 4 – 6, 2026',
  venue: 'SeatGeek Stadium, Bridgeview',
  neighborhood: 'Bridgeview',
  featured: false,
  cover_image: "https://northcoastfestival.com/wp-content/themes/north-coast-music-festival/img/fb.jpg",
  cover_credit: "Via northcoastfestival.com",
  cover_alt: "North Coast and the Labor Day Turf War in Bridgeview",
  excerpt: 'Fisher, Illenium and Porter Robinson topped 75-plus artists on six stages over Labor Day weekend — the same weekend ARC ran four days in Union Park, twelve miles away.',
  body: `<p>North Coast Music Festival took Labor Day weekend at SeatGeek Stadium with more than 75 artists across six stages, September 4 through 6. <strong>Fisher</strong>, <strong>Illenium</strong>, <strong>Porter Robinson</strong>, <strong>Griz</strong>, <strong>Slander</strong> and <strong>Tchami</strong> held the top of the card.</p>
<p>The scheduling comes first. <a href="https://arcmusicfestival.com/">ARC</a> ran the identical holiday weekend in Union Park, four days to North Coast’s three, with a partly overlapping audience and an entirely different pitch. Chicago now stages two large electronic festivals simultaneously on the last weekend of summer and asks dance fans to choose.</p>
<h3>Two Theories of the Same Weekend</h3>
<p>The split is not arbitrary. ARC sells a city festival with Chicago house as its spine, in a park on the Green and Pink lines. North Coast sells a stadium festival in a suburb, built on big-room and bass programming, reached by car. One is arguing about lineage. The other is not arguing at all and does not need to.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Dc9HxrIAapp/embed/" title="Instagram post Dc9HxrIAapp" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-06 — <a href="https://www.instagram.com/p/Dc9HxrIAapp/" rel="nofollow noopener" target="_blank">@troyboi via Instagram</a></figcaption></figure>
<p>Neither is wrong. But notice which is which: the festival positioned as the heritage argument sits inside the city limits, and the festival positioned purely as a good weekend sits twelve miles out. Chicago’s dance music keeps sorting itself along that line, and this year ARC paid for its city location with a 13-acre park it had outgrown while North Coast had all the room it wanted and nothing in particular to say with it.</p>
<h3>Porter Robinson Is the Case for the Form</h3>
<p>Of everyone on the bill, Robinson is the one worth building an argument around. He composes. His records are structured, sung and emotionally specific in a genre that mostly trades in intensity, and his live show remains the strongest available rebuttal to the idea that electronic music is a DJ pressing play on somebody else’s feelings.</p>

<figure class="cn-embed" data-platform="facebook"><iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1410113411266209%2F&amp;show_text=false" title="Facebook video" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:620px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-06 — <a href="https://www.facebook.com/reel/1410113411266209/" rel="nofollow noopener" target="_blank">unknown via Facebook</a></figcaption></figure>
<p><strong>Fisher</strong> is the opposite proposition and honest about it — a set engineered to move a field, with no interest in being mistaken for composition. Booking both at the top of one card is a festival declining to take a position, which is a defensible way to program a stadium and a poor way to build an identity.</p>
<p>What a suburban stadium does well is capacity and curfew. What it does badly is everything that makes a festival feel like it belongs somewhere. Six stages in a parking lot could be in any metro in the country, and on Labor Day weekend the version of this music that could only have happened in Chicago was happening in Union Park instead — badly mixed, overcrowded, and unmistakably local.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/Dc-VJNXjsZk/embed/" title="Instagram post Dc-VJNXjsZk" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-09-07 — <a href="https://www.instagram.com/p/Dc-VJNXjsZk/" rel="nofollow noopener" target="_blank">@northcoastfest via Instagram</a></figcaption></figure>
<p>The <a href="https://northcoastfestival.com/music/lineup/">official lineup</a> and the <a href="https://www.seatgeekstadium.com/events-ticket/north-coast-music-festival-2026/">venue listing</a> carry the full stage breakdown.</p>
<p>Summer ends in Chicago on Labor Day whether the calendar agrees or not. This year it ended twice, in two municipalities, for two crowds who mostly did not meet.</p>
<p class="cn-cover-credit">Cover image: Via northcoastfestival.com</p>`,
  sources: [
    { name: 'North Coast Music Festival lineup', url: 'https://northcoastfestival.com/music/lineup/' },
    { name: 'SeatGeek Stadium', url: 'https://www.seatgeekstadium.com/events-ticket/north-coast-music-festival-2026/' },
    { name: 'ARC Music Festival', url: 'https://arcmusicfestival.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Main stage wide, SeatGeek Stadium', source: 'North Coast press contact', license: 'ASK', contact: 'Via northcoastfestival.com', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'Porter Robinson live production', source: '@northcoastfest', license: 'ASK', contact: 'Instagram @northcoastfest', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Six-stage grounds layout', source: 'North Coast press', license: 'ASK', contact: 'Festival press', credit: 'Per organiser terms' },
    { slot: 'body-3', subject: 'Crowd wide shot', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
  ],
},

{
  ref: 'D7',
  title: 'Beyond Wonderland Rented the Best View in Chicago',
  category: 'review',
  author_name: 'Jude',
  date: '2026-06-09',
  event_dates: 'June 6 – 7, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Near South Side',
  featured: false,
  cover_image: "https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/sites/148/2026/06/12131736/bwmw-seao-1200x630-1.jpg",
  cover_credit: "Via chicago.beyondwonderland.com",
  cover_alt: "Beyond Wonderland Rented the Best View in Chicago",
  excerpt: 'Insomniac brought its Alice-in-Wonderland franchise back to Northerly Island in June — a peninsula unlike anywhere else in American live music, used as a backdrop.',
  body: `<p>Insomniac’s Beyond Wonderland returned to the Huntington Bank Pavilion at Northerly Island on June 6 and 7, bringing its Alice-in-Wonderland staging to the peninsula with arguably the best view of the Chicago skyline available from any music venue in the city.</p>
<p>That combination is the whole subject. Northerly Island is a genuinely strange and specific place. <a href="https://chicago.beyondwonderland.com/">Beyond Wonderland</a> is a national franchise that runs in several markets with the same visual language in each.</p>
<h3>A Template on a Peninsula</h3>
<p>Insomniac is very good at what it does, and what it does is build an environment that photographs identically in Chicago, Washington and Southern California. Production values are high, the theming is committed, and an attendee blindfolded on the way in would struggle to name the city from inside the gates.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZQ37rmDzMv/embed/" title="Instagram post DZQ37rmDzMv" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-07 — <a href="https://www.instagram.com/p/DZQ37rmDzMv/" rel="nofollow noopener" target="_blank">@beyondwlandmidwest via Instagram</a></figcaption></figure>
<p>Northerly Island is a landfill peninsula that was Meigs Field until the runway was bulldozed in the middle of the night in 2003. It is now part nature preserve and part concert venue, jutting into Lake Michigan with downtown stacked behind it. There is nowhere else like it in American live music, and when the sun goes down the skyline does something no production designer can buy.</p>
<p>Whether a festival built on an English children’s book from 1865 knows what to do with that is a fair question. The honest answer is that the sightline gets treated as a backdrop rather than a subject, which is what franchises do.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZU-BuCgM_P/embed/" title="Instagram post DZU-BuCgM_P" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-08 — <a href="https://www.instagram.com/p/DZU-BuCgM_P/" rel="nofollow noopener" target="_blank">@jammies.scrapbook via Instagram</a></figcaption></figure>
<h3>The Preserve and the Rave</h3>
<p>The other thing about Northerly Island is its double life. Large parts were restored as prairie and wetland and are managed as natural area by the <a href="https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park">Park District</a>. The rest is a commercial amphitheater. Migratory birds and a bass-heavy two-day dance festival share an address, and nobody has fully defended that arrangement in public.</p>
<p>This is not an argument for cancelling anything. It is an observation that Chicago has a habit of finding its most unusual ground and renting it for events that would work equally well in a parking lot — the same instinct that put Summer Smash in a Bridgeview stadium and Windy City Smokeout in the United Center lot, running in reverse. Douglass Park residents spent this summer asking for exactly that swap. Northerly Island shows what the trade costs when nobody asks.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DZT2G7AFoMt/embed/" title="Instagram post DZT2G7AFoMt" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-06-08 — <a href="https://www.instagram.com/p/DZT2G7AFoMt/" rel="nofollow noopener" target="_blank">@kik0bangz via Instagram</a></figcaption></figure>
<p>Insomniac deserves credit on one practical count: the company maintains extensive official galleries and is unusually generous with press access, which makes this one of the few events of the Chicago summer an independent outlet can actually illustrate. Commons also holds solid <a href="https://commons.wikimedia.org/wiki/Category:Northerly_Island">Northerly Island venue photography</a>.</p>
<p>Two nights on a peninsula, and a view that was there before the festival and will be there after it.</p>
<p class="cn-cover-credit">Cover image: Via chicago.beyondwonderland.com</p>`,
  sources: [
    { name: 'Beyond Wonderland Chicago', url: 'https://chicago.beyondwonderland.com/' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Wikimedia Commons — Northerly Island', url: 'https://commons.wikimedia.org/wiki/Category:Northerly_Island' },
  ],
  photos: [
    { slot: 'cover', subject: 'Stage with skyline behind, Northerly Island', source: 'Insomniac official galleries', license: 'CLEAR-ish', contact: 'Insomniac press — generous with assets per dossier', credit: 'Per Insomniac press terms' },
    { slot: 'body-1', subject: 'Wonderland theming / production detail', source: 'Insomniac official galleries', license: 'CLEAR-ish', contact: 'Insomniac press', credit: 'Per Insomniac press terms' },
    { slot: 'body-2', subject: 'Northerly Island peninsula aerial', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Category:Northerly_Island', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Prairie restoration area', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons', credit: 'Per file licence' },
  ],
},

{
  ref: 'D8',
  title: 'Warm Love Cool Dreams Is What Chicago Built After Pitchfork',
  category: 'review',
  author_name: 'Jude',
  date: '2026-05-26',
  event_dates: 'May 23 – 24, 2026',
  venue: 'The Salt Shed',
  neighborhood: 'Goose Island',
  featured: true,
  cover_image: "https://thirdcoastspace.nyc3.digitaloceanspaces.com/wp-content/uploads/2026/02/warm-love-cool-dreams.jpg",
  cover_credit: "Via thirdcoastreview.com",
  cover_alt: "Warm Love Cool Dreams Is What Chicago Built After Pitchfork",
  excerpt: 'An Empty Bottle production filled every pocket of the Goose Island compound with Courtney Barnett, The Jesus and Mary Chain, Tortoise and Whitney — plus a market, a studio sale and boat rides.',
  body: `<p>Two years after its parent company shut down Pitchfork Music Festival following 19 years in Union Park, the second edition of Warm Love Cool Dreams took over the entire Salt Shed compound on May 23 and 24. <strong>Courtney Barnett</strong> and <strong>The Jesus and Mary Chain</strong> headlined, with Chicago’s <strong>Tortoise</strong> and <strong>Whitney</strong> on the bill.</p>
<p>The detail that explains the festival is the promoter: this is an <strong>Empty Bottle Presents</strong> production, the same programmer behind <a href="https://www.westtownchamber.org/west-fest-chicago">West Fest</a> in July. One Ukrainian Village rock club is effectively curating two of the more interesting music events in the city, which is a concentration of taste that no magazine-owned festival ever had here.</p>
<h3>What Replaced Pitchfork Is Smaller and Local</h3>
<p>The comparison was not the organisers’ idea. What filled the Goose Island compound was a set of artisans and attractions that called Pitchfork’s former hallmarks to mind, and the best description anyone landed on all weekend was that it resembled the coolest farmers’ market in the city with serious live music attached.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYs7DOxFLZq/embed/" title="Instagram post DYs7DOxFLZq" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-24 — <a href="https://www.instagram.com/p/DYs7DOxFLZq/" rel="nofollow noopener" target="_blank">@kevin_dillon1234 via Instagram</a></figcaption></figure>
<p>That is accurate and it is the point. Indoors, the outdoor Fairgrounds, the Three Top Lounge and the Elston Electric arcade were all in use, alongside the <strong>Oddball Market</strong>, the <strong>Arts of Life Studio Sale</strong> — a studio supporting artists with disabilities — tattoo artists, local vendors and river boat rides around Goose Island.</p>
<p>Pitchfork’s Chicago residency was always contingent on a decision made in New York, and when that decision changed the festival evaporated. A festival built into a venue it does not have to vacate is much harder to take away, and it grows by opening rooms it already owns rather than by leasing more park. In a summer when three Chicago festivals expanded and all three strained, that is not a small structural advantage.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYsLyYciVMq/embed/" title="Instagram post DYsLyYciVMq" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-23 — <a href="https://www.instagram.com/p/DYsLyYciVMq/" rel="nofollow noopener" target="_blank">@quietdownmag via Instagram</a></figcaption></figure>
<h3>Tortoise and Whitney, Two Eras on One Bill</h3>
<p>The local booking was the most interesting thing on the card. <strong>Tortoise</strong> are foundational Chicago post-rock, a band whose nineties records argued that this city’s guitar music could be rigorous and instrumental and still fill rooms. <strong>Whitney</strong> arrived two decades later out of the same neighborhoods with a softer, more melodic version of the same independence.</p>
<p>Putting them on one bill is a claim about continuity — that Chicago indie is a lineage rather than a series of unconnected scenes. Pitchfork used to make that claim from outside, in prose. This festival makes it by booking.</p>

<figure class="cn-embed" data-platform="instagram"><iframe src="https://www.instagram.com/p/DYxlM2wGMmo/embed/" title="Instagram post DYxlM2wGMmo" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:820px;border:none;display:block;margin:0 auto"></iframe><figcaption>Posted 2026-05-25 — <a href="https://www.instagram.com/p/DYxlM2wGMmo/" rel="nofollow noopener" target="_blank">@exhaustedwriter via Instagram</a></figcaption></figure>
<p>The venue is the other half. The Salt Shed is the old <a href="https://commons.wikimedia.org/wiki/Category:Morton_Salt">Morton Salt</a> plant on Elston, converted into an indoor hall, an outdoor yard, a bar and an arcade on one site, and it has become the most useful piece of music real estate in Chicago precisely because it is several venues at once. Tickets and the full running order went out through <a href="https://do312.com/events/2026/5/23/warm-love-cool-dreams-tickets">Do312</a>.</p>
<p>Chicago lost a festival it did not control and built one it does. That trade looks better every year.</p>
<p class="cn-cover-credit">Cover image: Via thirdcoastreview.com</p>`,
  sources: [
    { name: 'West Town Chamber of Commerce', url: 'https://www.westtownchamber.org/west-fest-chicago' },
    { name: 'Do312', url: 'https://do312.com/events/2026/5/23/warm-love-cool-dreams-tickets' },
    { name: 'Wikimedia Commons — Morton Salt', url: 'https://commons.wikimedia.org/wiki/Category:Morton_Salt' },
  ],
  photos: [
    { slot: 'cover', subject: 'Fairgrounds stage, Salt Shed', source: 'Salt Shed house photo team', license: 'ASK', contact: 'Salt Shed press contact', credit: 'Per venue terms' },
    { slot: 'body-1', subject: 'Tortoise or Whitney performing', source: 'Salt Shed house team', license: 'ASK', contact: 'Venue press', credit: 'Per venue terms' },
    { slot: 'body-2', subject: 'Oddball Market or Arts of Life Studio Sale', source: 'Arts of Life', license: 'ASK', contact: 'Arts of Life communications', credit: 'Courtesy Arts of Life' },
    { slot: 'body-3', subject: 'Morton Salt building exterior, Elston Ave', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Morton Salt', credit: 'Per file licence' },
  ],
},

{
  ref: 'D9',
  title: 'Michelada Fest Came Back, and Gave Friday Away',
  category: 'review',
  author_name: 'Jude',
  date: '2026-06-30',
  event_dates: 'June 26 – 28, 2026',
  venue: 'Union Park',
  neighborhood: 'West Town',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Chicago_Union_Park.jpg",
  cover_credit: "soundfromwayout / Wikimedia Commons (CC BY 2.0)",
  cover_alt: "Chicago Union Park",
  excerpt: 'Cancelled in 2025 over raid fears, the Latin music festival returned to Union Park in June on a model that ran from free on Friday to $373 at the top. The return is the news.',
  body: `<p>Michelada Fest ran June 26 through 28 in Union Park, which is the entire story before anyone gets to the lineup. The festival was <strong>cancelled in 2025</strong> over fears of immigration raids. It came back in 2026. In a summer when Little Village’s Cinco de Mayo parade was called off for a second consecutive year after four decades, and El Grito returned from its own cancellation to visibly thin crowds, a Latin music festival simply taking place is a result.</p>
<p>That context reframes the pricing, which is the other unusual thing here. <strong>Friday was free.</strong> The top tier reached $373.05. A 373-fold spread between the cheapest and most expensive way through the gate.</p>
<h3>Who Is a Free Friday For</h3>
<p>Tiered pricing is standard at this scale. Giving away a full day is not, and it is worth asking what it accomplishes.</p>
<p>The generous reading is access. A free Friday means a West Side family can walk into a festival on their own block without weighing music against a week of groceries, and that is a real good most Chicago festivals do not deliver. It matters more in a year when the barrier to attending a Latin community event was not only money.</p>
<p>The skeptical reading is acquisition. A free day fills the grounds, generates the footage that sells the weekend, and moves a great deal of beer. Attendance figures look better with Friday in them, and the people who came for nothing subsidise the appearance of scale without contributing to the gate. Both readings are probably true. What would settle it is how many Friday attendees returned on a paid day, and no festival publishes that.</p>
<h3>The Michelada as Organizing Principle</h3>
<p>There is a real idea in building a festival around a drink rather than a genre. A michelada is beer, lime, salt, hot sauce and whatever else the person making it believes in — regional, argued over, impossible to standardise. It is a fair emblem for a bill spanning several distinct Latin musical traditions without pretending they are one thing. It also ages well: a festival named after a drink can book whatever it likes for twenty years and never look dated.</p>
<p><a href="https://commons.wikimedia.org/wiki/Category:Union_Park_(Chicago)">Union Park</a> had a crowded 2026 — Michelada Fest in June, the African/Caribbean International Festival of Life in July, and <a href="https://arcmusicfestival.com/">ARC</a> across four days in September, in a 13-acre lot known nationally until recently for one indie festival. The West Side’s festival park now runs a schedule with no single identity, which is either healthy variety or a sign that whoever books it will take anyone.</p>
<p>The <a href="https://www.westtownchamber.org/west-fest-chicago">West Town Chamber</a> tracks the neighborhood’s other summer programming, which is considerably better documented than this festival’s own.</p>
<p>A festival that lets you in for nothing on Friday has told you something honest about the other two days. A festival that happened at all this year has told you something about the summer.</p>
<p class="cn-cover-credit">Cover image: soundfromwayout / Wikimedia Commons (CC BY 2.0)</p>`,
  sources: [
    { name: 'ARC Music Festival', url: 'https://arcmusicfestival.com/' },
    { name: 'West Town Chamber of Commerce', url: 'https://www.westtownchamber.org/west-fest-chicago' },
    { name: 'Wikimedia Commons — Union Park', url: 'https://commons.wikimedia.org/wiki/Category:Union_Park_(Chicago)' },
  ],
  photos: [
    { slot: 'cover', subject: 'Stage or crowd wide, Union Park', source: 'Organiser', license: 'ASK', contact: 'Michelada Fest organisers', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'Michelada service / vendor detail', source: 'Organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Free Friday crowd', source: 'Commission local', license: 'ASK', contact: 'Commission a local photographer', credit: 'Photo: [name]' },
    { slot: 'body-3', subject: 'Union Park establishing shot', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
  ],
},

]
