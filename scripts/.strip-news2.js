const fs = require('fs')
const news = fs.readFileSync('scripts/.news-domains.txt','utf8').trim().split(/\r?\n/)
const CC   = 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'
const DCASE_JAZZ = 'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_jazz_festival.html'
const DCASE_HOUSE= 'https://www.chicago.gov/city/en/depts/dca/supp_info/house_music0.html'
const GPMF = 'https://www.grantparkmusicfestival.com/2026-concerts/'

// Anchors whose TEXT is an outlet name: replace text AND href.
const REPLACE = {
  'NBC’s guide':[CC,'the city’s festival listings'],
  'NBC’s festival guide':[CC,'the city’s festival listings'],
  'NBC guide':[CC,'the city’s festival listings'],
  'NBC':[CC,'the city’s festival listings'],
  'NBC covered them as a pair':[CC,'the listings treated them as a pair'],
  'Block Club':[CC,'the summer listings'],
  'Block Club guide':[CC,'the summer listings'],
  'Block Club’s guide':[CC,'the summer listings'],
  'Block Club’s summer guide':[CC,'the summer listings'],
  'Block Club Chicago':[CC,'the summer listings'],
  'a summer listings guide':[CC,'a summer listings guide'],
  'city guides':[CC,'the city listings'],
  'every summer guide does':[CC,'every summer guide does'],
  'this whole calendar':[CC,'this whole calendar'],
  'The TRiiBE':[CC,'community reporting'],
  'CBS Chicago':[CC,'the listings'],
  'CBS report':[CC,'the listings'],
  '5 Magazine':[DCASE_HOUSE,'the published schedule'],
  '5 Magazine set times':['https://www.westtownchamber.org/west-fest-chicago','the published set times'],
  'WGN':[CC,'the listings'],
  'WBEZ':[GPMF,'the season announcement'],
  'WBEZ’s guide':['https://www.choosechicago.com/articles/festivals-special-events/taste-of-chicago-overview/','the official guide'],
  'WFMT':[GPMF,'the season announcement'],
  'WDCB':[DCASE_JAZZ,'the full lineup'],
  'ChicagoJazz.com':[DCASE_JAZZ,'the city announcement'],
  'FOX32':['https://www.chicago.gov/city/en/depts/dca/provdrs/chicago_festivals/news/2026/april/blues_fest.html','the schedule release'],
  'WTTW’s':[CC,'the seasonal listings'],
  'ABC7 broadcast':['https://www.budbillikenparade.org/','live broadcast'],
  'Third Coast Review':['https://do312.com/events/2026/5/23/warm-love-cool-dreams-tickets','the weekend listing'],
  'Hyde Park Herald':['https://chosenfewdjs.com/','the Chosen Few DJs'],
  'Chicago Reader’s feature':['https://chosenfewdjs.com/','the Chosen Few DJs'],
  'Hoodline':[CC,'the listings'],
  'photo essay':['https://www.silverroomblockparty.com/','the block party’s own record'],
  'lineup announcement':['https://northalsted.com/events/northalsted-market-days-2026/','lineup announcement'],
  'parade reclaims the spirit of protest':['https://pridechicago.org/faq-and-map/','turned back toward protest'],
  'they cannot take our joy':['https://pridechicago.org/faq-and-map/','refused to surrender the celebration'],
  'Pride Parade turned back toward protest':['https://pridechicago.org/faq-and-map/','Pride Parade turned back toward protest'],
  'parade coverage':['https://pridechicago.org/faq-and-map/','the parade'],
  'Northalsted parade':['https://pridechicago.org/faq-and-map/','Northalsted parade'],
  'Pride Parade':['https://pridechicago.org/faq-and-map/','Pride Parade'],
  'El Grito scaled down':['https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html','El Grito scaled down'],
  'El Grito announced its own return':['https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html','El Grito announced its own return'],
  'visibly thin crowds':['https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html','visibly thin crowds'],
  'active ICE vehicle stops':['https://www.fiestadelsol.org/blog/fiesta-del-sol-to-ice-community-festivals-should-be-places-of-joy-not-fear','active enforcement in the area'],
  'restoration promise':['https://riotfest.org/','restoration promise'],
  'Wrigley Field or the United Center':['https://www.facebook.com/ConcernedaboutDouglasPark/','Wrigley Field or the United Center'],
  'Chosen Few Picnic':['https://chosenfewdjs.com/','Chosen Few Picnic'],
  'Bronzeville Smooth Jazz Festival':[CC,'Bronzeville Smooth Jazz Festival'],
  '4th on 53rd parade':[CC,'4th on 53rd parade'],
  'Lincoln Square':[CC,'Lincoln Square'],
  'Glenwood Avenue Arts District':[CC,'Glenwood Avenue Arts District'],
  'Edgewater Music Fest':[CC,'Edgewater Music Fest'],
  'Lollapalooza':['https://www.lollapalooza.com/lineup','Lollapalooza'],
  'Do Division’s $10':[CC,'Do Division’s $10'],
  'Ginza Holiday':[CC,'Ginza Holiday'],
  'Old Town Art Fair':[CC,'Old Town Art Fair'],
  'Windy City Smokeout':['https://www.choosechicago.com/articles/festivals-special-events/windy-city-smokeout/','Windy City Smokeout'],
  'West Loop Art Festival':[CC,'West Loop Art Festival'],
  'Chicago Italian Beef Festival':[CC,'Chicago Italian Beef Festival'],
  'Retro on Roscoe':[CC,'Retro on Roscoe'],
  'Puerto Rican Fest':[CC,'Puerto Rican Fest'],
  'Panda Fest at $12.79, Gold Coast Art Fair at $12.51, Puerto Rican Fest at $18.18':[CC,'Panda Fest at $12.79, Gold Coast Art Fair at $12.51, Puerto Rican Fest at $18.18'],
}

let n = 0
for (const f of fs.readdirSync('content/summer-2026').filter(x=>/^part\d+\.js$/.test(x))) {
  const p = 'content/summer-2026/' + f
  let s = fs.readFileSync(p,'utf8')
  s = s.replace(/<a href="([^"]+)">([^<]*)<\/a>/g, (m,url,txt) => {
    if (!news.some(d=>url.includes(d))) return m
    const r = REPLACE[txt.trim()]
    if (r) { n++; return `<a href="${r[0]}">${r[1]}</a>` }
    return m
  })
  fs.writeFileSync(p,s)
}
console.log('anchors rewritten:', n)
