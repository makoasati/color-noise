// Color&Noise — Chicago performing-arts houses, Oct 2026 → Jan 2027
//
// The earlier fall sweep (import-fall-2026-events.js) covered rock clubs,
// festivals, markets and sports but never the theaters, so touring work like
// the Georgian National Ballet "Sukhishvili" at the Harris was missing entirely.
// This fills in the proscenium venues.
//
// Houses covered: Harris Theater, Auditorium Theatre, Lyric Opera House,
// Symphony Center, The Chicago Theatre, the four Broadway in Chicago houses
// (CIBC, Nederlander, Cadillac Palace, Broadway Playhouse), Old Town School of
// Folk Music, Thalia Hall, Vic Theatre, Copernicus Center, Goodman, Aragon.
//
// Usage
//   node scripts/import-theaters-fall-2026.js            dry run
//   node scripts/import-theaters-fall-2026.js --commit   insert
//
// Non-destructive, skips what the calendar already holds, safe to re-run.
//
// Categories: dance and theatre go to `art` (Seen), matching the existing
// Joffrey and Hubbard Street rows. Concerts and opera go to `music` (Heard).

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')

const COMMIT = process.argv.includes('--commit')
const TS = new Date().toISOString()

const SRC = {
  harris:    ['Harris Theater', 'https://www.harristheaterchicago.org/'],
  sukhi:     ['Sukhishvili (official)', 'https://sukhishvili.net/en/usa/'],
  aud:       ['Auditorium Theatre', 'https://auditoriumtheatre.org/events/'],
  bway:      ['Broadway in Chicago', 'https://www.broadwayinchicago.com/shows/'],
  lyric:     ['Lyric Opera of Chicago', 'https://www.lyricopera.org/newseason'],
  joffrey:   ['Joffrey Ballet', 'https://joffrey.org/performances-and-tickets/26-27-season/the-nutcracker-3/'],
  cso:       ['Chicago Symphony Orchestra', 'https://chicagosymphony.org/concerts-tickets/whats-on/'],
  ots:       ['Old Town School of Folk Music', 'https://www.oldtownschool.org/concerts/'],
  chiTheatre:['chicago.theater', 'https://chicago.theater/venue/the-chicago-theatre/'],
  thalia:    ['chicago.theater', 'https://chicago.theater/venue/thalia-hall/'],
  vic:       ['chicago.theater', 'https://chicago.theater/venue/vic-theatre/'],
  copernicus:['Copernicus Center', 'https://copernicuscenter.org/upcoming-events/'],
  goodman:   ['Goodman Theatre', 'https://www.goodmantheatre.org/season/'],
  ct:        ['chicago.theater', 'https://chicago.theater/concerts/october/'],
}

const V = {
  harris:     ['Harris Theater, 205 E. Randolph St.', 'Millennium Park'],
  aud:        ['Auditorium Theatre, 50 E. Ida B. Wells Dr.', 'Loop'],
  lyric:      ['Lyric Opera House, 20 N. Upper Wacker Dr.', 'Loop'],
  symphony:   ['Orchestra Hall, Symphony Center, 220 S. Michigan Ave.', 'Loop'],
  chiTheatre: ['The Chicago Theatre, 175 N. State St.', 'Loop'],
  cibc:       ['CIBC Theatre, 18 W. Monroe St.', 'Loop'],
  nederlander:['James M. Nederlander Theatre, 24 W. Randolph St.', 'Loop'],
  cadillac:   ['Cadillac Palace Theatre, 151 W. Randolph St.', 'Loop'],
  playhouse:  ['Broadway Playhouse at Water Tower Place, 175 E. Chestnut St.', 'Near North Side'],
  ots:        ['Old Town School of Folk Music, 4544 N. Lincoln Ave.', 'Lincoln Square'],
  thalia:     ['Thalia Hall, 1807 S. Allport St.', 'Pilsen'],
  vic:        ['Vic Theatre, 3145 N. Sheffield Ave.', 'Lakeview'],
  copernicus: ['Copernicus Center, 5216 W. Lawrence Ave.', 'Jefferson Park'],
  goodmanA:   ['Albert Theatre, Goodman Theatre, 170 N. Dearborn St.', 'Loop'],
  goodmanO:   ['Owen Theatre, Goodman Theatre, 170 N. Dearborn St.', 'Loop'],
  aragon:     ['Byline Bank Aragon Ballroom, 1106 W. Lawrence Ave.', 'Uptown'],
}

function ev(title, category, date, endDate, venueKey, srcKey, description, time) {
  const [name, url] = SRC[srcKey]
  const [venue, neighborhood] = V[venueKey]
  return {
    title, category, date,
    end_date: endDate || null,
    time: time || null,
    venue, neighborhood,
    description: description || null,
    primary_source_url: url,
    primary_source_name: name,
    additional_sources: [],
    status: 'approved',
    first_seen_at: TS,
  }
}
// shorthand: one-night booking
const one = (date, title, cat, venueKey, srcKey, desc, time) => ev(title, cat, date, null, venueKey, srcKey, desc, time)
// shorthand: same show, several nights, one row each
const nights = (dates, title, cat, venueKey, srcKey, desc) =>
  dates.map(d => ev(title, cat, d, null, venueKey, srcKey, desc))

const EVENTS = [

  // ─────────────────────────────────────────────────────────────── HARRIS
  ev('Georgian National Ballet "Sukhishvili"', 'art', '2026-10-20', null, 'harris', 'sukhi',
    'The Georgian National Ballet on its US tour, dancing to original live music from its own orchestra of rare instruments. Listed by the Harris as a Visiting Company date; the Chicago stop sits between Seattle (Oct 18) and New York (Oct 24).', '8:00 PM'),
  one('2026-10-01', 'Desinight 2026', 'art', 'harris', 'harris',
    "AIA Chicago's annual design awards — the profession's own ceremony for Chicago buildings, naming project, emerging-talent and lifetime honours.", '6:00 PM'),
  one('2026-10-03', 'TEDxChicago: We The People', 'art', 'harris', 'harris',
    'A day of talks and performances on civic life, under the banner We The People.', '10:00 AM'),
  one('2026-10-14', 'Swan Lake: Symphony of Lights', 'art', 'harris', 'harris'),
  one('2026-10-15', 'The Main Squeeze', 'music', 'harris', 'harris'),
  one('2026-10-16', 'Red Line Jazz Festival', 'music', 'harris', 'harris'),
  one('2026-10-17', 'Michael Douglas', 'art', 'harris', 'harris', 'An evening with the actor.'),
  one('2026-10-19', 'Vivaldi & Beyond', 'music', 'harris', 'harris'),
  one('2026-10-21', 'GMMTV Fanday 38: Force & Book', 'music', 'harris', 'harris',
    'Force Jiratchapong and Book Kasidet of the Thai studio GMMTV, on their first US date — a fan event rather than a theatre booking.', '6:00 PM'),
  one('2026-10-22', 'Beyond the Aria: Lawrence Brownlee, Christian Van Horn, Alexis Peart', 'music', 'harris', 'harris'),
  one('2026-10-26', '3Arts Awards Celebration', 'art', 'harris', 'harris', 'Annual awards for Chicago artists in the performing, visual and media arts.'),
  one('2026-10-27', 'Piano Trios: Beethoven, Smetana, Dvořák', 'music', 'harris', 'harris'),
  one('2026-11-07', '28th National Cuatro Festival Puertorriqueño', 'music', 'harris', 'harris',
    'Long-running celebration of the Puerto Rican cuatro.'),
  one('2026-11-08', 'Cinderella', 'art', 'harris', 'harris'),
  one('2026-11-14', 'Sol Invictus', 'music', 'harris', 'harris'),
  one('2026-11-16', 'Beyond the Aria: Ying Fang, Ian Rucker, Camille Robles', 'music', 'harris', 'harris'),
  one('2026-11-19', 'The Nutcracker: Symphony of Lights', 'art', 'harris', 'harris'),
  one('2026-11-23', 'SOLO', 'art', 'harris', 'harris'),
  one('2026-12-04', 'Silver and Gold', 'music', 'harris', 'harris'),
  one('2026-12-12', 'Brandenburg Concertos', 'music', 'harris', 'harris'),
  ev('The Nutcracker (Ballet Chicago)', 'art', '2026-12-18', '2026-12-20', 'harris', 'harris',
    'Ballet Chicago\'s annual staging — the smaller, cheaper Nutcracker against the Joffrey\'s.'),

  // ───────────────────────────────────────────────────────── AUDITORIUM
  one('2026-10-05', 'My Hero Academia In Concert', 'music', 'aud', 'aud', 'Anime soundtrack performed live.', '7:30 PM'),
  one('2026-10-08', 'UB40', 'music', 'aud', 'aud', 'The reggae band — the closest thing to a reggae booking in the whole calendar.', '8:00 PM'),
  ...nights(['2026-10-09', '2026-10-10'], 'Beck', 'music', 'aud', 'aud', 'Two nights, with Ioanna Gika and Wayne Faler opening.'),
  one('2026-10-11', 'Metaphor: ReFantazio in Concert', 'music', 'aud', 'aud', 'Game score played by the Chicago Philharmonic.', '8:00 PM'),
  one('2026-10-14', 'Chrono Trigger in Concert', 'music', 'aud', 'aud', 'Video game music performed live.', '8:00 PM'),
  one('2026-10-17', 'Dance Theatre of Harlem', 'art', 'aud', 'aud',
    'The Harlem company opens the Auditorium\'s 2026-27 Dance Season.', '7:30 PM'),
  one('2026-10-20', 'The Rogue Route with Sarah Jakes Roberts', 'art', 'aud', 'aud',
    'With Luvvie Ajayi Jones, Tasha Cobbs Leonard and Kayla Wanakee.', '8:00 PM'),
  one('2026-10-22', 'Maher Zain', 'music', 'aud', 'aud', 'USA Tour 2026.', '7:30 PM'),
  one('2026-11-01', 'Outlander In Concert', 'music', 'aud', 'aud', null, '7:00 PM'),
  one('2026-11-07', 'Dance Me: The Music of Leonard Cohen', 'art', 'aud', 'aud',
    'Ballets Jazz Montréal, part of the 2026-27 Dance Season.', '7:30 PM'),

  // ──────────────────────────────────────────────── LYRIC OPERA HOUSE
  ev('Mozart: Don Giovanni', 'music', '2026-10-10', '2026-11-01', 'lyric', 'lyric',
    'Opens the 2026/27 season. Enrique Mazzola conducts, Robert Falls directs, Christian Van Horn in the title role.'),
  ...nights(['2026-10-23', '2026-10-25', '2026-10-28'], 'Omar (Rhiannon Giddens & Michael Abels)', 'music', 'lyric', 'lyric',
    'Lyric premiere of the Pulitzer-winning opera. Kazem Abdullah conducts, Kaneza Schaal directs.'),
  ev('Donizetti: Don Pasquale', 'music', '2026-11-12', '2026-11-27', 'lyric', 'lyric',
    'Mazzola conducts, Mariame Clément directs.'),
  ...nights(['2026-11-20', '2026-11-22'], 'Wagner: Myth & Music', 'music', 'lyric', 'lyric',
    'Concert program conducted by Alexander Soddy.'),
  ...nights(['2026-11-28', '2026-11-29'], 'Disney\'s Encanto in Concert Live to Film', 'music', 'lyric', 'lyric',
    'Gonzalo Farias conducts.'),
  ev('Joffrey Ballet: The Nutcracker', 'art', '2026-12-04', '2026-12-27', 'lyric', 'joffrey',
    'Christopher Wheeldon\'s Chicago-set staging, which moves the story to the 1893 World\'s Columbian Exposition.'),

  // ────────────────────────────────────────────────── SYMPHONY CENTER
  one('2026-12-04', 'CSO: Muti conducts Welter and Dvořák 8', 'music', 'symphony', 'cso'),
  one('2026-12-05', 'CSO: Muti conducts Welter and Dvořák 8', 'music', 'symphony', 'cso'),
  ...nights(['2026-12-10', '2026-12-11', '2026-12-12'], 'CSO: Muti & Yefim Bronfman — Postcard from Vienna', 'music', 'symphony', 'cso'),
  ...nights(['2026-12-12', '2026-12-13'], 'Elf in Concert', 'music', 'symphony', 'cso', 'Film with live orchestra.'),
  ...nights(['2026-12-17', '2026-12-18'], 'CSO: Handel\'s Messiah', 'music', 'symphony', 'cso'),
  ...nights(['2026-12-18', '2026-12-19'], 'Merry, Merry Chicago!', 'music', 'symphony', 'cso', 'The CSO\'s annual holiday program.'),

  // ─────────────────────────────────────────── BROADWAY IN CHICAGO
  ev('Jekyll & Hyde', 'art', '2026-10-05', '2026-11-08', 'playhouse', 'bway'),
  ev('Operation Mincemeat: A New Musical', 'art', '2026-10-05', '2026-10-11', 'cibc', 'bway'),
  ev('Waitress', 'art', '2026-10-13', '2026-10-18', 'nederlander', 'bway'),
  ev('The Book of Mormon', 'art', '2026-10-23', '2026-11-01', 'cadillac', 'bway'),
  ev('Jersey Boys', 'art', '2026-11-10', '2026-11-22', 'cibc', 'bway'),
  ev('Mrs. Doubtfire', 'art', '2026-11-24', '2026-11-29', 'nederlander', 'bway'),
  ev('Blue Man Group: A New Holiday Surprise', 'art', '2026-11-24', '2026-12-13', 'cibc', 'bway'),
  ev('The Hip Hop Nutcracker', 'art', '2026-11-24', '2026-11-29', 'cadillac', 'bway',
    'The Tchaikovsky score re-cut for a hip-hop company, with a live DJ and violinist.'),
  ev('The Unauthorized Hallmark(ish) Parody Musical', 'art', '2026-12-08', '2026-12-13', 'playhouse', 'bway'),
  ev('Dr. Seuss\' How the Grinch Stole Christmas! The Musical', 'art', '2026-12-09', '2026-12-27', 'nederlander', 'bway'),
  ev('Love Actually In Concert', 'art', '2026-12-12', null, 'cadillac', 'bway'),
  ev('Potted Potter', 'art', '2026-12-15', '2027-01-03', 'playhouse', 'bway'),
  ev('Bluey\'s Big Play', 'art', '2026-12-18', '2026-12-20', 'cadillac', 'bway'),
  ev('The Sound of Music', 'art', '2026-12-22', '2026-12-27', 'cadillac', 'bway'),

  // ───────────────────────────────────────────────── THE CHICAGO THEATRE
  one('2026-10-08', 'Souvenirs: A Celebration of John Prine', 'music', 'chiTheatre', 'chiTheatre'),
  ...nights(['2026-10-09', '2026-10-10'], 'Jerry Seinfeld', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-10-15', 'Robert Plant', 'music', 'chiTheatre', 'chiTheatre'),
  one('2026-10-16', 'Brad Williams', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-10-17', 'Ben Schwartz', 'art', 'chiTheatre', 'chiTheatre'),
  ...nights(['2026-10-23', '2026-10-24', '2026-10-26', '2026-10-27'], 'Tedeschi Trucks Band', 'music', 'chiTheatre', 'chiTheatre',
    'Four-night stand.'),
  one('2026-10-25', 'Brett Goldstein', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-10-28', 'Father Mike Schmitz', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-10-29', 'Xscape: Symphony of Love with Live Orchestra', 'music', 'chiTheatre', 'chiTheatre'),
  one('2026-10-30', 'D.L. Hughley & Don Lemon', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-10-31', 'The Rocky Horror Picture Show', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-11-04', 'Blade Runner Live In Concert', 'music', 'chiTheatre', 'chiTheatre'),
  one('2026-11-05', 'Joey Diaz', 'art', 'chiTheatre', 'chiTheatre'),
  one('2026-11-06', 'Bert Kreischer', 'art', 'chiTheatre', 'chiTheatre'),

  // ───────────────────────────────── OLD TOWN SCHOOL OF FOLK MUSIC
  one('2026-10-08', 'The Making of "How Lucky Can One Man Get?"', 'music', 'ots', 'ots'),
  ...nights(['2026-10-09', '2026-10-10'], 'Rufus Wainwright', 'music', 'ots', 'ots'),
  one('2026-10-10', 'John Prine 80th Birthday Celebration', 'music', 'ots', 'ots',
    'Tribute night for what would have been Prine\'s 80th.'),
  one('2026-10-12', 'Indigenous Peoples\' Day concert', 'music', 'ots', 'ots'),
  one('2026-10-14', 'The Bolero Project', 'music', 'ots', 'ots'),
  one('2026-10-14', 'Joshua Burnside', 'music', 'ots', 'ots'),
  one('2026-10-16', 'Fugu Dugu', 'music', 'ots', 'ots'),
  one('2026-10-21', 'Furious Desire', 'music', 'ots', 'ots'),
  ...nights(['2026-10-23', '2026-10-24', '2026-10-25'], 'Judy Collins', 'music', 'ots', 'ots', 'Three nights.'),
  one('2026-10-25', 'Spooky Sing-Along', 'music', 'ots', 'ots'),
  one('2026-10-28', 'Día de los Muertos concert', 'music', 'ots', 'ots'),
  one('2026-10-29', 'Little Barrie', 'music', 'ots', 'ots'),
  one('2026-10-31', 'Marshall Crenshaw', 'music', 'ots', 'ots'),
  one('2026-11-01', 'Billy Prine', 'music', 'ots', 'ots'),
  one('2026-11-03', 'Margaret Glaspy', 'music', 'ots', 'ots'),
  one('2026-11-04', 'ImprovisAsian', 'music', 'ots', 'ots'),
  one('2026-11-04', 'Lizzy & the Triggermen', 'music', 'ots', 'ots'),
  one('2026-11-05', 'Steve Forbert', 'music', 'ots', 'ots'),
  one('2026-11-06', 'Pieta Brown', 'music', 'ots', 'ots'),
  one('2026-11-07', 'Teen Open Mic', 'music', 'ots', 'ots'),
  ...nights(['2026-11-07', '2026-11-08', '2026-11-10', '2026-11-11'], 'Lucinda Williams', 'music', 'ots', 'ots', 'Four-night residency.'),
  one('2026-11-11', 'ConstelNation — The Bridge #2.11', 'music', 'ots', 'ots'),
  one('2026-11-13', 'Liana Flores', 'music', 'ots', 'ots'),
  one('2026-11-14', 'Twin Peaks: A Conversation With The Stars', 'art', 'ots', 'ots'),
  one('2026-11-18', 'Chicago Flamenco Nights', 'music', 'ots', 'ots'),
  one('2026-11-21', 'WHY?', 'music', 'ots', 'ots'),
  one('2026-11-21', 'Jake Blount Band', 'music', 'ots', 'ots'),
  one('2026-11-22', 'Cracker', 'music', 'ots', 'ots'),
  one('2026-11-25', 'Black and White Gipsy Orchestra', 'music', 'ots', 'ots'),
  one('2026-11-25', 'Rickie Lee Jones', 'music', 'ots', 'ots'),
  ...nights(['2026-11-28', '2026-11-29'], 'Mariachi Herencia de México', 'music', 'ots', 'ots', 'Multiple shows each day.'),
  one('2026-12-02', 'Parranda Gaitera', 'music', 'ots', 'ots'),
  one('2026-12-03', 'Over the Rhine', 'music', 'ots', 'ots'),
  one('2026-12-04', 'Bedouine', 'music', 'ots', 'ots'),
  one('2026-12-05', 'Irish Christmas in America', 'music', 'ots', 'ots'),
  one('2026-12-05', 'Teen Open Mic', 'music', 'ots', 'ots'),
  one('2026-12-09', 'Mousiki Parea', 'music', 'ots', 'ots'),
  ...nights(['2026-12-10', '2026-12-11', '2026-12-12', '2026-12-13'], 'Songs of Good Cheer', 'music', 'ots', 'ots',
    'The school\'s long-running holiday singalong with Chicago Tribune hosts.'),

  // ───────────────────────────────────────────────────────── THALIA HALL
  one('2026-10-08', 'SYML', 'music', 'thalia', 'thalia'),
  one('2026-10-09', 'The Dead Bolts', 'music', 'thalia', 'thalia'),
  one('2026-10-10', 'Rock and Roll Playhouse: The Music of Grateful Dead for Kids', 'music', 'thalia', 'thalia',
    'Family matinee — the Dead, for children.'),
  one('2026-10-10', 'Armand Hammer', 'music', 'thalia', 'thalia'),
  one('2026-10-11', 'Emei', 'music', 'thalia', 'thalia'),
  ...nights(['2026-10-15', '2026-10-16'], 'Osees', 'music', 'thalia', 'thalia', 'Two nights.'),
  one('2026-10-18', 'John Scofield', 'music', 'thalia', 'thalia'),
  one('2026-10-22', 'Swedm', 'music', 'thalia', 'thalia'),
  one('2026-10-23', 'Playgrnd Series', 'music', 'thalia', 'thalia'),
  one('2026-10-24', 'Tank and The Bangas', 'music', 'thalia', 'thalia'),
  one('2026-10-27', 'This Is Lorelei', 'music', 'thalia', 'thalia'),
  one('2026-10-28', 'Phillip Phillips', 'music', 'thalia', 'thalia'),
  one('2026-10-29', 'The Tallest Man on Earth', 'music', 'thalia', 'thalia'),
  one('2026-11-03', 'Best Friends Podcast', 'art', 'thalia', 'thalia'),
  one('2026-11-06', 'Phoebe Robinson', 'art', 'thalia', 'thalia'),
  one('2026-11-09', 'The War and Treaty', 'music', 'thalia', 'thalia'),
  one('2026-11-10', 'Jalen Ngonda', 'music', 'thalia', 'thalia'),
  one('2026-11-11', 'Hovvdy', 'music', 'thalia', 'thalia'),
  one('2026-11-12', 'Hiss Golden Messenger', 'music', 'thalia', 'thalia'),
  one('2026-11-13', 'Ethan Regan', 'music', 'thalia', 'thalia'),
  one('2026-11-14', 'The Wooten Brothers', 'music', 'thalia', 'thalia'),

  // ─────────────────────────────────────────────────────────── VIC THEATRE
  ...nights(['2026-10-07', '2026-10-09'], 'Robby Hoffman', 'art', 'vic', 'vic'),
  ...nights(['2026-10-10', '2026-10-11'], 'Jordan Jensen', 'art', 'vic', 'vic'),
  one('2026-10-15', 'Daði Freyr', 'music', 'vic', 'vic'),
  one('2026-10-16', 'Off Book', 'art', 'vic', 'vic'),
  one('2026-10-17', 'Catch Your Breath', 'music', 'vic', 'vic'),
  one('2026-10-18', 'Good Hang with Amy Poehler Live!', 'art', 'vic', 'vic'),
  one('2026-10-21', 'DJ Shadow', 'music', 'vic', 'vic'),
  one('2026-10-22', 'The Buena Vista Orchestra', 'music', 'vic', 'vic'),
  one('2026-10-23', 'Randy Feltface', 'art', 'vic', 'vic'),
  one('2026-10-24', 'Shane Dawson', 'art', 'vic', 'vic'),
  one('2026-10-25', 'The Longest Johns', 'music', 'vic', 'vic'),
  one('2026-10-27', 'Joanne McNally', 'art', 'vic', 'vic'),
  one('2026-10-28', 'Shakey Graves', 'music', 'vic', 'vic'),
  one('2026-10-30', '8Turn', 'music', 'vic', 'vic'),
  one('2026-10-31', 'Allison Russell', 'music', 'vic', 'vic'),
  one('2026-11-04', "Scott Bradlee's Postmodern Jukebox", 'music', 'vic', 'vic'),
  one('2026-11-05', 'Pigeons Playing Ping Pong', 'music', 'vic', 'vic'),
  one('2026-11-06', 'Justin Silva', 'art', 'vic', 'vic'),
  one('2026-11-07', 'Ari Matti', 'art', 'vic', 'vic'),
  one('2026-11-08', 'Joy Oladokun', 'music', 'vic', 'vic'),
  one('2026-11-10', 'Hunxho', 'music', 'vic', 'vic'),
  one('2026-11-11', 'Shyne & Lil Cease', 'music', 'vic', 'vic'),
  one('2026-11-13', 'Amber Autry', 'art', 'vic', 'vic'),

  // ───────────────────────────────────────────────────── COPERNICUS CENTER
  one('2026-10-09', 'Tito Nieves', 'music', 'copernicus', 'copernicus'),
  one('2026-10-15', 'Plim Plim', 'art', 'copernicus', 'copernicus', 'Family show.', '6:00 PM'),
  one('2026-10-21', 'Beat', 'music', 'copernicus', 'copernicus'),
  one('2026-10-22', 'Steve Taylor', 'music', 'copernicus', 'copernicus'),
  one('2026-10-23', 'Hablando Huevadas', 'art', 'copernicus', 'copernicus', null, '8:00 PM'),
  one('2026-11-05', 'Mijares', 'music', 'copernicus', 'copernicus', null, '8:30 PM'),
  one('2026-11-07', 'NPC Midwest Gladiator', 'nightlife', 'copernicus', 'copernicus', 'Bodybuilding competition, morning and afternoon shows.'),
  one('2026-11-13', 'Asim Azhar', 'music', 'copernicus', 'copernicus', null, '8:30 PM'),
  one('2026-11-18', 'tripleS World Tour', 'music', 'copernicus', 'copernicus'),
  one('2026-11-26', 'George Dalaras', 'music', 'copernicus', 'copernicus', 'The Greek singer, on Thanksgiving night.'),
  one('2026-11-28', 'My Christmas Spectacular 2026!', 'music', 'copernicus', 'copernicus'),
  one('2026-12-05', 'Latin Dance Revue', 'art', 'copernicus', 'copernicus', 'Two shows, 3pm and 7pm.'),
  one('2026-12-18', 'Kristina Orbakaite Live', 'music', 'copernicus', 'copernicus', null, '8:00 PM'),
  one('2026-12-20', 'Oneus', 'music', 'copernicus', 'copernicus'),

  // ──────────────────────────────────────────────────── GOODMAN + ARAGON
  ev('The Attic', 'art', '2026-10-05', '2026-10-11', 'goodmanA', 'goodman',
    'Extended run of the acrobatic theatre piece.'),
  ev('Dead Girl\'s Quinceañera', 'art', '2026-10-05', '2026-11-01', 'goodmanO', 'goodman'),
  one('2026-10-09', 'Shaboozey', 'music', 'aragon', 'ct', null, '7:30 PM'),
]

// ── duplicate detection (mirrors lib/event-dedupe.js, which is ESM) ─────────

const normalizeText = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
const normalizeVenue = v => normalizeText(v)
  .replace(/\b(cocktail lounge|lounge|club|theater|theatre|hall|center|centre)\b/g, ' ').replace(/\s+/g, ' ').trim()

const STOPWORDS = new Set(['and', 'at', 'day', 'feat', 'featuring', 'for', 'from', 'in', 'live', 'night',
  'nightly', 'of', 'on', 'session', 'set', 'sets', 'the', 'with', 'chicago', 'annual', 'festival', 'fest',
  'street', 'park', 'summer', 'series', 'show', 'party', 'concert'])

function tokens(title, venue) {
  const vt = new Set(normalizeVenue(venue).split(' ').filter(Boolean))
  return normalizeText(title).split(' ').filter(t => t.length >= 4 && !vt.has(t) && !STOPWORDS.has(t))
}

function titlesMatch(a, b) {
  const left = normalizeText(a.title)
  const right = normalizeText(b.title)
  if (!left || !right) return false
  if (left === right) return true
  if (left.includes(right) || right.includes(left)) {
    const ratio = Math.min(left.length, right.length) / Math.max(left.length, right.length)
    if (ratio >= 0.65) return true
  }
  const rt = new Set(tokens(b.title, b.venue))
  return tokens(a.title, a.venue).filter(t => rt.has(t)).length >= 2
}

const datesOverlap = (a, b) => {
  const aEnd = a.end_date || a.date
  const bEnd = b.end_date || b.date
  return a.date <= bEnd && b.date <= aEnd
}

// Distinct events the overlap heuristic mistakes for each other: the three
// Nutcrackers, two Beyond the Aria nights, the Messiah/Muti December weeks.
// Each verified by hand against the calendar.
// Titles that bypass the collision check, because a same-night, similarly-named
// booking elsewhere in the calendar would otherwise swallow them.
//
// WARNING: this list is why the script is NOT idempotent. Everything in it
// inserts unconditionally, so a second --commit run duplicates every FORCE'd
// row that already landed on the first. Three of them (both Nutcrackers and the
// November Beyond the Aria) are already in the calendar. Clear the entries that
// have been inserted before re-running, or insert new rows on their own.
const FORCE = new Set([
  'The Nutcracker (Ballet Chicago)',
  'The Nutcracker: Symphony of Lights',
  'Joffrey Ballet: The Nutcracker',
  'The Hip Hop Nutcracker',
  'Beyond the Aria: Ying Fang, Ian Rucker, Camille Robles',
  'CSO: Handel\'s Messiah',
  'Merry, Merry Chicago!',
  'Elf in Concert',
  'Teen Open Mic',
  'Día de los Muertos concert',
  // One-night screening at the Chicago Theatre, not the Music Box shadowcast run.
  'The Rocky Horror Picture Show',
])

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) { console.error('Missing Supabase env vars in .env.local'); process.exit(1) }
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

  const existing = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, date, end_date, venue, category')
      .gte('date', '2026-09-01').lte('date', '2027-01-31')
      .range(from, from + 999)
    if (error) { console.error('Read failed:', error.message); process.exit(1) }
    existing.push(...(data || []))
    if (!data || data.length < 1000) break
  }

  const toInsert = []
  const collisions = []
  for (const row of EVENTS) {
    const hit = FORCE.has(row.title) ? null : existing.find(e => datesOverlap(e, row) && titlesMatch(e, row))
    if (hit) { collisions.push([row.title, row.date, hit.title, hit.date]); continue }
    toInsert.push(row)
    existing.push({ ...row, id: `planned-${row.title}-${row.date}` })
  }

  const byCat = {}; const byMonth = {}; const byVenue = {}
  for (const r of toInsert) {
    byCat[r.category] = (byCat[r.category] || 0) + 1
    byMonth[r.date.slice(0, 7)] = (byMonth[r.date.slice(0, 7)] || 0) + 1
    const v = r.venue.split(',')[0]
    byVenue[v] = (byVenue[v] || 0) + 1
  }

  console.log(`Assembled:  ${EVENTS.length}`)
  console.log(`Skipped:    ${collisions.length} (already in calendar)`)
  console.log(`To insert:  ${toInsert.length}`)
  console.log(`  category: ${JSON.stringify(byCat)}`)
  console.log(`  month:    ${JSON.stringify(byMonth)}`)
  console.log('\n  by venue:')
  Object.entries(byVenue).sort((a, b) => b[1] - a[1]).forEach(([v, n]) => console.log(`    ${String(n).padStart(3)}  ${v}`))

  if (collisions.length) {
    console.log('\n── skipped ──')
    for (const c of collisions) console.log(`  ${c[0].slice(0, 44).padEnd(46)} ${c[1]}  ←  "${c[2]}" (${c[3]})`)
  }

  if (!COMMIT) {
    console.log(`\nDry run. Nothing written. Re-run with --commit to insert ${toInsert.length} rows.`)
    return
  }

  const BATCH = 50
  let inserted = 0
  for (let i = 0; i < toInsert.length; i += BATCH) {
    const { error } = await supabase.from('events').insert(toInsert.slice(i, i + BATCH))
    if (error) {
      console.error(`\nInsert failed at index ${i}: ${error.message}`)
      console.error(`${inserted} inserted before the failure. Nothing deleted or overwritten.`)
      process.exit(1)
    }
    inserted += Math.min(BATCH, toInsert.length - i)
    console.log(`  inserted ${inserted} / ${toInsert.length}`)
  }
  console.log(`\nDone. ${inserted} events inserted as status="approved".`)
}

main().catch(err => { console.error(err); process.exit(1) })
