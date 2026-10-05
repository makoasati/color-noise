// Batch 4b — four Heard pieces. The last of the concert events whose post sets
// actually document the event.
//
// Held, and why — post count is not coverage, and these were checked rather
// than assumed:
//   D97  DJ Chico at The Whistler — the set is a Blind Barber weekly, a
//        backyard birthday, Chico's own booking advert, another DJ's night at
//        CM Pub, and a venue in Angola. Nothing from The Whistler on Apr 24.
//   D102 Disco Rx at California Clipper — the set is a pharmacy advert, an
//        industry night, Late Bar, Good Night John Boy and The Red Room. The
//        scraper matched "Rx" and "prescription", not the event.
//   D120 Acid Queen! at Smartbar — two on-topic posts out of 31; the rest are
//        North Coast and a Berlin act.
//   D129 Salt Shed season and D130 Thalia Hall — both still running past today.
//   D124 MUNA (Oct 9) and D126 Derrick Carter (Oct 18) — future.

const E = require('./embeds')

module.exports = [

{
  ref: 'D123',
  title: 'Foster The People Closed Northerly Island for the Season',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-28',
  event_dates: 'September 26, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'The last show of the lakefront season, with Goth Babe opening and a sixteen-year-old single doing most of the work. By late September the wind off the lake is the third act.',
  body: `<p>By the last week of September the wind on Northerly Island has turned and comes off the water cold enough that the people on the lawn keep their jackets on through the headliner. <strong>Foster The People</strong> played the pavilion on Saturday September 26th, which was effectively the end of the lakefront season.</p>

<p>They have been a band since 2009 and have spent most of that time in the shadow of one enormous single. Nobody on that field was pretending otherwise.</p>

<p><strong>Goth Babe</strong> opened, which is a sensible piece of routing — a one-man outdoors-branded project playing to a crowd that came for a band whose whole aesthetic is sunshine. The run sheet taped up backstage listed the night plainly as Foster The People Live in Concert, which is the least romantic document in live music and the most honest.</p>

<h3>What Sixteen Years Does To A Set</h3>

<p>The problem with a catalogue built on one inescapable song is that the set has to be arranged around it rather than toward it. They solved it by putting the newer material early, while the field was still arriving and more forgiving.</p>

<p><strong>"Pumped Up Kicks"</strong> is the song everybody came for and it has aged into something stranger than it was — a whistled hook over a lyric about a school shooting, sung back by a lawn full of people who were children when it charted. <strong>"Sit Next to Me"</strong> was the better live performance and got a fraction of the response. Newer material off the <em>Glare</em> cycle sat in the middle and was received politely.</p>

${E.instagram('DdyXOPfESyl', { caption: 'From the field, September 26' })}

<h3>A Shed That Closes In September</h3>

<p>Northerly Island is a peninsula of landfill dredged into the lake under Daniel Burnham's 1909 plan, used as Meigs Field until 2003, and now a park with a 30,000-capacity shed on it. The season runs May to late September for a reason that has nothing to do with programming: by October the wind across open water makes an outdoor show on a lakefill unsellable.</p>

<p>Which gives the last date of the season a particular quality. The low end goes into the lake, as it does all summer, and the vocal has to carry the whole thing — but in late September the crowd is denser toward the front because everybody has worked out that the back of the lawn is colder.</p>

${E.instagram('DdyoXrdoJEl', { caption: 'Twenty slides from the night, with Goth Babe' })}

${E.instagram('Ddxe1HLlrhb', { caption: 'Closing night of the season' })}

<p>A fan photographed the venue run sheet before the doors opened and posted it. That piece of paper was the last one Northerly Island printed in 2026.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'Foster The People official', url: 'https://fosterthepeople.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'From the field', source: 'Instagram — @vivalakid_', license: 'EMBED', contact: 'https://www.instagram.com/p/DdyXOPfESyl/', credit: '@vivalakid_ via Instagram' },
    { slot: 'body-2', subject: 'Night documented', source: 'Instagram — @fella626', license: 'EMBED', contact: 'https://www.instagram.com/p/DdyoXrdoJEl/', credit: 'Andrew Fella / @fella626 via Instagram' },
    { slot: 'body-3', subject: 'Closing night', source: 'Instagram — @jaxb126', license: 'EMBED', contact: 'https://www.instagram.com/p/Ddxe1HLlrhb/', credit: '@jaxb126 via Instagram' },
  ],
},

{
  ref: 'D122',
  title: 'Tove Lo Played an Unreleased Song at the Salt Shed',
  category: 'review',
  author_name: 'Jude',
  date: '2026-09-18',
  event_dates: 'September 16, 2026',
  venue: 'The Salt Shed Fairgrounds',
  neighborhood: 'Goose Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Morton_Salt.jpg',
  cover_credit: 'Morton Salt complex, Goose Island / Wikimedia Commons',
  cover_alt: 'The former Morton Salt plant on Elston Avenue, now The Salt Shed',
  excerpt: 'The ESTRUS tour opened the Fairgrounds autumn run with Mallrat supporting and a track nobody has heard. A Swedish pop record played against a salt warehouse on the river.',
  body: `<p>The Fairgrounds at the Salt Shed sits on the river side of the compound and holds the cold off the water from about eight o'clock, which in mid-September means a crowd that arrived in summer clothes and regretted it. <strong>Tove Lo</strong> played on Wednesday September 16th, opening the venue's autumn outdoor run.</p>

<p>She has spent twelve years writing pop songs with the sex and the damage left in, for an audience that mostly found her through other people's records. Nobody at the barrier needed that explained.</p>

<p><strong>Mallrat</strong> supported — an Australian act with a quieter register, which on an outdoor stage against a brick warehouse is a harder sell than it would be indoors and worked better than it should have. She played to a yard that was still filling, which is the support slot’s permanent injury, and did not hurry to compensate for it.</p>

<h3>The Set Had Something New In It</h3>

<p>This was the <em>ESTRUS</em> run, and the interesting decision was to put an unreleased track into it. <strong>"I'm the Cake"</strong> has not been issued and she played it anyway, to a crowd that could not sing along and therefore had to listen, which is the rarest condition at a pop show.</p>

<p><strong>"2 Die 4"</strong> was the loudest the night got, built on a sample that does most of the work and does it well outdoors where the low end has somewhere to go. The staging was minimal by arena-pop standards — the warehouse behind her is the set design and the production knew it.</p>

${E.instagram('DdZ86x9gXM-', { caption: 'On stage at the Fairgrounds' })}

<h3>A Salt Warehouse With A River Behind It</h3>

<p>The Morton Salt Company stored road salt in this shed from 1929, and the pile inside was visible from the Kennedy for most of the twentieth century. The conversion kept the building's volume rather than carving it up, and the outdoor Fairgrounds beside it is simply the yard the trucks used to load in.</p>

<p>What that gives a pop show is a hard vertical surface at the back of the stage and the river at your shoulder, so the sound has one reflective wall and one dead side. It is an accident of industrial geometry and it flatters a synth-led record more than a purpose-built shed does.</p>

${E.instagram('DdaBEQfAKQ0', { caption: 'Professional set photography' })}

${E.instagram('DdYODVyosZk', { caption: 'The unreleased track, from the crowd' })}

<p>Chicago Music Guide had the professional frames out the following day. An unreleased song got played to four thousand people who could not join in.</p>

<p class="cn-cover-credit">Cover image: Morton Salt complex, Goose Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'The Salt Shed', url: 'https://www.saltshedchicago.com/' },
    { name: 'Tove Lo official', url: 'https://www.tovelo.com/' },
    { name: 'The Salt Shed Outdoors — Ticketmaster', url: 'https://www.ticketmaster.com/the-salt-shed-outdoors-fairgrounds-tickets-chicago/venue/33256' },
  ],
  photos: [
    { slot: 'cover', subject: 'Morton Salt complex', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Morton_Salt.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'On stage', source: 'Instagram — @thebiglebekski', license: 'EMBED', contact: 'https://www.instagram.com/p/DdZ86x9gXM-/', credit: '@thebiglebekski via Instagram' },
    { slot: 'body-2', subject: 'Set photography', source: 'Instagram — @chicagomusicguide', license: 'EMBED', contact: 'https://www.instagram.com/p/DdaBEQfAKQ0/', credit: 'Chicago Music Guide via Instagram' },
    { slot: 'body-3', subject: 'Unreleased track', source: 'Instagram — @levisliveshows', license: 'EMBED', contact: 'https://www.instagram.com/p/DdYODVyosZk/', credit: '@levisliveshows via Instagram' },
  ],
},

{
  ref: 'D119',
  title: 'The Fray and Dashboard Confessional Split a Lakefront Bill',
  category: 'review',
  author_name: 'Jude',
  date: '2026-08-31',
  event_dates: 'August 29, 2026',
  venue: 'Huntington Bank Pavilion at Northerly Island',
  neighborhood: 'Northerly Island',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Northerly_Island_Beach_-_Chicago,_Illinois.JPG',
  cover_credit: 'Northerly Island / Wikimedia Commons',
  cover_alt: 'The lakefront at Northerly Island, looking toward Lake Michigan',
  excerpt: 'Two bands whose catalogues belong to the same four years of somebody’s adolescence, on a peninsula in late August. One song did most of the work and everybody knew which.',
  body: `<p>The last Saturday of August on Northerly Island still carries heat off the pavement at eight and cold off the water by ten, and the lawn sorts itself accordingly as the night goes on. <strong>The Fray</strong> and <strong>Dashboard Confessional</strong> played the pavilion on August 29th, which is a bill assembled almost entirely out of one demographic's late adolescence.</p>

<p>The Fray have been a working band since 2002 and Dashboard since 1999, and between them they account for a specific and very large slice of mid-2000s radio. Nobody there arrived by accident.</p>

<p>⚠️ Two small discrepancies in the attendee material: one set is dated August 30th, and one attendee places the show at Soldier Field. The venue and the date given here are the pavilion and the 29th.</p>

<h3>A Co-Headline Of Equals</h3>

<p>Neither band is the clear draw, which makes this a genuinely even split rather than a headliner with a support act — and the crowd divided visibly, with people moving toward the barrier for one and retreating for the other in roughly equal numbers.</p>

<p><strong>"How to Save a Life"</strong> is the reason most of that lawn bought a ticket, and it arrived as a piano figure that an outdoor shed cannot really hold — the mid-range disperses and what is left is the vocal and the crowd. That turned out to be enough, because several thousand people singing a chorus they learned at fifteen is its own arrangement. Dashboard's set leaned acoustic, which fared worse against the lake and better against the crowd.</p>

${E.instagram('DcrFM0DRB3D', { caption: '"How to Save a Life", from the audience' })}

<h3>What The Lake Does To A Piano</h3>

<p>Northerly Island is fill, pushed into the lake under the 1909 Burnham plan, and the venue sits where Meigs Field's runway ran until the city tore it up overnight in 2003. The shed has a canopy over roughly a third of the seats and open grass behind, which is the configuration that eats piano and rewards guitars.</p>

<p>Both of these bands are piano-and-acoustic propositions, which makes this a mismatch on paper. It worked anyway for the reason most legacy bills work outdoors: the audience supplies the missing frequencies.</p>

${E.instagram('Dcpxyhjt385', { caption: 'A review filmed outside the venue', credit: '@wilddirky' })}

${E.instagram('DcrKdo5m06i', { caption: 'Multiple angles from the crowd' })}

<p>A woman filmed her own review in the car park afterwards and said she had loved The Fray since she was a teenager. She had driven in for it.</p>

<p class="cn-cover-credit">Cover image: Northerly Island / Wikimedia Commons</p>`,
  sources: [
    { name: 'Huntington Bank Pavilion — shows', url: 'https://www.huntingtonbankpavilion.com/shows' },
    { name: 'Chicago Park District — Northerly Island', url: 'https://www.chicagoparkdistrict.com/parks-facilities/northerly-island-park' },
    { name: 'The Fray official', url: 'https://thefray.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Northerly Island lakefront', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Northerly_Island_Beach_-_Chicago,_Illinois.JPG', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Headline song', source: 'Instagram — @eddiecovamusic', license: 'EMBED', contact: 'https://www.instagram.com/p/DcrFM0DRB3D/', credit: '@eddiecovamusic via Instagram' },
    { slot: 'body-2', subject: 'Post-show review', source: 'Instagram — @wilddirky', license: 'EMBED', contact: 'https://www.instagram.com/p/Dcpxyhjt385/', credit: '@wilddirky via Instagram' },
    { slot: 'body-3', subject: 'Crowd angles', source: 'Instagram — @thebestseats', license: 'EMBED', contact: 'https://www.instagram.com/p/DcrKdo5m06i/', credit: '@thebestseats via Instagram' },
  ],
},

{
  ref: 'D101',
  title: 'OK Go Fired Heart-Shaped Confetti Over Gallagher Way',
  category: 'review',
  author_name: 'Jude',
  date: '2026-06-15',
  event_dates: 'June 13, 2026',
  venue: 'Gallagher Way',
  neighborhood: 'Wrigleyville',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Wrigley_Field_marquee_(51257982056).jpg',
  cover_credit: 'Wrigley Field marquee / Wikimedia Commons',
  cover_alt: 'The red Wrigley Field marquee at Clark and Addison',
  excerpt: 'A free-ish outdoor show on the plaza beside the ballpark, from a band whose entire reputation is built on things happening at exactly the right moment. The confetti was the set design.',
  body: `<p>Gallagher Way is a paved plaza with a lawn in the middle, wedged between Wrigley Field and Clark Street, and on a June evening it holds the day's heat in the concrete long after the sun has gone behind the grandstand. <strong>OK Go</strong> played there on Saturday June 13th as part of the plaza's summer concert series.</p>

<p>They are a Chicago band — formed here in 1998 — who became internationally famous for choreography rather than for records, which is a strange inheritance to carry onto a stage where nothing can be edited.</p>

<p>Which is the interesting part. A band known for one-take video precision has to do something different live, and what <strong>Damian Kulash</strong> does instead is talk to people — direct address, by name where he can manage it, between songs.</p>

<h3>The Confetti Is The Production</h3>

<p>There is no screen and no staging to speak of on this plaza, so the show's visual argument is delivered by cannon: showers of yellow confetti first, then red, cut into heart shapes. That is the whole effect and it is deployed twice, which is exactly the right number of times.</p>

<p><strong>"Here It Goes Again"</strong> is the song attached to the treadmill video and the crowd response to it has almost nothing to do with the music, which the band has clearly made peace with. They play it hard and fast and let the recognition do the rest. The rest of the set is better and gets less, which is the permanent condition of a band with a viral artefact in its past.</p>

${E.instagram('DZjcWurOjhA', { caption: 'Damian Kulash on the plaza stage' })}

<h3>A Plaza Is Not A Venue</h3>

<p>Gallagher Way was built in 2015 on land the Cubs cleared beside the ballpark — a triangle of surface parking turned into a programmable public space with a stage at one end, which the team uses for films, markets and this concert series. It is open to the street, which means the sound spills down Clark and the bars get a free version.</p>

<p>Acoustically it is a hard box with one side missing. Guitar bands do fine. The handclap-and-shout parts of an OK Go song, which depend on a crowd hearing itself, work better here than in a shed.</p>

${E.instagram('DZlBo7_Rtrc', { caption: 'Heart-shaped confetti over the crowd' })}

${E.instagram('DZjoQKBgKLQ', { caption: 'Fan engagement mid-set' })}

<p>The confetti was still on the plaza the following morning, in the gutters along Clark. A Chicago band came home and brought a cannon.</p>

<p class="cn-cover-credit">Cover image: Wrigley Field marquee / Wikimedia Commons</p>`,
  sources: [
    { name: 'Gallagher Way', url: 'https://www.gallagherway.com/' },
    { name: 'Chicago Cubs — concert series', url: 'https://www.mlb.com/cubs/tickets/concerts' },
    { name: 'OK Go official', url: 'https://okgo.net/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Wrigley marquee', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Wrigley_Field_marquee_(51257982056).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Lead singer on stage', source: 'Instagram — @musicmakesyouthink', license: 'EMBED', contact: 'https://www.instagram.com/p/DZjcWurOjhA/', credit: '@musicmakesyouthink via Instagram' },
    { slot: 'body-2', subject: 'Confetti', source: 'Instagram — @kristin.nilsen.write', license: 'EMBED', contact: 'https://www.instagram.com/p/DZlBo7_Rtrc/', credit: '@kristin.nilsen.write via Instagram' },
    { slot: 'body-3', subject: 'Fan engagement', source: 'Instagram — @jan_cooney', license: 'EMBED', contact: 'https://www.instagram.com/p/DZjoQKBgKLQ/', credit: 'Jan Cooney / @jan_cooney via Instagram' },
  ],
},

]
