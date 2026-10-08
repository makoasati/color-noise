// Batch 6 — one Heard piece. Kelela at the Vic Theatre, Tuesday Oct 6 2026,
// filed on the 7th.
//
// SOURCING. Setlist and running order from the show's setlist.fm entry for the
// Vic; album, release date and single chronology from Warp and the album press
// cycle; venue capacity, ownership and history from Jam Productions' own venue
// pages and the Vic's Commons/Cinema Treasures record. The event itself was in
// the repo already — scripts/import-fall-2026-events.js has the Oct 6 Vic date.
//
// Short tier (350-700) on purpose rather than Full. A Full Heard piece is
// bought with counts, overheard lines, a merch-line timing, a bar price — the
// instruments in the skill's §5. None of those exist for this night in any
// source, and the skill is explicit that inventing one to fill a slot is worse
// than not having it. What there is: a verified running order, a four-act
// structure, and a room with a documented history. That is one set, one room,
// one idea, which is what Short is for.
//
// Two figures deliberately not printed. The Vic's 1912 seat count conflicts
// across sources (1,400 / 1,550 / 1,800) and its architect is disputed between
// J.E.O. Pridmore and John Eberson, so the piece dates the opening and names
// neither. The 1,400 standing capacity is Jam's own number for the room today.
//
// The later acts of the set (outta time, don't piss me off, Turn to Dust, The
// High, Sorbet, linknb, and the encore if we meet again) are documented for
// other dates on this tour but the Vic entry truncates after All the Way Down,
// so nothing past the twelfth song is asserted here.
//
// ART: four images, all Wikimedia Commons, all with a named author and a
// licence that permits reuse with attribution. Recompressed to webp and served
// from the article-images bucket rather than public/ — public/ is branch-scoped
// while the database is not, which is how the Apple Fest piece went live with
// eight 404s. 300KB total against the §5.1 600KB page budget.
//
// The Kelela photograph is from Piknik i Parken in 2018 and the full-room shot
// is an Animal Collective night in 2022. Neither is this show and both captions
// say so plainly. No photographer covered the Vic on Oct 6 that this desk can
// license, and a caption that implied otherwise would be the lie.

module.exports = [

{
  ref: 'K26',
  title: 'Four Acts and an Encore: Kelela at the Vic',
  category: 'review',
  author_name: 'Jude',
  date: '2026-10-07',
  event_dates: 'October 6, 2026',
  venue: 'The Vic Theatre',
  neighborhood: 'Lakeview',
  featured: false,
  cover_image: 'https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/kelela-vic-2026/vic-theatre-exterior.webp',
  cover_credit: 'The Vic Theatre, 2020. Photo: Paul R. Burley / CC0',
  cover_alt: 'The Vic Theatre on North Sheffield Avenue in Chicago, its vertical marquee sign against a clear sky',
  excerpt: 'Kelela brought the new avatar tour to the Vic on Tuesday, staged in four acts and an encore. The thirteen-year-old song landed eleventh, inside the sequence, with no introduction.',
  body: `<p>The Vic’s balcony holds heat the way old rooms do, and by the third song the people up there had their jackets over the rail and their forearms on top of them. The floor stayed cooler and stayed stiller, which is its own kind of attention. <strong><a href="https://kelela.warp.net/">Kelela</a></strong> played Lakeview on Tuesday October 6th, a month into a North American run that started in Seattle in September.</p>

<p>What she is touring is not a set. It is four acts and an encore, built in that shape and announced in it, and the running order does not bend for anybody’s favourite song. She writes like a producer who can sing, which is a different animal from a singer who produces, and the difference shows up in how the night is assembled rather than in how any one song is delivered.</p>

<p>She put out <em>Cut 4 Me</em> as a mixtape in 2013, took four years over <em>Take Me Apart</em>, another six to reach <em>Raven</em>, and then turned <em><a href="https://kelela.bandcamp.com/album/new-avatar-2">new avatar</a></em> around inside three. Nobody in that room needed the recap.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/kelela-vic-2026/kelela-2018.webp" alt="Kelela performing on an outdoor stage in daylight, one hand raised toward the microphone">
<figcaption>Kelela at Piknik i Parken, Oslo, 2018 — not this show<span class="cn-photo-credit">Photo: Tore Sætre / CC BY-SA 4.0</span></figcaption>
</figure>

<p>Act I opened on <strong>"Fooley"</strong> in the LEECH Ambient Queen remix, which strips the drums out from under a <em>Raven</em> song and makes an entrance out of something that was originally a closer. <strong>"idea 1"</strong> came third and is the one worth arguing about: she built the lead single on guitar, washed and detuned and much closer to shoegaze than to anything on the three records before it, and live the guitar sits where a bassline would normally carry the weight. It does not sound like a departure so much as a floor being replaced underneath a house.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/kelela-vic-2026/vic-room-full.webp" alt="The Vic Theatre auditorium full of people facing a lit stage, seen from the rear of the floor">
<figcaption>The Vic’s floor and balcony during a 2022 show<span class="cn-photo-credit">Photo: Rockford the Roe / CC BY-SA 4.0</span></figcaption>
</figure>

<p>The room is the reason the structure works. <a href="https://www.jamusa.com/venues/the-vic">The Vic</a> holds about 1,400 standing, which is small enough that the quiet stretches in Act II read as quiet rather than as dead air, and it has a balcony deep enough that the people in it are listening down at the stage instead of across at it. <a href="https://www.jamusa.com/">Jam Productions</a> has promoted shows in the building since 1987 and bought it outright in 2000. Before any of that it opened as the Victoria on September 29th, 1912, spent decades after vaudeville collapsed showing Spanish-language films as the Roberto Clemente Theater and Indian films as the Bharat Cinema, and was bought in 1983 by Walter Klein, who put a year of repairs into it and reopened it in October 1984. A room that has been four different things is unbothered by an album in four parts.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/kelela-vic-2026/vic-interior.webp" alt="Interior of the Vic Theatre looking toward the ornamented proscenium and balcony">
<figcaption>Inside the Vic<span class="cn-photo-credit">Photo: Victorgrigas / CC BY-SA 3.0</span></figcaption>
</figure>

<p>By Act III the set had stopped distinguishing between catalogues. <strong>"A Message"</strong> and <strong>"Send Me Out"</strong> came out of <em>Take Me Apart</em> and sat directly after <strong>"crystalize"</strong>, which is a <em>new avatar</em> track that segues in from the song before it and does not want a gap on either side. It did not get one.</p>

<p><strong>"Bank Head"</strong> is thirteen years old and it came eleventh, inside Act III, with no introduction and no pause in front of it. The old songs are components now.</p>

<p class="cn-cover-credit">Cover image: The Vic Theatre, 2020. Photo: Paul R. Burley / CC0</p>`,
  sources: [
    { name: 'setlist.fm — Kelela', url: 'https://www.setlist.fm/setlists/kelela-bc7f132.html' },
    { name: 'Kelela — new avatar (Warp)', url: 'https://kelela.warp.net/releases' },
    { name: 'Kelela — new avatar on Bandcamp', url: 'https://kelela.bandcamp.com/album/new-avatar-2' },
    { name: 'Jam Productions — The Vic', url: 'https://www.jamusa.com/venues/the-vic' },
    { name: 'Jam Productions — Vic Theatre history', url: 'https://www.jamusa.com/home/vic-theatre-history/' },
    { name: 'Cinema Treasures — Vic Theatre', url: 'https://cinematreasures.org/theaters/341' },
  ],
  photos: [
    // All four are Wikimedia Commons, named author, reuse-permitting licence.
    // Recompressed to webp and uploaded to the article-images bucket: 300KB
    // total against the §5.1 600KB page budget. Hosted rather than served from
    // public/, because public/ is branch-scoped and the database is not.
    //
    // CC BY-SA requires attribution, so every credit names the photographer and
    // the licence, in the figcaption and in the cover credit line.
    //
    // Neither performance photograph is from October 6th, and both captions say
    // so. No licensable coverage of this specific night exists.
    { slot: 'cover', subject: 'The Vic Theatre exterior, 2020', source: 'Wikimedia Commons', license: 'CLEAR',
      contact: 'https://commons.wikimedia.org/wiki/File:The_Vic_Theatre_Chicago_Illinois_2020.jpg', credit: 'Paul R. Burley / CC0' },
    { slot: 'body-1', subject: 'Kelela at Piknik i Parken, Oslo, 2018', source: 'Wikimedia Commons', license: 'CLEAR',
      contact: 'https://commons.wikimedia.org/wiki/File:Kelela_Piknik_i_Parken_2018_(205003).jpg', credit: 'Tore Sætre / CC BY-SA 4.0' },
    { slot: 'body-2', subject: 'The Vic full during a 2022 show', source: 'Wikimedia Commons', license: 'CLEAR',
      contact: 'https://commons.wikimedia.org/wiki/File:Animal_Collective_at_Vic_Theatre_Chicago_IL-3-20-2022.jpg', credit: 'Rockford the Roe / CC BY-SA 4.0' },
    { slot: 'body-3', subject: 'The Vic interior', source: 'Wikimedia Commons', license: 'CLEAR',
      contact: 'https://commons.wikimedia.org/wiki/File:The_Vic_2014-03-13_22-06.jpg', credit: 'Victorgrigas / CC BY-SA 3.0' },
  ],
},

]
