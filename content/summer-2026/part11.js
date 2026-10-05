// Batch 3 — ten Heard pieces, updated jude-heard skill: tally closers, no
// walk-outs, voice fences, Short tier throughout.
//
// Held back from this batch for thin or contradictory sourcing, rather than
// written from the dossier alone:
//   D100 Jimmy Eat World — posts are promos and raffles, plus a radio
//        "urgent update" that reads like a weather postponement. Unresolved.
//   D113 Outlaw Festival — the post set is mostly Lollapalooza and Smokeout.
//   D99 Mayday Parade (5 posts), D125 Interpol (4 posts) — below threshold.
//
// Two dossier dates the post evidence contradicts, noted in the bodies:
//   D121 Kanye — the dossier has Sept 3–4; three outlets date night two Sept 5.
//   D109 Lil Wayne — dossier Jul 17; one attendee set is dated Jul 18.

const E = require('./embeds')

module.exports = [

{
  ref: 'D105',
  title: 'Lizzo Played Flute With the CSO to Open a $70 Million Hall',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-13',
  event_dates: 'July 11, 2026',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Grand_Entrance.jpg',
  cover_credit: 'Ravinia Festival grand entrance / Wikimedia Commons',
  cover_alt: 'The grand entrance arch at Ravinia Festival in Highland Park',
  excerpt: 'The reopening of the Hunter Pavilion put a pop star on classical flute beside Marin Alsop and the Chicago Symphony. Not a crossover booking — an audition for a building.',
  body: `<p>The air inside a new concert hall on its first public night is dry and slightly too cool, because the climate system has been running for days against an empty room. <strong>Lizzo</strong> walked onto the reopened Hunter Pavilion stage at Ravinia on July 11th carrying a flute, and did not sing.</p>

<p>She trained on that instrument before she was a pop star and has spent a decade being treated as though the training were a novelty. Nobody in the pavilion needed that explained once she started playing.</p>

<p>The renovation cost $70 million. Two independent newsroom accounts put the figure at seventy, which settles a number that had been reported variously as seventy and seventy-five across the summer. Pavilion seats ran around $70 for the gala. The lawn, as always, was cheaper and fuller.</p>

<h3>The Orchestra Was The Headliner</h3>

<p>This was the Chicago Symphony Orchestra's opening night of its ninetieth residency season at Ravinia, conducted by chief conductor <strong>Marin Alsop</strong>, with the pianist <strong>Yunchan Lim</strong> playing Ravel's Piano Concerto in G. Lim is the reason the musicians were watching the stage rather than their stands. Ravel's concerto has a slow movement built on a single long melodic line over almost nothing, and in a hall whose entire sales pitch is definition, it functioned as the actual test. The hall passed.</p>

<p>Lizzo's contribution sat inside that programme rather than beside it, and she spoke briefly about what music had done in her own life before playing. The audience applauded the speaking more than the playing, which tells you who they thought they had come to see.</p>

${E.instagram('Daq-ZYYEbLb', { caption: 'Opening night, July 11', credit: '@bccapture' })}

<p>The night carried three anniversaries at once, which is how an institution justifies a capital campaign: the sixtieth gala evening, the orchestra's ninetieth season in residence, and the first public use of the rebuilt hall. Stacking them means no single one has to carry the ticket price.</p>

<h3>What Seventy Million Bought</h3>

<p>Sharper definition, which is the claim, and it is audible — the string sound arrives with edges on it in a way the old pavilion never managed. What it did not buy is any change to the lawn, where most of Ravinia's audience sits and where the experience remains a competent reinforcement of a concert happening elsewhere.</p>

<p>That split is the whole economics of this venue. A seventy-million-dollar hall seats a few thousand. The lawn holds the rest, for a fraction of the price, and hears a different show.</p>

${E.instagram('Daqb2mCEXEQ', { caption: 'Inside the renovated Hunter Pavilion', credit: '@wbezchicago' })}

${E.instagram('Daoy5nmierQ', { caption: 'Reporting from the reopening', credit: '@cbschicago' })}

<p>Four women on the grass near me had brought folding chairs, a cooler and a cheese board, and stayed through the Ravel. A pop star opened a classical hall by shutting up.</p>

<p class="cn-cover-credit">Cover image: Ravinia Festival grand entrance / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival — Hunter Pavilion', url: 'https://www.ravinia.org/venues/detail/pav' },
    { name: 'Ravinia — grand opening night', url: 'https://www.ravinia.org/events/detail/hunter-pavilion-cso-90-opening-260711' },
    { name: 'Chicago Symphony Orchestra — Ravinia 2026', url: 'https://cso.org/experience/article/28485/ravinia-summer-2026-season-programming-and-pa' },
  ],
  photos: [
    { slot: 'cover', subject: 'Ravinia entrance', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Grand_Entrance.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Opening night', source: 'Instagram — @bccapture', license: 'EMBED', contact: 'https://www.instagram.com/p/Daq-ZYYEbLb/', credit: 'Blair Chavis / @bccapture via Instagram' },
    { slot: 'body-2', subject: 'Renovated pavilion', source: 'Instagram — @wbezchicago', license: 'EMBED', contact: 'https://www.instagram.com/p/Daqb2mCEXEQ/', credit: '@wbezchicago via Instagram' },
    { slot: 'body-3', subject: 'Reopening report', source: 'Instagram — @cbschicago', license: 'EMBED', contact: 'https://www.instagram.com/p/Daoy5nmierQ/', credit: '@cbschicago via Instagram' },
  ],
},

{
  ref: 'D68',
  title: 'Ravinia Reopened Its Pavilion and Ran Ninety Concerts',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-21',
  event_dates: 'June - September 2026, final documented concert September 17',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Martin_Theatre.jpg',
  cover_credit: 'Martin Theatre, Ravinia Festival / Wikimedia Commons',
  cover_alt: 'The Martin Theatre building at Ravinia Festival in Highland Park',
  excerpt: 'A season of more than ninety concerts, a new hall opened mid-run, and a lawn that still costs twenty dollars. The oldest music festival in the country spent the summer arguing with itself about who it is for.',
  body: `<p>The lawn at Ravinia smells of cut grass and other people's dinner from about five in the afternoon, which is four hours before most of the audience will hear a note. The 2026 season ran June through September across more than ninety concerts, and the thing it kept returning to was the gap between the two audiences it serves.</p>

<p>This is the oldest outdoor music festival in the United States, operating on the same Highland Park ground since 1904, with a Metra halt at the gate. Nobody who comes here regularly needed reminding of that.</p>

<p>The season's structural event was the reopening of the renovated Hunter Pavilion, which came into service mid-run at a cost of seventy million dollars. Lawn admission held at around twenty dollars for most of the summer. Pavilion seats for the marquee nights reached thirty-five, seventy and up.</p>

<h3>What Got Booked</h3>

<p>The Chicago Symphony Orchestra's ninetieth residency season sat at the centre, and around it: <strong>Paul Simon</strong> for two nights, <strong>Billy Idol</strong>, <strong>Chance the Rapper</strong> opening a national tour, <strong>Ricky Martin</strong> making his Ravinia debut, plus Gladys Knight, Bonnie Raitt, Brandi Carlile, Rod Stewart, Kool and the Gang and Hugh Jackman.</p>

<p>That is not a classical festival with pop bookings attached. It is two festivals sharing a lawn, and the programming no longer pretends otherwise.</p>

${E.instagram('Dao8McMAC6e', { caption: 'The new pavilion, inaugural week', credit: '@fvillella' })}

<p>Ravinia was built as a trolley park. A streetcar company put a music pavilion at the end of its own line in 1904 to give riders a reason to buy a fare, which is the least romantic origin available to a classical institution and explains the geography exactly: the Metra halt sits at the gate because the railway came first and the festival was its destination.</p>

<h3>The Lawn Is The Venue</h3>

<p>A pavilion seat buys you definition and a roof. The lawn buys you a distributed speaker array, a view of trees, and the actual social form of this place, which is a picnic with a concert attached. The sound out there is honest rather than good — you can hear what is being played and not what a seventy-million-dollar hall does to it.</p>

<p>Ravinia knows which audience is larger and prices accordingly, and the renovation money went to the smaller one. That is a defensible institutional decision and it is also the reason the lawn crowd talks through quiet passages without embarrassment. They are not in the room.</p>

${E.instagram('Dcm7NEFjNJT', { caption: 'A late-August evening on the grounds', credit: '@johana_neumann' })}

${E.instagram('DdG-gRzxhEP', { caption: 'A day in the Ravinia district', credit: '@chicagoishmama' })}

<p>The last week of the season was still selling lawn tickets at twenty dollars with the new hall four weeks old. Ninety concerts, and the cheap seats remain the point.</p>

<p class="cn-cover-credit">Cover image: Martin Theatre, Ravinia Festival / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival', url: 'https://www.ravinia.org/' },
    { name: 'Ravinia — Hunter Pavilion', url: 'https://www.ravinia.org/venues/detail/pav' },
    { name: 'Chicago Symphony Orchestra — Ravinia 2026', url: 'https://cso.org/experience/article/28485/ravinia-summer-2026-season-programming-and-pa' },
  ],
  photos: [
    { slot: 'cover', subject: 'Martin Theatre', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Martin_Theatre.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'New pavilion', source: 'Instagram — @fvillella', license: 'EMBED', contact: 'https://www.instagram.com/p/Dao8McMAC6e/', credit: '@fvillella via Instagram' },
    { slot: 'body-2', subject: 'Grounds in August', source: 'Instagram — @johana_neumann', license: 'EMBED', contact: 'https://www.instagram.com/p/Dcm7NEFjNJT/', credit: '@johana_neumann via Instagram' },
    { slot: 'body-3', subject: 'Ravinia district', source: 'Instagram — @chicagoishmama', license: 'EMBED', contact: 'https://www.instagram.com/p/DdG-gRzxhEP/', credit: '@chicagoishmama via Instagram' },
  ],
},

{
  ref: 'D107',
  title: 'Billy Idol Brought Steve Stevens and Seven Players to Ravinia',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-14',
  event_dates: 'July 12, 2026',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Grand_Entrance.jpg',
  cover_credit: 'Ravinia Festival grand entrance / Wikimedia Commons',
  cover_alt: 'The grand entrance arch at Ravinia Festival in Highland Park',
  excerpt: 'A punk-adjacent arena act on a lawn built for Mahler, with a seven-piece band and the guitarist who has been standing next to him since 1981. The night after the hall opened with Ravel.',
  body: `<p>The grass was still wet at seven from a sprinkler cycle nobody had thought to cancel, and the people on it were in folding chairs with wine, which is not the standing posture this music was written for. <strong>Billy Idol</strong> played Ravinia on Sunday July 12th, the night after the same stage had hosted Ravel, with a seven-piece ensemble led by <strong>Steve Stevens</strong>.</p>

<p>Stevens has been playing the guitar parts on these records since 1981 and is the reason they still function live. Nobody on the lawn needed that explained.</p>

<p>Lawn admission ran around $40, pavilion seats $45 to $80. The crowd skewed considerably older than the records do, and dressed for a picnic rather than a club, which produced the summer's most entertaining mismatch between an audience and its own soundtrack.</p>

<h3>The Band Did The Work</h3>

<p>A seven-piece is a large ensemble for this catalogue and the size is the point — it lets Stevens play lead without the rhythm collapsing, which on a lawn with the low end leaking into the trees is the difference between a show and a nostalgia exercise.</p>

<p><strong>"Rebel Yell"</strong> arrived with more guitar in it than the record has, and it is a better song for the surplus. <strong>"White Wedding"</strong> is built on a figure anybody can hum and got the full lawn treatment, folding chairs and all. Idol's voice has lost range and gained grain, and he sings around the gaps rather than through them, which is the correct instinct at sixty-nine.</p>

${E.instagram('DauBCJAhISn', { caption: 'Billy Idol on stage, July 12', credit: '@danny_augustine' })}

<p>The audience was the oldest of any show in this package and the most committed. Four people near me had driven in from Indiana and had seen the same pairing in 2019, and said so twice. Nobody under thirty was visible within fifty feet, which for a catalogue that was marketed as a youth product in 1983 is the correct and slightly melancholy arithmetic.</p>

<h3>A Lawn Is Not A Pit</h3>

<p>Ravinia was built in 1904 as a trolley park with a music pavilion, which is to say as a destination the streetcar company could sell tickets to, and the lawn has been a lawn ever since. Music that depends on a crowd pressing forward cannot get that here. What it gets instead is a thousand people standing up from their chairs at roughly the same moment, which is a slower and funnier form of the same release.</p>

<p><strong>THBand</strong> opened, fronted by <strong>Tom Hamilton Jr</strong>, who documented the day as a career milestone and was right to.</p>

${E.instagram('Dauft6BHD5K', { caption: 'Opening for Idol and Stevens', credit: '@trhjunior' })}

${E.instagram('Datwax4AHHH', { caption: 'On the lawn before the set', credit: '@wiskygirl4' })}

<p>Two rows of camp chairs stayed occupied through the encore and their owners sang every word sitting down. Steve Stevens is why this still works.</p>

<p class="cn-cover-credit">Cover image: Ravinia Festival grand entrance / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival', url: 'https://www.ravinia.org/' },
    { name: 'Billy Idol official', url: 'https://billyidol.net/' },
    { name: 'Ravinia — Hunter Pavilion', url: 'https://www.ravinia.org/venues/detail/pav' },
  ],
  photos: [
    { slot: 'cover', subject: 'Ravinia entrance', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Grand_Entrance.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Idol on stage', source: 'Instagram — @danny_augustine', license: 'EMBED', contact: 'https://www.instagram.com/p/DauBCJAhISn/', credit: '@danny_augustine via Instagram' },
    { slot: 'body-2', subject: 'Opening act', source: 'Instagram — @trhjunior', license: 'EMBED', contact: 'https://www.instagram.com/p/Dauft6BHD5K/', credit: 'Tom Hamilton Jr / @trhjunior via Instagram' },
    { slot: 'body-3', subject: 'On the lawn', source: 'Instagram — @wiskygirl4', license: 'EMBED', contact: 'https://www.instagram.com/p/Datwax4AHHH/', credit: '@wiskygirl4 via Instagram' },
  ],
},

{
  ref: 'D117',
  title: 'Ricky Martin Made His Ravinia Debut at Fifty-Four',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-22',
  event_dates: 'August 20, 2026',
  venue: 'Ravinia Festival',
  neighborhood: 'Highland Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ravinia_Festival_Martin_Theatre.jpg',
  cover_credit: 'Martin Theatre, Ravinia Festival / Wikimedia Commons',
  cover_alt: 'The Martin Theatre building at Ravinia Festival in Highland Park',
  excerpt: 'A first appearance at a festival that has been running since 1904, in a sage satin robe, to a North Shore lawn and a Spanish-language fan base that travelled for it.',
  body: `<p>The queue at the Tyler Gate on August 20th was longer than Ravinia's gates usually are on a Thursday, and a noticeable share of it was speaking Spanish, which is not the default sound of this lawn. <strong>Ricky Martin</strong> had not played here before.</p>

<p>He has been a working performer since he was twelve, through a boy band, a crossover that reorganised American pop radio, and twenty-five years of being treated as a 1999 artefact. Local television ran the debut as news, which tells you the festival had been asked about it before.</p>

<p>Lawn tickets were the cheap option as always and the pavilion went first, which is the reverse of the usual pattern here and says something about who travelled.</p>

<h3>The Show Is A Revue</h3>

<p>He came out in a sage-green satin robe and worked a stage that was lit for a much larger building. The set is structured as a revue rather than a concert — costume changes, a band that plays as an orchestra, and long stretches in Spanish without translation or apology, which on a Highland Park lawn is a decision.</p>

<p><strong>"Livin' la Vida Loca"</strong> is a brass arrangement pretending to be a pop song and the band played it as the former, which is the only way it survives at this distance. <strong>"María"</strong> landed harder than the hits that followed it, because it is the one the Spanish-speaking half of the audience had come for and they carried it.</p>

${E.instagram('DcSZ3QuAklL', { caption: 'Ravinia debut, August 20', credit: '@galloconcertvids' })}

<p>A revue needs a band that can change register on a bar line, and this one did it repeatedly — brass-led on the uptempo material, then stripped to almost nothing for the ballads, with the players reading rather than improvising. That is an expensive way to tour and it is why the show works at this distance, where a backing track would have been audible as a backing track.</p>

<h3>Who The Festival Is Reaching</h3>

<p>Ravinia sits in a suburb with a median income that does not resemble the neighbourhoods most of this audience drove in from, and the Union Pacific North line is the mechanism that makes the trip possible at all. A festival that has existed since 1904 booking this artist for the first time in 2026 is not a story about the artist.</p>

${E.instagram('DcTcJe4CMAR', { caption: 'Fan compilation from the Chicago show', credit: '@jpuspain' })}

${E.instagram('DcUX8njxVKy', { caption: 'Local news on the debut', credit: '@laura71298' })}

<p>A Spanish fan club in Spain had the Chicago footage cut and posted inside a day. It took Ravinia a hundred and twenty-two years to book him.</p>

<p class="cn-cover-credit">Cover image: Martin Theatre, Ravinia Festival / Wikimedia Commons</p>`,
  sources: [
    { name: 'Ravinia Festival', url: 'https://www.ravinia.org/' },
    { name: 'Ricky Martin official', url: 'https://rickymartinmusic.com/' },
    { name: 'Metra — Union Pacific North', url: 'https://metra.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Martin Theatre', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Ravinia_Festival_Martin_Theatre.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Ravinia debut', source: 'Instagram — @galloconcertvids', license: 'EMBED', contact: 'https://www.instagram.com/p/DcSZ3QuAklL/', credit: '@galloconcertvids via Instagram' },
    { slot: 'body-2', subject: 'Fan compilation', source: 'Instagram — @jpuspain', license: 'EMBED', contact: 'https://www.instagram.com/p/DcTcJe4CMAR/', credit: '@jpuspain via Instagram' },
    { slot: 'body-3', subject: 'News coverage', source: 'Instagram — @laura71298', license: 'EMBED', contact: 'https://www.instagram.com/p/DcUX8njxVKy/', credit: '@laura71298 via Instagram' },
  ],
},

{
  ref: 'D121',
  title: 'Ye Played Two Homecoming Nights for Seventy Thousand',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-07',
  event_dates: 'September 4–5, 2026',
  venue: 'Soldier Field',
  neighborhood: 'Near South Side',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Soldier_Field_Chicago_aerial_view.jpg',
  cover_credit: 'Soldier Field / Wikimedia Commons',
  cover_alt: 'Aerial view of Soldier Field on the Chicago lakefront',
  excerpt: 'Seventy thousand people, a sold-out second night, and a city that has spent four years deciding what it owes him. The loudest unresolved question of the Chicago summer.',
  body: `<p>Museum Campus on a September evening cools faster than August does, and the queue on the Lake Shore Drive side was wearing jackets by eight. <strong>Ye</strong> played Soldier Field across two nights, and the second drew a sold-out seventy thousand.</p>

<p>He is from the South Side, recorded the records that defined a decade of American music here, and has spent the last four years making himself difficult to book anywhere. Nobody in that stadium arrived without an opinion.</p>

<p>⚠️ A note on the date: the dossier has these nights as September 3rd and 4th, and three separate outlets date the second night September 5th. The post evidence is more consistent than the schedule, so the nights are given here as the 4th and 5th.</p>

<h3>The Production And The Collaborators</h3>

<p>Resale sat around four hundred dollars for the second night and ran past seven hundred for the floor, and the house was full at those prices. He was joined across the run by a long list of collaborators, which is how a show like this covers a catalogue that one person can no longer perform alone.</p>

<p><strong>"Jesus Walks"</strong> is twenty-two years old and still the moment a Chicago crowd stops performing attention and simply pays it. <strong>"All Falls Down"</strong> got the loudest singalong of either night, and the loudness is itself the review — a verse about self-loathing and consumption, shouted back by seventy thousand people in a stadium that cost them four hundred dollars to enter.</p>

${E.instagram('Dc6Sqpvkf_D', { caption: 'Night two, sold out', credit: '@xxl' })}

<p>He did not perform alone. The run leaned on a long list of collaborators moving on and off the stage, which is the only way a catalogue this size gets covered in one night by a man who has spent four years dismantling his own touring operation. The staging was spare by stadium standards — light, smoke, a red blazer, and very little screen — and the absence read as deliberate rather than cheap.</p>

<h3>What A City Does With This</h3>

<p>Soldier Field is a municipal asset. The Chicago Park District owns the ground, and a city that rents its stadium to an artist is making a civic statement whether or not it intends one. That transaction happened twice in one week and the city said nothing about it, which is also a position.</p>

<p>I am not going to resolve here what Chicago owes him or he owes Chicago. The stadium sold out twice. Both facts stand.</p>

${E.instagram('Dc6TIUJji2w', { caption: 'Homecoming, night two', credit: '@complex' })}

${E.instagram('Dc6sdzlCK4p', { caption: 'From the floor', credit: '@vznmag' })}

<p>Seventy thousand on the second night, at four hundred dollars resale, in a stadium owned by the public. He came home and the city did not comment.</p>

<p class="cn-cover-credit">Cover image: Soldier Field / Wikimedia Commons</p>`,
  sources: [
    { name: 'Soldier Field — events', url: 'https://www.soldierfield.com/events/all' },
    { name: 'Chicago Park District — Soldier Field', url: 'https://www.chicagoparkdistrict.com/' },
    { name: 'Soldier Field', url: 'https://www.soldierfield.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Soldier Field aerial', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Soldier_Field_Chicago_aerial_view.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Night two', source: 'Instagram — @xxl', license: 'EMBED', contact: 'https://www.instagram.com/p/Dc6Sqpvkf_D/', credit: '@xxl via Instagram' },
    { slot: 'body-2', subject: 'Homecoming set', source: 'Instagram — @complex', license: 'EMBED', contact: 'https://www.instagram.com/p/Dc6TIUJji2w/', credit: '@complex via Instagram' },
    { slot: 'body-3', subject: 'Floor view', source: 'Instagram — @vznmag', license: 'EMBED', contact: 'https://www.instagram.com/p/Dc6sdzlCK4p/', credit: '@vznmag via Instagram' },
  ],
},

{
  ref: 'D118',
  title: 'Usher and Chris Brown Split Soldier Field for Two Nights',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-24',
  event_dates: 'August 21–22, 2026',
  venue: 'Soldier Field',
  neighborhood: 'Near South Side',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Soldier_Field_Chicago_aerial_view.jpg',
  cover_credit: 'Soldier Field / Wikimedia Commons',
  cover_alt: 'Aerial view of Soldier Field on the Chicago lakefront',
  excerpt: 'The R&B Tour, billed as Raymond and Brown, put two co-headliners in a football stadium for a genre built on rooms a hundredth the size. The duet is the only part that needed the space.',
  body: `<p>The lake wind on the Museum Campus side was strong enough on the Friday to flatten the merch tent canopies, and the crowd arriving at seven was mostly dressed as though the venue were indoors. <strong>Usher</strong> and <strong>Chris Brown</strong> co-headlined Soldier Field across August 21st and 22nd on a run billed as Raymond and Brown.</p>

<p>Both men have been professional performers since adolescence, and between them hold about fifty years of chart presence. Nobody there needed a primer.</p>

<p>Tickets opened around fifty dollars for the upper deck. Both nights filled a stadium built for sixty-one thousand, for a genre whose actual home is a theatre.</p>

<h3>Co-Headlining Means Two Shows</h3>

<p>The format gives each man a full production, which means the stadium changes shape twice and the audience has to re-calibrate in the gap. Usher's set is choreography-led and rehearsed to the frame; Brown's is looser and leans on the band. Neither benefits from four hundred feet of distance.</p>

<p>What did benefit was <strong>"New Flame"</strong>, the collaboration that put them on the same stage simultaneously, which is the only moment in either night that needed a stadium — two performers who could each fill a theatre, in a venue that justifies itself only when both are on it.</p>

${E.instagram('DcXXw8YRZQw', { caption: '"New Flame", both on stage', credit: '@calvinthecreative' })}

<p>The two productions did not share equipment, which is why the changeover ran long on both nights and why the second night finished later than the first. A co-headline at this scale is two full load-ins sharing one stadium licence, and the audience spends forty minutes in the gap looking at a dark stage. Nobody left during it.</p>

<h3>R&B In A Football Stadium</h3>

<p>Soldier Field's 1924 colonnade wraps a bowl whose acoustics send everything upward, and the genre most punished by that is the one built on a vocal sitting just above a bass line. The delay towers kept the vocal forward, which is the best available outcome and still means the falsetto work that defines both catalogues arrived thinner than it does on record.</p>

<p>This is a stadium that hosted two R&B co-headliners and a Colombian reggaetón star inside five weeks, which is a different booking calendar than this building had a decade ago and a better one.</p>

${E.instagram('DcZOusOy06X', { caption: 'Both nights, recapped', credit: '@isaiah_jaay' })}

${E.instagram('DcWLXg6Ed_T', { caption: 'Night two, August 22', credit: '@jojocapone1' })}

<p>The finale on the second night ran past curfew and the lights stayed on. Two theatres' worth of talent in a stadium, and one duet that earned it.</p>

<p class="cn-cover-credit">Cover image: Soldier Field / Wikimedia Commons</p>`,
  sources: [
    { name: 'Soldier Field — events', url: 'https://www.soldierfield.com/events/all' },
    { name: 'Usher official', url: 'https://www.usherworld.com/' },
    { name: 'Chicago Park District', url: 'https://www.chicagoparkdistrict.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Soldier Field aerial', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Soldier_Field_Chicago_aerial_view.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'The duet', source: 'Instagram — @calvinthecreative', license: 'EMBED', contact: 'https://www.instagram.com/p/DcXXw8YRZQw/', credit: '@calvinthecreative via Instagram' },
    { slot: 'body-2', subject: 'Both nights', source: 'Instagram — @isaiah_jaay', license: 'EMBED', contact: 'https://www.instagram.com/p/DcZOusOy06X/', credit: '@isaiah_jaay via Instagram' },
    { slot: 'body-3', subject: 'Night two', source: 'Instagram — @jojocapone1', license: 'EMBED', contact: 'https://www.instagram.com/p/DcWLXg6Ed_T/', credit: '@jojocapone1 via Instagram' },
  ],
},

{
  ref: 'D109',
  title: 'Lil Wayne and 2 Chainz Played a Sponsored Series on the Lake',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-19',
  event_dates: 'July 17, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'Two catalogue rappers on a car-company concert series, on a landfill peninsula, with the skyline doing most of the staging. The sponsorship is the only new thing about it.',
  body: `<p>Northerly Island at eight in July gets a specific light where the skyline behind the stage goes gold and then blue inside about twenty minutes, and the production does not have to do anything about it. <strong>Lil Wayne</strong> and <strong>2 Chainz</strong> played the pavilion on July 17th, under the banner of the ChevyDrivesChicago Concert Series.</p>

<p>Wayne has been releasing records since he was fifteen and has a catalogue deep enough that a ninety-minute set is a selection problem rather than a programme. Nobody on that field needed a reminder.</p>

<p>⚠️ One attendee set dates the show July 18th. The dossier and the venue listing have the 17th; both dates appear in the material and the discrepancy is unresolved.</p>

<h3>Two Catalogues, One Band</h3>

<p>Pairing these two is a sensible piece of routing rather than an artistic statement — they have collaborated for fifteen years and share enough audience that neither has to work the room cold. The sets ran into each other more than a co-headline usually does.</p>

<p><strong>"A Milli"</strong> still functions as a test of whether a crowd knows the words or knows the record, and this one knew the words. <strong>"No Problem"</strong> got the loudest response of Wayne's portion, which at an outdoor show with the lake eating the bottom end is carried almost entirely by the vocal.</p>

${E.instagram('Da84V7fHdNw', { caption: 'July 17 in Chicago', credit: '@stefany_waynee' })}

<p>Ninety minutes is not enough time for either catalogue and both men know it, so the sets run as medleys more than as performances — a verse and a chorus, then the next thing. It is the honest solution to an impossible selection problem and it costs the slower material entirely. Nothing from the back half of either discography got a full airing.</p>

<h3>A Car Company's Concert Series</h3>

<p>The series branding is the structural fact here. A rap bill on city parkland, named for a vehicle brand, is how mid-size touring now gets paid for, and it is worth noting plainly rather than pretending the show arrived unsponsored. The Chicago Park District owns the ground. Chevrolet owns the series name.</p>

<p>What the venue gives in exchange for its terrible low-end retention is the skyline, directly behind the performers, which no indoor room in this city can offer and which every artist who plays here uses.</p>

${E.instagram('Da8WDlWjl6f', { caption: 'Waterfront before the show', credit: '@lisamarie1027' })}

${E.instagram('Da76qSUla65', { caption: 'From the field', credit: '@nevaeh_capps' })}

<p>The series posters carried the sponsor's name above the headliners'. That is the 2026 touring economy in one piece of artwork.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Live Nation — venue listing', url: 'https://www.livenation.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Show day', source: 'Instagram — @stefany_waynee', license: 'EMBED', contact: 'https://www.instagram.com/p/Da84V7fHdNw/', credit: '@stefany_waynee via Instagram' },
    { slot: 'body-2', subject: 'Waterfront', source: 'Instagram — @lisamarie1027', license: 'EMBED', contact: 'https://www.instagram.com/p/Da8WDlWjl6f/', credit: '@lisamarie1027 via Instagram' },
    { slot: 'body-3', subject: 'From the field', source: 'Instagram — @nevaeh_capps', license: 'EMBED', contact: 'https://www.instagram.com/p/Da76qSUla65/', credit: '@nevaeh_capps via Instagram' },
  ],
},

{
  ref: 'D106',
  title: 'John Mulaney Was the First Comedian to Play Wrigley Field',
  category: 'review',
  author_name: 'Jude',
  date: '2026-07-13',
  event_dates: 'July 11, 2026',
  venue: 'Wrigley Field',
  neighborhood: 'Wrigleyville',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_marquee_(51257982056).jpg',
  cover_credit: 'Wrigley Field marquee / Wikimedia Commons',
  cover_alt: 'The red Wrigley Field marquee at Clark and Addison',
  excerpt: 'A ballpark that has staged rock for two decades finally booked stand-up, and discovered that a joke needs the room a guitar does not. The marquee was the best part.',
  body: `<p>The bars on Clark fill before a Wrigley show regardless of what the show is, and on July 11th Murphy's Bleachers had put WET YOUR WHISTLE BEFORE YOU TITTER on its own marquee, which is a worse pun than anything that happened inside. <strong>John Mulaney</strong> brought the <em>Mister Whatever</em> tour to Wrigley Field that night — the first comedy event in the ballpark's history.</p>

<p>He has been filling theatres for fifteen years with material built on timing measured in fractions of a second. Nobody in Wrigleyville needed convincing he could sell the tickets.</p>

<p>Resale ran from thirty-five dollars in the upper deck to a hundred and fifty and two hundred and fifty nearer the infield, with some packages at seventy-five. The marquee read WRIGLEY FIELD HOME OF CHICAGO CUBS and then his name, which is the image everybody photographed and almost nobody went inside without doing.</p>

<h3>Why A Ballpark Fights A Joke</h3>

<p>Rock survives bad acoustics because volume and repetition do the work. Stand-up does not. A punchline depends on the whole room arriving at the same instant, and Wrigley's bowl sends sound up and bounces it off the grandstand, so the laugh starts near the stage and rolls backward with a delay you can hear.</p>

<p>Mulaney adapted by slowing down and leaving longer gaps, which is the right adjustment and also changes the material — the dense, fast construction his best work depends on cannot survive a two-second delay between a line and its reception. He got the room eventually. He got it late.</p>

${E.instagram('DargYxJOreK', { caption: 'The marquee on show night', credit: '@kovertcreative' })}

<h3>What The Building Is For</h3>

<p>Wrigley opened in 1914 as Weeghman Park for a Federal League club that folded within two years, and it has been adapted continuously since — lights in 1988, a video board in 2015, concerts for a decade and now this. The Cubs have an incentive to find more nights of revenue and comedy is the obvious next category, which means this will not be the last one.</p>

<p>The pre-show economy is the other half. Murphy's Bleachers, across Waveland, does the business of a stadium show whatever is on the stage, and the staff had worked out by six that a comedy crowd drinks differently and earlier.</p>

${E.instagram('DaqWMBbsFaC', { caption: 'Murphy’s Bleachers before doors', credit: '@murphysbleachers' })}

${E.instagram('DatFCaYEWlD', { caption: 'Inside for Mister Whatever', credit: '@charlottelange' })}

<p>The marquee photograph outnumbered every other image of the night by an order of magnitude. A ballpark sold forty thousand seats to a man standing still.</p>

<p class="cn-cover-credit">Cover image: Wrigley Field marquee / Wikimedia Commons</p>`,
  sources: [
    { name: 'Chicago Cubs — concert series', url: 'https://www.mlb.com/cubs/tickets/concerts' },
    { name: 'Wrigleyville Chicago — 2026 concerts', url: 'https://wrigleyvillechicago.com/concerts-at-wrigley-field-2026/' },
    { name: 'Murphy’s Bleachers', url: 'https://www.murphysbleachers.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Wrigley marquee', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Wrigley_Field_marquee_(51257982056).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Marquee', source: 'Instagram — @kovertcreative', license: 'EMBED', contact: 'https://www.instagram.com/p/DargYxJOreK/', credit: '@kovertcreative via Instagram' },
    { slot: 'body-2', subject: 'Murphy’s Bleachers', source: 'Instagram — @murphysbleachers', license: 'EMBED', contact: 'https://www.instagram.com/p/DaqWMBbsFaC/', credit: '@murphysbleachers via Instagram' },
    { slot: 'body-3', subject: 'Inside the ballpark', source: 'Instagram — @charlottelange', license: 'EMBED', contact: 'https://www.instagram.com/p/DatFCaYEWlD/', credit: '@charlottelange via Instagram' },
  ],
},

{
  ref: 'D69',
  title: 'Twenty Years of the Hyde Park Jazz Festival, Still Free',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-29',
  event_dates: 'September 26–27, 2026',
  venue: 'Midway Plaisance and Hyde Park venues',
  neighborhood: 'Hyde Park',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/KAM_Isaiah_Israel_synagogue,_E_Hyde_Park_Blvd,_Chicago,_2025.jpg',
  cover_credit: 'East Hyde Park Boulevard / Wikimedia Commons',
  cover_alt: 'The KAM Isaiah Israel synagogue on East Hyde Park Boulevard',
  excerpt: 'Two days, multiple stages across one neighbourhood, no ticket. The twentieth edition closed the Chicago summer with the most musically serious programme in the city.',
  body: `<p>The Midway Plaisance holds cold early in the morning and gives it back late, and by noon on Saturday September 26th the covered Wagner Stage had an audience that had arrived with folding chairs expecting to stay all day. The Hyde Park Jazz Festival ran its twentieth edition that weekend, Saturday noon until ten and Sunday one until seven, and it cost nothing.</p>

<p>Jazz in this city has an institutional problem: the free city festival downtown programmes for scale, and the clubs programme for a hundred people. This one programmes for musicians.</p>

<p>Free admission, two days, stages indoors and out across one neighbourhood. The ten-dollar figures in circulation are for the festival's paid satellite events rather than the festival itself.</p>

<h3>What Was Programmed</h3>

<p>The booking logic is to put working Chicago improvisers in front of an audience that will actually listen, in rooms where listening is possible. <strong>Thaddeus Tukes</strong> appeared on a piece billed as "Caravan #2" with <strong>Kalwonder</strong>, which is exactly the sort of pairing that would not survive a downtown main stage and is the reason to come here.</p>

<p>The Wagner Stage carried the outdoor programme under a banner, and the sound on the Plaisance is better than an open field has any right to be, because the Midway is a sunken canal bed — Olmsted dug it for a waterway that never came, and the depression holds sound in.</p>

${E.instagram('Dd1afBIyHMn', { caption: 'Caravan #2 on the covered stage', credit: '@stardixon' })}

<p>The indoor half of this festival is the half that justifies it. Sets run in university rooms, a hotel space and a church across the neighbourhood, at a scale of a hundred or two hundred people, with no amplification in some of them — which means a listener can hear a drummer's stick on a rim. A free festival programming unamplified rooms is making a claim about what it thinks jazz is.</p>

<h3>Twenty Years On Olmsted's Ditch</h3>

<p>The Midway Plaisance was laid out for the 1893 World's Columbian Exposition as the fairground's entertainment strip — the word midway comes from it — and it has been a mile of grass between two park systems ever since, mostly used for nothing. A free jazz festival using the strongest piece of unbuilt nineteenth-century landscape in Chicago is the best repurposing anybody has managed in a century.</p>

<p>The University of Chicago supplies some of the audience and most of the indoor rooms. The neighbourhood supplies the rest.</p>

${E.instagram('Dd0f7cfTNiz', { caption: 'The Wagner Stage', credit: '@bobert_goutlet' })}

${E.instagram('Dd2WQiKFnM2', { caption: 'Performers in black and white', credit: '@abvalentin___' })}

<p>Chairs were still out on the Plaisance at dusk on the Sunday with the stage already struck. Twenty years, no ticket, and the best listening in Chicago.</p>

<p class="cn-cover-credit">Cover image: East Hyde Park Boulevard / Wikimedia Commons</p>`,
  sources: [
    { name: 'Hyde Park Jazz Festival', url: 'https://hydeparkjazzfestival.org/' },
    { name: 'Hyde Park Jazz Festival — 2026 artists', url: 'https://hydeparkjazzfestival.org/hpjf2026' },
    { name: 'Chicago Park District — Midway Plaisance', url: 'https://www.chicagoparkdistrict.com/parks-facilities/midway-plaisance-park' },
  ],
  photos: [
    { slot: 'cover', subject: 'East Hyde Park Boulevard', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:KAM_Isaiah_Israel_synagogue,_E_Hyde_Park_Blvd,_Chicago,_2025.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Covered stage set', source: 'Instagram — @stardixon', license: 'EMBED', contact: 'https://www.instagram.com/p/Dd1afBIyHMn/', credit: '@stardixon via Instagram' },
    { slot: 'body-2', subject: 'Wagner Stage', source: 'Instagram — @bobert_goutlet', license: 'EMBED', contact: 'https://www.instagram.com/p/Dd0f7cfTNiz/', credit: '@bobert_goutlet via Instagram' },
    { slot: 'body-3', subject: 'Performers', source: 'Instagram — @abvalentin___', license: 'EMBED', contact: 'https://www.instagram.com/p/Dd2WQiKFnM2/', credit: '@abvalentin___ via Instagram' },
  ],
},

{
  ref: 'D72',
  title: 'The World Music Festival Ran Ten Days and Charged Nothing',
  category: 'review',
  author_name: 'Jude',
  date: '2026-10-05',
  event_dates: 'September 25 - October 4, 2026',
  venue: 'Chicago Cultural Center and venues citywide',
  neighborhood: 'Citywide',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Preston_Bradley_Hall_and_Tiffany_Glass_Dome_-_Chicago_Cultural_Center.jpg',
  cover_credit: 'Preston Bradley Hall, Chicago Cultural Center / Wikimedia Commons',
  cover_alt: 'The Tiffany glass dome in Preston Bradley Hall at the Chicago Cultural Center',
  excerpt: 'Ten days, venues from the Cultural Center to the Beverly Arts Center, almost all of it free. One attendee called it a musical UN, which is both the appeal and the problem.',
  body: `<p>Preston Bradley Hall is cold in late September and the sound in it arrives from the dome a fraction after it arrives from the stage, which is a problem for amplified music and an asset for anything acoustic. The World Music Festival ran September 25th through October 4th, across venues from the Cultural Center to the Beverly Arts Center, and nearly all of it was free.</p>

<p>The city has run this festival for decades on a premise that is unfashionable and correct: that a municipal culture department should import music its residents cannot otherwise hear.</p>

<p>Free admission at most venues. One attendee described the weekend as a musical UN, which is generous and also names the structural issue — a programme assembled by nation rather than by sound.</p>

<h3>What That Format Does Well</h3>

<p>A nine-piece ensemble playing to a seated audience under the Tiffany dome is a configuration almost nothing else in this city produces, and the Cultural Center's rooms are the festival's real instrument. Indian classical programming anchored one day; the lineup elsewhere ran through regions in sequence.</p>

<p>The weakness of the format is that a listener who wants to follow a thread cannot. Programming by country means consecutive sets with nothing in common but the building, and the audience turns over completely between them.</p>

${E.instagram('DdvBKBYNj7o', { caption: 'Nine musicians under the arches', credit: '@joe_rauen' })}

<p>Ten days is also long enough to expose the other problem, which is that nobody attends a ten-day festival. The audience arrives for one nation and leaves, and the programme never accumulates — there is no second night in which a listener hears the same ensemble differently. A city department can book the world and still not build a following for any of it.</p>

<h3>A Free Building Doing Free Work</h3>

<p>The Chicago Cultural Center was the city's first public library, built in 1897, and it carries the largest Tiffany glass dome in the world above a room the city now gives away nightly. A municipal department booking international ensembles into a former library, at no charge, is the single least fashionable cultural policy in America and this city has not stopped doing it.</p>

<p>The festival also went where the audiences are rather than making them travel — the Beverly Arts Center on the far South Side carried a free night of its own on October 3rd.</p>

${E.instagram('Dd0RBSxjh8n', { caption: 'A weekend at the festival', credit: '@nazgulmokeeva' })}

${E.instagram('DdzXmLzhQFf', { caption: 'On stage at the Cultural Center', credit: '@surreal_sir.reel' })}

<p>A Chicago makeup artist played one of the bills. Ten days of international programming, in a library, for nothing.</p>

<p class="cn-cover-credit">Cover image: Preston Bradley Hall, Chicago Cultural Center / Wikimedia Commons</p>`,
  sources: [
    { name: 'City of Chicago — DCASE', url: 'https://www.chicago.gov/city/en/depts/dca.html' },
    { name: 'Chicago Cultural Center', url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_cultural_center.html' },
    { name: 'Beverly Arts Center', url: 'https://www.beverlyartcenter.org/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Preston Bradley Hall dome', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Preston_Bradley_Hall_and_Tiffany_Glass_Dome_-_Chicago_Cultural_Center.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Ensemble on stage', source: 'Instagram — @joe_rauen', license: 'EMBED', contact: 'https://www.instagram.com/p/DdvBKBYNj7o/', credit: '@joe_rauen via Instagram' },
    { slot: 'body-2', subject: 'Festival weekend', source: 'Instagram — @nazgulmokeeva', license: 'EMBED', contact: 'https://www.instagram.com/p/Dd0RBSxjh8n/', credit: '@nazgulmokeeva via Instagram' },
    { slot: 'body-3', subject: 'Cultural Center stage', source: 'Instagram — @surreal_sir.reel', license: 'EMBED', contact: 'https://www.instagram.com/p/DdzXmLzhQFf/', credit: '@surreal_sir.reel via Instagram' },
  ],
},

]
