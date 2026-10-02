// One-off: remove news outlets from references. Swaps citation-style anchors
// to primary sources and drops news entries from the sources arrays.
const fs = require('fs')
const news = fs.readFileSync('scripts/.news-domains.txt','utf8').trim().split(/\r?\n/)
const CC = 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'

// anchor text (exact) -> primary-source URL
const RELINK = {
  'Riot Fest': 'https://riotfest.org/',
  'Warm Love Cool Dreams': 'https://do312.com/events/2026/5/23/warm-love-cool-dreams-tickets',
  'Silver Room Block Party': 'https://www.silverroomblockparty.com/',
  'Taste of Lincoln Avenue': CC,
  'Taste of Greektown': CC,
  'Lakeview Taco Fest': CC,
  'Gold Coast Art Fair': CC,
  'Ginza Holiday Festival': CC,
  '57th Street Art Fair': CC,
  'the Glenwood Avenue Arts Fest': CC,
  'the Glenwood Avenue Arts District': CC,
  'craft market': 'https://www.renegadecraft.com/city/chicago/',
  'fall Renegade market': 'https://www.renegadecraft.com/city/chicago/',
  'Renegade Craft market': 'https://www.renegadecraft.com/city/chicago/',
  'the craft market': 'https://www.renegadecraft.com/city/chicago/',
  'independent craft market': 'https://www.renegadecraft.com/city/chicago/',
  'spring edition': 'https://www.renegadecraft.com/event/chicago-fall/',
  '$12.79 Panda Fest door': CC,
  'the city’s festival listings': CC,
  'Chinatown’s Summer Fair': 'https://chicagochinatown.org/map-guide-for-summer-events-2026/',
  'the Chinatown Summer Fair': 'https://chicagochinatown.org/map-guide-for-summer-events-2026/',
  'Andersonville': CC,
  'the Bud Billiken Parade': 'https://www.budbillikenparade.org/',
  'Bud Billiken Parade': 'https://www.budbillikenparade.org/',
  'the African Festival of the Arts': 'https://aihusa.org/',
  'African Festival of the Arts': 'https://aihusa.org/',
  'the Smooth Jazz Festival': CC,
  'Black and Bronze': CC,
  'the Hyde Park Jazz Festival': 'https://hydeparkjazzfestival.org/',
  'Hyde Park Jazz Festival': 'https://hydeparkjazzfestival.org/',
  'the Chicago Jazz Festival': 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_jazz_festival.html',
  'city’s own Chicago Jazz Festival': 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_jazz_festival.html',
  'the Grant Park Music Festival': 'https://www.grantparkmusicfestival.com/2026-concerts/',
  'Square Roots': 'https://squareroots.org/',
  'West Fest': 'https://www.westtownchamber.org/west-fest-chicago',
  'Do Division': CC,
  'the Old Town Art Fair': CC,
  'Tacos y Tamales': CC,
  'Fiesta del Sol': 'https://fiestadelsol.org/festival',
  'ARC': 'https://arcmusicfestival.com/',
  'Taste of Chicago': 'https://www.choosechicago.com/articles/festivals-special-events/taste-of-chicago-overview/',
  '57th Street': CC,
  'the 4th on 53rd parade': CC,
  'Ravenswood Art Walk': CC,
  'the Ravenswood Art Walk': CC,
  'Vibes On Logan': CC,
}

let files = fs.readdirSync('content/summer-2026').filter(f => /^part\d+\.js$/.test(f))
let relinked = 0, srcDropped = 0
for (const f of files) {
  const p = 'content/summer-2026/' + f
  let s = fs.readFileSync(p, 'utf8')

  // 1. Any anchor whose text matches RELINK and whose href is a news domain -> repoint
  s = s.replace(/<a href="([^"]+)">([^<]*)<\/a>/g, (m, url, txt) => {
    if (!news.some(n => url.includes(n))) return m
    const key = txt.trim()
    if (RELINK[key]) { relinked++; return `<a href="${RELINK[key]}">${txt}</a>` }
    return m
  })

  // 2. Drop news entries from sources arrays
  s = s.replace(/^\s*\{ name: '[^']*', url: '([^']*)' \},\n/gm, (m, url) => {
    if (news.some(n => url.includes(n))) { srcDropped++; return '' }
    return m
  })

  fs.writeFileSync(p, s)
}
console.log('anchors repointed:', relinked)
console.log('news sources dropped:', srcDropped)
