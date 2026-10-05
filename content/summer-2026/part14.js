// Batch 5 — the Savored desk's first piece. Apple Fest 39, Lincoln Square,
// Oct 2–4 2026, filed on the 5th.
//
// REWRITTEN 2026-10-05: this shipped as a Mora/Around piece (category 'news').
// Moved to Gus/Savored at the editor's instruction — the subject is a ranked
// food haul, which is Savored's beat rather than Around's. Needs `food` in the
// category check and `Gus` in the byline list: both are present in the working
// tree via the Savored category work, and migration-savored-category.sql must
// be run against the live database before this can be seeded, because
// schema.sql uses `create table if not exists` and will not alter a live
// constraint.
//
// THE SOURCING PROBLEM, STATED PLAINLY, BECAUSE THE SKILL IS EXPLICIT ABOUT IT.
// gus-savored says "If you did not eat it, you do not describe it," and the
// award closer must be "the single best thing you ate." Nobody from this desk
// ate anything on Lincoln Avenue. There is no dossier entry for Apple Fest and
// no scraped post set — research/ holds only two promotional posts (D32's henna
// advert, D72's weekend-picks reel).
//
// What exists is the r/chicagofood thread "Came hungry for Applefest! Go early
// to avoid strollers and lines" (u/Jeeperscrow123, Oct 3): an eight-stop haul
// with prices, a photograph per stop and a ranked top three. So the charter's
// second-mouth move (transplant §6) carries the load the charter's first-person
// method normally carries. Every price, count, time and supplier here is
// sourced, every judgement of taste is attributed in the prose to the handle
// that made it, and the award is declared as the thread's winner rather than as
// this desk's own.
//
// That is a real compromise and it should not get quietly normalised. A true Gus
// piece needs somebody to go and eat. Until the desk has that, the honest
// version is this one: Gus owns the arithmetic, the structure and the reporting
// under the food, and does not pretend to own the palate.
//
// No attendance figure. A "50,000+" number circulates in aggregator listings and
// in an Instagram post, but the chamber publishes no count. The 1987-vs-1988
// founding year came from newsrooms this package may not cite, so the piece
// derives thirty-nine years from the chamber's own "39th Annual" instead.
//
// ART: seven photographs from the thread laid out four across, dish and stand
// under each, plus a cover off the same roll. Credited to u/Jeeperscrow123 with
// the permalink attached and used with their permission as of 2026-10-05, so
// the licence is CLEAR and the release no longer blocks publication.
//
// TWO THINGS REMAIN BEFORE THIS CAN BE SEEDED, neither of them editorial:
//   1. migration-savored-category.sql has to run against the live Supabase
//      project. schema.sql uses `create table if not exists`, so the committed
//      constraint change does nothing to the existing table and an insert with
//      category 'food' will fail articles_category_check.
//   2. The images want moving out of public/ and into the article-images bucket
//      per §5.1, so the CMS can see them.

module.exports = [

{
  ref: 'AF39',
  title: 'Eight Apple Things and One Dumpling at Apple Fest 39',
  category: 'food',
  author_name: 'Gus',
  date: '2026-10-05',
  event_dates: 'October 2–4, 2026',
  venue: 'Apple Fest, N. Lincoln Avenue',
  neighborhood: 'Lincoln Square',
  featured: true,
  cover_image: '/article-images/apple-fest-39/cover-cider-donut-pie.webp',
  cover_credit: 'Photo: u/Jeeperscrow123 via r/chicagofood',
  cover_alt: 'A cinnamon-sugar cider donut sitting on a slice of crumb-topped apple pie in a blue-checked paper boat, held over the sidewalk',
  excerpt: 'Eight apple items off three blocks of North Lincoln for about sixty dollars, with one pie slice at six and another at ten. The cider donut beat the stands with better signage.',
  body: `<p>Eight apple items came off that street in one morning for about sixty dollars, and the best of them cost less than the parking would have. <a href="https://www.lincolnsquare.org/apple-fest">Apple Fest</a> ran Friday October 2nd through Sunday the 4th on the three blocks of North Lincoln between Sunnyside and Lawrence, nine until six on the weekend days, five dollars suggested at the gate. The ledger below belongs to <a href="https://www.reddit.com/r/chicagofood/comments/1wwqaut/came_hungry_for_applefest_go_early_to_avoid/">u/Jeeperscrow123</a>, who got in at opening, ate in order, photographed every stop and wrote down what it cost. This desk is reporting their mouth rather than its own, and would rather say so than borrow the credit.</p>

<h3>The Ledger</h3>

<p>An <strong>apple cider donut pie</strong> from Bang Bang Pie, which is a cider donut set on a slice of crumb-top pie and therefore two desserts charged as one. An <strong>apple cinnamon roll</strong> from Jerry &amp; Geraldine’s under about an inch of white icing. An <strong>apple pie</strong> slice from The Chopping Block. An <strong>apple crisp donut</strong> from Dinky Delights. <strong>Apple churros</strong> from Byron’s, three to a tray under powdered sugar. A <strong>cider donut</strong> from Daly’s. A filled <strong>apple empanada</strong> from Luciana’s. And cider from <a href="https://mickklugfarms.com/">Mick Klüg Farms</a>, the only thing on the list that was grown rather than assembled.</p>

<p>The prices are where the fest argues with itself. A slice of Bang Bang pie was six dollars. Further up the same three blocks a stand was asking ten for a slice of apple pie and two dollars more for whipped cream, which u/Big-Poet8739 priced, declined and posted about. Both had lines. Whole pies reached sixty dollars last year, which is the going rate for something you could build out of four dollars of fruit, and the fruit was forty feet away at about two dollars a piece.</p>

<p>The merely fine gets its clause: u/mittensonmykittens paid twenty-two dollars at Jerry &amp; Geraldine’s for a chicken apple sausage, macaroni and cheese and spiced apples, and called it fair for a street fest, which it is. The beer and cider tents took cash only, and the one ATM inside the footprint stood next to Geraldine’s charging its own fee.</p>

<figure class="cn-photo-grid">
<div class="cn-grid-items">
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/bang-bang-cider-donut-pie.webp" alt="A cinnamon-sugar cider donut sitting on a slice of crumb-topped apple pie in a blue-checked paper boat"><span>Apple cider donut pie, Bang Bang Pie — $6</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/jerry-geraldines-apple-cinnamon-roll.webp" alt="An apple cinnamon roll under thick white icing dusted with cinnamon, in a kraft paper box"><span>Apple cinnamon roll, Jerry &amp; Geraldine’s</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/chopping-block-apple-pie.webp" alt="A hand holding a paper boat with a slice of double-crust apple pie topped with whipped cream and a black plastic fork"><span>Apple pie, The Chopping Block</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/dinky-delights-apple-crisp-donut.webp" alt="A single ring donut coated in cinnamon sugar, on white paper in bright sun"><span>Apple crisp donut, Dinky Delights</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/byrons-apple-churros.webp" alt="A hand holding a paper tray of three apple churros under powdered sugar"><span>Apple churros, Byron’s</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/dalys-cider-donut.webp" alt="A small knotted cider donut in coarse cinnamon sugar on white paper"><span>Cider donut, Daly’s</span></div>
<div class="cn-grid-item"><img src="/article-images/apple-fest-39/grid/dalys-cider-donuts-bag.webp" alt="Half a dozen small cinnamon-sugar cider donuts in an open white paper bag"><span>Cider donuts by the bag, Daly’s</span></div>
</div>
<figcaption>Eight stops, seven photographed, in the order they were eaten.<span class="cn-photo-credit">Photos: <a href="https://www.reddit.com/r/chicagofood/comments/1wwqaut/came_hungry_for_applefest_go_early_to_avoid/">u/Jeeperscrow123 via r/chicagofood</a></span></figcaption>
</figure>

<h3>Three Stands, One Donut</h3>

<p>The head-to-head was the fried one, and three stands were running it. Daly’s was turning out small knotted donuts in coarse cinnamon sugar, sold by the bag. Dinky Delights had the bigger ring, the apple crisp, and a line to match. Somethin’ Sweet Donuts, whose shop is in Albany Park, had a booth down at Lincoln and Sunnyside that u/New_Steak3951 walked straight onto at half past nine with no wait at all, bought from, and left by eleven.</p>

<p>Daly’s took it. u/Jeeperscrow123 put the cider donut in the top three of the entire run alongside the cinnamon roll, and when somebody asked which single sweet to spend their one slot on, answered the donuts without hedging. The flaw in that result is worth printing rather than hiding: Dinky Delights had the bigger crowd, Daly’s had the better product, and the only reason the comparison is checkable at all is that one person ate both inside an hour. A second mouth would have settled it. There was not one.</p>

<p>The dissent is on the record too. u/lakedrift came in from Michigan, counted three apple stands and two donut sellers against a run of companies there to talk about phone plans, and called it the biggest disappointment of their lives. That is a fair complaint about the ratio and a poor one about the donuts.</p>

<h3>Where the Apples Were From</h3>

<p>Seven farms came in from three states, which is the part of this fest that is not a concession stand. <a href="https://www.lincolnsquare.org/apple-fest-farms-and-vendors">The chamber’s own vendor list</a> puts Mick Klüg on the street from Saint Joseph, Michigan with more than ten varieties, cider served hot and cold and sold in gallon and half-gallon jugs, and an apple cider oat horchata that nobody has explained. Los Rodriguez came from Eau Claire and Joe’s Blues from Bangor, both Michigan; Phil Foster from Huntington, Indiana; Belly Acres from Hanover and John Bailey Honey from Kankakee. Mick Klüg is third-generation, has been doing this since the 1930s, and works six Chicago farmers markets a week on top of the weekend.</p>

<p>Which sets the real price of an apple product here. A farm drives fruit in from the Lake Michigan fruit belt and sells it at about two dollars a piece. A stand a short walk away buys the same crop, bakes it into a slice and asks ten. The five dollars at the gate, for what it is worth, is the one markup on the street with its arithmetic published: it goes to streetscape work in Lincoln Square and Ravenswood and out again as grants to area non-profits, not to a promoter. <a href="https://www.affytapple.com/about/">Affy Tapple</a> was the presenting sponsor and dipped caramel apples live on the Saturday. Edna Kastrup worked that caramel out on North Clark Street in 1948, and the company was named Affy Tapple so it would land near the front of the telephone book.</p>

<h3>The Part That Was Not Apple</h3>

<p>Plenty of stands were selling something “apple” and the best savoury thing on the block had no apple in it at all. u/coaxialology rated the pork and chive dumplings from Union Dumpling House among the best they had ever eaten, full stop, at a fest whose entry requirement is fruit. The pork chop sandwich remains this city’s real signature item and the hot dog remains a tourism policy.</p>

<p>Two things to skip, both reported by people who paid for them. The breakfast sandwich from Rockwell’s cost u/retouchwizard forty minutes and arrived with unmelted cheese on untoasted bread. And the bees were on everything, crawling over open food down the whole block, thick enough at the honey stand that u/BoringJellyfish6297 assumed a hive had come in with the vendors. There is a wasp in the corner of the first photograph above, which u/BTGGFChris spotted before anybody had said a word about the pie.</p>

<p>The limit arrives where it always arrives. Eight sweet items in a single morning is one or two past the point where the fifth stops registering as anything but sugar, which is why the top of a run like this is worth more than the bottom of it. By the empanada the survey had stopped measuring the food.</p>

<p>The best thing at Apple Fest 39 was the cider donut from Daly’s, sold by the bag, cheaper than the pie slice it beat and cheaper still than the pie slice that beat nothing. Skip the ten-dollar slice with the two-dollar whipped cream.</p>

<p class="cn-cover-credit">Cover image: the apple cider donut pie, Bang Bang Pie. Photo: u/Jeeperscrow123 via r/chicagofood</p>`,
  sources: [
    { name: 'Lincoln Square Ravenswood Chamber of Commerce — Apple Fest', url: 'https://www.lincolnsquare.org/apple-fest' },
    { name: 'Apple Fest farms and vendors', url: 'https://www.lincolnsquare.org/apple-fest-farms-and-vendors' },
    { name: 'Choose Chicago — Apple Fest 2026 listing', url: 'https://www.choosechicago.com/event/lincoln-square-ravenswood-apple-fest-2026/2026-10-03/' },
    { name: 'r/chicagofood — Came hungry for Applefest', url: 'https://www.reddit.com/r/chicagofood/comments/1wwqaut/came_hungry_for_applefest_go_early_to_avoid/' },
    { name: 'Around the Town Chicago — Apple Fest 39', url: 'https://aroundthetownchicago.com/news/lincoln-square-presents-apple-fest-39/' },
    { name: 'Mick Klüg Farms', url: 'https://mickklugfarms.com/' },
    { name: 'Affy Tapple — our story', url: 'https://www.affytapple.com/about/' },
  ],
  photos: [
    // Seven frames from the thread plus a cover off the same roll. Exported at
    // 600px for the grid cells and 1200px for the cover: 265KB of art on a page
    // the §5.1 budget caps at 600KB. Served out of public/ as staging — §5.1
    // wants them uploaded through the editor to the article-images bucket before
    // publication, at which point these src attributes become hosted URLs.
    //
    // CREDITED AND RELEASED. These are u/Jeeperscrow123's photographs, used with
    // their permission as of 2026-10-05, credited with the permalink attached in
    // both the figcaption and the cover line. Licence CLEAR.
    //
    // One §5.1 item is still outstanding, and it is mechanical rather than legal:
    // these files are served out of public/ as a staging location. The standard
    // wants them uploaded through the editor into the article-images bucket, at
    // which point the src attributes become hosted URLs. Until that happens the
    // article renders correctly from the repo but the art is not in the CMS, so
    // an editor opening this piece cannot see or replace the images.
    //
    // Captions follow the Savored convention — dish, then stand, bare. Four of
    // the seven name a stand that is not visible in its frame; those were
    // matched to the thread's list of eight stops by elimination and confirmed
    // by the desk on 2026-10-05. Bang Bang Pie, Jerry & Geraldine's and Byron's
    // are legible from the food itself.
    { slot: 'cover',  file: 'public/article-images/apple-fest-39/cover-cider-donut-pie.webp',                   caption: 'Apple cider donut pie, Bang Bang Pie',       license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-1', file: 'public/article-images/apple-fest-39/grid/bang-bang-cider-donut-pie.webp',          caption: 'Apple cider donut pie, Bang Bang Pie — $6',  license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-2', file: 'public/article-images/apple-fest-39/grid/jerry-geraldines-apple-cinnamon-roll.webp', caption: 'Apple cinnamon roll, Jerry & Geraldine’s',  license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-3', file: 'public/article-images/apple-fest-39/grid/chopping-block-apple-pie.webp',           caption: 'Apple pie, The Chopping Block',              license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-4', file: 'public/article-images/apple-fest-39/grid/dinky-delights-apple-crisp-donut.webp',   caption: 'Apple crisp donut, Dinky Delights',          license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-5', file: 'public/article-images/apple-fest-39/grid/byrons-apple-churros.webp',               caption: 'Apple churros, Byron’s',                     license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-6', file: 'public/article-images/apple-fest-39/grid/dalys-cider-donut.webp',                  caption: 'Cider donut, Daly’s',                        license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-7', file: 'public/article-images/apple-fest-39/grid/dalys-cider-donuts-bag.webp',             caption: 'Cider donuts by the bag, Daly’s',            license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
  ],
},

]
