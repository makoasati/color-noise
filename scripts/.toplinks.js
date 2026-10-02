// One-off: fix the dead Commons link and restore natural in-body links to the
// nine articles that fell below the 3-link minimum when the citation
// paragraphs were removed. Every target verified to exist.
const fs = require('fs')
const dir = 'content/summer-2026'

const EDITS = [
  // Dead link already live on the site.
  ['part1.js',
   'https://commons.wikimedia.org/wiki/Category:Grant_Park,_Chicago',
   'https://commons.wikimedia.org/wiki/Category:Grant_Park_(Chicago)'],

  // D25 Do Division — needs 2
  ['part5.js',
   'Nelson Algren wrote this part of Chicago — Division Street and the blocks around it',
   'Nelson Algren wrote this part of Chicago — <a href="https://commons.wikimedia.org/wiki/Category:Division_Street_(Chicago)">Division Street</a> and the blocks around it'],
  ['part5.js',
   'It is how Chicago keeps street fests functionally free while still paying for them',
   'It is how the <a href="https://www.westtownchamber.org/">West Town Chamber</a> and its counterparts keep street fests functionally free while still paying for them'],

  // D30 Taste of Lincoln Avenue — needs 2 links and ~25 words
  ['part5.js',
   'What explains it is institutional patience.',
   'What explains it is institutional patience, of a kind that never makes the programme.'],
  ['part5.js',
   'Forty-two years means somebody has been maintaining relationships with an alderman’s office, a police district, a sound engineer and a set of nearby residents continuously since the early eighties.',
   'Forty-two years means somebody has been maintaining relationships with an alderman’s office, a police district, a sound engineer and a set of nearby residents continuously since the early eighties. Every one of those relationships has to be renewed by a person who is not paid to renew it, and any one of them failing ends the festival.'],
  ['part5.js',
   'The festival itself is a food-and-music event on a closed stretch of Lincoln',
   'The festival itself is a food-and-music event on a closed stretch of <a href="https://commons.wikimedia.org/wiki/Category:Lincoln_Park,_Chicago">Lincoln Avenue</a>'],
  ['part5.js',
   'Forty-two years of a street festival that a well-connected neighbourhood has tried more than once to switch off.',
   'Forty-two years of a street festival that a well-connected neighbourhood has tried more than once to switch off, on a strip the <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">city still lists</a> every summer without comment.'],

  // D31 Edgewater — needs 1
  ['part5.js',
   'Edgewater has venues, a substantial residential musician population',
   '<a href="https://commons.wikimedia.org/wiki/Category:Edgewater,_Chicago">Edgewater</a> has venues, a substantial residential musician population'],

  // D32 Retro on Roscoe — needs 1
  ['part5.js',
   'Roscoe Village is a quiet, well-off North Side neighbourhood of two-flats and small storefronts',
   '<a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Roscoe Village</a> is a quiet, well-off North Side neighbourhood of two-flats and small storefronts'],

  // D38 Pride Fest — needs 1
  ['part6.js',
   'Barricades, permits, insurance and performer fees are real invoices',
   'Barricades, permits, insurance and performer fees are real invoices for the <a href="https://northalsted.com/">business alliance</a> that carries them'],

  // D41 Puerto Rican Fest — needs 1
  ['part6.js',
   'Humboldt Park’s Puerto Rican population has fallen substantially',
   '<a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">Humboldt Park</a>’s Puerto Rican population has fallen substantially'],

  // D53 Ribfest — needs 1
  ['part7.js',
   'A <a href="https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/">the published calendars</a>',
   'A <a href="https://commons.wikimedia.org/wiki/Category:North_Center,_Chicago">North Center</a>'],
  ['part7.js',
   'A North Center rib festival with twenty-plus vendors and a judged competition',
   'A <a href="https://commons.wikimedia.org/wiki/Category:North_Center,_Chicago">North Center</a> rib festival with twenty-plus vendors and a judged competition'],

  // D56 Italian beef — needs 1
  ['part7.js',
   'Jefferson Park is a Northwest Side neighbourhood of bungalows near the Blue Line terminus',
   '<a href="https://commons.wikimedia.org/wiki/Category:Jefferson_Park,_Chicago">Jefferson Park</a> is a Northwest Side neighbourhood of bungalows near the Blue Line terminus'],

  // D58 Panda Fest — needs 1
  ['part7.js',
   'Chinatown’s fair happened on Wentworth Avenue, in Chinatown, because that is where Chinatown is.',
   'Chinatown’s fair happened on <a href="https://commons.wikimedia.org/wiki/Category:Chinatown,_Chicago">Wentworth Avenue</a>, in Chinatown, because that is where Chinatown is.'],
]

let ok = 0, miss = []
for (const [f, a, b] of EDITS) {
  const p = dir + '/' + f
  let s = fs.readFileSync(p, 'utf8')
  if (!s.includes(a)) { miss.push(f + ' :: ' + a.slice(0, 58)); continue }
  fs.writeFileSync(p, s.split(a).join(b))
  ok++
}
console.log('applied:', ok, 'of', EDITS.length)
for (const m of miss) console.log('  MISS', m)
