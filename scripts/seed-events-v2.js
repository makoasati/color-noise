// Color&Noise — events seed script (v2 expanded CSV)
// Deletes events with date 2026-05-23 through 2026-07-22, then inserts fresh.
// Usage: node scripts/seed-events-v2.js

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const TS  = new Date().toISOString()
const SRC = 'Color & Noise Import'

function ev(title, category, date, endDate, venue, neighborhood, url) {
  return {
    title,
    category,
    date,
    end_date: endDate || null,
    venue: venue || null,
    neighborhood: neighborhood || null,
    primary_source_url: url || null,
    primary_source_name: SRC,
    additional_sources: [],
    status: 'approved',
    first_seen_at: TS,
  }
}

// ─── Helper: generate one event per date in an array ─────────────────────────
function multi(dates, title, category, venue, neighborhood, url) {
  return dates.map(d => ev(title, category, d, null, venue, neighborhood, url))
}

// ─── Events ──────────────────────────────────────────────────────────────────
// Categories: music (Heard) | art (Seen) | food (Savored) | nightlife (Around)

const EVENTS = [

  // ── May: Festivals & One-Off Events ────────────────────────────────────────
  ev('Sueños Music Festival',                    'music',     '2026-05-23', '2026-05-24', 'Grant Park',                             'Loop/South Loop',           'https://suenosmusicfestival.com/'),
  ev('Chicago Memorial Day Parade',              'nightlife', '2026-05-23', null,         'Downtown Loop',                          'Loop',                       'https://www.chicago.gov/city/en/depts/dca/supp_info/dates.html'),
  ev('Belmont-Sheffield Music Fest',             'music',     '2026-05-22', '2026-05-24', 'Belmont & Sheffield Ave',                'Lakeview',                   'https://chicagoevents.com/event/belmont-sheffield-music-fest/'),
  ev('Do Division Street Fest',                  'music',     '2026-05-29', '2026-05-31', 'Division St between Damen & Leavitt',   'West Town',                  'https://www.westtownchamber.org/do-division'),
  ev('Maifest in Lincoln Square',                'nightlife', '2026-05-29', '2026-05-31', 'Lincoln Ave & Western Ave',              'Lincoln Square',             'https://www.maifestchicago.com/'),
  ev('Windy City Hot Dog Fest',                  'food',      '2026-05-29', '2026-05-31', 'Portage Park',                           'Portage Park',               'https://chicagoevents.com/event/windy-city-hot-dog-fest/'),
  ev('Randolph Street Market – Garden Party Market', 'nightlife', '2026-05-23', '2026-05-24', '1341 W Randolph St',               'West Loop',                  'https://randolphstreetmarket.com/'),
  ev('Magnificent Mile Art Fest',                'art',       '2026-05-30', '2026-05-31', 'Magnificent Mile',                       'Streeterville / Gold Coast', 'https://art-collecting.com/galleries_il_chicago.htm'),

  // ── June: Festivals ─────────────────────────────────────────────────────────
  ev('Chicago Blues Festival',                   'music',     '2026-06-04', '2026-06-07', 'Millennium Park & Ramova Theatre',       'Loop / Bridgeport',          'https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_blues_festival.html'),
  ev('Lincoln Park Greek Fest',                  'food',      '2026-06-05', '2026-06-07', 'North Sheffield Ave',                    'Lincoln Park',               'https://www.lincolnparkgreekfest.com/'),
  ev('Ribfest Chicago',                          'food',      '2026-06-05', '2026-06-07', 'Lincoln Ave between Irving Park & Berteau', 'North Center',            'https://www.ribfest-chicago.com/'),
  ev('57th Street Art Fair',                     'art',       '2026-06-06', '2026-06-07', '57th St',                                'Hyde Park',                  'https://www.choosechicago.com/event/the-79th-annual-57th-street-art-fair/2026-06-06/'),
  ev('Beyond Wonderland (EDM Festival)',         'music',     '2026-06-06', '2026-06-07', 'Northerly Island',                       'Near South Side',            'https://chicago.beyondwonderland.com/'),
  ev('Maxwell Street Market',                    'nightlife', '2026-06-07', null,         'Maxwell St between Halsted & Union',     'Near West Side / UIC',       'https://www.chicago.gov/city/en/depts/dca/supp_info/maxwell_visit.html'),
  ev('Puerto Rican Festival',                    'nightlife', '2026-06-11', '2026-06-14', 'Humboldt Park',                          'Humboldt Park',              'https://www.choosechicago.com/blog/festivals/chicago-summer-festivals-the-ultimate-guide/'),
  ev('Midsommarfest',                            'nightlife', '2026-06-12', '2026-06-14', 'Andersonville neighborhood',             'Andersonville',              'https://andersonville.org/midsommarfest/'),
  ev('Old Town Art Fair',                        'art',       '2026-06-13', '2026-06-14', '1763 N. North Park Ave',                 'Old Town',                   'https://www.oldtownartfair.org/'),
  ev('Wells Street Art Festival',                'art',       '2026-06-13', '2026-06-14', 'Wells St from North Ave to Division St', 'Old Town',                   'https://www.wellsstreetartfest.us/'),
  ev('Taste of Randolph',                        'food',      '2026-06-19', '2026-06-21', 'Randolph St from Peoria to Racine',      'West Loop',                  'https://www.tasteofrandolph.org/'),
  ev('Fiesta Back of the Yards',                 'nightlife', '2026-06-19', '2026-06-21', 'Ashland Ave 45th to 47th St',            'Back of the Yards',          'https://bync.org/events/about-fiesta'),
  ev('Juneteenth Freedom Market at The Salt Shed','nightlife','2026-06-19', null,         'The Salt Shed',                          'West Town',                  'https://do312.com/venues/the-salt-shed'),
  ev('Chicago Pride Fest',                       'nightlife', '2026-06-20', '2026-06-21', 'Halsted St from Addison to Grace St',    'Northalsted / Lakeview',     'https://northalsted.com/main-events/chicago-pride-fest/'),
  ev('Gold Coast Art Fair',                      'art',       '2026-06-20', '2026-06-21', 'Gold Coast neighborhood',                'Gold Coast',                 'https://www.choosechicago.com/blog/festivals/chicago-summer-festivals-the-ultimate-guide/'),
  ev('Logan Square Arts Festival',               'nightlife', '2026-06-26', '2026-06-28', 'Logan Square neighborhood',              'Logan Square',               'https://logansquareaf.com/fest'),
  ev('Chicago Taco & Tequila Fest',              'food',      '2026-06-26', '2026-06-27', 'Wrightwood Park',                        'Lincoln Park',               'https://chicagoevents.com/event/windy-city-hot-dog-fest/'),
  ev('Millennium Art Festival',                  'art',       '2026-06-27', '2026-06-28', 'Michigan Ave downtown',                  'Loop',                       'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'),
  ev('Navy Pier Pride Day',                      'nightlife', '2026-06-27', null,         'Navy Pier',                              'Streeterville',              'https://www.choosechicago.com/articles/festivals-special-events/chicago-pride-month/'),
  ev('Chicago Pride Parade',                     'nightlife', '2026-06-28', null,         'Northalsted neighborhood parade route',  'Lakeview / Northalsted',     'https://northalsted.com/main-events/chicago-pride-fest/'),
  ev('Flavors of Albany Park',                   'food',      '2026-06-24', null,         'Albany Park neighborhood',               'Albany Park',                'https://www.northrivercommission.org/flavors'),

  // ── June: Concerts & Shows ──────────────────────────────────────────────────
  ev('Avery Lynch',                              'music',     '2026-06-01', null,         'Schubas',                                'Lakeview',                   'https://chicago.theater/concerts/june/'),
  ev('Johnny Burgin',                            'music',     '2026-06-01', null,         'SPACE Evanston',                         'Evanston',                   'https://chicago.theater/concerts/june/'),
  ev('Jazz at Lincoln Center Orchestra & Wynton Marsalis', 'music', '2026-06-02', null,  'Orchestra Hall at Chicago Symphony Center','Loop',                      'https://chicago.theater/concerts/june/'),
  ev('Kevin Morby',                              'music',     '2026-06-02', null,         'Metro Chicago',                          'Wrigleyville',               'https://chicago.theater/concerts/june/'),
  ev('Megan Moroney',                            'music',     '2026-06-02', '2026-06-03', 'United Center',                          'Near West Side',             'https://chicago.theater/concerts/june/'),
  ev('Moon Walker',                              'music',     '2026-06-02', null,         'Subterranean',                           'Wicker Park',                'https://chicago.theater/concerts/june/'),
  ev('Primus / Les Claypool / Claypool Lennon Delirium', 'music', '2026-06-03', null,   'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.songkick.com/metro-areas/9426-us-chicago/june-2026'),
  ev('Marcus King Band – Darling Blue Tour',     'music',     '2026-06-19', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://do312.com/venues/the-salt-shed'),
  ev('Tash Sultana – North American Tour',       'music',     '2026-06-20', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.ticketmaster.com/the-salt-shed-indoors-shed-tickets-chicago/venue/33244'),
  ev('Something For The Summer – Ty Dolla $ign','music',     '2026-06-21', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.ticketmaster.com/the-salt-shed-outdoors-fairgrounds-tickets-chicago/venue/33256'),
  ev('The Dead South with Amigo the Devil',      'music',     '2026-06-25', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.ticketmaster.com/the-salt-shed-outdoors-fairgrounds-tickets-chicago/venue/33256'),
  ev('Kurt Vile and the Violators',              'music',     '2026-06-26', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://do312.com/venues/the-salt-shed'),
  ev('Ed Sheeran – Loop Tour',                   'music',     '2026-06-27', null,         'Soldier Field',                          'South Loop',                 'https://www.choosechicago.com/blog/special-events/30-cant-miss-things-to-do-in-chicago-in-2026-concerts-exhibits-festivals-and-more/'),
  ev('Suffs (The Musical)',                      'art',       '2026-06-28', null,         'George Van Dusen Theatre – North Shore Center','Skokie',               'https://chicago.theater/shows/'),

  // ── Ravinia June ────────────────────────────────────────────────────────────
  ev('Ravinia Festival – Terence Blanchard & Ravi Coltrane', 'music', '2026-06-03', null,'Martin Theatre – Ravinia Park',          'Highland Park',              'https://www.ravinia.org/'),
  ev('Ravinia Festival – Joshua Bell & Jeremy Denk',         'music', '2026-06-05', null,'Ravinia Park',                           'Highland Park',              'https://www.ravinia.org/'),
  ev('Ravinia Festival – Alisa Weilerstein & Inon Barnatan', 'music', '2026-06-07', null,'Ravinia Park',                           'Highland Park',              'https://www.ravinia.org/'),
  ev('Ravinia Festival – Wildflowers: Kurt Elling with Fred Hersch','music','2026-06-06','2026-06-07','Sandra K. Crown Theater – Ravinia','Highland Park',         'https://www.ravinia.org/'),

  // ── July: Festivals ─────────────────────────────────────────────────────────
  ev('Wale & Smino – Everything Is A Lot? Tour', 'music',    '2026-07-01', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.ticketmaster.com/the-salt-shed-outdoors-fairgrounds-tickets-chicago/venue/33256'),
  ev('African/Caribbean International Festival of Life','nightlife','2026-07-03','2026-07-05','Union Park',                        'West Town',                  'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'),
  ev('Taste of Chicago',                         'food',      '2026-07-08', '2026-07-12', 'Grant Park',                             'Loop',                       'https://www.choosechicago.com/articles/festivals-special-events/taste-of-chicago-overview/'),
  ev('Windy City Smokeout',                      'food',      '2026-07-08', '2026-07-12', 'United Center parking lot',              'Near West Side',             'https://abc7chicago.com/post/chicago-festivals-2026-see-list-food-events-city-suburbs-including-lollapalooza-taste-millennium-park/18952102/'),
  ev('Square Roots Festival',                    'music',     '2026-07-10', '2026-07-12', 'Lincoln Square',                         'Lincoln Square',             'https://www.choosechicago.com/blog/festivals/chicago-summer-festivals-the-ultimate-guide/'),
  ev('Southport Art Fest',                       'art',       '2026-07-11', '2026-07-12', '3700 block of N Southport',              'Lakeview',                   'https://www.nbcchicago.com/news/local/complete-guide-to-chicagos-2026-street-festivals-and-summer-events/3921357/'),
  ev('Chosen Few Picnic (House Music)',           'music',     '2026-07-11', null,         'Jackson Park',                           'South Shore / Jackson Park', 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'),
  ev('Tacos y Tamales Festival',                 'food',      '2026-07-17', '2026-07-19', 'Blue Island Ave between Wolcott & Ashland','Pilsen',                   'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'),
  ev('Roscoe Village Burger Fest',               'food',      '2026-07-17', '2026-07-19', '2000 block of W Belmont Ave',            'Roscoe Village',             'https://www.choosechicago.com/blog/festivals/chicago-summer-festivals-the-ultimate-guide/'),
  ev('Taste of River North',                     'food',      '2026-07-17', '2026-07-18', 'Wells St between Ontario & Superior',    'River North',                'https://chicagoevents.com/event/taste-of-river-north/'),
  ev('Maxwell Street Market',                    'nightlife', '2026-07-19', null,         'Maxwell St between Halsted & Union',     'Near West Side / UIC',       'https://www.chicago.gov/city/en/depts/dca/supp_info/maxwell_visit.html'),
  ev('Silver Room Block Party at The Salt Shed', 'nightlife', '2026-07-18', null,         'The Salt Shed',                          'West Town / Noble Square',   'https://blockclubchicago.org/2026/04/10/silver-room-block-party-set-to-return-july-18-at-the-salt-shed/'),
  ev('Fiesta Del Sol',                           'nightlife', '2026-07-23', '2026-07-26', 'Pilsen neighborhood',                    'Pilsen',                     'https://www.choosechicago.com/blog/festivals/chicago-summer-festivals-the-ultimate-guide/'),
  ev('Wicker Park Fest',                         'music',     '2026-07-24', '2026-07-26', 'Milwaukee Ave from Damen to Wolcott',    'Wicker Park',                'https://www.nbcchicago.com/news/local/complete-guide-to-chicagos-2026-street-festivals-and-summer-events/3921357/'),
  ev('Randolph Street Market – Summer Edition',  'nightlife', '2026-07-25', '2026-07-26', '1341 W Randolph St',                     'West Loop',                  'https://randolphstreetmarket.com/'),
  ev('Taste of Lincoln Avenue',                  'food',      '2026-07-24', '2026-07-26', 'Lincoln Ave',                            'Lincoln Square',             'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'),
  ev('Chinatown Summer Fair',                    'nightlife', '2026-07-25', '2026-07-26', 'Chinatown neighborhood',                 'Chinatown',                  'https://www.choosechicago.com/articles/food-drink/your-guide-to-chicagos-food-festivals/'),
  ev('Mount Prospect Lions Club Annual Festival','nightlife', '2026-07-01', '2026-07-05', 'Mount Prospect',                         'Mount Prospect',             'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'),

  // ── July: Concerts ──────────────────────────────────────────────────────────
  ev('Ella Mai',                                 'music',     '2026-07-10', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://seatgeek.com/venues/the-salt-shed-outdoors/tickets'),
  ev('Royel Otis with Ax and the Hatchetmen',    'music',     '2026-07-13', '2026-07-14', 'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://seatgeek.com/venues/the-salt-shed-outdoors/tickets'),
  ev('Dawes',                                    'music',     '2026-07-21', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.jambase.com/venue/the-salt-shed-outdoors-fairgrounds'),
  ev('Jack White',                               'music',     '2026-07-24', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://seatgeek.com/venues/the-salt-shed-outdoors/tickets'),
  ev('Houndmouth with Rayland Baxter',           'music',     '2026-07-25', null,         'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://seatgeek.com/venues/the-salt-shed-outdoors/tickets'),
  ev('Wicker Park Fest – Warm Love Cool Dreams Festival','music','2026-07-25',null,       'The Salt Shed (Outdoors)',                'West Town / Noble Square',   'https://www.songkick.com/metro-areas/9426-us-chicago'),

  // ── Ravinia July ────────────────────────────────────────────────────────────
  ev('Ravinia Festival – CSO Grand Opening / Lizzo & Yunchan Lim','music','2026-07-11',null,'Hunter Pavilion – Ravinia Park',       'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Billy Idol',            'music',     '2026-07-12', null,         'Ravinia Park',                           'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Squirrel Nut Zippers',  'music',     '2026-07-14', null,         'Carousel Stage – Ravinia Park',          'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Harry Connick Jr.',     'music',     '2026-07-15', null,         'Ravinia Park',                           'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev("Ravinia Festival – Mozart's The Abduction from the Seraglio (CSO)",'music','2026-07-16','2026-07-18','Martin Theatre – Ravinia Park','Highland Park',         'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Paul Simon',            'music',     '2026-07-17', '2026-07-18', 'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Beethoven Pastoral / CSO','music',   '2026-07-19', null,         'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Augustin Hadelich (violin)','music', '2026-07-22', null,         'Ravinia Park',                           'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – CSO with Klaus Mäkelä (debut)','music','2026-07-22',null,        'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia – Mahler\'s Sixth Symphony (CSO)', 'music',     '2026-07-23', null,         'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia – Marin Alsop / CSO Film Music',   'music',     '2026-07-24', null,         'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia – St. Vincent with orchestra',     'music',     '2026-07-25', null,         'Hunter Pavilion – Ravinia Park',         'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),
  ev('Ravinia Festival – Emmylou Harris & Graham Nash','music','2026-07-26',null,          'Ravinia Park',                           'Highland Park',              'https://abc7chicago.com/post/ravinia-festival-2026-schedule-list-more-90-concerts-including-paul-simon-gladys-knight-miranda-lambert-ricky-martin/18705574/'),

  // ── Theater & Ongoing Shows ──────────────────────────────────────────────────
  ev('& Juliet – The Musical',                   'art',       '2026-07-10', null,         'Auditorium Theatre',                     'Loop',                       'https://chicago.theater/shows/'),
  ev('Physical Theater Festival Chicago',        'art',       '2026-06-01', '2026-06-07', 'Various locations',                      'Citywide',                   'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'),
  ev('Water for Elephants – The Musical',        'art',       '2026-05-01', '2026-07-31', 'Nederlander Theatre 24 W Randolph St',   'Loop',                       'https://chicago.theater/july/'),
  ev('Theater of the Mind Chicago',              'art',       '2026-05-23', '2026-07-12', 'Reid Murdoch Building 333 N LaSalle',    'River North',                'https://www.choosechicago.com/events/category/theater-performing-arts/'),
  ev('Skyline Sessions at Navy Pier',            'nightlife', '2026-05-28', '2026-09-04', 'Navy Pier',                              'Streeterville',              'https://navypier.org/'),

  // ── Art Exhibitions ─────────────────────────────────────────────────────────
  ev('Unrestrained Ambiguity – Denise Presnell', 'art',       '2026-05-26', '2026-06-21', 'Evanston Art Center',                    'Evanston',                   'https://www.chicagogallerynews.com/events?filter=openings'),
  ev('Excerpts of Imagination – Louis De Guzman','art',       '2026-05-23', '2026-06-21', 'Evanston Art Center',                    'Evanston',                   'https://www.chicagogallerynews.com/events?filter=openings'),
  ev('AFTER DARK – Jackson Junge Gallery',       'art',       '2026-07-10', null,         'Jackson Junge Gallery',                  'Chicago',                    'https://j2gallery.com/exhibitions/upcoming/'),
  ev('Vanessa Filley: Flying Kites in a Windless World','art','2026-05-09','2026-07-11',  'OS Projects Gallery',                    'Chicago',                    'https://www.chicagogallerynews.com/events?filter=openings'),
  ev('Canvas Color & Vision Exhibition',         'art',       '2026-05-15', '2026-07-03', 'ShadowBoxX Gallery',                     'Chicago',                    'https://www.chicagogallerynews.com/events?filter=openings'),
  ev('Alberto Aguilar Exhibition',               'art',       '2026-03-28', '2026-08-23', 'Chicago Cultural Center',                'Loop',                       'https://www.chicago.gov/city/en/depts/dca/supp_info/exhibits.html'),
  ev('Ornament & Information Exhibition',        'art',       '2026-04-10', '2026-07-19', 'Chicago Cultural Center',                'Loop',                       'https://www.chicago.gov/city/en/depts/dca/supp_info/exhibits.html'),
  ev('Nora Turato: I hear you I hear you – Video Installation','art','2026-05-22','2026-08-26','Art Institute of Chicago',           'Loop',                       'https://www.artic.edu/exhibitions/upcoming'),
  ev('Willem de Kooning Drawing Exhibition',     'art',       '2026-06-14', '2026-09-20', 'Art Institute of Chicago',               'Loop',                       'https://www.artic.edu/exhibitions/upcoming'),
  ev('Abigail Lucien: Blood of the Earth',       'art',       '2026-06-18', '2027-01-25', 'Art Institute of Chicago',               'Loop',                       'https://www.artic.edu/exhibitions/upcoming'),
  ev('Self Made: Fourteen Modern Artists',       'art',       '2026-06-25', '2026-11-09', 'Art Institute of Chicago',               'Loop',                       'https://www.artic.edu/exhibitions/upcoming'),
  ev('Beyond Form: Abstraction at Midcentury',   'art',       '2026-06-27', '2026-10-19', 'Art Institute of Chicago',               'Loop',                       'https://www.artic.edu/exhibitions/upcoming'),
  ev('Dancing the Revolution: From Dancehall to Reggaetón','art','2026-04-14','2026-09-20','Museum of Contemporary Art Chicago',    'Streeterville',              'https://art-collecting.com/galleries_il_chicago.htm'),
  ev('Kenzi Shiokava Exhibition',                'art',       '2026-06-27', '2027-01-31', 'Museum of Contemporary Art Chicago',     'Streeterville',              'https://ocula.com/cities/usa/chicago-art-galleries/exhibitions/'),
  ev('Zhou B Art Center – 3rd Friday Opening',  'art',       '2026-06-19', null,         'Zhou B Art Center 1029 W 35th St',       'Bridgeport',                 'https://www.choosechicago.com/events/category/museums-gallery-exhibitions/'),
  ev('Zhou B Art Center – 3rd Friday Opening',  'art',       '2026-07-17', null,         'Zhou B Art Center 1029 W 35th St',       'Bridgeport',                 'https://www.choosechicago.com/events/category/museums-gallery-exhibitions/'),

  // ── Navy Pier Summer Fireworks ───────────────────────────────────────────────
  ...multi(
    ['2026-05-23','2026-05-27','2026-05-30','2026-06-03','2026-06-06','2026-06-10',
     '2026-06-13','2026-06-17','2026-06-20','2026-06-24','2026-06-27','2026-07-01',
     '2026-07-04','2026-07-08','2026-07-11','2026-07-15','2026-07-18','2026-07-22'],
    'Navy Pier Summer Fireworks', 'nightlife',
    'Navy Pier', 'Streeterville',
    'https://navypier.org/pier-events/summer-fireworks/'
  ),

  // ── Millennium Park Summer Workouts ─────────────────────────────────────────
  ...multi(
    ['2026-05-23','2026-05-30','2026-06-06','2026-06-13','2026-06-20','2026-06-27','2026-07-11','2026-07-18'],
    'Millennium Park Summer Workouts', 'nightlife',
    'Grant Park Great Lawn', 'Loop',
    'https://www.millenniumparkfoundation.org/'
  ),

  // ── Grant Park Music Festival ────────────────────────────────────────────────
  ev('Grant Park Music Festival – Bernstein West Side Story','music','2026-06-10',null,'Jay Pritzker Pavilion','Loop','https://www.grantparkmusicfestival.com/'),
  ...multi(
    ['2026-06-13','2026-06-17','2026-06-20','2026-06-24','2026-06-27','2026-07-01',
     '2026-07-08','2026-07-11','2026-07-15','2026-07-18','2026-07-22'],
    'Grant Park Music Festival – Concert', 'music',
    'Jay Pritzker Pavilion', 'Loop',
    'https://www.grantparkmusicfestival.com/'
  ),

  // ── Millennium Park Summer Music Series ─────────────────────────────────────
  ev('Millennium Park Summer Music Series – Arrested Development / Linda Sol / DJ Ca$h Era',            'music','2026-06-15',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),
  ev("Millennium Park Summer Music Series – Let the Spirit Out! Juneteenth (Kahil El'Zabar / Nona Hendryx / David Murray)", 'music','2026-06-18',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),
  ev('Millennium Park Summer Music Series – Sheila E. / Melody Angel / DJ Larz Natural',                'music','2026-06-22',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),
  ev('Millennium Park Summer Music Series – Patrice Rushen / Sparklmami / DJ Shon Dervis',              'music','2026-06-25',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),
  ev('Millennium Park Summer Music Series – Sir Chloe / Venus & the Flytraps / DJ Jill Hopkins',        'music','2026-06-29',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),
  ev('Millennium Park Summer Music Series – Marcos Valle / Daniel Villarreal / DJ Clark Quente',        'music','2026-07-16',null,'Jay Pritzker Pavilion','Loop','https://www.chicago.gov/city/en/depts/dca/supp_info/millennium_park_music_series.html'),

  // ── Millennium Park Summer Film Series ──────────────────────────────────────
  ...multi(
    ['2026-06-30','2026-07-07','2026-07-14','2026-07-21'],
    'Millennium Park Summer Film Series – Free Film Screening', 'art',
    'Jay Pritzker Pavilion', 'Loop',
    'https://www.millenniumparkfoundation.org/'
  ),

  // ── Second City Mainstage 114th Revue ───────────────────────────────────────
  ...multi(
    ['2026-05-23','2026-05-24','2026-05-27','2026-05-28','2026-05-29','2026-05-30','2026-05-31',
     '2026-06-03','2026-06-04','2026-06-05','2026-06-06','2026-06-07',
     '2026-06-10','2026-06-11','2026-06-12','2026-06-13','2026-06-14',
     '2026-06-17','2026-06-18','2026-06-19','2026-06-20','2026-06-21',
     '2026-06-24','2026-06-25','2026-06-26','2026-06-27','2026-06-28',
     '2026-07-01','2026-07-02','2026-07-03','2026-07-04','2026-07-05',
     '2026-07-08','2026-07-09','2026-07-10','2026-07-11','2026-07-12',
     '2026-07-15','2026-07-16','2026-07-17','2026-07-18','2026-07-19','2026-07-22'],
    'Second City Mainstage 114th Revue', 'art',
    'Mainstage at Second City 1616 N Wells St', 'Old Town',
    'https://www.secondcity.com/shows/chicago'
  ),

  // ── iO Theater ──────────────────────────────────────────────────────────────
  ...multi(
    ['2026-05-27','2026-05-28','2026-05-29','2026-05-30','2026-05-31'],
    'iO Theater – Improv & ComedySportz Shows', 'art',
    'iO Theater Lincoln Park', 'Lincoln Park',
    'https://www.choosechicago.com/articles/entertainment/chicago-top-comedy-clubs/'
  ),
  ev('iO Theater – Improv & ComedySportz Shows', 'art', '2026-06-01', '2026-07-31', 'iO Theater Lincoln Park', 'Lincoln Park', 'https://www.ioimprov.com/chicago/shows/'),

  // ── Ongoing Comedy ───────────────────────────────────────────────────────────
  ev('Zanies Comedy Club – Live Comedy',          'art',       '2026-05-23', '2026-07-22', '1548 N Wells St',                        'Old Town',                   'https://www.zanies.com/chicago'),
  ev('Annoyance Theatre – Chicago Comedy Hour',  'art',       '2026-05-23', '2026-07-22', '851 W Belmont Ave 2nd Fl',               'Lakeview',                   'https://www.secondcity.com/shows/chicago/chicago-comedy-hour-chi'),

  // ── Tuesdays on the Terrace – MCA Free Jazz ─────────────────────────────────
  ...multi(
    ['2026-06-02','2026-06-09','2026-06-16','2026-06-23','2026-06-30','2026-07-07','2026-07-14','2026-07-21'],
    'Tuesdays on the Terrace – MCA Free Jazz', 'music',
    'Museum of Contemporary Art 220 E Chicago Ave', 'Streeterville',
    'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'
  ),

  // ── Green Mill ───────────────────────────────────────────────────────────────
  ev('Green Mill – Paul Marinaro Quintet',        'music',     '2026-05-23', null,         'Green Mill 4802 N Broadway Ave',         'Uptown',                     'https://greenmilljazz.com/calendar/'),
  ev('Green Mill – Chicago Jazz Composers Collective','music', '2026-05-24', null,         'Green Mill 4802 N Broadway Ave',         'Uptown',                     'https://greenmilljazz.com/calendar/'),
  ev('Green Mill – Nightly Jazz',                 'music',     '2026-05-23', '2026-07-22', 'Green Mill 4802 N Broadway Ave',         'Uptown',                     'https://greenmilljazz.com/calendar/'),

  // ── Andy's Jazz Club ─────────────────────────────────────────────────────────
  ev("Andy's Jazz Club – Nightly Jazz",           'music',     '2026-05-23', '2026-07-22', "Andy's Jazz Club 11 E Hubbard St",       'River North',                'https://andysjazzclub.com/music-calendar/'),

  // ── Jazz Showcase ────────────────────────────────────────────────────────────
  // May 23–31
  ev('Jazz Showcase – Joe Farnsworth Quartet',    'music','2026-05-23',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Joe Farnsworth Quartet',    'music','2026-05-24',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Dakarai Barclay Quintet',   'music','2026-05-25',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Steve Schneck Quartet',     'music','2026-05-26',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Sabertooth Organ Quartet',  'music','2026-05-27',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Abigail Riccards Quintet',  'music','2026-05-28',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Abigail Riccards Quintet',  'music','2026-05-29',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Abigail Riccards Quintet',  'music','2026-05-30',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Abigail Riccards Quintet',  'music','2026-05-31',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jun 1–7
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-06-01',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-06-02',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-03',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-04',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-05',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-06',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-07',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jun 8–14
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-06-08',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-06-09',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-10',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-11',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-12',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-13',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-14',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jun 15–21
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-06-15',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-06-16',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-17',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-18',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-19',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-20',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-21',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jun 22–29
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-06-22',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-06-23',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-24',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-25',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-26',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-06-27',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-06-29',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jul 1–7
  ev('Jazz Showcase – Soul Message Trio',         'music','2026-07-01',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Justin Dillard Tribute to Dr. Lonnie Smith','music','2026-07-02',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Justin Dillard Tribute to Dr. Lonnie Smith','music','2026-07-03',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Justin Dillard Tribute to Dr. Lonnie Smith','music','2026-07-04',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Justin Dillard Tribute to Dr. Lonnie Smith','music','2026-07-05',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-07-06',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-07-07',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jul 8–14
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-08',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-09',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-10',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-11',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-12',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-07-13',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-07-14',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  // Jul 15–22
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-15',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-16',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-17',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-18',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-19',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Chicago Jazz Orchestra',    'music','2026-07-20',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – WDCB 90.9FM Night (free)', 'music','2026-07-21',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),
  ev('Jazz Showcase – Nightly Show',              'music','2026-07-22',null,'Jazz Showcase 806 S Plymouth Ct','South Loop','https://www.jazzshowcase.com/nowplaying'),

  // ── Chicago SummerDance ──────────────────────────────────────────────────────
  ...multi(
    ['2026-07-02','2026-07-03','2026-07-04','2026-07-09','2026-07-10','2026-07-11','2026-07-16','2026-07-17','2026-07-18','2026-07-22'],
    'Chicago SummerDance – Spirit of Music Garden', 'nightlife',
    'Spirit of Music Garden 112 E Balbo Dr', 'Grant Park / South Loop',
    'https://chicagosummerdance.org'
  ),

  // ── Daley Plaza Farmers Market (Thursdays) ───────────────────────────────────
  ...multi(
    ['2026-05-21','2026-05-28','2026-06-04','2026-06-11','2026-06-18','2026-06-25','2026-07-02','2026-07-09','2026-07-16'],
    'Daley Plaza Farmers Market', 'food',
    'Daley Plaza 50 W Washington St', 'Loop',
    'https://www.cbsnews.com/chicago/news/chicago-farmers-markets-open-2026-season-schedule-locations/'
  ),

  // ── Division Street Farmers Market (Saturdays) ──────────────────────────────
  ...multi(
    ['2026-05-23','2026-05-30','2026-06-06','2026-06-13','2026-06-20','2026-06-27','2026-07-11','2026-07-18'],
    'Division Street Farmers Market', 'food',
    '100 W Division St', 'Wicker Park / Noble Square',
    'https://www.cbsnews.com/chicago/news/chicago-farmers-markets-open-2026-season-schedule-locations/'
  ),

  // ── Ongoing Farmers Markets ──────────────────────────────────────────────────
  ev('Green City Market – Lincoln Park (Wed & Sat)', 'food', '2026-05-01', '2026-10-31', '1817 N Clark St',  'Lincoln Park',  'https://www.cbsnews.com/chicago/news/chicago-farmers-markets-open-2026-season-schedule-locations/'),
  ev('Andersonville Farmers Market (Wednesdays)',    'food', '2026-05-01', '2026-10-31', '1500 W Winona Ave', 'Andersonville', 'https://www.cbsnews.com/chicago/news/chicago-farmers-markets-open-2026-season-schedule-locations/'),
  ev('Green City Market – West Loop (Saturdays)',   'food', '2026-05-01', '2026-11-30', '900 W Monroe St',   'West Loop',     'https://www.cbsnews.com/chicago/news/chicago-farmers-markets-open-2026-season-schedule-locations/'),

  // ── Concerts in the Plaza – Libertyville (Tuesdays) ─────────────────────────
  ...multi(
    ['2026-06-09','2026-06-16','2026-06-23','2026-06-30','2026-07-07','2026-07-14','2026-07-21'],
    'Concerts in the Plaza – Libertyville', 'music',
    'Downtown Libertyville', 'Libertyville',
    'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'
  ),

  // ── Thursday Night Out – Oak Park ───────────────────────────────────────────
  ...multi(
    ['2026-06-04','2026-06-11','2026-06-18','2026-06-25','2026-07-02','2026-07-09','2026-07-16'],
    'Thursday Night Out – Oak Park', 'nightlife',
    'Downtown Oak Park', 'Oak Park',
    'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'
  ),

  // ── Summer Concert Series – Lincoln Square (Thursdays) ──────────────────────
  ...multi(
    ['2026-06-11','2026-06-18','2026-06-25','2026-07-02','2026-07-09','2026-07-16'],
    'Summer Concert Series – Lincoln Square', 'music',
    'Lincoln Square neighborhood', 'Lincoln Square',
    'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'
  ),

  // ── Bells of Summer Concert Series – Hyde Park (Sundays) ────────────────────
  ...multi(
    ['2026-06-28','2026-07-05','2026-07-12','2026-07-19'],
    'Bells of Summer Concert Series – Hyde Park', 'music',
    'Hyde Park neighborhood', 'Hyde Park',
    'https://news.wttw.com/2026-chicago-festival-guide-summer-fall-events'
  ),

]

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nPreparing to insert ${EVENTS.length} events...\n`)

  // Delete events with start date in May 23 – Jul 22 range
  console.log('Deleting existing events (2026-05-23 to 2026-07-22)...')
  const { error: delErr, count: delCount } = await supabase
    .from('events')
    .delete({ count: 'exact' })
    .gte('date', '2026-05-23')
    .lte('date', '2026-07-22')

  if (delErr) {
    console.error('Delete failed:', delErr.message)
    process.exit(1)
  }
  console.log(`Deleted ${delCount ?? '?'} rows.\n`)

  // Insert in batches of 50
  const BATCH = 50
  let inserted = 0
  for (let i = 0; i < EVENTS.length; i += BATCH) {
    const batch = EVENTS.slice(i, i + BATCH)
    const { error } = await supabase.from('events').insert(batch)
    if (error) {
      console.error(`Insert failed at batch starting index ${i}:`, error.message)
      process.exit(1)
    }
    inserted += batch.length
    console.log(`  Inserted ${inserted} / ${EVENTS.length}`)
  }

  console.log(`\nDone! ${EVENTS.length} events loaded into Supabase.\n`)
}

main().catch(err => { console.error(err); process.exit(1) })
