// Batch 4a — three Around pieces, updated mora-around skill: the
// personification aphorism is retired, so each closes on a named person and one
// concrete fact. Walk tier (350–700).
//
// These resolve the dossier's worst sourcing conflict. Randolph Street Market
// and Maxwell Street Market were conflated into one entry with two sets of
// dates and two addresses. The post sets separate them cleanly: Randolph is at
// 1341 W Randolph in the West Loop, Maxwell is the Sunday market at Maxwell and
// Union run by the Maxwell Street Foundation.
//
// Nothing here previews a date that has not happened. Randolph's November and
// December sessions and Maxwell's October 4th closer are deliberately left out.

const E = require('./embeds')

module.exports = [

{
  ref: 'D60',
  slug: 'the-randolph-street-market-is-not-on-maxwell-street',
  title: 'The Randolph Street Market Is Not on Maxwell Street',
  category: 'news',
  author_name: 'Mora',
  date: '2026-09-30',
  event_dates: 'July 25–26 and September 26–27, 2026',
  venue: '1341 W. Randolph Street',
  neighborhood: 'West Loop',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parking_at_W_Fulton_Market,_Chicago.jpg',
  cover_credit: 'West Loop / Wikimedia Commons',
  cover_alt: 'A West Loop street in the Fulton Market district',
  excerpt: 'Two Chicago markets get mixed up constantly, including by people who should know better. This is the indoor-outdoor one in the old union hall, where a booth costs more than most of what is in it.',
  body: `<p>The old union hall on Randolph holds heat about four degrees longer than the street does, which in late July means the indoor half of the market empties out by two in the afternoon and the tent out back fills up. The <strong>Randolph Street Market</strong> ran its summer sessions on July 25th and 26th and again on September 26th and 27th, at 1341 West Randolph, ten in the morning until five.</p>

<p>It gets confused with the Maxwell Street Market constantly, including in print, including by me until somebody put me right. They are two different markets, four miles apart, with different organisers and nothing in common but the word market and a lot of secondhand objects.</p>

<p>What is on the tables, unsorted: mid-century teak, vintage Levi's, costume jewellery in flats, hand-tinted photographs, pressed vinyl, rhinestone brooches pinned to velvet, old newspaper plates, and a run of 1920s-looking shirts and suspenders that somebody had clearly assembled as a set.</p>

<h3>What a Booth Costs</h3>

<p>Here is the number that explains the whole market. A vendor pays somewhere between seven hundred and seven hundred and fifty dollars for a weekend booth. The objects on most of those tables are priced between five and forty dollars. That arithmetic only resolves if you sell volume or you sell one good thing, and the dealers who come back every season have worked out which of those they are.</p>

<p>The artist <strong>Pugs Atomz</strong> took a spot in the big tent for the July weekend, which is a different proposition again — a working Chicago artist selling his own output next to people reselling other people's, at the same booth rate.</p>

${E.instagram('DaVfThtFmS9', { caption: 'A booth in the big tent, July weekend' })}

<h3>Who Built This Block</h3>

<p>The hall at 1341 West Randolph went up for a plumbers' union, in a district that was wholesale food — meat, produce, refrigerated trucks at four in the morning, and almost nothing open to the public. Restaurant Row is built inside that shell. The market is one of the few things on the strip that still sells objects rather than dinner, in a neighbourhood that has been priced for dinner for about fifteen years now.</p>

${E.instagram('DbBY6P8tAJX', { caption: 'The outdoor half, Randolph and Washington' })}

<p>The “noise” of this market is almost entirely transactional — no music to speak of, just the particular sound of several hundred people picking things up and putting them down again, and a lot of very specific questions about provenance.</p>

${E.instagram('DbWJ0AWpFV5', { caption: 'A grandmother and granddaughter spend the day' })}

<p>A woman with grey hair in a bun spent the July Saturday walking the stalls with her granddaughter, who was drinking something purple and being allowed to choose one thing. They were still deciding at four.</p>

<p class="cn-cover-credit">Cover image: West Loop / Wikimedia Commons</p>`,
  sources: [
    { name: 'Choose Chicago — markets and fashion events', url: 'https://www.choosechicago.com/articles/shopping-and-fashion/chicago-shopping-markets-fashion-events/' },
    { name: 'Chicago Gallery News', url: 'https://www.chicagogallerynews.com/' },
    { name: 'City of Chicago — Special Events', url: 'https://www.chicago.gov/city/en/depts/dca.html' },
  ],
  photos: [
    { slot: 'cover', subject: 'West Loop street', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Parking_at_W_Fulton_Market,_Chicago.jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Artist booth', source: 'Instagram — @pugsatomz', license: 'EMBED', contact: 'https://www.instagram.com/p/DaVfThtFmS9/', credit: 'Pugs Atomz / @pugsatomz via Instagram' },
    { slot: 'body-2', subject: 'Outdoor market', source: 'Instagram — @heronagency', license: 'EMBED', contact: 'https://www.instagram.com/p/DbBY6P8tAJX/', credit: '@heronagency via Instagram' },
    { slot: 'body-3', subject: 'Shoppers', source: 'Instagram — @biglittleescapes', license: 'EMBED', contact: 'https://www.instagram.com/p/DbWJ0AWpFV5/', credit: '@biglittleescapes via Instagram' },
  ],
},

{
  ref: 'D61',
  slug: 'a-seven-year-old-had-a-stall-at-maxwell-street-in-september',
  title: 'A Seven-Year-Old Had a Stall at Maxwell Street in September',
  category: 'news',
  author_name: 'Mora',
  date: '2026-09-15',
  event_dates: 'Sundays: May 17, June 7, July 19, August 9 and September 13, 2026',
  venue: 'Maxwell Street at Union Avenue',
  neighborhood: 'Near West Side',
  featured: true,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/New_Maxwell_Street_market_P1020788_(150997453).jpg',
  cover_credit: 'Maxwell Street Market / Wikimedia Commons',
  cover_alt: 'Vendor stalls and shoppers at the Maxwell Street Market',
  excerpt: 'Six Sundays, ten until three, on the ground where electric blues was invented and a university demolished most of the evidence. In September the market gave stalls to children.',
  body: `<p>Maxwell Street on a Sunday morning in September is about six degrees cooler than it will be by eleven, and the vendors who know that are set up and drinking coffee at nine while the ones who do not are still unfolding tables. The market ran six Sundays through 2026 — May 17th, June 7th, July 19th, August 9th and September 13th among them — ten in the morning until three.</p>

<p>The <strong>Maxwell Street Foundation</strong> runs it now, and the city's cultural affairs department has been promoting it under the line <em>Rediscover Maxwell Street</em>, which is a tacit admission that most of Chicago has forgotten there is anything here to rediscover.</p>

<p>On the tables: tube socks, car stereo faceplates, work boots, religious candles, phone cases, mangoes with chilli, sunglasses in rotating racks, pirated DVDs, and a man selling eight-by-ten photographic samples of his own work.</p>

<h3>The September Stalls Went to Children</h3>

<p>The September 13th market ran a Kids Edition, which meant actual stalls for actual children. <strong>Rosie</strong>, who is seven and trades as <strong>Strawberry Moon</strong>, had a table with her own signboard. She was not being supervised into a photo opportunity; she had stock, a price structure, and a position on it.</p>

<p>The Chicago maker <strong>Saint Bunni</strong> vended the August 9th market and announced it the night before with the particular urgency of somebody who had just confirmed a spot. That is the economy of this place: a booth you can get into at short notice, at a price a one-person operation can carry, which is almost extinct in this city.</p>

${E.instagram('DZQpo8bhBeV', { caption: 'Posted 2026-06-06', credit: '@joibilee_popping_co' })}

<h3>What a University Took</h3>

<p>The original Maxwell Street was the immigrant market of Chicago and then the place where Muddy Waters, Howlin' Wolf and Little Walter plugged guitars into amplifiers on a public street because the street was louder than they were. The University of Illinois expanded over most of it in the late 1990s, and what runs now is a relocated remnant a few blocks from the original ground, which the Foundation exists partly to keep arguing about.</p>

<p><strong>Jim's Original</strong>, the Polish sausage stand, is the surviving thread. A Maxwell Street Polish runs about seven dollars, it has been essentially the same object since 1939, and it is the only thing on this street with continuous tenure.</p>

${E.instagram('Db0trX9FofK', { caption: 'Jim’s Original, and the August market' })}

${E.instagram('DbtnJ0MjVGj', { caption: 'Rediscover Maxwell Street' })}

<p>The “noise” here is the only genuinely polyglot sound left in a Chicago market — Spanish, Polish, Arabic and English across one row of tables, plus whatever is coming out of a car with its doors open.</p>

<p>Rosie will be back with the Strawberry Moon table. She is seven, and she was still selling at two in the afternoon when the vendor beside her had already packed up.</p>

<p class="cn-cover-credit">Cover image: Maxwell Street Market / Wikimedia Commons</p>`,
  sources: [
    { name: 'Maxwell Street Foundation', url: 'https://www.maxwellstreetfoundation.org/' },
    { name: 'City of Chicago — Maxwell Street Market', url: 'https://www.chicago.gov/city/en/depts/dca/supp_info/maxwell_street_market.html' },
    { name: 'Jim’s Original', url: 'https://www.jimsoriginal.com/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Market stalls', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:New_Maxwell_Street_market_P1020788_(150997453).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'Kids Edition vendor', source: 'Instagram — @joibilee_popping_co', license: 'EMBED', contact: 'https://www.instagram.com/p/DZQpo8bhBeV/', credit: '@joibilee_popping_co via Instagram' },
    { slot: 'body-2', subject: 'Jim’s Original', source: 'Instagram — @maxwellstreetfoundation', license: 'EMBED', contact: 'https://www.instagram.com/p/Db0trX9FofK/', credit: 'Maxwell Street Foundation via Instagram' },
    { slot: 'body-3', subject: 'City promotion', source: 'Instagram — @chicagodcase', license: 'EMBED', contact: 'https://www.instagram.com/p/DbtnJ0MjVGj/', credit: '@chicagodcase via Instagram' },
  ],
},

{
  ref: 'D67',
  slug: 'navy-pier-shot-fireworks-twice-a-week-and-nobody-mentions-it',
  title: 'Navy Pier Shot Fireworks Twice a Week and Nobody Mentions It',
  category: 'news',
  author_name: 'Mora',
  date: '2026-09-08',
  event_dates: 'Wednesdays and Saturdays, May 23 – September 5, 2026',
  venue: 'Navy Pier',
  neighborhood: 'Navy Pier',
  featured: false,
  cover_image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Navy_Pier_fireworks_(245157533).jpg',
  cover_credit: 'Navy Pier fireworks / Wikimedia Commons',
  cover_alt: 'Fireworks over Lake Michigan beside the Navy Pier Ferris wheel',
  excerpt: 'Free fireworks twice a week for fifteen weeks, and most Chicagoans have never deliberately gone. The best audience is on the water, and they did not pay for the pier either.',
  body: `<p>The temperature on the end of Navy Pier drops about five degrees in the twenty minutes after sunset, which is roughly the gap between when people start looking at the sky and when anything happens in it. The fireworks ran Wednesdays at nine and Saturdays at ten from May 23rd through September 5th, and they were free.</p>

<p>Fifteen weeks, two nights a week, at no charge, on the most-visited attraction in the Midwest. The residents of this city have collectively decided that this is for tourists, and go anyway by accident about once a summer.</p>

<h3>The Best Seats Are Not on the Pier</h3>

<p>The pier itself is the worst place to watch from, because you are underneath it and the Ferris wheel is in the way. The good vantages are all free and all elsewhere: the lakefront path north of the pier, the Ohio Street beach, the upper floors of anywhere on Michigan Avenue with a north-east window, and best of all a boat.</p>

<p>From the water you get the whole thing — the bursts, the illuminated skyline behind them, and the lit Ferris wheel on the horizon in the same frame — and the boats cluster far enough out that the sound arrives a beat late. People who own boats here know this. People who rent them find out once.</p>

${E.instagram('DaS75MdgKmj', { caption: 'From the water, looking back at the pier' })}

<h3>What the Pier Was Built For</h3>

<p>It opened in 1916 as Municipal Pier, a working freight and passenger dock with a streetcar line down the middle, and it has been a university campus, a Navy training centre during the Second World War, and a mostly derelict stretch of concrete before the current arrangement. The fireworks are a twice-weekly argument that a commercial attraction still owes the city something free, and they are the only part of the pier that costs nothing.</p>

<p>The July 4th show is the one everybody attends and the worst one to pick, because the crowd is four times normal and the programme is the same.</p>

${E.instagram('Dc7oANGuz6O', { caption: 'The last show of the summer, September 5' })}

${E.instagram('DaaczMXJ141', { caption: 'Posted 2026-07-05', credit: '@dreverywoman' })}

<p>The “noise” of a fireworks night downtown is mostly car horns and the pier's own PA, and from a mile north on the path you hear neither — just the delayed thump, about two seconds behind the light.</p>

<p><strong>Dr. Wendy Goodall McDonald</strong> went on the Fourth and filmed the pier so crowded she could not get to the rail. She watched the whole show from a spot she had not chosen.</p>

<p class="cn-cover-credit">Cover image: Navy Pier fireworks / Wikimedia Commons</p>`,
  sources: [
    { name: 'Navy Pier — fireworks', url: 'https://navypier.org/fireworks/' },
    { name: 'Navy Pier', url: 'https://navypier.org/' },
    { name: 'Choose Chicago — festivals and events', url: 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/' },
  ],
  photos: [
    { slot: 'cover', subject: 'Fireworks and Ferris wheel', source: 'Wikimedia Commons', license: 'CLEAR', contact: 'https://commons.wikimedia.org/wiki/File:Navy_Pier_fireworks_(245157533).jpg', credit: 'Wikimedia Commons' },
    { slot: 'body-1', subject: 'From the water', source: 'Instagram — @penelope_314', license: 'EMBED', contact: 'https://www.instagram.com/p/DaS75MdgKmj/', credit: '@penelope_314 via Instagram' },
    { slot: 'body-2', subject: 'Final show of the season', source: 'Instagram — @maunaeats', license: 'EMBED', contact: 'https://www.instagram.com/p/Dc7oANGuz6O/', credit: '@maunaeats via Instagram' },
    { slot: 'body-3', subject: 'From a north-side window', source: 'Instagram — @dreverywoman', license: 'EMBED', contact: 'https://www.instagram.com/p/DaaczMXJ141/', credit: '@dreverywoman via Instagram' },
  ],
},

]
