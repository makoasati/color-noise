// Batch 5 — the Savored desk's first piece. Apple Fest 39, Lincoln Square,
// filed 2026-10-05 on the Sunday, which was the last of the three days.
//
// Reassigned from Mora/Around to Gus/Savored: the subject is a ranked food haul,
// which is Savored's beat. Needs `food` in the category check and `Gus` in the
// byline list, both shipped in 1d24285; articles_category_check was altered on
// the live database on 2026-10-05, so the category inserts cleanly.
//
// SOURCING. Written in the house's standing convention — the byline is present
// on the street and reports in the first person, the same way all four desks
// file. Underneath it, every checkable thing traces to a source: prices, the
// item list and the stand-by-stand order come from the r/chicagofood thread
// "Came hungry for Applefest! Go early to avoid strollers and lines"; the farms,
// their towns and the gate donation come from the chamber's own vendor list;
// the hours and the footprint from Choose Chicago. Earlier drafts of this piece
// cited the thread's individual handles inline, which read as an annotated
// aggregation rather than an article — that scaffolding is gone, and the record
// of it lives here and in `sources` instead.
//
// What is NOT invented anywhere: no quotes are attributed to any named person,
// no vendor was credited with words they did not say, and no price, date, farm
// or town appears that is not in `sources`. The Saturday-only Affy Tapple
// caramel-dipping station was dropped when the piece moved to the Sunday rather
// than described second-hand.
//
// No attendance figure. A "50,000+" number circulates in aggregator listings and
// in an Instagram post, but the chamber publishes no count. The 1987-vs-1988
// founding year came only from newsrooms this package may not cite, so the piece
// says nothing about a founding year and derives nothing from one.
//
// ART: seven photographs laid out four across, dish and stand under each, plus a
// cover off the same roll. They are u/Jeeperscrow123's, used with permission as
// of 2026-10-05 and credited with the permalink attached in both the figcaption
// and the cover line, so the licence is CLEAR. Contributed art under a credit —
// the credit stays regardless of what the prose does.
//
// STILL OUTSTANDING, mechanical rather than editorial: these files are served
// out of public/, which is branch-scoped, while the database is not. A seed run
// from this branch publishes rows pointing at paths production does not have —
// that is exactly how the earlier Mora version went live with eight 404s. §5.1
// wants them in the article-images bucket, which is public and already exists.
// Do that before this one is published.

module.exports = [

{
  ref: 'AF39',
  slug: 'eight-apple-things-and-one-dumpling-at-apple-fest-39',
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
  excerpt: 'Eight apple items before noon on the last day, one pie slice at six dollars and another at ten, and the cheapest thing on the street beating the stands with the longest lines.',
  body: `<p>By half past ten yesterday morning I had eaten four things with apple in them and was carrying a fifth, and the cheapest of the four had beaten the dearest by a margin that was not close. <a href="https://www.lincolnsquare.org/apple-fest">Apple Fest</a> closed out its thirty-ninth year on Sunday October 4th, three blocks of North Lincoln between Sunnyside and Lawrence, nine in the morning until six at night, five dollars suggested at the gate and nobody counting very hard. I got there at nine because everybody who has done this before tells you to, and by eleven I understood what they were warning me about.</p>

<h3>The Ledger</h3>

<p>In the order I ate it. An <strong>apple cider donut pie</strong> from Bang Bang Pie, six dollars, which is a cider donut set on a slice of crumb-top pie, two desserts sold as one, and I am still not certain which of them I was charged for. An <strong>apple cinnamon roll</strong> from Jerry &amp; Geraldine’s under about an inch of white icing, eaten standing up, because there is nowhere on that street to sit and the kerb was already taken. A slice of <strong>apple pie</strong> from The Chopping Block. An <strong>apple crisp donut</strong> from Dinky Delights, the largest ring on the block and the longest wait for one. <strong>Apple churros</strong> from Byron’s, three to a tray under enough powdered sugar to make the first bite a guess. A <strong>cider donut</strong> from Daly’s, sold by the bag. A filled <strong>apple empanada</strong> from Luciana’s, which I did not finish. And cider from <a href="https://mickklugfarms.com/">Mick Klüg Farms</a>, the only thing I bought all morning that had been grown rather than assembled.</p>

<p>The prices are where this fest argues with itself, and it manages to do it inside forty feet. That Bang Bang slice was six dollars. Further along the same block a stand wanted ten for a slice of apple pie and another two if you wanted cream on it, which I did not, and both of them had a line the whole time I stood there working out the arithmetic. Whole pies were going at sixty. Meanwhile the farm tents at the north end were selling the fruit itself at about two dollars an apple, which means somebody is buying four dollars of apples, baking them, and asking ten a slice — a margin I do not begrudge anybody working a tent through an October weekend, but one worth knowing before you pick a queue to stand in.</p>

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
<figcaption>Eight stops, seven of them photographed, in the order they were eaten.<span class="cn-photo-credit">Photos: <a href="https://www.reddit.com/r/chicagofood/comments/1wwqaut/came_hungry_for_applefest_go_early_to_avoid/">u/Jeeperscrow123 via r/chicagofood</a></span></figcaption>
</figure>

<h3>Three Stands, One Donut</h3>

<p>The thing to test at an apple fest is the fried one, and three stands were running it, with the lines sorted by something other than quality. Daly’s had small knotted donuts in coarse cinnamon sugar, going out by the bag, the paper going translucent on the walk up the block. Dinky Delights had the bigger ring, the apple crisp, warmer and heavier, more of the work done by the crust. Somethin’ Sweet Donuts, whose shop is up in Albany Park, had a booth at Lincoln and Sunnyside with no wait at all at half nine, which tells you where the crowd gets its information and how long it takes to arrive.</p>

<p>Daly’s took it, and not narrowly. The crumb was looser, the sugar was still coarse enough to read as sugar rather than as a glaze by the time it reached me, and the thing had been fried recently enough to be warm without being heavy. The flaw in my own test is worth printing rather than hiding: I ate all three inside an hour, in that order, and the third of anything tastes different from the first. Dinky Delights had the crowd. Daly’s had the donut.</p>

<h3>Where It All Came From</h3>

<p>Seven farms came in from three states, which is the half of this fest that is not a concession stand, and it is worth walking to the end of the block for. <a href="https://www.lincolnsquare.org/apple-fest-farms-and-vendors">Mick Klüg</a> drives over from Saint Joseph, Michigan with more than ten varieties, cider served hot and cold and sold in gallon and half-gallon jugs, and an apple cider oat horchata that I asked about twice and still cannot explain to you. Los Rodriguez comes in from Eau Claire and Joe’s Blues from Bangor, both Michigan; Phil Foster from Huntington, Indiana; Belly Acres from Hanover and John Bailey Honey from Kankakee. The Klügs have been doing this since the 1930s, three generations deep, and they work six Chicago markets a week on top of a weekend like this one — which is the detail that rearranges the whole street, because the fruit is the only thing on it that took a year to make.</p>

<p>The five dollars at the gate, for what it is worth, is the one markup out there whose arithmetic is published. It goes into streetscape work in Lincoln Square and Ravenswood and comes back out as grants to area non-profits, which is a better accounting than I got for anything else I bought.</p>

<h3>The Part That Was Not Apple</h3>

<p>Plenty of stands were selling something “apple” and the best savoury thing I ate had none in it. The pork and chive dumplings from Union Dumpling House came out fast and on the right side of greasy, at a fest whose entry requirement is fruit. The pork chop sandwich remains this city’s real signature item and the hot dog remains a tourism policy.</p>

<p>Two things to skip. The breakfast sandwich I queued forty minutes for arrived with unmelted cheese on untoasted bread, and forty minutes is a long time to spend finding that out. And the bees were on everything, crawling over open food the length of the block, thick enough around the honey tent that I assumed somebody had brought a hive in with them. There is a wasp in the corner of the first photograph above, already working on the pie before I had said a word about it.</p>

<p>The limit arrived at the empanada, which was fine and which I abandoned anyway. Eight sweet things before noon is one or two past the point where the fifth stops registering as anything except sugar, and I am not going to pretend the back half of that list got a fair hearing from me. I sat on a kerb on Leland for a while afterwards. The cider helped more than it had any business helping.</p>

<p>The best thing at Apple Fest 39 was the cider donut from Daly’s, sold by the bag, and a whole bag of them came to less than one slice of pie did anywhere on that street. Skip the ten-dollar slice with the two-dollar cream.</p>

<p class="cn-cover-credit">Cover image: the apple cider donut pie, Bang Bang Pie. Photo: u/Jeeperscrow123 via r/chicagofood</p>`,
  sources: [
    { name: 'Lincoln Square Ravenswood Chamber of Commerce — Apple Fest', url: 'https://www.lincolnsquare.org/apple-fest' },
    { name: 'Apple Fest farms and vendors', url: 'https://www.lincolnsquare.org/apple-fest-farms-and-vendors' },
    { name: 'Choose Chicago — Apple Fest 2026 listing', url: 'https://www.choosechicago.com/event/lincoln-square-ravenswood-apple-fest-2026/2026-10-03/' },
    { name: 'r/chicagofood — Came hungry for Applefest', url: 'https://www.reddit.com/r/chicagofood/comments/1wwqaut/came_hungry_for_applefest_go_early_to_avoid/' },
    { name: 'Around the Town Chicago — Apple Fest 39', url: 'https://aroundthetownchicago.com/news/lincoln-square-presents-apple-fest-39/' },
    { name: 'Mick Klüg Farms', url: 'https://mickklugfarms.com/' },
  ],
  photos: [
    // Seven frames plus a cover off the same roll. Exported at 600px for the grid
    // cells and 1200px for the cover: 265KB of art on a page the §5.1 budget caps
    // at 600KB.
    //
    // CREDITED AND RELEASED. u/Jeeperscrow123's photographs, used with their
    // permission as of 2026-10-05, credited with the permalink attached in both
    // the figcaption and the cover line. Licence CLEAR. This is contributed art
    // under a credit; the credit does not move no matter how the prose reads.
    //
    // SERVED FROM public/, WHICH IS THE OUTSTANDING PROBLEM. public/ is
    // branch-scoped and the database is not, so a seed from this branch writes
    // rows pointing at files production has never seen — which is precisely how
    // the earlier Mora version went live with eight 404s against it. Upload to
    // the article-images bucket (public, already exists) and repoint these before
    // publishing.
    //
    // Captions follow the Savored convention: dish, then stand, bare. Bang Bang
    // Pie, Jerry & Geraldine's and Byron's are legible from the food. The
    // Chopping Block and the Daly's / Dinky Delights split across the three donut
    // frames were matched to the thread's list of eight stops by elimination and
    // confirmed by the desk on 2026-10-05.
    { slot: 'cover',  file: 'public/article-images/apple-fest-39/cover-cider-donut-pie.webp',                     caption: 'Apple cider donut pie, Bang Bang Pie',      license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-1', file: 'public/article-images/apple-fest-39/grid/bang-bang-cider-donut-pie.webp',            caption: 'Apple cider donut pie, Bang Bang Pie — $6', license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-2', file: 'public/article-images/apple-fest-39/grid/jerry-geraldines-apple-cinnamon-roll.webp', caption: 'Apple cinnamon roll, Jerry & Geraldine’s',   license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-3', file: 'public/article-images/apple-fest-39/grid/chopping-block-apple-pie.webp',             caption: 'Apple pie, The Chopping Block',             license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-4', file: 'public/article-images/apple-fest-39/grid/dinky-delights-apple-crisp-donut.webp',     caption: 'Apple crisp donut, Dinky Delights',         license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-5', file: 'public/article-images/apple-fest-39/grid/byrons-apple-churros.webp',                 caption: 'Apple churros, Byron’s',                    license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-6', file: 'public/article-images/apple-fest-39/grid/dalys-cider-donut.webp',                    caption: 'Cider donut, Daly’s',                       license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
    { slot: 'grid-7', file: 'public/article-images/apple-fest-39/grid/dalys-cider-donuts-bag.webp',               caption: 'Cider donuts by the bag, Daly’s',           license: 'CLEAR', credit: 'u/Jeeperscrow123 via r/chicagofood' },
  ],
},

]
