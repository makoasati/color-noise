// Dossier #21, #24, #25, #26, #27, #28, #29, #30, #31, #32 — street fests,
// SummerDance and the two remaining film/arts entries.

const E = require('./embeds')

module.exports = [

{
  ref: 'D21',
  title: 'Thirty Dance Styles on a Free Floor in Grant Park',
  category: 'news',
  author_name: 'Mora',
  date: '2026-09-01',
  event_dates: 'July 15 – August 29, 2026',
  venue: 'Spirit of Music Garden, Grant Park',
  neighborhood: 'The Loop',
  featured: true,
  cover_image: "https://cdn.choosechicago.com/uploads/2020/05/028_20130905_SUMMERDANCE-scaled.jpg",
  cover_credit: "Courtesy Choose Chicago",
  cover_alt: "Thirty Dance Styles on a Free Floor in Grant Park",
  excerpt: 'SummerDance ran more than thirty dance styles on an open-air floor with a live band and a free lesson before each one — the single most generous thing the City of Chicago does all year.',
  body: `<p>Chicago SummerDance ran from July 15 to August 29, with the historic Spirit of Music Garden at 601 South Michigan hosting Thursdays through Saturdays from August 13 to 29, six to nine in the evening. Earlier dates ran in neighbourhood parks including Riis and Harrison. More than <strong>thirty dance styles</strong> across the season. A live band each night, a free lesson before the dancing, and no admission of any kind.</p>
<p>If you have never been, the format is worth describing properly, because it is unusual to the point of being strange. You turn up at an open-air floor in a downtown park. Someone teaches you the dance for about an hour — actually teaches you, badly and patiently, in a crowd of people who are equally bad at it. Then a band plays and you do it. That is the entire thing, and it has been running for years.</p>
<h3>Thirty Styles Is a Portrait of Who Lives Here</h3>
<p>The number is the part that repays attention. More than thirty dance styles in one season is not programming variety for its own sake. It is a fairly precise census of who is actually in this city, because each style arrived with a community and stayed because that community is still here to dance it.</p>

${E.instagram('DbEVJMVFJQb', {
  caption: 'Posted 2026-07-21',
})}
<p>You cannot book a season like that out of a catalogue. It requires knowing which neighbourhoods will send people, which bands can carry a floor of beginners, and which traditions have enough living practitioners in Chicago to teach them. The programme is a municipal document about the city’s population, delivered as a series of Thursday evenings.</p>
<h3>The Regulars Are the Institution</h3>
<p>The other thing nobody covers is the people who have been on that floor for twenty years. Every SummerDance night has a core of dancers who know the steps, who arrive early, and who — and this is the part that matters — spend the lesson hour quietly helping strangers who have never done it.</p>

${E.instagram('DcMGdFWlqfD', {
  caption: 'Posted 2026-08-18',
})}
<p>That is a volunteer teaching corps the city never recruited and does not pay. It is also the mechanism that makes the whole thing work, because an open-air lesson for two hundred people cannot function on one instructor with a microphone. The regulars carry it.</p>
<p>Set that against the rest of this summer’s calendar. <a href="https://arcmusicfestival.com/">ARC</a> charged up to $549 for four days in a park. Lollapalooza put 170 artists behind a $329 wristband and left Grant Park in mud. SummerDance used a corner of the same parkland to teach people to dance, for free, and handed the floor back intact every night.</p>

${E.instagram('DbCVaRRtrMr', {
  caption: 'Posted 2026-07-21',
})}
<p>The <a href="https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_summerdance.html">city’s page</a> carries the format, the <a href="https://www.chicagoparkdistrict.com/events/chicago-summerdance-parks-riis-0">Park District</a> lists the neighbourhood dates, and <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-summerdance/">Choose Chicago</a> has the best imagery of it.</p>
<p>Grant Park gets rented to promoters for most of the summer and torn up for the trouble. For six weeks it also had a wooden floor on it where anybody could turn up at six and be taught something by a stranger. Chicago does not shout about that one, which is a shame, because it is the best thing on the list.</p>
<p class="cn-cover-credit">Cover image: Courtesy Choose Chicago</p>`,
  sources: [
    { name: 'City of Chicago / DCASE', url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_summerdance.html' },
    { name: 'Chicago Park District', url: 'https://www.chicagoparkdistrict.com/events/chicago-summerdance-parks-riis-0' },
    { name: 'Choose Chicago', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-summerdance/' },
    { name: 'ARC Music Festival', url: 'https://arcmusicfestival.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Couples dancing on the open-air floor at dusk', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'Good SummerDance imagery per dossier', credit: '[Photographer]/[Collection]/Choose Chicago' },
    { slot: 'body-1', subject: 'The lesson hour — beginners being taught', source: 'DCASE', license: 'ASK', contact: 'DCASE — get the photographer’s name', credit: '[Photographer]/City of Chicago' },
    { slot: 'body-2', subject: 'Live band on the Spirit of Music Garden stage', source: 'DCASE', license: 'ASK', contact: 'DCASE', credit: '[Photographer]/City of Chicago' },
    { slot: 'body-3', subject: 'A neighbourhood-park SummerDance night', source: 'Chicago Park District', license: 'ASK', contact: 'Park District communications', credit: 'Courtesy Chicago Park District' },
  ],
},

{
  ref: 'D24',
  title: 'Films on the Lawn Under Gehry Steel, Free, All Summer',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-08-20',
  event_dates: 'June 30 – August 18, 2026',
  venue: 'Jay Pritzker Pavilion, Millennium Park',
  neighborhood: 'The Loop',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jay_Pritzker_Pavilion%2C_Chicago%2C_Illinois%2C_Estados_Unidos%2C_2012-10-20%2C_DD_08.jpg/1920px-Jay_Pritzker_Pavilion%2C_Chicago%2C_Illinois%2C_Estados_Unidos%2C_2012-10-20%2C_DD_08.jpg",
  cover_credit: "Diego Delso / Wikimedia Commons (CC BY-SA 3.0)",
  cover_alt: "Jay Pritzker Pavilion, Chicago, Illinois, Estados Unidos, 2012 10 20, DD 08",
  excerpt: 'Tuesday evening screenings at the Pritzker Pavilion through the summer, free, and a second free series at the Cultural Center — the programming choices being a reading of civic taste.',
  body: `<p>The Millennium Park Summer Film Series ran Tuesdays at 6:30pm from June 30 to August 18, free, on the Jay Pritzker Pavilion’s screen. Running alongside it, and largely unnoticed, were the <strong>Cinema/Chicago Summer Screenings</strong> from June 3 to August 22 at the Chicago Cultural Center and the Chicago History Museum — free international cinema, indoors, curated.</p>
<p>Two free municipal film programmes in one summer, with entirely different theories of what film is for.</p>
<h3>A Lawn Is Not a Cinema, and That Is the Point</h3>
<p>One must be honest about the conditions. Watching a film outdoors on a lawn under a Frank Gehry trellis, in a downtown park, in August, is not an optimal viewing experience by any technical measure. The light does not fully go. The sound competes with Michigan Avenue. People arrive late, talk, and leave before the third act.</p>

${E.instagram('DbowGUPJPog', {
  caption: 'Posted 2026-08-04',
})}
<p>What it is instead is a public occasion organised around a film. That is an older and more sociable use of cinema than the reverent dark room, and it selects for a different sort of programming — work that survives interruption, that an audience can enter twenty minutes late and still follow.</p>
<p>The consequence is that a series like this cannot show difficult cinema, and one should not pretend to be disappointed about it. A lawn programme is a popular programme by physics, not by cowardice.</p>

${E.instagram('DaOUMC9t7lI', {
  caption: 'Posted 2026-06-30',
})}
<h3>Which Makes the Cultural Center Series the Serious One</h3>
<p>Which is why the Cinema/Chicago screenings deserve the attention the lawn series receives. Free international cinema, in an actual room, at the Cultural Center and the History Museum, across twelve weeks. Controlled light, controlled sound, and a programme that can therefore afford to be demanding.</p>
<p>One cannot survey the two side by side without concluding that Chicago runs a genuinely rigorous free film programme and a genuinely popular one, and that the city’s own publicity treats the second as the cultural event and the first as a listing. <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the published calendars</a> is where most readers will have found either of them.</p>

${E.instagram('DbGOz98It6a', {
  caption: 'Posted 2026-07-22',
})}
<p>The pattern recurs across this entire summer. The <a href="https://www.chicago.gov/city/en/depts/dca/supp_info/house_music0.html">house music festival</a> put its conference at the Cultural Center and its crowds in Millennium Park. The <a href="https://www.grantparkmusicfestival.com/2026-concerts/">Grant Park Music Festival</a> plays to a lawn and programmes like a concert hall. The Cultural Center is where Chicago puts the thinking and the park is where it puts the people, and the building on Washington Street has been quietly doing the more interesting work for years.</p>
<p>If the lawn defeats you, as it will by the second reel, walk four blocks west to the Cultural Center and look at the Tiffany dome instead. Stand under it until you have worked out how the glass is held. It is free, it is indoors, and it is the better film.</p>
<p class="cn-cover-credit">Cover image: Diego Delso / Wikimedia Commons (CC BY-SA 3.0)</p>`,
  sources: [
    { name: 'City of Chicago / DCASE', url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/house_music0.html' },
    { name: 'Grant Park Music Festival', url: 'https://www.grantparkmusicfestival.com/2026-concerts/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Screen at the Pritzker Pavilion, audience on the lawn at dusk', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
    { slot: 'body-1', subject: 'Gehry trellis against the sky', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Category:Millennium_Park,_Chicago', credit: 'Per file licence' },
    { slot: 'body-2', subject: 'Chicago Cultural Center screening room or Tiffany dome', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Chicago Cultural Center', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Audience detail, blankets and picnics', source: 'DCASE', license: 'ASK', contact: 'DCASE — get the photographer’s name', credit: '[Photographer]/City of Chicago' },
  ],
},

{
  ref: 'D25',
  title: 'Do Division Opened the Street-Fest Season on Algren’s Block',
  category: 'news',
  author_name: 'Mora',
  date: '2026-06-02',
  event_dates: 'May 29 – 31, 2026',
  venue: 'Division St between Damen and Leavitt',
  neighborhood: 'West Town',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Street_Scene_near_Division_Street_Metro_-_Chicago_-_Illinois_-_USA_%2832847246842%29.jpg/1920px-Street_Scene_near_Division_Street_Metro_-_Chicago_-_Illinois_-_USA_%2832847246842%29.jpg",
  cover_credit: "Adam Jones from Kelowna, BC, Canada / Wikimedia Commons (CC BY-SA 2.0)",
  cover_alt: "Street Scene near Division Street Metro   Chicago   Illinois   USA (32847246842)",
  excerpt: 'Two music stages and a $10 suggested donation on the stretch Nelson Algren called Polish Broadway — the traditional opener of Chicago’s street-festival season, and a civic mood ring.',
  body: `<p>Do Division closed Division Street between Damen and Leavitt from May 29 to 31, two live music stages, $10 suggested at the gate. It is the traditional opener of the Chicago street-fest season, which makes it the first real read each year on what the summer is going to feel like.</p>
<p>This year it opened a season that turned out to be about rain, about parks, and about which communities felt able to gather at all. None of that was visible yet on the last weekend of May.</p>
<h3>Polish Broadway, and What Happened to It</h3>
<p>The street has a literary history that most people walking it have no idea about. Nelson Algren wrote this part of Chicago — <a href="https://commons.wikimedia.org/wiki/Category:Division_Street_(Chicago)">Division Street</a> and the blocks around it were the Polish working-class Chicago of his novels, and the strip was known as Polish Broadway for the density of bars, halls and shops serving that community.</p>

${E.instagram('DY_k4w5AHSs', {
  caption: 'Posted 2026-05-31',
})}
<p>What sits there now is a $10-donation indie music festival. The distance between those two things is not a scandal, it is just Chicago, and the honest version of the story includes both the loss and the fact that the current version is genuinely good. Two stages of real bookings on a closed residential street is not nothing.</p>
<p>The same strip hosts the <a href="https://www.renegadecraft.com/city/chicago/">Renegade Craft market</a> twice a year a few blocks east, between Damen and Ashland. Division Street in 2026 does music in May and handmade goods in May and September, and does almost nothing that Algren would recognise.</p>

${E.instagram('DZAkJ2xkaQr', {
  caption: 'Posted 2026-05-31',
})}
<h3>The Donation Model, Which Runs Everything</h3>
<p>The $10 suggested donation is worth explaining once, since it governs most of the street festivals in this package. You are asked, not required, to pay at the gate. Most people pay. The money funds a chamber of commerce that has to cover barricades, permits, insurance, security and cleanup.</p>

${E.instagram('DY74NkptoKJ', {
  caption: 'Posted 2026-05-29',
})}
<p>It is how the <a href="https://www.westtownchamber.org/">West Town Chamber</a> and its counterparts keep street fests functionally free while still paying for them, and it depends entirely on voluntary compliance. It is also why these events are run by business associations rather than by the city — the chamber takes the risk and keeps the upside, which is why the vendor mix always reflects the strip rather than the neighbourhood.</p>
<p>Division Street reopened on the Monday and the season was underway. Four months later the conversation would be about mud, restoration logs and which parades did not happen, but on that first weekend it was two stages and a tenner and the weather holding.</p>
<p class="cn-cover-credit">Cover image: Adam Jones from Kelowna, BC, Canada / Wikimedia Commons (CC BY-SA 2.0)</p>`,
  sources: [
    { name: 'Renegade Craft — Chicago', url: 'https://www.renegadecraft.com/city/chicago/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Division Street closed, crowd between the stages', source: 'West Town Chamber of Commerce', license: 'ASK', contact: 'West Town Chamber', credit: 'Courtesy West Town Chamber of Commerce' },
    { slot: 'body-1', subject: 'Band on one of the two stages', source: 'West Town Chamber', license: 'ASK', contact: 'Chamber', credit: 'Courtesy West Town Chamber of Commerce' },
    { slot: 'body-2', subject: 'Division Street architecture — surviving Polish-era buildings', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — West Town, Chicago', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Gate and donation table', source: 'Commission local', license: 'ASK', contact: 'Commission — detail shot of the model', credit: 'Photo: [name]' },
  ],
},

{
  ref: 'D26',
  title: 'Midsommarfest Turned Sixty on a Street That Changed Around It',
  category: 'news',
  author_name: 'Mora',
  date: '2026-06-16',
  event_dates: 'June 12 – 14, 2026',
  venue: 'Clark St from Foster to Gregory',
  neighborhood: 'Andersonville',
  featured: true,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Andersonville%2C_Chicago.JPG/1920px-Andersonville%2C_Chicago.JPG",
  cover_credit: "Zagalejo / Wikimedia Commons (Public domain)",
  cover_alt: "Andersonville, Chicago",
  excerpt: 'A Swedish midsummer festival reached its 60th year on five stages along Clark Street — in a neighbourhood that is now one of Chicago’s queerest and most Middle Eastern commercial strips.',
  body: `<p>Andersonville Midsommarfest closed Clark Street from Foster to Gregory from June 12 to 14, five stages, $10 suggested donation, sixtieth year. It is a Swedish midsummer celebration in the historically Swedish neighbourhood, and the sixtieth anniversary is a reasonable moment to ask what that sentence still means.</p>
<h3>What Is a Heritage Festival at Year Sixty</h3>
<p>The Swedish part of Andersonville is now largely institutional rather than residential. The Swedish American Museum anchors the strip, a handful of businesses carry the lineage, and the water tower still says what it says. The people living in the flats above Clark Street are, by and large, not Swedish.</p>
<p>What <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Andersonville</a> is instead is one of the queerest commercial strips in Chicago, with a substantial Middle Eastern business presence along the same blocks, and a reputation as the part of the North Side that gentrified without entirely flattening. Three distinct populations on one street, one of which supplies the name of the June festival.</p>

${E.instagram('DZjVKQEnHJJ', {
  caption: 'Posted 2026-06-14',
})}
<p>That could be read cynically, as heritage branding outliving the heritage. The more accurate reading is that a midsummer festival turned out to be a portable idea. A celebration of the longest days of the year, with food and music on a closed street, does not actually require anybody present to be Swedish, and sixty consecutive years suggests the neighbourhood decided to keep it because it works rather than because it owes anybody.</p>
<h3>Five Stages Is Serious</h3>
<p>Worth noting the scale, because it gets lost behind the folk-costume photographs. Five stages is more than most ticketed festivals in this package managed. <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Do Division</a> ran two. Riot Fest ran five and charged $319.</p>

${E.instagram('DZgj9NAFrBL', {
  // Replaced the dead @veronicaeye post with this one, which renders.
  // Credit is the fallback until the next fetch-embed-meta.js run.
  credit: '@becky.in.chicago',
  caption: 'Posted 2026-06-13',
})}
<p>A $10-suggested neighbourhood festival programming five stages for three days is doing a genuine amount of booking, funded by a chamber of commerce and a voluntary gate. The Andersonville Chamber has been running this operation for six decades and it is among the most competently produced street festivals in the city.</p>

${E.facebookVideo('https://www.facebook.com/reel/1699412671161697/', {
  caption: 'Posted 2026-06-14',
  portrait: true,
})}
<p>The comparison worth making is with <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Lincoln Square</a>, which does the same trick with German identity a few miles west — Maifest in May, an Oktoberfest in September, a German Day parade — and where the question of branding versus lived community is even sharper. Both neighbourhoods now perform an ethnic identity that has mostly moved out.</p>
<p>Sixty years of a Swedish festival on a street that is no longer Swedish, thrown by people who are not Swedish, for a crowd that does not care. It sells out the restaurants and everyone has a good time, which is possibly the most Chicago resolution available.</p>
<p class="cn-cover-credit">Cover image: Zagalejo / Wikimedia Commons (Public domain)</p>`,
  sources: [
    { name: 'Choose Chicago', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Clark Street closed, crowd and stage', source: 'Andersonville Chamber of Commerce', license: 'ASK', contact: 'Andersonville Chamber', credit: 'Courtesy Andersonville Chamber of Commerce' },
    { slot: 'body-1', subject: 'Maypole or Swedish tradition detail', source: 'Swedish American Museum', license: 'ASK', contact: 'Swedish American Museum', credit: 'Courtesy Swedish American Museum' },
    { slot: 'body-2', subject: 'Clark Street streetscape showing the mixed strip', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
    { slot: 'body-3', subject: 'Andersonville water tower', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Andersonville, Chicago', credit: 'Per file licence' },
  ],
},

{
  ref: 'D27',
  title: 'Wicker Park Fest Is a Rearguard Action on Milwaukee Avenue',
  category: 'news',
  author_name: 'Mora',
  date: '2026-07-28',
  event_dates: 'July 24 – 26, 2026',
  venue: 'Milwaukee Ave from Damen to Wolcott',
  neighborhood: 'Wicker Park',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wicker_Park_Chicago_Damen_North_Milwaukee.JPG/1920px-Wicker_Park_Chicago_Damen_North_Milwaukee.JPG",
  cover_credit: "Victorgrigas / Wikimedia Commons (Public domain)",
  cover_alt: "Wicker Park Chicago Damen North Milwaukee",
  excerpt: 'Three days of indie music and 200-plus small businesses on a stretch of Milwaukee Avenue that has largely gone to chains — which is precisely what makes the festival worth defending.',
  body: `<p>Wicker Park Fest closed Milwaukee Avenue from Damen to Wolcott from July 24 to 26, three days of indie music, $10 suggested donation, with more than 200 small businesses represented.</p>
<p>That last figure is the interesting one, and it needs context that the festival’s own materials will not give you. Milwaukee Avenue through Wicker Park has, over two decades, gone substantially to chain retail. The strip that built the neighbourhood’s reputation as an artists’ quarter now carries the same storefronts as any well-off commercial district in America.</p>
<h3>Two Hundred Small Businesses on a Chain Strip</h3>
<p>So a festival gathering 200-plus independents onto that pavement for three days is doing something closer to a demonstration than a marketplace. For one weekend, Milwaukee Avenue looks like the thing its reputation is still trading on.</p>

${E.instagram('DbQ-NULiX7y', {
  caption: 'Posted 2026-07-26',
})}
<p>There is a version of this that is merely nostalgic, and it is worth avoiding. The independents at Wicker Park Fest are real, operating businesses, many of them from elsewhere in the city, and the festival is a functioning revenue event for them rather than a tribute act. But nobody should mistake a three-day pop-up for the underlying condition of the street.</p>
<p>The neighbourhood priced out the artists who made it desirable. That is not a controversial claim, it is the documented history of the place, and it is the standard Chicago sequence: artists arrive for cheap space, the reputation follows, capital follows the reputation, the artists leave, and the word stays on the marketing.</p>

${E.instagram('DbLoF08jjHC', {
  caption: 'Posted 2026-07-24',
})}
<h3>The Comparison That Makes It Sharper</h3>
<p>What makes this worth writing about rather than lamenting is that another Chicago neighbourhood did it differently. Rogers Park built the <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Glenwood Avenue Arts District</a> as a deliberate artist-retention project rather than an attraction campaign, and it is the one part of this city that has demonstrably interrupted the sequence.</p>
<p>Wicker Park also hosts the <a href="https://www.renegadecraft.com/city/chicago/">Renegade Craft market</a> twice a year on Division Street, 250-plus makers arriving from elsewhere to fill a strip whose own makers left. Two festivals a year that import the independents the neighbourhood used to house.</p>

${E.instagram('DbMKRSckWrY', {
  caption: 'Posted 2026-07-24',
})}
<p>None of which is an argument against going. Three days of indie bookings on a closed street for a voluntary tenner is a good weekend, and <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the published calendars</a> had the details. It is an argument for being clear-eyed about what the festival is holding the line on, and how far back that line has already moved.</p>
<p>Milwaukee Avenue reopens on Monday and the chains are still there. For three days in July the street does a convincing impression of its own reputation, and two hundred small businesses get a weekend out of it.</p>
<p class="cn-cover-credit">Cover image: Victorgrigas / Wikimedia Commons (Public domain)</p>`,
  sources: [
    { name: 'Renegade Craft — Chicago', url: 'https://www.renegadecraft.com/city/chicago/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Milwaukee Avenue closed, crowd and vendors', source: 'Wicker Park Bucktown Chamber', license: 'ASK', contact: 'WPB Chamber of Commerce', credit: 'Courtesy Wicker Park Bucktown Chamber' },
    { slot: 'body-1', subject: 'Small-business vendor stall', source: 'WPB Chamber', license: 'ASK', contact: 'Chamber', credit: 'Courtesy Wicker Park Bucktown Chamber' },
    { slot: 'body-2', subject: 'Milwaukee Ave streetscape showing chain retail', source: 'Commission local', license: 'ASK', contact: 'Commission — the contrast is the point', credit: 'Photo: [name]' },
    { slot: 'body-3', subject: 'Indie band on stage', source: 'WPB Chamber', license: 'ASK', contact: 'Chamber', credit: 'Courtesy Wicker Park Bucktown Chamber' },
  ],
},

{
  ref: 'D28',
  title: 'A Folk School Programmed a Beer Festival, and It Shows',
  category: 'news',
  author_name: 'Mora',
  date: '2026-07-14',
  event_dates: 'July 10 – 12, 2026',
  venue: 'Lincoln Ave between Montrose and Wilson',
  neighborhood: 'Lincoln Square',
  featured: false,
  cover_image: "https://chambermaster.blob.core.windows.net/images/events/697/54913/EventSNPImage__MBA8175.jpg",
  cover_credit: "Via lincolnsquare.org",
  cover_alt: "A Folk School Programmed a Beer Festival, and It Shows",
  excerpt: 'Square Roots is co-produced by the Old Town School of Folk Music, which is the entire reason a family-friendly craft beer street fest has the best global music booking in Chicago.',
  body: `<p>Square Roots ran July 10 to 12 on Lincoln Avenue between Montrose and Wilson — Friday five to ten, Saturday noon to ten, Sunday noon to nine, with a Kids Zone both weekend afternoons. Music, craft beer, family-friendly, $10 suggested donation.</p>
<p>On paper that is the most generic street festival description in this entire package. The reason it is not generic is in the production credit: Square Roots is co-produced by the <strong>Old Town School of Folk Music</strong>.</p>
<h3>Why the Credit Changes Everything</h3>
<p>The Old Town School is not a venue that happens to teach lessons. It is a music school with an institutional commitment to global and traditional forms, a faculty of working musicians from a wide range of traditions, and decades of relationships with players most promoters have never heard of.</p>

${E.instagram('DanqiEKRjOx', {
  // Posted by a newsroom this package may not lean on (2). The credit
  // stands because it is who posted, but their copy is kept out of the
  // rail. Replacing this with a primary-source post is the real fix.
  quote: false,
  caption: 'Posted 2026-07-10',
})}
<p>Hand that organisation the booking for a street festival and you get a card built around global music rather than around whichever local bands have the best mailing lists. That is why the programming here is consistently better than the fee suggests, and why it is worth travelling for in a way that most $10 neighbourhood fests are not.</p>
<p>It is the same principle that makes <a href="https://www.westtownchamber.org/west-fest-chicago">West Fest</a> the best-booked house street fest in Chicago — that one is programmed by the Empty Bottle, which also produced <a href="https://do312.com/events/2026/5/23/warm-love-cool-dreams-tickets">Warm Love Cool Dreams</a> at the Salt Shed. In both cases a real music institution took over a chamber-of-commerce event and the bookings improved immediately.</p>

${E.instagram('DanaJbdEX3c', {
  caption: 'Posted 2026-07-10',
})}
<p>The lesson for every other street fest in this city is sitting right there and almost nobody has taken it.</p>
<h3>Family-Friendly Is Not an Insult</h3>
<p>The Kids Zone deserves defending, because "best family street fest" reads as a consolation prize and should not. A festival that programmes for children is making a structural choice about who the neighbourhood is for, and it is a harder choice than it looks — family programming costs money, takes space, and brings in an audience that spends less on beer.</p>

${E.instagram('Daqr_sTAQb_', {
  caption: 'Posted 2026-07-11',
})}
<p>Lincoln Square does this well generally. It is a neighbourhood with a German commercial identity, an excellent independent bookshop culture, and the Old Town School’s Maurer Hall a short walk from where these stages go up. The <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the published calendars</a> and the <a href="https://squareroots.org/">festival site</a> carry the programme and the market listing.</p>
<p>Craft beer, a closed stretch of Lincoln Avenue, a children’s area, and a bill assembled by a folk school that knows exactly what it is doing. It is the least fashionable festival in this package and one of the two or three best-programmed.</p>
<p class="cn-cover-credit">Cover image: Via lincolnsquare.org</p>`,
  sources: [
    { name: 'Square Roots', url: 'https://squareroots.org/' },
    { name: 'West Town Chamber of Commerce', url: 'https://www.westtownchamber.org/west-fest-chicago' },
  ],
  photos: [
    { slot: 'cover', subject: 'Lincoln Avenue closed, stage and crowd', source: 'Square Roots / Old Town School', license: 'ASK', contact: 'Square Roots or Old Town School directly', credit: 'Courtesy Square Roots' },
    { slot: 'body-1', subject: 'Global-music act performing', source: 'Old Town School of Folk Music', license: 'ASK', contact: 'Old Town School communications', credit: 'Courtesy Old Town School of Folk Music' },
    { slot: 'body-2', subject: 'Kids Zone', source: 'Lincoln Square Chamber', license: 'ASK', contact: 'Lincoln Square Chamber', credit: 'Courtesy Lincoln Square Chamber' },
    { slot: 'body-3', subject: 'Lincoln Square streetscape', source: 'Choose Chicago Image Library', license: 'CLEAR', contact: 'https://www.choosechicago.com/press-media/image-and-video-library/', credit: '[Photographer]/[Collection]/Choose Chicago' },
  ],
},

{
  ref: 'D29',
  title: 'The Logan Square Arts Festival and Its Grassroots Rival',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-07-01',
  event_dates: 'June 26 – 28, 2026',
  venue: 'Logan Square',
  neighborhood: 'Logan Square',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Logan_Square_Comfort_Station%2C_Chicago%2C_2023.jpg/1920px-Logan_Square_Comfort_Station%2C_Chicago%2C_2023.jpg",
  cover_credit: "Warren LeMay / Wikimedia Commons (CC BY-SA 2.0)",
  cover_alt: "Logan Square Comfort Station, Chicago, 2023",
  excerpt: 'Running since 2009, the festival is a fair barometer of the fastest gentrification arc in Chicago — and a monthly free DJ series on Logan Boulevard is the more interesting counterpoint.',
  body: `<p>The Logan Square Arts Festival ran June 26 to 28 with artists, music and food. It has operated since 2009, which places its entire existence inside the period during which Logan Square underwent the fastest neighbourhood transformation in Chicago.</p>
<p>That coincidence is the most useful thing about it. A festival founded in 2009 in Logan Square is a seventeen-year instrument for measuring what happened to Logan Square, and one can read the arc in the event itself rather than in census data.</p>
<h3>The Barometer Reading</h3>
<p>One cannot discuss this neighbourhood without acknowledging the speed. Logan Square went from affordable to unaffordable inside a decade and a half — faster than Wicker Park managed, with the boulevard system and the Blue Line accelerating it. The artists who made the area legible to capital are substantially gone.</p>

${E.instagram('DaLIuUrgKgQ', {
  caption: 'Posted 2026-06-29',
})}
<p>An arts festival in that context is doing one of two things. It is either the continuing expression of a working creative population, or it is the cultural amenity that a transformed neighbourhood buys to maintain its self-image. Most such festivals are some of both, and the honest way to find the ratio is to ask how many exhibitors live within walking distance.</p>
<p>Compare <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the Glenwood Avenue Arts Fest</a> in Rogers Park, where the answer is most of them, because that district was built as an artist-retention project. The contrast is not flattering to Logan Square and it is not Logan Square’s fault.</p>
<h3>Vibes On Logan Is the Better Story</h3>
<p>Which brings up the event that deserves the coverage this one receives. <strong>Vibes On Logan</strong> ran the second Sunday of each month from May 17 to September 13 at 2600 West Logan Boulevard — free, rotating DJs, grassroots, on the boulevard itself.</p>

${E.instagram('DaJ6GN2FgEO', {
  caption: 'Posted 2026-06-29',
})}
<p>The <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">city’s festival listings</a> gave it a single line. No gate, no chamber of commerce, no juried booths. A recurring free monthly event on a public boulevard, programmed by DJs, is a considerably purer expression of neighbourhood culture than a three-day arts festival with vendors, and it costs nothing to attend.</p>
<p>One also notes that it ran five times across the summer while the festival ran once. Frequency is its own argument: an event that recurs monthly becomes part of how people use a street, where an annual festival remains an occasion that happens to them.</p>

${E.instagram('DaHg0UXl15L', {
  caption: 'Posted 2026-06-28',
})}
<p>The <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the published calendars</a> carried both, listed as equivalent weekend options, which they are not.</p>
<p>If the festival’s booths begin to feel interchangeable, as they will by the second block, leave and walk the boulevard west to 2600. Stand on the grass there on a second Sunday until the set changes. That is the neighbourhood; the festival is the brochure.</p>
<p class="cn-cover-credit">Cover image: Warren LeMay / Wikimedia Commons (CC BY-SA 2.0)</p>`,
  sources: [
    { name: 'Choose Chicago', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Festival booths in Logan Square', source: 'Festival organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'Vibes On Logan — DJ set on the boulevard', source: 'Vibes On Logan organisers', license: 'ASK', contact: 'Grassroots organisers — likely to share', credit: 'Courtesy Vibes On Logan' },
    { slot: 'body-2', subject: 'Logan Boulevard / Logan Square monument', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Logan Square, Chicago', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Exhibiting artist with work', source: 'Festival organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
  ],
},

{
  ref: 'D30',
  title: 'Forty-Two Years of Taste of Lincoln Avenue, Against the Odds',
  category: 'news',
  author_name: 'Mora',
  date: '2026-07-29',
  event_dates: 'July 24 – 26, 2026',
  venue: '2500 N. Lincoln Ave',
  neighborhood: 'Lincoln Park',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/4/47/655_Wrightwood_Avenue_Circa_1880%2C_Lincoln_Park_Chicago_Illinois.jpg",
  cover_credit: "Unknown authorUnknown author / Wikimedia Commons (Public domain)",
  cover_alt: "655 Wrightwood Avenue Circa 1880, Lincoln Park Chicago Illinois",
  excerpt: 'One of the oldest street festivals in the city returned for a 42nd year, having survived repeated attempts to shut it down over neighbourhood noise complaints. The permit history is the story.',
  body: `<p>Taste of Lincoln Avenue ran July 24 to 26 around 2500 North Lincoln, $10 suggested donation, forty-second year. It is among the oldest street festivals in Chicago and it has survived multiple serious attempts to end it.</p>
<p>That survival is the article. Most coverage of a 42-year-old street fest defaults to fondness, and the more interesting material is in the permits.</p>
<h3>The Noise Complaint as a Land-Use Weapon</h3>
<p>Lincoln Park is among the wealthiest parts of Chicago, and a large amplified festival on a residential commercial street in a wealthy neighbourhood generates a specific kind of opposition. Not organising, not press conferences — complaints, alderman meetings, permit challenges and sound-limit negotiations, conducted by people with the time and standing to conduct them.</p>

${E.instagram('DbMGpKglg7i', {
  caption: 'Posted 2026-07-24',
})}
<p>That process has been applied to this festival repeatedly across four decades, and the festival is still there. Whoever has been renewing that permit has done so against sustained, well-resourced resistance, and the history of those renewals is a genuinely under-reported piece of Chicago civic documentation.</p>
<p>Set it beside the other park-and-street fights of this summer and the asymmetry is instructive. In North Lawndale, residents spent September asking Riot Fest to leave Douglass Park and got a <a href="https://riotfest.org/">restoration promise</a> and a signed deal through 2027. Jorge Angel told reporters his complaints about disrupted youth soccer went unanswered.</p>

${E.instagram('DbJ-L_LtUFF', {
  caption: 'Posted 2026-07-24',
})}
<p>In Lincoln Park, complaints about a street festival have repeatedly reached the point of threatening its existence. Same city, same instrument, very different traction, and the difference tracks the median household income along the affected blocks.</p>
<h3>What Forty-Two Years Buys</h3>
<p>The festival itself is a food-and-music event on a closed stretch of <a href="https://commons.wikimedia.org/wiki/Category:Lincoln_Park,_Chicago">Lincoln Avenue</a>, well run and pleasant, with the usual suggested donation funding the usual chamber. Nothing about the programme explains its longevity.</p>

${E.instagram('DbKVNsXu-Dz', {
  caption: 'Posted 2026-07-24',
})}
<p>What explains it is institutional patience, of a kind that never makes the programme. Forty-two years means somebody has been maintaining relationships with an alderman’s office, a police district, a sound engineer and a set of nearby residents continuously since the early eighties. Every one of those relationships has to be renewed by a person who is not paid to renew it, and any one of them failing ends the festival. That is the actual skill in producing a street festival, and it is invisible in every listing.</p>
<p>Forty-two years of a street festival that a well-connected neighbourhood has tried more than once to switch off, on a strip the <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">city still lists</a> every summer without comment. It opens again next July, and the reason is paperwork nobody has ever written about.</p>
<p class="cn-cover-credit">Cover image: Unknown authorUnknown author / Wikimedia Commons (Public domain)</p>`,
  sources: [
    { name: 'Choose Chicago', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Lincoln Avenue closed, festival crowd', source: 'Organiser / Lincoln Park Chamber', license: 'ASK', contact: 'Lincoln Park Chamber of Commerce', credit: 'Courtesy Lincoln Park Chamber' },
    { slot: 'body-1', subject: 'Food vendor detail', source: 'Organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Residential blocks adjacent to the festival footprint', source: 'Commission local', license: 'ASK', contact: 'Commission — illustrates the noise-complaint geography', credit: 'Photo: [name]' },
    { slot: 'body-3', subject: 'Archive image from an earlier decade', source: 'Lincoln Park Chamber archive', license: 'ASK', contact: 'Chamber — 42 years of records', credit: 'Courtesy Lincoln Park Chamber' },
  ],
  verify_note: 'The permit-history claim ("multiple attempts to kill it over noise complaints") comes from the dossier’s story-angle note, not from a cited article. Confirm with the alderman’s office or chamber records before publishing — it is the spine of the piece.',
},

{
  ref: 'D31',
  title: 'Edgewater Music Fest Booked Thirty-Five Original Acts',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-01',
  event_dates: 'August 28 – 30, 2026',
  venue: 'Broadway and Thorndale',
  neighborhood: 'Edgewater',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Chicago_Public_Library_Edgewater_Branch_8506.jpg/1920px-Chicago_Public_Library_Edgewater_Branch_8506.jpg",
  cover_credit: "Paul R. Burley / Wikimedia Commons (CC BY-SA 4.0)",
  cover_alt: "Chicago Public Library Edgewater Branch 8506",
  excerpt: 'Thirty-five acts playing their own material, which sounds unremarkable until you count how many Chicago street festivals book tribute bands instead. Almost all of them.',
  body: `<p>Edgewater Music Fest ran August 28 to 30 at Broadway and Thorndale with <strong>35 original acts</strong>. That number is the entire reason to write about it, and the significance is only visible against what every other street festival in this city does.</p>
<h3>The Tribute Band Economy</h3>
<p>Most Chicago neighbourhood festivals book cover bands and tribute acts. It is not a failure of taste, it is a business decision: a tribute band draws a predictable crowd, requires no promotion, and plays material that a street full of people who did not come for music will recognise. Belmont-Sheffield runs almost entirely on the model. Retro on Roscoe built a whole theme around it.</p>
<p>The economics are unforgiving. A festival funded by a voluntary $10 donation and beer sales needs footfall, and original music is a risk against footfall. Thirty-five acts playing their own songs is therefore a deliberate decision to accept a smaller and less certain crowd in exchange for booking artists rather than repertoires.</p>

${E.facebookVideo('https://www.facebook.com/reel/1117796157239105', {
  caption: 'Posted 2026-08-30',
  portrait: true,
})}
<p>That is a small act of institutional courage from a chamber of commerce on the far North Side, and nobody outside Edgewater noticed it happened.</p>
<h3>Edgewater Is an Undercovered Music Neighbourhood</h3>
<p>The other point is geographic. Chicago’s music coverage has a centre of gravity somewhere around Logan Square, Wicker Park and the West Loop, and it thins rapidly north of Lawrence. <a href="https://commons.wikimedia.org/wiki/Category:Edgewater,_Chicago">Edgewater</a> has venues, a substantial residential musician population and cheaper rehearsal space than anywhere within three miles of the Loop, and it appears in almost no coverage of the city’s scene.</p>

${E.facebookVideo('https://www.facebook.com/reel/1117796157239105/', {
  caption: 'Posted 2026-08-30',
  portrait: true,
})}
<p>Thirty-five original acts do not materialise for a festival. They exist in the neighbourhood already, playing rooms that the city’s music press does not review, and the festival is the one weekend a year when their existence is documented in a listings guide.</p>

${E.facebookVideo('https://www.facebook.com/reel/4681314552091627', {
  caption: 'Posted 2026-08-30',
  portrait: true,
})}
<p>The comparison with the summer’s best-programmed street fests is worth making. <a href="https://www.westtownchamber.org/west-fest-chicago">West Fest</a> gets its bookings from the Empty Bottle. <a href="https://squareroots.org/">Square Roots</a> gets its bookings from the Old Town School of Folk Music. Edgewater has no comparable institution behind it and booked 35 original acts anyway.</p>
<p>Thirty-five bands playing songs they wrote, on Broadway at Thorndale, on the last weekend of August. Whoever made that booking decision should be running a larger festival, and the fact that they are not is roughly the state of music coverage in this city.</p>
<p class="cn-cover-credit">Cover image: Paul R. Burley / Wikimedia Commons (CC BY-SA 4.0)</p>`,
  sources: [
    { name: 'Choose Chicago', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
    { name: 'West Town Chamber of Commerce', url: 'https://www.westtownchamber.org/west-fest-chicago' },
    { name: 'Square Roots', url: 'https://squareroots.org/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Stage at Broadway and Thorndale', source: 'Festival organiser', license: 'ASK', contact: 'Organiser — small fest, likely to be delighted', credit: 'Per organiser terms' },
    { slot: 'body-1', subject: 'An original act performing', source: 'Festival organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
    { slot: 'body-2', subject: 'Edgewater streetscape, Broadway', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Edgewater, Chicago', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Crowd wide shot', source: 'Festival organiser', license: 'ASK', contact: 'Organiser', credit: 'Per organiser terms' },
  ],
},

{
  ref: 'D32',
  title: 'Retro on Roscoe Turned Twenty-Five, So Nostalgia for What',
  category: 'news',
  author_name: 'Mora',
  date: '2026-09-22',
  event_dates: 'September 18 – 20, 2026',
  venue: '2000 W. Roscoe St',
  neighborhood: 'Roscoe Village',
  featured: false,
  cover_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/New_%22Welcome_to_Roscoe_Village%22_Painted_Sign_on_Roscoe_at_the_Train_Tracks.jpg/1920px-New_%22Welcome_to_Roscoe_Village%22_Painted_Sign_on_Roscoe_at_the_Train_Tracks.jpg",
  cover_credit: "Daniel X. O'Neil / Wikimedia Commons (CC BY 2.0)",
  cover_alt: "New \"Welcome to Roscoe Village\" Painted Sign on Roscoe at the Train Tracks",
  excerpt: 'Twenty-five years of a throwback street festival with classic cars on a closed residential street, which raises a question the festival has never had to answer: nostalgia for which decade?',
  body: `<p>Retro on Roscoe closed 2000 West Roscoe from September 18 to 20, twenty-fifth annual, $10 suggested donation, with a throwback theme and classic cars parked along the street.</p>
<p>Twenty-five years of a nostalgia festival produces a problem the organisers have probably never had to think about, and it is genuinely interesting. When the festival started, the retro it referred to was a fixed point. A quarter of a century later, the reference has to have moved — or it has not, in which case the festival is now nostalgic for a nostalgia.</p>
<h3>The Reference Point Drifts</h3>
<p>Think about the arithmetic. A festival launched around the turn of the millennium looking back a few decades was pointing at the sixties and seventies. If it is still pointing there, the distance has grown from thirty years to nearly sixty, and the people who remember it firsthand are not the ones on a closed street on a Friday night.</p>

${E.instagram('Ddcgd8PhvFj', {
  caption: 'Posted 2026-09-18',
})}
<p>If instead it has drifted forward with its audience, then Retro on Roscoe in 2026 should be a nineties and early-2000s festival, which would make it nostalgic for the era in which it was founded. Either answer is a good story and neither appears in any listing.</p>
<p>Classic cars are the tell, because a car show has a hard technical definition of classic that does not drift with sentiment. Whatever is parked on Roscoe is dated, and it would be worth walking the line to see which decades actually turned up.</p>

${E.facebookVideo('https://www.facebook.com/reel/38561690033477243/', {
  caption: 'Posted 2026-09-19',
  portrait: true,
})}
<h3>Cars on a Residential Street</h3>
<p>Worth noting what the format requires. A classic car display needs a closed street wide enough to park along and residents willing to lose it for three days, which means the festival depends on the same permit goodwill that every neighbourhood event runs on.</p>
<p><a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Roscoe Village</a> is a quiet, well-off North Side neighbourhood of two-flats and small storefronts, and it absorbs this annually without the kind of organised resistance that <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Taste of Lincoln Avenue</a> has weathered for four decades. The neighbourhood also puts on the Roscoe Village Burger Fest in July, so the chamber runs two closures a summer and keeps getting them renewed.</p>

${E.instagram('DdezEicSa5D', {
  caption: 'Posted 2026-09-19',
})}
<p>The festival shares its September weekend with <a href="https://riotfest.org/">Riot Fest</a> in Douglass Park, which was busy being torn up by rain and a community fight. Two closed-street events in one city on one weekend, one of them a car show with a tribute theme and one of them a political crisis.</p>
<p>Twenty-five years of looking backward from the same block. Somebody should ask the organisers which year they think they are pointing at, because the honest answer is probably 2001.</p>
<p class="cn-cover-credit">Cover image: Daniel X. O'Neil / Wikimedia Commons (CC BY 2.0)</p>`,
  sources: [
  ],
  photos: [
    { slot: 'cover', subject: 'Classic cars parked along Roscoe Street', source: 'Roscoe Village Chamber', license: 'ASK', contact: 'Roscoe Village Chamber of Commerce', credit: 'Courtesy Roscoe Village Chamber' },
    { slot: 'body-1', subject: 'Individual car with its year visible', source: 'Roscoe Village Chamber', license: 'ASK', contact: 'Chamber — the dates on the cars are the story', credit: 'Courtesy Roscoe Village Chamber' },
    { slot: 'body-2', subject: 'Roscoe Village two-flats and storefronts', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'Commons — Roscoe Village, Chicago', credit: 'Per file licence' },
    { slot: 'body-3', subject: 'Crowd along the car line', source: 'Roscoe Village Chamber', license: 'ASK', contact: 'Chamber', credit: 'Courtesy Roscoe Village Chamber' },
  ],
},

]
