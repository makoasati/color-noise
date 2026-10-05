// Color&Noise — fall/winter 2026 events (Oct 4, 2026 → Jan 1, 2027)
//
// Researched Oct 2026 across Block Club Chicago, Time Out, Choose Chicago,
// chicago.theater, Songkick, venue calendars (Hideout, Empty Bottle), official
// event sites, ESPN and team schedules. Weighted toward the small and niche:
// craft fairs, zine fairs, gallery walks, club shows, neighborhood parties,
// pet events. Sports go in `nightlife` (the Around desk) per editorial call.
//
// Usage
//   node scripts/import-fall-2026-events.js            dry run
//   node scripts/import-fall-2026-events.js --commit   insert
//
// Non-destructive: never deletes or updates, and skips anything the calendar
// already holds (same title-ish, overlapping dates). Safe to re-run.

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')

const COMMIT = process.argv.includes('--commit')
const TS = new Date().toISOString()

// ── sources ──────────────────────────────────────────────────────────────────
const S = {
  bcHalloween: ['Block Club Chicago', 'https://blockclubchicago.org/2026/09/29/your-ultimate-chicago-halloween-guide-70-parties-parades-markets-and-family-fun/'],
  bcOct:       ['Block Club Chicago', 'https://blockclubchicago.org/2026/09/30/13-things-to-do-outside-in-chicago-this-october-2/'],
  bcWknd:      ['Block Club Chicago', 'https://blockclubchicago.org/2026/10/01/24-things-to-do-in-chicago-this-weekend-block-club-chicago-block-party-and-more/'],
  toOct:       ['Time Out Chicago', 'https://www.timeout.com/chicago/events-calendar/october-events-calendar'],
  toNov:       ['Time Out Chicago', 'https://www.timeout.com/chicago/events-calendar/november-events-calendar'],
  toDec:       ['Time Out Chicago', 'https://www.timeout.com/chicago/events-calendar/december-events-calendar'],
  cc:          ['Choose Chicago', 'https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/'],
  hideout:     ['Hideout Chicago', 'https://www.hideoutchicago.com/shows'],
  bottle:      ['Songkick — Empty Bottle', 'https://www.songkick.com/venues/251-empty-bottle/calendar'],
  ctOct:       ['chicago.theater', 'https://chicago.theater/concerts/october/'],
  ctNov:       ['chicago.theater', 'https://chicago.theater/concerts/november/'],
  ctDec:       ['chicago.theater', 'https://chicago.theater/concerts/december/'],
  renegade:    ['Renegade Craft', 'https://www.renegadecraft.com/city/chicago/'],
  fobab:       ['FOBAB', 'https://www.fobab.com/'],
  zine:        ['Chicago Zine Fest', 'https://www.chicagozinefest.org/czf2026.html'],
  bears:       ['Chicago Bears', 'https://www.chicagobears.com/schedule/'],
  hawks:       ['ESPN', 'https://www.espn.com/nhl/team/schedule/_/name/chi'],
  bulls:       ['ESPN', 'https://www.espn.com/nba/team/schedule/_/name/chi'],
  turkey:      ['Turkey Trot Chicago', 'https://www.turkeytrotchicago.com/'],
  santa:       ['Santa Hustle', 'https://santahustle.com/chicago/'],
  ohc:         ['Open House Chicago', 'https://openhousechicago.org/'],
  ciff:        ['Chicago International Film Festival', 'https://www.chicagofilmfestival.com/festival/'],
  nmma:        ['National Museum of Mexican Art', 'https://nationalmuseumofmexicanart.org/events/dia-de-los-muertos-xicago-745'],
  carrera:     ['UNO Chicago', 'https://www.unochicago.org/la-carrera'],
  magmile:     ['The Magnificent Mile', 'https://www.themagnificentmile.com/lights-festival'],
  paws:        ['PAWS Chicago', 'https://www.pawschicago.org/our-work/pet-adoption/adoption-events'],
  mcaDog:      ['MCA Chicago', 'https://visit.mcachicago.org/events/38th-annual-streeterville-dog-halloween-party/'],
}

// title, category, date, endDate, venue, neighborhood, source key, description
function ev(title, category, date, endDate, venue, neighborhood, src, description) {
  const [name, url] = S[src]
  return {
    title, category, date,
    end_date: endDate || null,
    venue: venue || null,
    neighborhood: neighborhood || null,
    description: description || null,
    primary_source_url: url,
    primary_source_name: name,
    additional_sources: [],
    status: 'approved',
    first_seen_at: TS,
  }
}

// One row per date, same details — for shows on consecutive or scattered nights.
function multi(dates, title, category, venue, neighborhood, src, description) {
  return dates.map(d => ev(title, category, d, null, venue, neighborhood, src, description))
}

const HIDEOUT_V = ['Hideout, 1354 W. Wabansia Ave.', 'Bucktown']
const BOTTLE_V = ['Empty Bottle, 1035 N. Western Ave.', 'Ukrainian Village']

// A tiny helper for the two venue calendars, which are just act + date.
const show = (date, acts, src, v, note) =>
  ev(acts, 'music', date, null, v[0], v[1], src, note || null)

const EVENTS = [

  // ════════════════════════════════════════════════════════════════════════
  // CRAFT FAIRS, ART FAIRS, ZINE FAIRS, MARKETS
  // ════════════════════════════════════════════════════════════════════════
  ev('Chicago Zine Fest 2026', 'art', '2026-10-10', null, 'Harold Washington Library Center, 400 S. State St., floors 8–9', 'Loop', 'zine',
    'Free, no tickets: 250+ zinesters sell and trade self-published work, plus workshops. No table fees for exhibitors thanks to CPL.'),
  ev('Pretty Good Fest', 'art', '2026-10-24', null, 'Loop', 'Loop', 'toOct',
    'Free fair for limited-edition comics, artist books and zines from independent publishers.'),
  ev('Fried Poets Society Market', 'art', '2026-10-04', null, "Parson's Logan Square, 2932 W. Armitage Ave.", 'Logan Square', 'bcWknd',
    'Literary fair of local presses and independent publishers.'),
  ev('Renegade Craft Winter Fair', 'art', '2026-12-18', '2026-12-20', 'Bridgeport Art Center, 1200 W. 35th St.', 'Bridgeport', 'renegade',
    '170+ curated makers indoors, rain or snow. $5 suggested entry. Note: Time Out listed Morgan MFG as the venue — confirm before publishing.'),
  ev('One of a Kind Show and Sale', 'art', '2026-12-03', '2026-12-06', 'The Mart, Floor 7, 222 W. Merchandise Mart Plaza', 'River North', 'cc',
    'Four-day makers market of handmade housewares, jewelry and gifts.'),
  ev('Nightmare On Grounds St. Market', 'art', '2026-10-17', null, '747 S. Western Ave.', 'Near West Side', 'bcHalloween',
    'Vendor market of local artists, oddities, tarot readers and tattoo artists.'),
  ev('Halloween Vintage Festival', 'art', '2026-10-17', '2026-10-18', '2 N. Riverside Plaza', 'West Loop', 'bcHalloween',
    '20 vintage vendors with free tote bags and pumpkins.'),
  ev('Lanterns and Legends AAPI Market', 'art', '2026-10-25', null, '1132 W. Argyle St.', 'Uptown', 'bcHalloween',
    'Lantern-lit AAPI fall marketplace with local artists and food vendors.'),
  ev('Manhattan Vintage', 'art', '2026-10-24', '2026-10-25', 'Fulton Market', 'West Town', 'toOct',
    'Vintage market bringing New York City dealers to Chicago.'),
  ev('Randolph Street Market — November', 'art', '2026-11-14', '2026-11-15', '1341 W. Randolph St.', 'West Loop', 'cc',
    'European-style antique and vintage market: fashion, art and décor.'),
  ev('Randolph Street Market — Holiday', 'art', '2026-12-12', '2026-12-13', '1341 W. Randolph St.', 'West Loop', 'cc',
    'Holiday edition of the long-running vintage and antique market.'),
  ev('Vintage House Chicago Market', 'art', '2026-12-20', null, 'Avondale', 'Avondale', 'toDec',
    'Bimonthly secondhand and handmade marketplace of local makers at rotating venues.'),
  ev('Saborcito Soul Day Social & Market', 'nightlife', '2026-10-04', null, "Gamer's Hall, 3609 W. North Ave.", 'Humboldt Park', 'bcWknd',
    'Small-business vendors, food, and social salsa and bachata dancing with a workshop.'),
  ev('ALMA Gallery Open Hours', 'art', '2026-10-04', null, 'ALMA Gallery, 3636 S. Iron St.', 'Bridgeport', 'bcWknd',
    'Public viewing of work from 100+ artists in a Bridgeport warehouse gallery.'),
  ev('Reuse-A-Palooza: Fall Edition', 'nightlife', '2026-10-04', null, 'The Plant, 1400 W. 46th St.', 'Back of the Yards', 'bcWknd',
    'Recycling swap with panel discussions and food inside a former meatpacking plant.'),
  ev('Cabaret Yard Sale: Halloween Edition', 'art', '2026-10-04', null, 'Idea Box Integrated Arts, 5419 N. Lincoln Ave.', 'Lincoln Square', 'bcHalloween',
    'Burlesque, circus, cabaret and drag performers sell gently used costumes and props.'),
  ev('Wicker Park First Fridays', 'art', '2026-11-06', null, 'Galleries across Wicker Park', 'Wicker Park', 'toOct',
    'Free monthly art walk; galleries open late.'),
  ev('Wicker Park First Fridays', 'art', '2026-12-04', null, 'Galleries across Wicker Park', 'Wicker Park', 'toDec',
    'Free monthly art walk; galleries open late.'),
  ev('West Town First Fridays', 'art', '2026-11-06', null, 'Galleries across West Town', 'West Town', 'toOct',
    'Galleries and arts businesses stay open until 8pm on first Fridays.'),
  ev('West Town First Fridays', 'art', '2026-12-04', null, 'Galleries across West Town', 'West Town', 'toDec',
    'Galleries and arts businesses stay open until 8pm on first Fridays.'),
  ev('West Town Art Walk', 'art', '2026-10-04', null, 'Shops and galleries across West Town', 'West Town', 'bcWknd',
    'Gallery exhibitions, free walking tours, pedicabs and busking musicians.'),
  ev('Ghouls Night Out: A Halloween Art Show', 'art', '2026-10-30', null, 'Inside Town Art Collective, 1954 S. Troy St.', 'Little Village', 'bcHalloween',
    'Halloween group show with more than 20 local artists.'),

  // ════════════════════════════════════════════════════════════════════════
  // NEIGHBORHOOD FESTIVALS, PARTIES, PARADES
  // ════════════════════════════════════════════════════════════════════════
  ev('Lincoln Square Ravenswood Apple Fest', 'food', '2026-10-04', null, 'N. Lincoln Ave., Sunnyside to Lawrence', 'Lincoln Square', 'bcOct',
    '100+ vendors of Midwestern produce, apple-themed festival food, cider and live music. $5 suggested donation.'),
  ev('AfroFuturist Weekend', 'art', '2026-10-04', null, 'Various locations citywide', 'Citywide', 'bcWknd',
    'Art exhibits, staged readings and musical tributes built around the theme of "the Cipher."'),
  ev('Ellas y Yo: Mexicanas', 'art', '2026-10-04', null, 'Wirtz Center Chicago, 710 N. DuSable Lake Shore Dr.', 'Streeterville', 'bcWknd',
    'Three-part dance showcase on Mexican women artists.'),
  ev('Democracy At Risk Film Festival', 'art', '2026-10-04', '2026-10-05', 'Gene Siskel Film Center, 164 N. State St.', 'Loop', 'bcWknd',
    'Screenings of "Medium Cool" and "Ace in the Hole."'),
  ev('All Ages Day Party', 'nightlife', '2026-10-04', null, 'National Public Housing Museum, 919 S. Ada St.', 'Near West Side', 'bcWknd',
    'Hip-hop performances and family entertainment in a museum built inside former public housing.'),
  ev('Mary Bartelme Park and West Loop Walking Tour', 'nightlife', '2026-10-04', null, 'Adams and Peoria streets', 'West Loop', 'bcOct',
    'One-mile history walk on the neighborhood from the 19th century on. $25.'),
  ev('Roscoe Village Kidical Mass', 'nightlife', '2026-10-04', null, 'Audubon School, 3500 N. Hoyne Ave.', 'Roscoe Village', 'bcWknd',
    'Family-friendly four-mile group bike ride.'),
  ev('Early Morning Bird Walks at Big Marsh', 'nightlife', '2026-10-05', null, 'Big Marsh Park, 11559 S. Stony Island Ave.', 'South Deering', 'bcOct',
    'Free guided nature walk for BIPOC participants, all skill levels.'),
  ...multi(['2026-10-12', '2026-10-19', '2026-10-26'], 'Early Morning Bird Walks at Big Marsh', 'nightlife',
    'Big Marsh Park, 11559 S. Stony Island Ave.', 'South Deering', 'bcOct',
    'Free guided nature walk for BIPOC participants, all skill levels.'),
  ev('Historic Pullman House Tour', 'art', '2026-10-10', '2026-10-11', 'Pullman National Historical Park', 'Pullman', 'cc',
    'Rare access to the company town\'s mansions and workers\' cottages.'),
  ev('Oktoberfestiversary', 'food', '2026-10-10', '2026-10-11', 'Dovetail & Begyle, 1800 W. Cuyler Ave.', 'North Center', 'bcOct',
    'Two-brewery block party: special tappings, food trucks, live music, dog-friendly, benefiting a local food pantry.'),
  ev('Fall Fest at Jefferson Park', 'nightlife', '2026-10-11', null, 'Jefferson Memorial Park, 4822 N. Long Ave.', 'Jefferson Park', 'bcOct',
    'Free pumpkin patch, crafts, petting zoo and a costume swap.'),
  ev('Open House Chicago', 'art', '2026-10-17', '2026-10-18', '200+ sites citywide', 'Citywide', 'ohc',
    'Free weekend access to 200+ buildings, with 20 new sites in its 16th year — the best architecture event of the Chicago year.'),
  ev('BOOPalooza and BarkPalooza', 'nightlife', '2026-10-17', null, 'Wicker Park, 1425 N. Damen Ave.', 'Wicker Park', 'bcHalloween',
    'All-ages costume parade plus a dog parade and costume contest.'),
  ev('Big Marsh Women\'s Weekend', 'nightlife', '2026-10-24', '2026-10-25', 'Big Marsh Park, 11559 S. Stony Island Ave.', 'South Deering', 'bcOct',
    'Mountain bike and BMX instruction, clinics and group rides for women, trans and non-binary riders.'),
  ev('Arts in the Dark Halloween Parade', 'art', '2026-10-24', null, 'Columbus Drive, Balbo to Monroe', 'Loop', 'bcHalloween',
    '12th annual artist-led Halloween parade with puppets, lanterns and floats; roughly 100,000 spectators expected.'),
  ev('Unity Park Pumpkin Fest', 'nightlife', '2026-10-24', null, 'Unity Park, 2636 N. Kimball Ave.', 'Logan Square', 'bcHalloween',
    'Free pumpkin patch, DJ, costume parade, face painting and a Día de los Muertos ofrenda.'),
  ev('Lincoln Park Spooktacular', 'nightlife', '2026-10-24', '2026-10-25', 'Lincoln Ave. and Clark St.', 'Lincoln Park', 'toOct',
    'Trick-or-treating with a DJ, face painting and neighborhood activities.'),
  ev('Ravenswood Costume Crawl', 'nightlife', '2026-10-28', null, '15 businesses along Montrose and Ravenswood', 'Ravenswood', 'bcHalloween',
    'Costumed crawl of 15 businesses for treats and drinks, with a contest and afterparty.'),
  ev('Montrose Monster Bash', 'nightlife', '2026-10-30', null, 'Businesses along Montrose Ave.', 'Ravenswood', 'bcHalloween',
    'Free family trick-or-treating at local storefronts.'),
  ev('Haunted Halsted Halloween Fest & Parade', 'nightlife', '2026-10-31', null, 'N. Halsted St., Aldine to Addison', 'Northalsted', 'bcHalloween',
    '30th year: a full day of street festival and a night parade with fire breathers, marching bands and a $4,000 costume prize.'),
  ev('Upside Down Halloween Parade', 'nightlife', '2026-10-31', null, 'Russell Drive, Washington Park', 'Washington Park', 'bcHalloween',
    '7th annual reverse parade — costumed performers and puppeteers line the route and the public walks through it.'),
  ev('Wintrust Magnificent Mile Lights Festival', 'nightlife', '2026-11-21', null, 'N. Michigan Ave.', 'Near North Side', 'magmile',
    'Lights Festival Lane 11am–4pm, tree-lighting parade at 5:30pm, fireworks at 7:30pm; one million lights on 200+ trees.'),
  ev('City of Chicago Christmas Tree Lighting', 'nightlife', '2026-11-20', null, 'Millennium Park', 'Millennium Park', 'cc',
    'Century-old city tradition lighting the official Chicago tree.'),
  ev('Chicago Thanksgiving Parade', 'nightlife', '2026-11-26', null, 'State St., Ida B. Wells Dr. to Randolph', 'Loop', 'cc',
    'Floats, dancers, horses and guests down State Street from 8am.'),
  ev('New Year\'s Eve Fireworks at Navy Pier', 'nightlife', '2026-12-31', null, 'Navy Pier', 'Navy Pier', 'cc',
    'Midnight fireworks over Lake Michigan.'),

  // ════════════════════════════════════════════════════════════════════════
  // DÍA DE MUERTOS
  // ════════════════════════════════════════════════════════════════════════
  ev('Día de los Muertos Xicágo', 'art', '2026-10-25', null, 'National Museum of Mexican Art, 1852 W. 19th St.', 'Pilsen', 'nmma',
    '75+ community ofrendas, live music, pan de muerto, Mexican hot chocolate and an illuminated ofrenda projected on the museum exterior.'),
  ev('Where Memory Lives: 40 Years of Día de Muertos', 'art', '2026-10-04', '2026-11-29', 'National Museum of Mexican Art, 1852 W. 19th St.', 'Pilsen', 'nmma',
    'Four decades of the museum\'s Día de Muertos exhibitions, through Mexican and Mexican-American art.'),
  ev('La Carrera de los Muertos / Race of the Dead 5K', 'nightlife', '2026-10-31', null, 'Benito Juarez Community Academy, 1450 W. Cermak Rd.', 'Pilsen', 'carrera',
    '19th year. 8am start with live mariachis, folklórico dancers and Chicago house DJs along the course, then a Day of the Dead party.'),

  // ════════════════════════════════════════════════════════════════════════
  // PET EVENTS
  // ════════════════════════════════════════════════════════════════════════
  ev('Streeterville Doggy (and Kitty) Halloween Party & Parade', 'nightlife', '2026-10-31', null, 'MCA Sculpture Garden, 220 E. Chicago Ave.', 'Streeterville', 'mcaDog',
    '39th annual. Parade steps off 9:15am, judged for best-dressed; donations go to PAWS Chicago.'),
  ev('Northalsted Halloween Pup Crawl', 'nightlife', '2026-10-24', null, 'Halsted St., Aldine to Cornelia', 'Northalsted', 'bcOct',
    'Dog costume parade with vendor giveaways and an after-party brunch. $5 registration.'),
  ev('Haunted Howl-O-Ween Party', 'nightlife', '2026-10-24', null, 'Wag Hotels, 1214 W. Monroe St.', 'West Loop', 'bcHalloween',
    'Dog costume party benefiting senior dogs through the Grey Muzzle Organization.'),
  ev('Howl-o-ween 5K', 'nightlife', '2026-10-25', null, 'Dan Ryan Woods, 2231 W. 83rd St.', 'Auburn Gresham', 'bcHalloween',
    'Halloween 5K for dog owners, benefiting K9s for Veterans.'),
  ev('Howl-O-Ween Canine Cruise', 'nightlife', '2026-10-17', '2026-10-25', 'Chicago\'s First Lady, Riverwalk', 'Loop', 'toOct',
    '90-minute lake and river cruise for costumed dogs and their humans, with a contest.'),
  ev('Zoo Brews: Howls and Growls', 'food', '2026-10-23', '2026-10-24', 'Lincoln Park Zoo, 2001 N. Clark St.', 'Lincoln Park', 'bcOct',
    '21+ Halloween night at the zoo: beer and cider tastings, costume contest, unlimited rides. $65–70.'),
  ev('Creatures of the Night', 'nightlife', '2026-10-28', null, 'Garfield Park Conservatory, 300 N. Central Park Ave.', 'Garfield Park', 'bcOct',
    'Free indoor-outdoor introduction to nocturnal animals, with crafts.'),
  ev('PAWS Chicago Holiday Adopt-a-Thon', 'nightlife', '2026-12-13', '2026-12-21', 'PAWS Chicago Adoption & Humane Center, 1997 N. Clybourn Ave.', 'Lincoln Park', 'paws',
    'Nine days of extended hours and reduced fees to meet adoptable cats and dogs.'),
  ev('Chicago Wolves Adopt-A-Dog Night', 'nightlife', '2026-11-15', null, 'Allstate Arena, 6920 Mannheim Rd., Rosemont', 'Rosemont', 'paws',
    'Adoptable dogs on the concourse at a Wolves home game.'),
  ev('Chicago Wolves Adopt-A-Dog Night', 'nightlife', '2026-12-12', null, 'Allstate Arena, 6920 Mannheim Rd., Rosemont', 'Rosemont', 'paws',
    'Adoptable dogs on the concourse at a Wolves home game.'),

  // ════════════════════════════════════════════════════════════════════════
  // SPORTS  (Around desk, per editorial call)
  // ════════════════════════════════════════════════════════════════════════
  ev('Bank of America Chicago Marathon', 'nightlife', '2026-10-11', null, 'Grant Park start/finish, 29 neighborhoods', 'Grant Park', 'toOct',
    '45,000+ runners over 26.2 miles through 29 neighborhoods. The single biggest spectator day of the Chicago fall.'),
  ev('Bears vs. New England Patriots', 'nightlife', '2026-10-22', null, 'Soldier Field', 'Near South Side', 'bears', 'Thursday night, 7:15pm kickoff.'),
  ev('Bears vs. Tampa Bay Buccaneers', 'nightlife', '2026-11-08', null, 'Soldier Field', 'Near South Side', 'bears', 'Sunday night, 7:20pm kickoff.'),
  ev('Bears vs. New Orleans Saints', 'nightlife', '2026-11-22', null, 'Soldier Field', 'Near South Side', 'bears', 'Noon kickoff.'),
  ev('Bears vs. Jacksonville Jaguars', 'nightlife', '2026-12-06', null, 'Soldier Field', 'Near South Side', 'bears', 'Noon kickoff.'),
  ev('Bears vs. Green Bay Packers', 'nightlife', '2026-12-25', null, 'Soldier Field', 'Near South Side', 'bears', 'Christmas Day against the Packers, noon kickoff.'),
  ev('Blackhawks vs. St. Louis Blues', 'nightlife', '2026-10-06', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Carolina Hurricanes', 'nightlife', '2026-10-10', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Pittsburgh Penguins', 'nightlife', '2026-10-13', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Winnipeg Jets', 'nightlife', '2026-10-15', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Dallas Stars', 'nightlife', '2026-10-17', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Montreal Canadiens', 'nightlife', '2026-10-23', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Florida Panthers', 'nightlife', '2026-10-25', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Los Angeles Kings', 'nightlife', '2026-10-27', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Colorado Avalanche', 'nightlife', '2026-11-02', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Buffalo Sabres', 'nightlife', '2026-11-12', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Winnipeg Jets', 'nightlife', '2026-11-14', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Toronto Maple Leafs', 'nightlife', '2026-11-17', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Columbus Blue Jackets', 'nightlife', '2026-11-19', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. New York Rangers', 'nightlife', '2026-11-27', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Minnesota Wild', 'nightlife', '2026-11-29', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Utah Mammoth', 'nightlife', '2026-12-12', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Ottawa Senators', 'nightlife', '2026-12-18', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Ottawa Senators', 'nightlife', '2026-12-20', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Philadelphia Flyers', 'nightlife', '2026-12-27', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Blackhawks vs. Vegas Golden Knights', 'nightlife', '2026-12-29', null, 'United Center', 'Near West Side', 'hawks', 'Home game.'),
  ev('Bulls preseason vs. Phoenix Suns', 'nightlife', '2026-10-07', null, 'United Center', 'Near West Side', 'bulls', 'Preseason home game.'),
  ev('Bulls preseason vs. Memphis Grizzlies', 'nightlife', '2026-10-09', null, 'United Center', 'Near West Side', 'bulls', 'Preseason home game.'),
  ev('Bulls preseason vs. Minnesota Timberwolves', 'nightlife', '2026-10-16', null, 'United Center', 'Near West Side', 'bulls', 'Preseason home game.'),
  ev('Bulls vs. New York Knicks', 'nightlife', '2026-10-28', null, 'United Center', 'Near West Side', 'bulls', 'Regular season home game.'),
  ev('Femmes and Thems Bike Ride', 'nightlife', '2026-10-04', null, 'Welles Park Gazebo, Sunnyside and Western', 'Lincoln Square', 'bcOct',
    'Eight-mile group ride at an easy 8–10mph, welcoming all forms of micromobility.'),
  ev('Evanston Witches Ride', 'nightlife', '2026-10-29', null, "Mack's Bike & Goods, 2948 Central St., Evanston", 'Evanston', 'bcOct',
    'Free costumed group bike ride with a candy toss, benefiting Sanctuary Evanston. Register by Oct 25.'),
  ev('Hot Chocolate Run', 'nightlife', '2026-11-01', null, 'Grant Park', 'Grant Park', 'toNov',
    '5K/15K that ends in chocolate.'),
  ev('Life Time Turkey Trot Chicago 5K & 8K', 'nightlife', '2026-11-26', null, 'Lincoln Park / Grant Park', 'Lincoln Park', 'turkey',
    '48th annual Thanksgiving run supporting the Greater Chicago Food Depository.'),
  ev('Chi Town Turkey Trot 5K & 10K', 'nightlife', '2026-11-26', null, 'Grant Park', 'Grant Park', 'turkey',
    'Thanksgiving morning 5K/10K with youth races; every finisher gets a medal and a donut.'),
  ev('Santa Hustle Chicago 5K & 10K', 'nightlife', '2026-12-05', null, 'Soldier Field', 'Near South Side', 'santa',
    'Costumed 10K, 5K and kids dash starting at Soldier Field.'),

  // ════════════════════════════════════════════════════════════════════════
  // FOOD & DRINK
  // ════════════════════════════════════════════════════════════════════════
  ev('Festival of Wood & Barrel-Aged Beer (FOBAB)', 'food', '2026-11-13', '2026-11-14', 'Credit Union 1 Arena, 525 S. Racine Ave.', 'Near West Side', 'fobab',
    '24th annual. North America\'s biggest barrel-aged beer festival, 100+ brewers. Two sessions: Fri 6–10pm, Sat 1–5pm.'),
  ev('Lincoln Park Wine Fest', 'food', '2026-10-09', '2026-10-11', 'Jonquil Park', 'Lincoln Park', 'toOct',
    'Sommelier-guided tastings across 12 varietals with live music.'),
  ev('Taste of Northalsted', 'food', '2026-10-04', null, 'Restaurants and breweries along N. Halsted', 'Northalsted', 'bcWknd',
    'Food crawl with 20+ samples.'),
  ev('Good Apple Days', 'food', '2026-10-04', null, 'Farm Bar, Lakeview and Ravenswood', 'Lakeview', 'bcWknd',
    'Fall menu built on apples from Brown Dog Farm.'),
  ev('Oktoberfest at The Northman Beer & Cider Garden', 'food', '2026-10-04', null, 'Chicago Riverwalk', 'Loop', 'toOct',
    'Giant pretzels, sausages and polka on the Riverwalk.'),
  ev('Oktoberfest Nation', 'food', '2026-10-04', '2026-10-24', '171 N. Peoria St.', 'West Loop', 'toOct',
    'Chicago\'s largest Oktoberfest, pouring imported Hofbräu with Bavarian food.'),
  ev('Mocktoberfest', 'food', '2026-10-10', null, 'Palmhouse', 'Suburbs', 'toOct',
    'Zero-proof Oktoberfest with non-alcoholic drinks, food and entertainment.'),
  ev('Pumpkin Carving & Painting at Midwest Coast Brewing', 'food', '2026-10-29', null, 'Midwest Coast Brewing, 2137 W. Walnut St.', 'West Town', 'bcHalloween',
    'Decorate a pumpkin, first drink included.'),
  ev('Terror in the Tropics: Midnight in Mexico', 'nightlife', '2026-10-31', null, 'Salon 61', 'River North', 'toOct',
    'Six Mexico City bars pop up with signature cocktails and DJ sets.'),

  // ════════════════════════════════════════════════════════════════════════
  // FILM, COMEDY, LITERARY, PERFORMANCE
  // ════════════════════════════════════════════════════════════════════════
  ev('62nd Chicago International Film Festival', 'art', '2026-10-14', '2026-10-25', 'Multiple venues', 'Citywide', 'ciff',
    '113 features and 57 shorts from 60+ countries: four world premieres, 15 North American and 21 US premieres. The nation\'s longest-running film festival.'),
  ev('312 Comedy Festival', 'art', '2026-11-05', '2026-11-15', 'Six venues citywide', 'Citywide', 'cc',
    '20+ comedians across six Chicago rooms.'),
  ev('Chicago International Latino Theater Festival', 'art', '2026-10-04', '2026-10-11', 'Multiple venues', 'Citywide', 'cc',
    'New performances and rising talent from the city\'s Latino theatre community.'),
  ev('Rocky Horror Picture Show: Halloween Edition', 'art', '2026-10-28', '2026-11-01', 'Music Box Theatre, 3733 N. Southport Ave.', 'Lakeview', 'toOct',
    'Five screenings with live shadowcast.'),
  ev('House of the Exquisite Corpse', 'art', '2026-10-08', '2026-11-01', 'Steppenwolf Theatre, 1650 N. Halsted St.', 'Lincoln Park', 'bcHalloween',
    'Horror puppet show, sixth year.'),
  ev('Chic A Go Go 30th Anniversary Halloween Dance Party', 'nightlife', '2026-10-31', null, 'Hideout, 1354 W. Wabansia Ave.', 'Bucktown', 'hideout',
    'Thirty years of Chicago\'s public-access kids dance show, with Clickbait!'),
  ev('Edward Scissorhands in Concert', 'music', '2026-10-24', null, 'The Auditorium, 50 E. Ida B. Wells Dr.', 'Loop', 'bcHalloween',
    'Screening with the Chicago Philharmonic playing live.'),
  ev('Independent Club: Horror Edition', 'art', '2026-10-22', null, 'Elevated Barbershop Lounge, 1324 W. 18th St.', 'Pilsen', 'bcHalloween',
    'Short horror films by Chicago filmmakers, screened in a barbershop.'),
  ev('Spooky Coochie Cabaret', 'art', '2026-10-22', null, 'Dorothy, 2500 W. Chicago Ave.', 'West Town', 'bcHalloween',
    'Burlesque in a haunted key.'),
  ev('Joy Ryde Halloween Drag Show', 'nightlife', '2026-10-18', null, 'Dorothy, 2500 W. Chicago Ave.', 'West Town', 'bcHalloween',
    'Drag show celebrating queer joy with local performers.'),
  ev('Paranormal Prom: An Undead \'80s Aerial Showcase', 'art', '2026-10-16', null, 'Chicago Aerial Arts, 4321 N. Knox Ave.', 'Old Irving Park', 'bcHalloween',
    'Student aerialists perform a paranormal-themed showcase.'),
  ev('Campfire Horrors at Grand Crossing Park', 'art', '2026-10-17', null, 'Grand Crossing Park, 7655 S. Ingleside Ave.', 'Grand Crossing', 'bcOct',
    'Free outdoor screening of "A Nightmare on Elm Street" at dusk.'),
  ev('Edgar Allan Poe Readings', 'art', '2026-10-31', null, 'Glessner House, 1800 S. Prairie Ave.', 'Near South Side', 'bcHalloween',
    'An evening of Poe\'s stories and poetry in an 1887 mansion.'),
  ev('Test Literary Series', 'art', '2026-11-11', null, 'The Whistler, 2421 N. Milwaukee Ave.', 'Logan Square', 'toOct',
    'Monthly second-Wednesday readings followed by jazz.'),
  ev('Test Literary Series', 'art', '2026-12-09', null, 'The Whistler, 2421 N. Milwaukee Ave.', 'Logan Square', 'toDec',
    'Monthly second-Wednesday readings followed by jazz.'),
  ev('The Paper Machete', 'art', '2026-10-10', '2026-12-26', 'Green Mill, 4802 N. Broadway', 'Uptown', 'toOct',
    'Free weekly live magazine of journalists, comedians and musicians — Saturdays at the Green Mill.'),
  ev('Get Lit: Witch Please', 'art', '2026-10-20', null, 'American Writers Museum, 180 N. Michigan Ave.', 'Loop', 'bcHalloween',
    'After-hours night on witches, magic and the macabre.'),

  // ════════════════════════════════════════════════════════════════════════
  // EXHIBITIONS & INSTALLATIONS
  // ════════════════════════════════════════════════════════════════════════
  ev('Rashid Johnson: A Poem for Deep Thinkers', 'art', '2026-11-07', '2027-04-25', 'MCA Chicago, 220 E. Chicago Ave.', 'Streeterville', 'toNov',
    'Major survey of the Chicago artist\'s three decades in photography, video and installation.'),
  ev('Lee Miller: Fearless', 'art', '2026-10-04', '2026-12-07', 'Art Institute of Chicago, 111 S. Michigan Ave.', 'Loop', 'toOct',
    'First comprehensive survey of Miller\'s photographs in 25+ years; 150 works.'),
  ev('Mary Cassatt: After Impressionism', 'art', '2026-10-04', '2027-01-03', 'Art Institute of Chicago, 111 S. Michigan Ave.', 'Loop', 'toOct',
    'First Cassatt-only exhibition in more than 25 years.'),
  ev('Inner Worlds: Visions from the Hirshhorn Collection', 'art', '2026-10-04', '2026-12-19', 'Wrightwood 659, 659 W. Wrightwood Ave.', 'Lincoln Park', 'toOct',
    'Kusama, Niki de Saint Phalle and Bauermeister, including two Infinity Mirror Rooms.'),
  ev('If Emmett Till Lived: Freedom on American Ground', 'art', '2026-10-04', '2026-12-19', 'Museum of Contemporary Photography, 600 S. Michigan Ave.', 'Loop', 'toOct',
    'Photography imagining an alternate history in which Till survived.'),
  ev('Cutting and Pasting a World: The Paper Craft of Henry Darger', 'art', '2026-10-04', '2027-01-31', 'Intuit Art Museum, 756 N. Milwaukee Ave.', 'West Town', 'toOct',
    'Darger\'s paper dolls and scrapbooks, and how they became his mixed-media narratives.'),
  ev('Emma Stebbins: Carving Out History', 'art', '2026-10-09', '2027-04-18', 'Driehaus Museum, 40 E. Erie St.', 'River North', 'toOct',
    'Retrospective of the 19th-century sculptor behind Bethesda Fountain.'),
  ev('A Tale of Today: Brendan Fernandes', 'art', '2026-10-04', '2026-11-14', 'Driehaus Museum, 40 E. Erie St.', 'River North', 'toOct',
    'Artist-in-residence work in sculpture, movement and sound.'),
  ev('The Odyssey Reimagined', 'art', '2026-10-04', '2026-12-31', 'National Hellenic Museum, 333 S. Halsted St.', 'Greektown', 'toOct',
    'Seventeen contemporary artists on Homer, across media.'),
  ev('Flyway City: Architecture for a Flourishing Ecosystem', 'art', '2026-10-04', '2027-01-03', 'Chicago Architecture Center, 111 E. Wacker Dr.', 'Loop', 'toOct',
    'Studio Gang on design that could prevent a billion annual bird-glass collisions.'),
  ev('Anne Frank The Exhibition', 'art', '2026-10-04', '2027-01-31', 'Griffin Museum of Science and Industry, 5700 S. DuSable Lake Shore Dr.', 'Hyde Park', 'toOct',
    'Immersive recreation of the Secret Annex with rarely seen artifacts.'),
  ev('Pokémon Fossil Museum', 'art', '2026-10-04', '2027-04-11', 'Field Museum, 1400 S. DuSable Lake Shore Dr.', 'Museum Campus', 'toOct',
    'Fossil Pokémon beside real fossils, including SUE the T. rex.'),
  ev('ART on THE MART', 'art', '2026-10-04', '2026-12-31', 'THE MART, 222 W. Merchandise Mart Plaza', 'River North', 'toOct',
    'The world\'s largest permanent digital art projection, nightly on a 25-story facade.'),
  ev('Christmas Around the World and Holidays of Light', 'art', '2026-11-07', '2027-01-03', 'Griffin Museum of Science and Industry, 5700 S. DuSable Lake Shore Dr.', 'Hyde Park', 'toNov',
    'A four-story Grand Tree ringed by 50+ trees for Chicago communities, plus Holidays of Light on Diwali, Kwanzaa, Ramadan, Hanukkah, Lunar New Year and St. Lucia Day.'),
  ev('Winter Flower Show', 'art', '2026-11-25', '2027-01-03', 'Garfield Park Conservatory, 300 N. Central Park Ave.', 'Garfield Park', 'cc',
    'Indoor winter blooms under glass, free.'),

  // ════════════════════════════════════════════════════════════════════════
  // HOLIDAY LIGHTS & MARKETS
  // ════════════════════════════════════════════════════════════════════════
  ev('Christkindlmarket Chicago', 'food', '2026-11-20', '2026-12-24', 'Daley Plaza, 50 W. Washington St.', 'Loop', 'cc',
    '30th anniversary of the German-style open-air holiday market: glühwein, handmade gifts, traditional food.'),
  ev('Winterland and Christkindlmarket at Gallagher Way', 'food', '2026-11-20', '2026-12-31', 'Gallagher Way, 3635 N. Clark St.', 'Wrigleyville', 'cc',
    'Ice bumper cars, rides, a holiday market and family events next to Wrigley Field.'),
  ev('ZooLights at Lincoln Park Zoo', 'nightlife', '2026-11-20', '2027-01-03', 'Lincoln Park Zoo, 2001 N. Clark St.', 'Lincoln Park', 'cc',
    'A million-plus lights through the free historic zoo.'),
  ev('Lightscape at Chicago Botanic Garden', 'nightlife', '2026-11-13', '2027-01-03', 'Chicago Botanic Garden, Glencoe', 'Suburbs', 'toNov',
    'Illuminated mile-plus trail including a 110-foot tunnel of 100,000 lights and singing trees.'),
  ev('Wintrust Winter WonderFest at Navy Pier', 'nightlife', '2026-11-27', '2027-01-03', 'Navy Pier, 600 E. Grand Ave.', 'Navy Pier', 'cc',
    'Indoor holiday fair with a skating rink, rides and lights.'),
  ev('Illumination: Tree Lights at The Morton Arboretum', 'nightlife', '2026-11-14', '2027-01-02', 'Morton Arboretum, Lisle', 'Suburbs', 'cc',
    'Interactive light-and-music installations through the tree collection.'),
  ev('Night of 1,000 Jack-o\'-Lanterns', 'nightlife', '2026-10-07', '2026-10-25', 'Chicago Botanic Garden, Glencoe', 'Suburbs', 'toOct',
    'Carved and LED-lit pumpkin displays along the garden paths.'),
  ev('Jack\'s Pumpkin Pop-Up', 'nightlife', '2026-10-04', '2026-11-01', '1625 W. Le Moyne St.', 'Goose Island', 'bcHalloween',
    '10,000+ pumpkins, a corn maze, food trucks, carnival games, axe throwing and fortune tellers.'),
  ev('Fall Fest at Lincoln Park Zoo', 'nightlife', '2026-10-04', '2026-11-01', 'Lincoln Park Zoo, 2001 N. Clark St.', 'Lincoln Park', 'cc',
    'Free: professional pumpkin carvers, a pumpkin patch, s\'mores and live music.'),
  ev('Spooky Zoo', 'nightlife', '2026-10-17', null, 'Lincoln Park Zoo, 2001 N. Clark St.', 'Lincoln Park', 'cc',
    'Free family trick-or-treating, scavenger hunt and carousel rides.'),

  // ════════════════════════════════════════════════════════════════════════
  // HALLOWEEN PARTIES & POP-UPS
  // ════════════════════════════════════════════════════════════════════════
  ev('Death By Disco Halloween Pop-Up', 'nightlife', '2026-10-30', '2026-10-31', 'Recess, 838 W. Kinzie St.', 'West Town', 'bcHalloween',
    'Billed as Chicago\'s biggest Halloween pop-up: 50+ DJs and performers.'),
  ev('Haunted House Party at Shedd Aquarium', 'nightlife', '2026-10-31', null, 'Shedd Aquarium, 1200 S. DuSable Lake Shore Dr.', 'Museum Campus', 'bcHalloween',
    'After-hours house music among the tanks. No scares.'),
  ev('A Pilsen Halloween', 'nightlife', '2026-10-31', null, "Simone's, 960 W. 18th St.", 'Pilsen', 'bcHalloween',
    'Reggaetón and perreo with a $500 costume contest.'),
  ev('Draft Disko Halloween', 'nightlife', '2026-10-31', null, 'Subterranean, 2011 W. North Ave.', 'Wicker Park', 'bcHalloween',
    'French house and disco, Daft Punk-leaning.'),
  ev('Music for the Masses: Dark \'80s New Wave Halloween', 'nightlife', '2026-10-31', null, 'Beat Kitchen, 2100 W. Belmont Ave.', 'Roscoe Village', 'bcHalloween',
    'New-wave dance night in a Joy Division and Cure key.'),
  ev('Queer Halloween Bash', 'nightlife', '2026-10-31', null, 'Whiskey Girl Tavern, 6318 N. Clark St.', 'Edgewater', 'bcHalloween',
    'Queer Halloween party with musical acts and comedy.'),
  ev('Monstrosity: A Halloween Experience', 'nightlife', '2026-10-24', null, 'Colvin House, 5940 N. Sheridan Rd.', 'Edgewater', 'bcHalloween',
    'A lakefront mansion turned into Dr. Frankenstein\'s laboratory.'),
  ev('Family Field Nights: Boo With Sue', 'nightlife', '2026-10-30', null, 'Field Museum, 1400 S. DuSable Lake Shore Dr.', 'Museum Campus', 'bcHalloween',
    'After-hours Halloween party with trick-or-treating among the dinosaurs.'),
  ev('Sanctum Dark Music Festival', 'music', '2026-10-30', '2026-10-31', 'Thalia Hall, 1807 S. Allport St.', 'Pilsen', 'toOct',
    'Two days of dark/goth music across venues, all-VIP ticketing.'),
  ev('Black Lagoon Pop-Up', 'nightlife', '2026-10-04', '2026-10-31', 'The Parlour at Albion Manor, 1480 W. Webster Ave.', 'Lincoln Park', 'bcHalloween',
    'Horror cocktail pop-up with metal and goth decor.'),
  ev('Nightmare on Clark Street', 'nightlife', '2026-10-10', '2026-11-01', 'Stolen Saddle, Wrigleyville', 'Wrigleyville', 'toOct',
    'Halloween bar takeover with photo ops and spooky cocktails.'),
  ev('Halloween Yoga Flow', 'nightlife', '2026-10-31', null, 'Moksha Yoga Center, 2528 W. Armitage Ave.', 'Bucktown', 'bcHalloween',
    'Costumed flow with a contest after.'),
  ev('A Halloween Thing With Rico MJ', 'music', '2026-10-30', null, 'Harold Washington Cultural Center, 4701 S. King Dr.', 'Bronzeville', 'bcHalloween',
    'Michael Jackson tribute artist with a magic show and costume contest.'),
  ev('Andersonville Ghost Tour', 'nightlife', '2026-10-09', '2026-10-31', 'Boniface Cemetery, 4901 N. Clark St.', 'Andersonville', 'bcHalloween',
    '1.5-mile ghost walk with neighborhood storytellers.'),
  ev('Haunting of Hull-House: Halloween Folklore Tours', 'nightlife', '2026-10-08', '2026-10-23', 'Jane Addams Hull-House Museum, 800 S. Halsted St.', 'Near West Side', 'bcHalloween',
    'Late-19th-century ghost stories, including the devil baby legend.'),

  // ════════════════════════════════════════════════════════════════════════
  // SMALL MUSIC SHOWS — HIDEOUT
  // ════════════════════════════════════════════════════════════════════════
  show('2026-10-04', 'Half Gringa, Matt Gold', 'hideout', HIDEOUT_V),
  show('2026-10-06', 'Chayse Porter & his Palace Doors, Captain Kudzu, Free Times, Sunglow', 'hideout', HIDEOUT_V),
  show('2026-10-07', 'Buenas Noches', 'hideout', HIDEOUT_V),
  show('2026-10-08', 'Megasound, Billy Joel Jr', 'hideout', HIDEOUT_V),
  show('2026-10-09', 'Guiding Light, Artificial Go, Tactile Sob', 'hideout', HIDEOUT_V),
  ev('All Day Gay', 'nightlife', '2026-10-09', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Late-night dance party.'),
  show('2026-10-10', "Red PK album release, with Toddo & Sleeper's Bell", 'hideout', HIDEOUT_V),
  show('2026-10-11', 'Big Fat Head, Heavy Sleeper, Shy Bronco', 'hideout', HIDEOUT_V),
  show('2026-10-13', 'Ziona Riley, Fran', 'hideout', HIDEOUT_V),
  show('2026-10-15', 'V.V. Lightbody album release, night 1, with Sports Boyfriend', 'hideout', HIDEOUT_V),
  show('2026-10-16', 'V.V. Lightbody album release, night 2, with Matt Gold & Storms of Love', 'hideout', HIDEOUT_V),
  show('2026-10-17', 'Josh Joplin (matinee)', 'hideout', HIDEOUT_V),
  ev('Heart of Chicago Soul Club', 'nightlife', '2026-10-17', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'All-vinyl soul night.'),
  show('2026-10-18', 'Olivia and the Lovers, Stefan Weiner, Devil Said Jump', 'hideout', HIDEOUT_V),
  show('2026-10-21', 'Eleventh Dream Day', 'hideout', HIDEOUT_V),
  show('2026-10-23', 'Fort Frances', 'hideout', HIDEOUT_V),
  show('2026-10-24', 'Steven Castillo', 'hideout', HIDEOUT_V),
  show('2026-10-25', 'Autobahn + Godstar Megamax', 'hideout', HIDEOUT_V),
  show('2026-10-27', 'Colin Miller', 'hideout', HIDEOUT_V),
  show('2026-10-28', 'ALGA, Adelaide, Sleep Tight Tiger', 'hideout', HIDEOUT_V),
  show('2026-10-29', 'Tommy Lefroy', 'hideout', HIDEOUT_V),
  show('2026-11-02', 'Northern Spy Presents: Beginningless + Jeremy Cunningham Special Quartet', 'hideout', HIDEOUT_V),
  show('2026-11-03', 'Northern Spy Presents: SUSS & Luke Schneider', 'hideout', HIDEOUT_V),
  show('2026-11-04', 'Dent May, Fast Preacher', 'hideout', HIDEOUT_V),
  show('2026-11-06', 'Axis: Sova record release, with Melkbelly & Temps', 'hideout', HIDEOUT_V),
  show('2026-11-08', 'Lou Turner & Kate Teague', 'hideout', HIDEOUT_V),
  show('2026-11-10', 'Dead Gowns', 'hideout', HIDEOUT_V),
  show('2026-11-11', 'The Animeros', 'hideout', HIDEOUT_V),
  show('2026-11-12', 'Disaster Kid single release, with Sara Geist and Julian Saunders', 'hideout', HIDEOUT_V),
  show('2026-11-13', 'Janet Bean + Ghost Voice album release', 'hideout', HIDEOUT_V),
  show('2026-11-17', 'KVL(B), Bill Dolan, DJ Slinkie (Eliza Weber)', 'hideout', HIDEOUT_V),
  show('2026-11-19', 'Yr Knives, TRAYSH, Puzzle House', 'hideout', HIDEOUT_V),
  show('2026-11-20', 'Bri Bagwell', 'hideout', HIDEOUT_V),
  show('2026-11-21', 'Nate Varrone', 'hideout', HIDEOUT_V),
  show('2026-12-04', 'Angela Autumn, The Spine Stealers', 'hideout', HIDEOUT_V),
  show('2026-12-12', 'La Sécurité, Spread Joy', 'hideout', HIDEOUT_V),
  show('2026-12-19', 'Advance Base Christmas show, with bobbie & Moontype', 'hideout', HIDEOUT_V),
  ev('Freak Show, hosted by Sierra Kenyon', 'art', '2026-10-05', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Comedy and variety night.'),
  ev('Good Luck With That!', 'art', '2026-10-14', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Variety show.'),
  ev('What Happens Next Will Scare You', 'art', '2026-10-19', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Halloween-season comedy performance.'),
  ev('Not That Late Show', 'art', '2026-10-26', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Talk-show-format comedy night.'),
  ev('Surprise! We Made A Comedy Show', 'art', '2026-10-28', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Comedy night.'),
  ev('You Are One: A Substance Parody Play by Derry Queen', 'art', '2026-10-30', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Two performances, early and late.'),
  ev('Victoria Vincent: Trust Me — live comedy taping', 'art', '2026-11-05', null, HIDEOUT_V[0], HIDEOUT_V[1], 'hideout', 'Special taping.'),

  // ════════════════════════════════════════════════════════════════════════
  // SMALL MUSIC SHOWS — EMPTY BOTTLE
  // ════════════════════════════════════════════════════════════════════════
  show('2026-10-04', 'Andy Stott', 'bottle', BOTTLE_V),
  show('2026-10-05', 'Able Baker', 'bottle', BOTTLE_V),
  show('2026-10-06', 'yellow pills', 'bottle', BOTTLE_V),
  show('2026-10-07', 'Anna Johnson', 'bottle', BOTTLE_V),
  show('2026-10-08', 'Quintron and Miss Pussycat', 'bottle', BOTTLE_V),
  show('2026-10-09', 'Yambag', 'bottle', BOTTLE_V),
  show('2026-10-12', 'Ellie Jackson', 'bottle', BOTTLE_V),
  show('2026-10-13', 'Sick Thoughts', 'bottle', BOTTLE_V),
  show('2026-10-15', 'Faux Real', 'bottle', BOTTLE_V),
  show('2026-10-16', 'Horse Jumper of Love', 'bottle', BOTTLE_V),
  show('2026-10-17', 'Horse Jumper of Love', 'bottle', BOTTLE_V),
  show('2026-10-18', 'imelda marcos', 'bottle', BOTTLE_V),
  show('2026-10-19', 'Baby', 'bottle', BOTTLE_V),
  show('2026-10-20', 'Maggie Koerner', 'bottle', BOTTLE_V),
  show('2026-10-21', 'The Tubs', 'bottle', BOTTLE_V),
  show('2026-10-24', 'Waking The Witch', 'bottle', BOTTLE_V),
  show('2026-10-25', 'CORPSE DUST', 'bottle', BOTTLE_V),
  show('2026-10-27', 'Wide Orbit', 'bottle', BOTTLE_V),
  show('2026-10-28', 'Delicate Steve', 'bottle', BOTTLE_V),
  show('2026-10-29', 'Spread Joy', 'bottle', BOTTLE_V),
  show('2026-10-30', 'Sweeping Promises', 'bottle', BOTTLE_V),
  show('2026-10-31', 'Post Animal', 'bottle', BOTTLE_V),
  show('2026-11-03', 'Tear Dungeon', 'bottle', BOTTLE_V),
  show('2026-11-04', 'Jessica Lea Mayfield, Rachel Bobbitt', 'bottle', BOTTLE_V),
  show('2026-11-05', 'Desire', 'bottle', BOTTLE_V),
  show('2026-11-07', 'Agriculture', 'bottle', BOTTLE_V),
  show('2026-11-08', 'Agriculture', 'bottle', BOTTLE_V),
  show('2026-11-10', 'Genesis Owusu', 'bottle', BOTTLE_V),
  show('2026-11-11', 'Mary In The Junkyard', 'bottle', BOTTLE_V),
  show('2026-11-12', 'Improvement Movement', 'bottle', BOTTLE_V),
  show('2026-11-13', 'wingtips', 'bottle', BOTTLE_V),
  show('2026-11-14', 'Heavens to Betsy', 'bottle', BOTTLE_V),
  show('2026-11-15', 'Heavens to Betsy', 'bottle', BOTTLE_V),
  show('2026-11-17', 'Porcelain (TX)', 'bottle', BOTTLE_V),
  show('2026-11-18', 'Makaya McCraven', 'bottle', BOTTLE_V),
  show('2026-11-19', 'Packaging', 'bottle', BOTTLE_V),
  show('2026-11-20', 'Omni', 'bottle', BOTTLE_V),
  show('2026-11-21', 'Blue Earth Sound', 'bottle', BOTTLE_V),
  show('2026-11-24', 'Rivkah Reyes', 'bottle', BOTTLE_V),
  show('2026-11-25', 'Jaff Graffner', 'bottle', BOTTLE_V),
  ...multi(['2026-10-09', '2026-10-16', '2026-10-23', '2026-10-30', '2026-11-06', '2026-11-13', '2026-11-20'],
    'The Hoyle Brothers (free honky-tonk happy hour)', 'music', BOTTLE_V[0], BOTTLE_V[1], 'bottle',
    'Long-running free Friday evening honky-tonk residency.'),
  ev('Bears at the Bottle', 'nightlife', '2026-10-04', null, BOTTLE_V[0], BOTTLE_V[1], 'bcWknd',
    'Bears vs. Jets on the screen with wings and beer at a rock club.'),

  // ════════════════════════════════════════════════════════════════════════
  // OTHER NOTABLE SHOWS — CLUBS AND MID-SIZE ROOMS
  // ════════════════════════════════════════════════════════════════════════
  show('2026-10-05', 'Bunii', 'ctOct', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-10-06', 'Mind Enterprises', 'ctOct', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-10-07', 'Sweet Pill', 'ctOct', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-10-06', 'Kelela', 'ctOct', ['Vic Theatre, 3145 N. Sheffield Ave.', 'Lakeview']),
  show('2026-10-07', 'The Residents', 'ctOct', ['Park West, 322 W. Armitage Ave.', 'Lincoln Park']),
  show('2026-10-07', 'Eddie Jobson', 'ctOct', ["Reggie's Rock Club, 2109 S. State St.", 'South Loop']),
  show('2026-10-07', 'Wayne Hancock', 'ctOct', ["Reggie's Music Joint, 2105 S. State St.", 'South Loop']),
  show('2026-10-07', 'Elizabeth Nichols', 'ctOct', ["Carol's Pub, 4659 N. Clark St.", 'Uptown']),
  show('2026-10-07', 'Sunny Daze and the Weathermen', 'ctOct', ['Subterranean (Downstairs), 2011 W. North Ave.', 'Wicker Park']),
  show('2026-10-06', 'JO1', 'ctOct', ['Copernicus Center, 5216 W. Lawrence Ave.', 'Jefferson Park']),
  show('2026-10-07', 'Epik High', 'ctOct', ['House of Blues, 329 N. Dearborn St.', 'River North']),
  show('2026-10-07', 'Starbomb & Scoochie Boochie', 'ctOct', ['Byline Bank Aragon Ballroom, 1106 W. Lawrence Ave.', 'Uptown']),
  show('2026-10-05', 'Ludovico Einaudi', 'ctOct', ['Orchestra Hall, 220 S. Michigan Ave.', 'Loop']),
  show('2026-10-05', 'Journey', 'ctOct', ['United Center, 1901 W. Madison St.', 'Near West Side']),
  show('2026-10-04', 'The Chicks', 'ctOct', ['Auditorium Theatre, 50 E. Ida B. Wells Dr.', 'Loop']),
  show('2026-11-01', 'Geese', 'ctNov', ['The Salt Shed (Indoors), 1357 N. Elston Ave.', 'Goose Island']),
  show('2026-11-01', 'L7', 'ctNov', ['Vic Theatre, 3145 N. Sheffield Ave.', 'Lakeview']),
  show('2026-11-01', 'Bad Gyal', 'ctNov', ['Riviera Theatre, 4746 N. Racine Ave.', 'Uptown']),
  show('2026-11-01', 'New Constellations', 'ctNov', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-11-01', 'Elanor Moss', 'ctNov', ['Tack Room at Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-11-01', 'Rod Wave', 'ctNov', ['United Center, 1901 W. Madison St.', 'Near West Side']),
  show('2026-11-02', 'The Hails', 'ctNov', ['Lincoln Hall, 2424 N. Lincoln Ave.', 'Lincoln Park']),
  show('2026-11-02', 'jackzebra', 'ctNov', ['Subterranean, 2011 W. North Ave.', 'Wicker Park']),
  show('2026-11-02', 'The Blasting Company', 'ctNov', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-11-03', 'Arch Enemy & The Black Dahlia Murder', 'ctNov', ['Concord Music Hall, 2047 N. Milwaukee Ave.', 'Logan Square']),
  show('2026-11-03', 'Inayah', 'ctNov', ['Subterranean, 2011 W. North Ave.', 'Wicker Park']),
  show('2026-11-04', 'George Clanton', 'ctNov', ['Concord Music Hall, 2047 N. Milwaukee Ave.', 'Logan Square']),
  show('2026-11-04', 'Sombr', 'ctNov', ['United Center, 1901 W. Madison St.', 'Near West Side']),
  show('2026-11-05', 'Donny Benét', 'ctNov', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-12-01', 'Jim James (solo acoustic)', 'ctDec', ['Vic Theatre, 3145 N. Sheffield Ave.', 'Lakeview']),
  show('2026-12-01', 'Kim Petras', 'ctDec', ['Radius, 640 W. Cermak Rd.', 'Pilsen']),
  show('2026-12-01', 'Suicide Silence', 'ctDec', ['House of Blues, 329 N. Dearborn St.', 'River North']),
  show('2026-12-01', 'Lucy Bedroque', 'ctDec', ['Metro, 3730 N. Clark St.', 'Wrigleyville']),
  show('2026-12-02', 'Lucy Bedroque', 'ctDec', ['Metro, 3730 N. Clark St.', 'Wrigleyville']),
  show('2026-12-02', 'Shintaro Sakamoto', 'ctDec', ['Thalia Hall, 1807 S. Allport St.', 'Pilsen']),
  show('2026-12-02', 'Pokey LaFarge', 'ctDec', ['Lincoln Hall, 2424 N. Lincoln Ave.', 'Lincoln Park']),
  show('2026-12-02', 'Levi Bloom', 'ctDec', ['Beat Kitchen, 2100 W. Belmont Ave.', 'Roscoe Village']),
  show('2026-12-03', 'Mareux', 'ctDec', ['Metro, 3730 N. Clark St.', 'Wrigleyville']),
  show('2026-12-03', 'Home By 3', 'ctDec', ['Park West, 322 W. Armitage Ave.', 'Lincoln Park']),
  show('2026-12-01', 'Chicago Symphony Orchestra: Handel\'s Messiah, cond. Dame Jane Glover', 'ctDec', ['Orchestra Hall, 220 S. Michigan Ave.', 'Loop']),
  show('2026-12-03', 'Chicago Symphony Orchestra: Muti conducts Dvořák 8', 'ctDec', ['Orchestra Hall, 220 S. Michigan Ave.', 'Loop']),
  ev('World Music Wednesdays', 'music', '2026-10-07', '2026-12-23', 'Old Town School of Folk Music, 4544 N. Lincoln Ave.', 'Lincoln Square', 'toOct',
    'Weekly world music and dance showcase of local and touring artists.'),
  ev('It\'s the Great Pumpkin, Charlie Brown!: A Guitar for Guaraldi Tribute', 'music', '2026-10-14', null, 'Sleeping Village, 3734 W. Belmont Ave.', 'Avondale', 'toOct',
    'Free concert of guitar arrangements from the Peanuts special.'),
  ev('Big Lebowski Costume Party & Concert', 'music', '2026-10-17', null, 'Timber Lanes, 1851 W. Irving Park Rd.', 'North Center', 'toOct',
    'Costume contest and live music in a neighborhood bowling alley.'),
  ev('Red Bull Setlist: Lil Yachty', 'music', '2026-10-24', null, 'Radius, 640 W. Cermak Rd.', 'Pilsen', 'toOct',
    'Audience votes on elements of the set in real time.'),
  ev('Jonas Brothers', 'music', '2026-10-22', null, 'Allstate Arena, 6920 Mannheim Rd., Rosemont', 'Rosemont', 'toOct',
    'The Burning Up Tour All Over Again.'),
  ev('First Friday Series: Unplugged with Joshua Griffin', 'music', '2026-11-06', null, 'BandWith Chicago, 134 S. California Ave.', 'East Garfield Park', 'bcWknd',
    'Instrumental performance centered on Black music traditions.'),
]

// ── duplicate detection (mirrors lib/event-dedupe.js, which is ESM) ─────────

const normalizeText = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
const normalizeVenue = v => normalizeText(v)
  .replace(/\b(cocktail lounge|lounge|club|theater|theatre|hall|center|centre)\b/g, ' ').replace(/\s+/g, ' ').trim()

const STOPWORDS = new Set(['and', 'at', 'day', 'feat', 'featuring', 'for', 'from', 'in', 'live', 'night',
  'nightly', 'of', 'on', 'session', 'set', 'sets', 'the', 'with', 'chicago', 'annual', 'festival', 'fest',
  'street', 'park', 'summer', 'series', 'show', 'party'])

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

// Titles the two-token-overlap rule gets wrong. Chicago runs three separate
// Halloween parades on Oct 31 and two separate turkey trots on Thanksgiving
// morning; generic words ("halloween parade", "turkey trot", "first fridays")
// make them look like duplicates of each other when they are not. Checked by
// hand against the calendar — these are genuinely new events.
const FORCE = new Set([
  'West Town First Fridays',
  'Upside Down Halloween Parade',
  'Streeterville Doggy (and Kitty) Halloween Party & Parade',
  'Howl-O-Ween Canine Cruise',
  'Chi Town Turkey Trot 5K & 10K',
  'Sanctum Dark Music Festival',
])

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Only need to compare against the window we're inserting into.
  const existing = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, date, end_date, venue, category')
      .gte('date', '2026-09-01')
      .lte('date', '2027-01-31')
      .range(from, from + 999)
    if (error) { console.error('Failed to read existing events:', error.message); process.exit(1) }
    existing.push(...(data || []))
    if (!data || data.length < 1000) break
  }

  const toInsert = []
  const collisions = []
  for (const row of EVENTS) {
    const hit = FORCE.has(row.title)
      ? null
      : existing.find(e => datesOverlap(e, row) && titlesMatch(e, row))
    if (hit) { collisions.push([row.title, row.date, hit.title, hit.date]); continue }
    toInsert.push(row)
    existing.push({ ...row, id: `planned-${row.title}-${row.date}` })
  }

  const byCat = {}
  for (const r of toInsert) byCat[r.category] = (byCat[r.category] || 0) + 1

  console.log(`Researched events assembled: ${EVENTS.length}`)
  console.log(`Already in calendar, skipped:  ${collisions.length}`)
  console.log(`To insert:                     ${toInsert.length}`)
  console.log(`  by category: ${JSON.stringify(byCat)}`)
  const months = {}
  for (const r of toInsert) { const m = r.date.slice(0, 7); months[m] = (months[m] || 0) + 1 }
  console.log(`  by month:    ${JSON.stringify(months)}`)

  if (collisions.length) {
    console.log('\n── skipped as already present ──')
    for (const c of collisions) console.log(`  ${c[0].slice(0, 46).padEnd(48)} ${c[1]}  ←  "${c[2]}" (${c[3]})`)
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
      console.error(`${inserted} rows inserted before the failure. Nothing deleted or overwritten.`)
      process.exit(1)
    }
    inserted += Math.min(BATCH, toInsert.length - i)
    console.log(`  inserted ${inserted} / ${toInsert.length}`)
  }
  console.log(`\nDone. ${inserted} events inserted as status="approved".`)
}

main().catch(err => { console.error(err); process.exit(1) })
