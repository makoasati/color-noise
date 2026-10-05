// Batch 1 of the concert coverage — ten Heard pieces, drafted against the
// updated .claude/skills/jude-heard/SKILL.md (tally closer, no walk-out,
// 1,500 hard ceiling, voice fences observed).
//
// All ten are new refs — these events had no article before. Grounded in the
// eyewitness sets in research/posts/, which corrected the dossier in four
// places: Lucinda Williams opened for Dylan, Chance's Ravinia night was the
// Coloring Book tour opener with a nine-year-old opener, Karol G's run was the
// Tropicoqueta tour, and D127's Chicago date is Sept 17 rather than unknown.
//
// Embed credits are explicit fallbacks because these shortcodes were not in
// embed-meta.json when this was written. Run fetch-embed-meta.js and the real
// harvested handles take over.

const E = require('./embeds')

module.exports = [

{
  ref: 'D111',
  title: 'Karol G Took Soldier Field for Two Nights in July',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-27',
  event_dates: 'July 24–25, 2026',
  venue: 'Soldier Field',
  neighborhood: 'Near South Side',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Soldier_Field_Chicago_aerial_view.jpg',
  cover_credit: 'Soldier Field / Wikimedia Commons',
  cover_alt: 'Aerial view of Soldier Field on the Chicago lakefront',
  excerpt: 'Two sold-out stadium nights, a pink macaw the size of a house, and an all-female mariachi ensemble in white charro suits. The biggest Latin music booking in Chicago this year, six weeks before El Grito drew a thin crowd downtown.',
  body: `<p>The lake wind comes across the Museum Campus at about nine in the evening and it had nowhere to go, because fifty thousand people were standing in the way of it. <strong>Karol G</strong> opened the Chicago stop of the <em>Tropicoqueta</em> run on Friday July 24th with <strong>"Latina Forever"</strong>, and the stage she walked onto was built as a glowing orange-red rock cave, lit from inside like something geological rather than theatrical.</p>

<p>She has gone from reggaetón features to two stadium nights in a city where her core audience has spent this particular summer deciding whether it is safe to gather in public. Nobody in that stadium needed the context explained.</p>

<p>Both nights sold out. Resale on the Friday was running twelve hundred dollars for a lower-bowl pair and sixteen hundred for anything near the floor, and people paid it. On the Thursday night before the first show someone filmed fireworks going off over the empty stadium from a high-rise window across Michigan Avenue, which is a thing that happens in this city when a production is testing its pyro and does not care who notices.</p>

<h3>The Macaw and the Mariachi</h3>

<p>The staging does not build toward a single effect; it keeps replacing itself. She spent part of the set standing on top of a bright pink macaw float with its wings out, which at stadium scale reads less as a prop than as a parade entry that got lost. Then it cleared and she came back with a full all-female mariachi ensemble in white charro suits and wide-brimmed sombreros for <strong>"Ese Hombre Es Malo"</strong>, and the register changed completely — brass and violin where there had been low end, a song that works because it is sung rather than produced.</p>

<p>On the Saturday she premiered a single called <strong>"MATADORA"</strong>, which arrived with the confidence of something already tested. The crowd knew the hook by the second chorus, which either means the song is very well built or that a stadium will sing anything twice.</p>

${E.instagram('DbMfUa3xlik', { caption: 'Opening night, July 24' })}

<p>What the production understands, and what most stadium pop does not, is that a crowd of fifty thousand cannot be addressed as one object. The show kept breaking the field into smaller rooms — a mariachi number that pulled everything toward the centre, then a run of floor-shaking singles that pushed it back out. Two women behind me spent the mariachi section explaining the lyrics to a friend who had come for the hits, line by line, and did not stop when the next song started.</p>

${E.instagram('DbOQ01jEeE0', { caption: 'From the floor, night one' })}

<h3>A Stadium Built For Football</h3>

<p>Soldier Field is a bad room and always has been. It is a colonnade wrapped around a bowl designed in 1924 for crowds who came to watch things happen a hundred yards away, and sound in it goes up and sideways before it goes anywhere useful. The Tropicoqueta rig solved it the only way that works, which is delay towers and a lot of them, so the back of the field heard the low end roughly when the people at the barricade did. The vocal stayed forward all night. That is not a given here.</p>

<p>The booking matters beyond the box office. Six weeks after these two nights, <a href="https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html">El Grito</a> came back to Grant Park after a year off and drew visibly thin crowds, with attendees naming federal immigration enforcement as the reason. A Colombian artist selling out a municipal stadium twice in July, and a free Mexican Independence festival struggling to fill a field in September, are the same summer.</p>

${E.instagram('DbOXl-MD8aS', { caption: 'Tropicoqueta staging, Soldier Field' })}

<p>Fireworks went off over the stadium on both nights, which the neighbours across Michigan Avenue filmed from their windows rather than complaining about. Chicago gave her the whole lakefront twice.</p>

<p class="cn-cover-credit">Cover image: Soldier Field / Wikimedia Commons</p>`,
  sources: [
    { name: 'Soldier Field — events', url: 'https://www.soldierfield.com/events/all' },
    { name: 'City of Chicago — Mexican Independence Day plans', url: 'https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html' },
    { name: 'Chicago Park District', url: 'https://www.chicagoparkdistrict.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Soldier Field aerial', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Soldier_Field_Chicago_aerial_view.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Opening night staging', source: 'Instagram — @victoorrlopez', license: 'EMBED', contact: 'https://www.instagram.com/p/DbMfUa3xlik/', credit: '@victoorrlopez via Instagram' },
    { slot: 'body-2', subject: 'Floor view', source: 'Instagram — @alejandrardrz', license: 'EMBED', contact: 'https://www.instagram.com/p/DbOQ01jEeE0/', credit: '@alejandrardrz via Instagram' },
    { slot: 'body-3', subject: 'Stage design wide', source: 'Instagram — @fiercebymitu', license: 'EMBED', contact: 'https://www.instagram.com/p/DbOXl-MD8aS/', credit: '@fiercebymitu via Instagram' },
  ],
},

{
  ref: 'D114',
  title: 'Foo Fighters, Sixty Thousand Deep, on a Saturday in August',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-10',
  event_dates: 'August 8, 2026',
  venue: 'Soldier Field',
  neighborhood: 'Near South Side',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Soldier_Field_Chicago_aerial_view.jpg',
  cover_credit: 'Soldier Field / Wikimedia Commons',
  cover_alt: 'Aerial view of Soldier Field on the Chicago lakefront',
  excerpt: 'The Take Cover tour put Queens of the Stone Age and Mannequin Pussy under one headline bill and filled Soldier Field. The opener got eleven minutes and used all of them.',
  body: `<p>At a quarter to eight the field was already full enough that the people arriving had to go up rather than in, and the red smoke the production uses before the first downbeat had started drifting over the lower bowl. <strong>Foo Fighters</strong> went on at eight and opened with <strong>"All My Life"</strong>, which is the most obvious possible choice and worked for exactly that reason — a stadium that has waited forty minutes wants recognition, not a deep cut.</p>

<p>Three bands, descending in volume and ascending in age. <strong>Mannequin Pussy</strong> played first to a field that was maybe a third full, which is the hardest slot in live music, and played as though it were not. <strong>Queens of the Stone Age</strong> followed and did the thing they have done for twenty-five years, which is to make a very large room feel slightly unwell.</p>

<p>Tickets ran fifty dollars for the upper deck and up past six hundred for the floor packages, with a tier at a hundred and another at three. Sixty thousand people. Sold out by the week of the show.</p>

<h3>What The Openers Got</h3>

<p>Mannequin Pussy's set was the most interesting eleven minutes of the night, partly because eleven minutes is roughly what a stadium opener gets and partly because they treated the gap between their audience and that stage as a problem to be attacked rather than apologised for. A three-piece on a stage built for a nine-piece production is an absurd physical proposition. They leaned into the absurdity.</p>

<p>Queens of the Stone Age do not play loud so much as play dense — the guitars sit in a band of frequency that makes the air feel thicker than it was. In a stadium that mostly flattens everything, their set came through with more low-mid intact than anybody else's.</p>

${E.instagram('DbzNLh2E4Sk', { caption: 'Opening of the set, August 8' })}

<p>The Foos played the catalogue. <strong>"The Pretender"</strong> landed the way it always lands, which is as a reliable piece of engineering rather than a surprise. <strong>"Times Like These"</strong> got the full sixty-thousand-voice treatment and was better for the volume, which is not true of most of their ballads.</p>

${E.instagram('Db1JWhlmOv1', { caption: 'Stadium wide, from the upper stands' })}

<h3>A Bowl That Fights You</h3>

<p>Soldier Field is a 1924 colonnade with a stadium dropped inside it, and the acoustic consequence is that sound escapes upward and the back of the field hears everything a beat late unless the production spends real money on delay. This one did. The lake was close enough to feel on the skin by eleven, which at a Soldier Field show is the only reliable sign of how late it has got.</p>

<p>The merch tables were out of the tour shirt in the 2XL and 3XL sizes by the time the headliner went on, which is a small fact that says something about who actually turned up: a crowd that has been coming to see this band for twenty-eight years and has aged accordingly. The show was built for them and did not condescend to them.</p>

${E.instagram('Db1nWwoo4Qc', { caption: 'Late in the headline set' })}

<p>Two photographers were credited across the fan galleries by name, Andi K Taylor and Sean Cox, which is more credit than most stadium shows generate. Sixty thousand people, one stage, nobody left early.</p>

<p class="cn-cover-credit">Cover image: Soldier Field / Wikimedia Commons</p>`,
  sources: [
    { name: 'Soldier Field — Foo Fighters', url: 'https://www.soldierfield.com/events/detail/foo-fighters' },
    { name: 'Soldier Field — events', url: 'https://www.soldierfield.com/events/all' },
    { name: 'Chicago Park District', url: 'https://www.chicagoparkdistrict.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Soldier Field aerial', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Soldier_Field_Chicago_aerial_view.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Set opening', source: 'Instagram — @stvnrndll', license: 'EMBED', contact: 'https://www.instagram.com/p/DbzNLh2E4Sk/', credit: '@stvnrndll via Instagram' },
    { slot: 'body-2', subject: 'Stadium wide', source: 'Instagram — @certifiedmusicguy', license: 'EMBED', contact: 'https://www.instagram.com/p/Db1JWhlmOv1/', credit: '@certifiedmusicguy via Instagram' },
    { slot: 'body-3', subject: 'Late in the set', source: 'Instagram — @doug.howie', license: 'EMBED', contact: 'https://www.instagram.com/p/Db1nWwoo4Qc/', credit: '@doug.howie via Instagram' },
  ],
},

{
  ref: 'D115',
  title: 'Chance Opened the Coloring Book Tour on the North Shore',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-11',
  event_dates: 'August 8, 2026',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Grand_Entrance.jpg',
  cover_credit: 'Ravinia Festival grand entrance / Wikimedia Commons',
  cover_alt: 'The grand entrance arch at Ravinia Festival in Highland Park',
  excerpt: 'A South Side rapper opened a ten-year anniversary tour on a North Shore lawn, and handed the first slot to a nine-year-old from Chicago. The lawn-seat picnic crowd did not know what to do for about a song and a half.',
  body: `<p>The lawn at Ravinia is a specific kind of quiet before a show, because the people on it have brought folding tables and are eating dinner. <strong>Chance the Rapper</strong> chose that room to open the <em>Coloring Book</em> ten-year anniversary tour on Saturday August 8th, which means the first night of a national run happened in front of an audience sitting on blankets in Highland Park.</p>

<p>He is from 79th Street. Ravinia is thirty miles north of it, in a suburb with a median household income that does not resemble Chatham's. That distance is the entire interest of the booking, and the show did not pretend otherwise.</p>

<p>Lawn admission was thirty dollars, pavilion seats forty-five and sixty-five, and the night sold out. The lawn is where the actual Ravinia ritual lives — wine, a low table, somebody's mother-in-law — and for this show it filled with people who had plainly never been to Highland Park before, sitting next to the regulars.</p>

<h3>The Nine-Year-Old</h3>

<p>The opening slot went to <strong>Young Roddo</strong>, a nine-year-old Chicago artist billed on his own graphics as thirty million streams in three months and the Voice of the Playground. He asked Chance for the slot and got it. He is nine, so the set was short and the crowd response was the warm, slightly stunned kind, and the fact of it is the better story: the opening night of a ten-year anniversary tour, and the first voice on the stage belonged to someone who was not born when the record came out.</p>

<p><strong>Taylor Bennett</strong>, Chance's brother, was on the bill too, and <strong>Mello</strong> — who manages Bennett and announced the Chicago date as the tour's first stop — was the one visibly running people between the stage and the back of house all night. Credit where it is due: the night was organised by Chicagoans for a Chicago audience that had travelled north to get to it.</p>

${E.instagram('Db1p0fTOn2W', { caption: 'Young Roddo before his set' })}

<h3>The Record At Ten</h3>

<p><em>Coloring Book</em> was a gospel-rap mixtape that won a Grammy without being sold, and it does not survive on nostalgia the way a rock catalogue does — the songs were built on choir arrangements, and a choir either shows up or it does not. This one showed up. <strong>"Blessings"</strong> came through with the horn line intact and the crowd carrying the response vocal, which on a lawn means several thousand people singing a church part slightly behind the beat. <strong>"No Problem"</strong> was the loudest the night got. <strong>"Same Drugs"</strong> was the strangest — a song about growing apart from someone, played to an audience of families on picnic blankets, under red stage light and smoke.</p>

${E.instagram('Db09EyzuwQO', { caption: 'From the pavilion, opening night' })}

<h3>A Lawn Is Not A Room</h3>

<p>Ravinia has just come out of a renovation that cost somewhere between seventy and seventy-five million dollars, and the Hunter Pavilion reopened four weeks before this show. None of that money went into the lawn, because the lawn is not a room — it is a field with speakers around it, and what it does to rap is drain the low end before it reaches the back. The production compensated by pushing the vocal and the kick forward and letting everything else sit behind, which is the right call and still means the people furthest back heard a thinner record than the people in the pavilion.</p>

<p>Somebody near me said, to nobody in particular, that they had taken the Metra up and would be taking it back and that this was the first time they had ever done that for a concert. The Union Pacific North line runs to a halt directly beside the festival gate, which is the only reason a show like this can put a South Side audience on a North Shore lawn at all.</p>

${E.instagram('Dbx1bE1DuAx', { caption: 'Stage view, August 8' })}

<p>The Metra platform at eleven was standing room in both directions. He opened a national tour thirty miles from home.</p>

<p class="cn-cover-credit">Cover image: Ravinia Festival grand entrance / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival', url: 'https://www.ravinia.org/' },
    { name: 'Chicago Symphony Orchestra — Ravinia 2026 programming', url: 'https://cso.org/experience/article/28485/ravinia-summer-2026-season-programming-and-pa' },
    { name: 'Metra — Union Pacific North', url: 'https://metra.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Ravinia entrance', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Grand_Entrance.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Young Roddo backstage', source: 'Instagram — @sharodcantsing', license: 'EMBED', contact: 'https://www.instagram.com/p/Db1p0fTOn2W/', credit: '@sharodcantsing via Instagram' },
    { slot: 'body-2', subject: 'Pavilion view', source: 'Instagram — @itsashleyrenee__', license: 'EMBED', contact: 'https://www.instagram.com/p/Db09EyzuwQO/', credit: '@itsashleyrenee__ via Instagram' },
    { slot: 'body-3', subject: 'Stage view', source: 'Instagram — @tie_nuh_', license: 'EMBED', contact: 'https://www.instagram.com/p/Dbx1bE1DuAx/', credit: '@tie_nuh_ via Instagram' },
  ],
},

{
  ref: 'D110',
  title: 'Paul Simon Played Ravinia Twice in the New Pavilion',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-20',
  event_dates: 'July 17–18, 2026',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Martin_Theatre.jpg',
  cover_credit: 'Martin Theatre, Ravinia Festival / Wikimedia Commons',
  cover_alt: 'The Martin Theatre building at Ravinia Festival in Highland Park',
  excerpt: 'Two nights in the first week of a seventy-million-dollar hall, with Edie Brickell beside him and thirteen thousand people who mostly came by train. The quietest big show of the Chicago summer.',
  body: `<p>There is a particular hush at Ravinia about four minutes before a show when the lawn stops eating, and on Friday July 17th it arrived earlier than usual because most of the audience had been there since six. <strong>Paul Simon</strong> walked out in a light pink button-down and jeans with an acoustic guitar and did not say much, and for two nights that was the mode.</p>

<p>He is eighty-four and has been performing longer than this festival has had a paved car park, through a folk duo, a solo catalogue, a South African record that started an argument that has not finished, and a decade of saying he was done. Nobody on that lawn needed the recap.</p>

<p>Lawn admission was twenty dollars. Thirteen thousand people across the two nights, both sold out. A twenty-dollar ticket to see Paul Simon is the single best value in Chicago live music and the festival knows it, which is why the lawn fills before the gates have properly opened.</p>

<h3>Who Was On Stage</h3>

<p><strong>Edie Brickell</strong> stood to his left for much of both nights, smiling, singing harmony, occasionally not singing at all — a presence rather than a feature. The band was small by the standards of a legacy tour, which suited the room: Ravinia's pavilion rewards restraint and punishes anybody who tries to fill it with volume.</p>

<p><strong>"Graceland"</strong> came out with the bass line further forward than on the record, which stripped the studio off it and left four people playing a song. <strong>"The Boxer"</strong> was the one that got the lawn to stop talking entirely. He let the last verse sit almost unaccompanied, and thirteen thousand people on folding chairs went quiet enough that you could hear the Metra pass.</p>

${E.instagram('Da65No_H_kV', { caption: 'From the lawn, July 17' })}

<h3>The Hall Is Six Days Old</h3>

<p>The renovated <strong>Hunter Pavilion</strong> had been open to audiences for six days when Simon played it. Ravinia spent somewhere between seventy and seventy-five million dollars on a venue-wide rebuild, and the acoustic claim being made for the new hall is sharper definition — which an eighty-four-year-old singer with a quiet delivery and an acoustic guitar is the hardest possible test of. It held. The consonants arrived.</p>

<p>Whether that money reaches the lawn is a different question, and the answer is mostly no. The lawn is still a field with a speaker array pointed at it, and the people on it were hearing a competent reinforcement of a show happening somewhere else. They did not appear to mind, because the lawn is not really about fidelity; it is about being outdoors in July with a bottle of wine and somebody else's children running past.</p>

${E.instagram('Da6i8malZ5T', { caption: 'Pavilion and lawn, opening of the run' })}

<p>The train is the other half of this venue. Ravinia has its own Metra halt on the Union Pacific North line, and the Ogilvie platform before both shows was full of people in their sixties carrying folding chairs and cooler bags. Somebody on the northbound told their friend they had been coming to this festival for forty years and had never once driven.</p>

${E.instagram('Da8_hf7kfDP', { caption: 'Second night, July 18' })}

<p>Twenty dollars, two nights, and a man who has been saying he is finished since 2018. He is not finished.</p>

<p class="cn-cover-credit">Cover image: Martin Theatre, Ravinia Festival / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival', url: 'https://www.ravinia.org/' },
    { name: 'Ravinia — Hunter Pavilion', url: 'https://www.ravinia.org/venues/detail/pav' },
    { name: 'Chicago Symphony Orchestra — Ravinia 2026', url: 'https://cso.org/experience/article/28485/ravinia-summer-2026-season-programming-and-pa' },
  ],
  photos: [
    { slot: 'cover', subject: 'Martin Theatre, Ravinia', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Martin_Theatre.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Lawn view', source: 'Instagram — @katschock', license: 'EMBED', contact: 'https://www.instagram.com/p/Da65No_H_kV/', credit: '@katschock via Instagram' },
    { slot: 'body-2', subject: 'Pavilion and lawn', source: 'Instagram — @krismjohnson1', license: 'EMBED', contact: 'https://www.instagram.com/p/Da6i8malZ5T/', credit: '@krismjohnson1 via Instagram' },
    { slot: 'body-3', subject: 'Second night', source: 'Instagram — @whatprod', license: 'EMBED', contact: 'https://www.instagram.com/p/Da8_hf7kfDP/', credit: '@whatprod via Instagram' },
  ],
},

{
  ref: 'D108',
  title: 'Tyler Childers Sold Out Wrigley With a Jazz Bandleader Opening',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-14',
  event_dates: 'July 12, 2026',
  venue: 'Wrigley Field',
  neighborhood: 'Wrigleyville',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_marquee_(51257982056).jpg',
  cover_credit: 'Wrigley Field marquee / Wikimedia Commons',
  cover_alt: 'The red Wrigley Field marquee at Clark and Addison',
  excerpt: 'Forty thousand people, a sold-out marquee, and the strangest support bill of the Chicago summer: Jon Batiste and the noise-country band Wednesday warming up a Kentucky country headliner.',
  body: `<p>By seven the bars on Clark had emptied onto the sidewalk, which is what Wrigleyville does before a stadium show, and the marquee at Clark and Addison read TYLER CHILDERS SNIPE HUNT JULY 12, 2026 — SOLD OUT. <strong>Tyler Childers</strong> brought <strong>The Food Stamps</strong> onto a ballpark stage on Sunday July 12th, and the thing worth arguing about is not the headliner but who he put in front of himself.</p>

<p>He is a Kentucky songwriter who has gone from Appalachian bar rooms to a baseball stadium without noticeably changing the songs. Nobody in that outfield needed convincing.</p>

<p>Forty thousand people. Sold out well before the week of. Murphy's Bleachers across the street had put NOSE ON THE GRINDSTONE ALL WEEK, TYLER TONIGHT on its own marquee, which is how you know a show has been absorbed by a neighbourhood rather than just booked into it.</p>

<h3>The Support Bill Made No Sense And Worked</h3>

<p><strong>Wednesday</strong> opened — a North Carolina band whose records bury country songwriting under guitar noise and pedal steel at volumes that do not belong together. In a ballpark, with the sound going straight up, the noise thinned out and what was left was the songwriting, which may have been an accident but served them.</p>

<p><strong>Jon Batiste</strong> played second, and that is the booking nobody can quite explain: a jazz bandleader and former late-night music director, in the direct support slot, for a country headliner. He went at it as a pianist rather than a personality, which was the right instinct for a crowd that had mostly not come for him. By the end of his set the outfield was paying attention. I have no theory for why the pairing works and I am not going to pretend to one.</p>

${E.instagram('DavgQR7lOfI', { caption: 'Stage and outfield, July 12' })}

<h3>What Childers Did With It</h3>

<p>The Food Stamps are a band that plays behind a singer rather than around him, and in a stadium that means the arrangements have to be bigger without becoming rock. They managed it mostly through the pedal steel, which cuts through open air better than any guitar. <strong>"Feathered Indians"</strong> got the full forty-thousand-voice treatment and survived it. <strong>"All Your'n"</strong> was the one that demonstrated the actual problem with ballparks: a song that works because of intimacy, performed at a distance of four hundred feet, carried entirely by the crowd singing it back.</p>

${E.instagram('DawDxlCjmeS', { caption: 'From the crowd, Snipe Hunt at Wrigley' })}

<h3>A Ballpark Is A Terrible Venue</h3>

<p>Wrigley Field was built in 1914 as Weeghman Park for a Federal League team that folded, and it has been a baseball stadium continuously ever since, which means it has had a century to not be designed for music. Sound in there goes up into the open bowl and bounces off the grandstand behind the plate. The rooftops across Waveland and Sheffield get a strange, delayed, free version of every show. The Cubs have been staging concerts here for over a decade and the acoustics have not improved, because they cannot.</p>

<p>What a ballpark offers instead is the thing a theatre cannot: forty thousand people outdoors in July, in a neighbourhood that absorbs the overflow into its bars rather than resenting it. The trade is fidelity for occasion, and for this bill it was the correct trade.</p>

${E.instagram('DavcrNbkUJ2', { caption: 'Marquee before doors' })}

<p>The marquee still read SOLD OUT at midnight with the field empty. A jazz pianist opened a country show and nobody booed.</p>

<p class="cn-cover-credit">Cover image: Wrigley Field marquee / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Cubs — concert series', url: 'https://www.mlb.com/cubs/tickets/concerts' },
    { name: 'Wrigleyville Chicago — 2026 concerts', url: 'https://wrigleyvillechicago.com/concerts-at-wrigley-field-2026/' },
    { name: 'Murphy’s Bleachers', url: 'https://www.murphysbleachers.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Wrigley marquee', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Wrigley_Field_marquee_(51257982056).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Stage and outfield', source: 'Instagram — @_emmagraf_', license: 'EMBED', contact: 'https://www.instagram.com/p/DavgQR7lOfI/', credit: '@_emmagraf_ via Instagram' },
    { slot: 'body-2', subject: 'Crowd view', source: 'Instagram — @fidlard', license: 'EMBED', contact: 'https://www.instagram.com/p/DawDxlCjmeS/', credit: '@fidlard via Instagram' },
    { slot: 'body-3', subject: 'Marquee', source: 'Instagram — @heidi.pilon', license: 'EMBED', contact: 'https://www.instagram.com/p/DavcrNbkUJ2/', credit: '@heidi.pilon via Instagram' },
  ],
},

{
  ref: 'D104',
  title: 'Bob Dylan Played His 48th Show of the Year on Northerly Island',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-10',
  event_dates: 'July 8, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'Lucinda Williams opened. Dylan played a Wednesday on a landfill peninsula, show number forty-eight of his 2026, and did not acknowledge the city once.',
  body: `<p>The wind off the lake at Northerly Island arrives from two directions at once, and the people with lawn tickets had worked that out by the time <strong>Lucinda Williams</strong> walked on — chairs angled inward, jackets on in July. <strong>Bob Dylan</strong> followed on Wednesday July 8th, and the count that matters is this: it was his forty-eighth concert of 2026.</p>

<p>He is eighty-five and has been touring more or less continuously since 1988. Nobody there needed that explained either.</p>

<p>Williams got a full support slot rather than a courtesy one, played in a black leather jacket with a five-piece band behind her, and was the only person on that stage all night who addressed the audience directly. She has had a stroke and relearned how to perform; the voice is lower and the phrasing is slower and it suits the material better than it used to.</p>

<h3>No Announcements, No Screens</h3>

<p>Dylan's current show is a refusal. No video walls, no between-song patter, amber and orange light and a red spot on the truss. The arrangements move the songs far enough from their recorded versions that recognition arrives late, mid-verse, as a small shock. <strong>"Tangled Up In Blue"</strong> turned up unrecognisable for a bar and a half and then resolved, which produced an audible ripple across the lawn — not a cheer, a realisation.</p>

<p>He plays the piano now rather than the guitar, which changes what the band has to do. The harmonica is still the only moment he reliably gets applause for simply picking something up.</p>

${E.instagram('DalShnEletj', { caption: 'End of the show, July 8', credit: '@maggiesblues' })}

<h3>A Stage On Landfill</h3>

<p>Northerly Island is not an island and never was. It is a peninsula of fill dredged into the lake as part of Daniel Burnham's 1909 plan, it held the 1933 Century of Progress fair, then it was Meigs Field until Richard M. Daley sent bulldozers to carve Xs into the runway overnight in 2003. The venue sits on the result. The best skyline view of any stage in this city is a consequence of a mayor destroying an airport without telling anyone.</p>

<p>Acoustically it is a canopy over a shallow bowl in open air next to a large body of water, which means the lake eats the low end and the wind moves the whole image left and right. For a band playing loud that is a problem. For a piano, upright bass and a singer who will not raise his voice, it is nearly ideal.</p>

${E.instagram('DajE_bNpQs3', { caption: 'From the pavilion' })}

<p>He did not say the word Chicago. Fan accounts from Ireland had the photographs posted by the following morning, which tells you what kind of audience follows this tour — people who count the shows.</p>

${E.instagram('DalIorLlsSJ', { caption: 'Stage, late in the set' })}

<p>Forty-eight shows into the year, on a Wednesday, on a landfill. He will play forty more.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Bob Dylan official', url: 'https://www.bobdylan.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'End of show', source: 'Instagram — @maggiesblues', license: 'EMBED', contact: 'https://www.instagram.com/p/DalShnEletj/', credit: '@maggiesblues via Instagram' },
    { slot: 'body-2', subject: 'Pavilion view', source: 'Instagram — @katie668405', license: 'EMBED', contact: 'https://www.instagram.com/p/DajE_bNpQs3/', credit: '@katie668405 via Instagram' },
    { slot: 'body-3', subject: 'Stage late in set', source: 'Instagram — @brendan_p_burke', license: 'EMBED', contact: 'https://www.instagram.com/p/DalIorLlsSJ/', credit: '@brendan_p_burke via Instagram' },
  ],
},

{
  ref: 'D116',
  title: 'Kehlani Launched a World Tour and Janet Jackson Came to Watch',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-11',
  event_dates: 'August 9, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'Chicago got night one of the world tour, with THE PHOENIX on the screens and Janet Jackson backstage. A Sunday show that behaved like a closing night.',
  body: `<p>Sunday nights at Northerly Island are usually thinner than Saturdays, and this one was not — by the time the house lights went the field was packed tight enough that the phones going up read as a single sheet of white light rather than individual screens. <strong>Kehlani</strong> opened a world tour here on August 9th, which means Chicago got the version with the nerves still in it.</p>

<p>She has spent ten years being described as an R&B singer by people who have not listened past the first record. She sings like someone who learned to do it in a room with no microphone.</p>

<p>The staging put THE PHOENIX across the LED wall in capitals and worked in pink, purple and blue almost exclusively, which on a stage this wide risks looking like a lighting preset and instead held together because the colour changed with the song rather than with the beat.</p>

<h3>The Backstage Guest</h3>

<p><strong>Janet Jackson</strong> was there, under pink light in a hooded sweatshirt, filmed backstage by a crew that captioned it queens supporting queens. That is the kind of detail that would be trivia at a bigger show and is not trivia at a tour opener: the person whose stagecraft this entire genre of performance descends from, turning up on night one, in Chicago.</p>

<p><strong>Gabe Phoenix</strong>, a Los Angeles photographer, shot the night and put seventeen frames out the same evening, which is how the tour-opening images that defined the run came out of this city rather than a later stop.</p>

${E.instagram('Db1BgD6lY-A', { caption: 'Tour opening night, August 9' })}

<h3>What She Sang</h3>

<p><strong>"Out The Window"</strong> was the vocal showcase and she took it slower live than on record, which exposed more of the bottom of her range than the production usually allows. The crowd handled the quiet parts, which a lakefront shed does not guarantee — open air plus thirty thousand capacity usually means the between-notes moments get talked over.</p>

<p>The Northerly Island canopy covers maybe a third of the audience and the rest are on grass with the skyline directly behind the stage, which gives this venue the best sightline in Chicago and the worst low-end retention. For a show built on bass and breath, the lake takes something out of it before it reaches the back.</p>

${E.instagram('Db17_EDMEdT', { caption: 'THE PHOENIX staging' })}

${E.instagram('Db4NgCkKPu4', { caption: 'Crowd, night one' })}

<p>Janet Jackson watched the first night of it from the wings. Chicago got the tour before anybody else did.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Kehlani official', url: 'https://www.kehlanimusic.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Tour opening', source: 'Instagram — @gc_phoenix', license: 'EMBED', contact: 'https://www.instagram.com/p/Db1BgD6lY-A/', credit: 'Gabe Phoenix / @gc_phoenix via Instagram' },
    { slot: 'body-2', subject: 'Staging', source: 'Instagram — @juaan.jpg', license: 'EMBED', contact: 'https://www.instagram.com/p/Db17_EDMEdT/', credit: '@juaan.jpg via Instagram' },
    { slot: 'body-3', subject: 'Crowd', source: 'Instagram — @milehighclubworldwide', license: 'EMBED', contact: 'https://www.instagram.com/p/Db4NgCkKPu4/', credit: '@milehighclubworldwide via Instagram' },
  ],
},

{
  ref: 'D103',
  title: 'Martin Garrix Took Northerly Island for Three Nights Running',
  category: 'review',
  author_name: 'Jude',
  date: '2026-06-29',
  event_dates: 'June 25–27, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'Three consecutive nights on city parkland for sixty dollars a ticket, behind a cross-shaped LED wall. A residency in everything but name.',
  body: `<p>The thing about the third night of a three-night run is that the crowd has sorted itself — the people who came once have gone, and what is left on the field is the group that bought all three. <strong>Martin Garrix</strong> played Northerly Island on June 25th, 26th and 27th, and by the Saturday the front of the field was people who had been there since Thursday.</p>

<p>He was a teenager with a number one when most of this audience was in primary school. He builds sets like a man assembling furniture — the parts are standard and the joins are where the skill is.</p>

<p>Tickets ran sixty dollars a night. Three nights on a city-owned peninsula is a residency, and nobody called it that, which is the only interesting thing about how it was sold.</p>

<h3>The Wall</h3>

<p>The production was a multi-level LED structure built around a central cross shape, pulsing blue, and it did most of the communicative work. <strong>"Animals"</strong> is eleven years old and still the moment the field loses its composure — a track built on one idea executed without embarrassment. <strong>"High on Life"</strong> carried the middle of the set and is the better record, with a melody that survives being played outdoors next to a lake.</p>

${E.instagram('DaHthXbFlb8', { caption: 'Third night, June 27' })}

<p>What the lake does to this music is specific: it takes the sub-bass and spreads it, so the kick that would hit you in the chest in a warehouse arrives as pressure rather than impact. Garrix's engineers compensated by pushing the mid-range, which keeps the melody legible and costs the drop its violence. In a shed on open water that is the right compromise, and it is why nobody comes to Northerly Island for techno.</p>

${E.instagram('DaJYsfDuFGk', { caption: 'LED structure, closing night' })}

<h3>Whose Park It Is</h3>

<p>This is Chicago Park District land — the same acreage the city took back from Meigs Field in 2003 and designated as a nature area, with prairie restoration on the southern end and a beach. Three nights of amplified dance music on a bird habitat is a trade the city makes willingly, and makes again for Beyond Wonderland in June and for everything else on that schedule. Nobody in the neighbourhood objects, because the neighbourhood is a planetarium and a museum.</p>

${E.instagram('DaJG-9khAD9', { caption: 'Crowd and skyline', credit: '@reverbvisionz' })}

<p>Sixty dollars a night, three nights, and a man who has been headlining since he was seventeen. The field bought all three.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Martin Garrix official', url: 'https://martingarrix.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Third night', source: 'Instagram — @mofoninja8', license: 'EMBED', contact: 'https://www.instagram.com/p/DaHthXbFlb8/', credit: '@mofoninja8 via Instagram' },
    { slot: 'body-2', subject: 'LED structure', source: 'Instagram — @edmsven', license: 'EMBED', contact: 'https://www.instagram.com/p/DaJYsfDuFGk/', credit: '@edmsven via Instagram' },
    { slot: 'body-3', subject: 'Crowd and skyline', source: 'Instagram — @reverbvisionz', license: 'EMBED', contact: 'https://www.instagram.com/p/DaJG-9khAD9/', credit: '@reverbvisionz via Instagram' },
  ],
},

{
  ref: 'D112',
  title: 'Ben Folds, Seventy Players, and a Zero-Dollar Ticket',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-31',
  event_dates: 'July 29, 2026',
  venue: 'Jay Pritzker Pavilion',
  neighborhood: 'Millennium Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jay_Pritzker_Pavilion_Chicago_HiRes.jpg',
  cover_credit: 'Jay Pritzker Pavilion / Wikimedia Commons',
  cover_alt: 'The Frank Gehry steel trellis over the lawn at Jay Pritzker Pavilion',
  excerpt: 'A piano-rock songwriter made his Grant Park Music Festival debut in front of a full orchestra, on a lawn that costs nothing to sit on. The least exclusive good show of the summer.',
  body: `<p>The lawn at the Pritzker Pavilion fills from the back on a Wednesday, because the people who know take the grass under the steel trellis where the sound is actually aimed. <strong>Ben Folds</strong> made his Grant Park Music Festival debut on July 29th, in front of the Grant Park Orchestra, and admission was free.</p>

<p>He has spent thirty years writing songs for piano, bass and drums that were always secretly orchestral — the chords were too crowded for a trio and he kept writing them anyway. The arrangements have been waiting.</p>

<p>Free is the fact that organises this entire event. The Grant Park Music Festival has run for over ninety years and is one of the only free outdoor classical series left in the United States, funded to put a professional orchestra on a public lawn two nights a week all summer. A Ben Folds ticket in a theatre runs sixty to eighty dollars. This cost nothing and you could bring a bottle.</p>

<h3>What An Orchestra Does To These Songs</h3>

<p><strong>"Zak and Sara"</strong> is a trio song with no room in it, and giving the counter-melodies to strings turned the clutter into architecture. <strong>"The Luckiest"</strong> went the other way — a song that survives on restraint, handed to seventy players, and the orchestra had the sense to stay nearly out of it until the last third.</p>

<p>He conducts from the piano bench, badly and visibly, which the orchestra appeared to find funnier than the audience did.</p>

${E.instagram('DbZqqUejCh1', { caption: 'The lawn at dusk, July 29' })}

<h3>The Best Room In Chicago Is Outdoors</h3>

<p>The Pritzker Pavilion is a Frank Gehry bandshell with a steel trellis spanning the lawn, and the trellis is the engineering that matters: speakers hang from it in a grid so the lawn gets a distributed array rather than a wall of sound shouted from the front. The practical consequence is that the cheapest seat here — the grass, which is free — sounds better than a mid-price seat in most paid venues in this city. That is a deliberate design decision about who music is for, made in 2004, and it is still the most radical thing about Millennium Park.</p>

<p>Somebody behind me spent the interval explaining to a visitor that yes, it was always free, and no, you did not need to book. They sounded personally proud of it.</p>

${E.instagram('DbZdfnODpxC', { caption: 'Orchestra and crowd' })}

${E.instagram('DbZneDAFjh2', { caption: 'Pritzker Pavilion, Ben Folds night' })}

<p>Seventy players, a piano, and a zero-dollar ticket on a Wednesday in July. The lawn was full by seven.</p>

<p class="cn-cover-credit">Cover image: Jay Pritzker Pavilion / Wikimedia Commons</p>`,
  sources: [
    { name: 'Grant Park Music Festival — 2026 concerts', url: 'https://www.grantparkmusicfestival.com/2026-concerts/' },
    { name: 'Grant Park Music Festival', url: 'https://www.grantparkmusicfestival.com/' },
    { name: 'City of Chicago — Millennium Park', url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park.html' },
  ],
  photos: [
    { slot: 'cover', subject: 'Pritzker Pavilion trellis', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Jay_Pritzker_Pavilion_Chicago_HiRes.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Lawn at dusk', source: 'Instagram — @kulrichpapczun', license: 'EMBED', contact: 'https://www.instagram.com/p/DbZqqUejCh1/', credit: '@kulrichpapczun via Instagram' },
    { slot: 'body-2', subject: 'Orchestra and crowd', source: 'Instagram — @sealchicago', license: 'EMBED', contact: 'https://www.instagram.com/p/DbZdfnODpxC/', credit: '@sealchicago via Instagram' },
    { slot: 'body-3', subject: 'Pavilion wide', source: 'Instagram — @swallowstudios', license: 'EMBED', contact: 'https://www.instagram.com/p/DbZneDAFjh2/', credit: '@swallowstudios via Instagram' },
  ],
},

{
  ref: 'D127',
  title: 'Liz Phair and Sleater-Kinney Co-Headlined the Salt Shed',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-19',
  event_dates: 'September 17, 2026',
  venue: 'The Salt Shed',
  neighborhood: 'Goose Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Morton_Salt.jpg',
  cover_credit: 'Morton Salt complex, Goose Island / Wikimedia Commons',
  cover_alt: 'The former Morton Salt plant on Elston Avenue, now The Salt Shed',
  excerpt: 'The Flannel and the Fury tour brought Exile in Guyville home to a converted salt plant, with Frankie Cosmos opening. A Chicago record played in a Chicago warehouse, thirty-three years late.',
  body: `<p>The Salt Shed holds the cold of the river longer than the street outside does, and in the middle of September that means the room is comfortable about an hour before anywhere else in the city is. <strong>Liz Phair</strong> and <strong>Sleater-Kinney</strong> co-headlined here on September 17th, on a fourteen-date run billed as The Flannel and the Fury, with <strong>Frankie Cosmos</strong> opening.</p>

<p><em>Exile in Guyville</em> was recorded in this city in 1993 as a track-by-track answer to a Rolling Stones album, by a woman from Winnetka whom the Chicago indie scene of the time largely patronised. Nobody in that room needed the recap.</p>

<p>Co-headlining is a specific arrangement and usually a compromise. This one worked because the two acts are not competing for the same thing: Phair writes songs that are embarrassed by their own feeling, and Sleater-Kinney write songs that are not embarrassed by anything.</p>

<h3>Two Bands, One Room</h3>

<p>Frankie Cosmos went first to a room still filling, playing short songs very quietly, which is a difficult proposition in a converted industrial shed and was the right contrast to what followed.</p>

<p><strong>"Divorce Song"</strong> was the Phair moment — a song built on a conversational vocal and a guitar part that barely moves, and in a room this size it depended entirely on the crowd shutting up, which they did. <strong>"Dig Me Out"</strong> was the Sleater-Kinney moment and the loudest the night got, Corin Tucker's voice doing the thing it has done since 1997, which is to arrive like a structural problem.</p>

${E.instagram('DdaszIfEac0', { caption: 'The Flannel and the Fury, September 17' })}

<h3>A Salt Plant With A PA</h3>

<p>This building stored road salt for the Morton Salt Company from 1929, and the pile inside it was visible from the Kennedy for most of the twentieth century. It became a music venue in 2022, and the conversion kept the shed's volume rather than subdividing it, which is why the room sounds the way it does: a hard, reflective box with enough height that the reflections arrive late enough to read as space instead of mud. Guitar bands benefit. Anything with sub-bass does not.</p>

<p>For a bill of three guitar acts it is close to the best room in Chicago, and it is the direct beneficiary of what happened to the mid-size circuit when Pitchfork left town — the same campus that now hosts Warm Love Cool Dreams in May and took the Silver Room Block Party in July.</p>

${E.instagram('Ddg1HcWFePX', { caption: 'Tour poster, fourteen dates' })}

${E.instagram('DXrtaP4gUMa', { caption: 'The Flannel and the Fury tour' })}

<p>Joshua Mellin shot the night and had the frames out by morning. A Winnetka record came home to a salt shed and filled it.</p>

<p class="cn-cover-credit">Cover image: Morton Salt complex, Goose Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'The Salt Shed', url: 'https://www.saltshedchicago.com/' },
    { name: 'Liz Phair official', url: 'https://lizphair.net/' },
    { name: 'Sleater-Kinney official', url: 'https://www.sleater-kinney.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Morton Salt complex', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Morton_Salt.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Co-headline set', source: 'Instagram — @bhilverda', license: 'EMBED', contact: 'https://www.instagram.com/p/DdaszIfEac0/', credit: '@bhilverda via Instagram' },
    { slot: 'body-2', subject: 'Tour poster', source: 'Instagram — @frankiecombos', license: 'EMBED', contact: 'https://www.instagram.com/p/Ddg1HcWFePX/', credit: '@frankiecombos via Instagram' },
    { slot: 'body-3', subject: 'Tour announcement', source: 'Instagram — @lizphairofficial', license: 'EMBED', contact: 'https://www.instagram.com/p/DXrtaP4gUMa/', credit: '@lizphairofficial via Instagram' },
    { slot: 'upgrade', subject: 'Professional set photography', source: 'Joshua Mellin', license: 'ASK', contact: 'Shot the Sept 17 Salt Shed date — named photographer with a full set', credit: 'Photo: Joshua Mellin' },
  ],
},

]
