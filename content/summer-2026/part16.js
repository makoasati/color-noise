// Batch 7 — one Seen piece. Grand Kyiv Ballet, "Swan Lake: Symphony of Lights",
// Harris Theater, Wednesday Oct 14 2026. Filed the 16th.
//
// DESK. Seen rather than Heard. The subject is a costume and lighting decision
// — the production is sold as illuminated costumes and "each act a living art
// installation" — which is design, not a room's acoustics. Precedent: the MCA
// dance piece in September filed as Seen.
//
// SOURCED. Date, venue, 7pm curtain and the $52–$112 ticket range come from
// Grand Kyiv Ballet's own event page for this date; the production framing
// (illuminated costumes, lighting design, "living art installation") from the
// venue listings carrying the company's copy; the company's own history —
// founded by Oleksandr Stoianov out of National Opera of Ukraine dancers, first
// big tour 35 French theatres from 2014 — from its site. Harris capacity of
// 1,499 is the house's published figure. The Oct 14 Harris date was already in
// scripts/import-theaters-fall-2026.js and in the events table.
//
// WHAT I COULD NOT SOURCE, AND THEREFORE DO NOT NAME. No cast list for this
// date exists anywhere I can reach: not the company's event page, not the
// Harris listing, not a programme scan, not a review — there are no published
// reviews of this production at any stop on the tour. So no dancer is named.
// Naming a principal who did not dance on the 14th would be worse than naming
// nobody, and the company tours with rotating casts. The editor asked for
// performer names; this is the honest answer until a programme turns up.
//
// Likewise the children. The editor saw small children dancing as doves and
// asked where they came from. Nothing in the company's published material, the
// venue listing or the tour press accounts for them, and touring companies
// frequently cast local students without crediting them. The piece reports them
// and declines to explain them rather than inventing a provenance.
//
// ART. Six photographs supplied by the editor, shot from the house on the
// night. The cover is cropped out of a portrait frame so it does not take a
// full screen above the headline; the rest are full-frame. Hosted in the
// article-images bucket, 331KB total against the §5.1 600KB page budget.
//
// EXCLUDED: a Canvas grade notification that arrived in the same batch, showing
// the editor's email address and a course result. Not a ballet photograph and
// never uploaded.
//
// One Instagram embed from the company's own account, harvested with the iframe
// headers. Its caption jokes about "poor lighting", which is funnier against a
// production called Symphony of Lights than the company can have intended.

const E = require('./embeds')

module.exports = [

{
  ref: 'SL26',
  title: 'The Tutus Did the Lighting: Swan Lake at the Harris',
  category: 'spotlight',
  author_name: 'Julian Vane',
  date: '2026-10-16',
  event_dates: 'October 14, 2026',
  venue: 'Harris Theater',
  neighborhood: 'Millennium Park',
  featured: true,
  cover_image: 'https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/cover-lit-corps.webp',
  cover_credit: 'Swan Lake: Symphony of Lights, Harris Theater, October 14, 2026',
  cover_alt: 'Four dancers in white tutus studded with small white lights stand in a line at left while a fifth is supported in a deep backbend at right, against a painted moonlit lake',
  excerpt: 'Grand Kyiv Ballet put lights inside the tutus and solved a problem the genre has carried for a century. Then it left the idea on the lakeshore and went to the ballroom without it.',
  body: `<p>The difficulty with a corps de ballet in white is that white does not hold an edge. Two dozen women in identical bodices under an identical wash, seen from row K, resolve into one pale mass with arms coming off it, and every production of this ballet for a hundred years has accepted that as the price of the image. Grand Kyiv Ballet’s <em>Swan Lake: Symphony of Lights</em>, at the Harris Theater on Wednesday October 14th for one performance only, declines to pay it. The company has put the lighting instrument inside the costume.</p>

<p>The effect is not a glow. Small cool-white points are set into the tutu plate itself in a scattered star pattern, perhaps forty to a skirt, so that each dancer carries a horizontal disc of light at the hip. Against a painted lake and a low blue wash, the discs separate. One counts bodies instead of estimating them. When the corps moves in canon the light travels across the stage as a series of discrete events rather than as a single brightening, and the choreography becomes legible in a way that the standard white wash actively prevents.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/four-swans-lit.webp" alt="Four dancers in illuminated tutus with arms raised beneath a painted full moon on a darkened stage">
<figcaption>The lit corps, second act<span class="cn-photo-credit">Photo: Color&amp;Noise</span></figcaption>
</figure>

<p>The staging is otherwise conservative, which is the correct decision and an unfashionable one. The Jester is kept, capering in motley through the court scenes as he does in every Ukrainian and Russian redaction and in almost no Western one. The cygnets are four and they link arms crosswise and do the thing. Nobody has been asked to reinterpret anything.</p>

<p>Materials, unglossed: LED point sources, tulle, a sprung floor reflecting at about half value, a painted backcloth of lake and moon, cool white for the swans, a feathered headdress, black velvet, a rose window in gothic tracery rendered in coral and rose, and one caped silhouette with no light on it anywhere.</p>

<p>That last item is the production’s second good decision. The sorcerer — von Rothbart, the thing in black with the feathered headdress — carries no light at all. In a staging where every sympathetic body is a source, the villain is defined by being the one hole in the illumination. He crosses in front of the lit corps and reads as an absence moving through them. It is the cheapest possible characterisation and the most effective thing in the evening, and it costs the production nothing because it consists entirely of not doing something.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/rothbart-corps.webp" alt="A figure in black with a feathered headdress crosses in front of dancers in illuminated tutus while a swan is lifted behind him">
<figcaption>The sorcerer, carrying no light<span class="cn-photo-credit">Photo: Color&amp;Noise</span></figcaption>
</figure>

<p>One cannot praise the idea without noticing where it stops. The four cygnets dance the pas de quatre unlit, in plain white, which is defensible — the number is about precision of the ankle and the light would be noise. The third act is harder to forgive. The ballroom arrives in coral and rose under conventional front light, the rose window glowing behind the court, and the whole apparatus of the first half simply does not appear. Odile takes the black tutu and the thirty-two fouettés without a single point of light on her, in a production whose title promises a symphony of them. The company proved it could characterise through illumination and then set the tool down for an entire act.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/act-three-odile.webp" alt="A ballerina in a black tutu is supported in arabesque before a coral-lit gothic rose window, the court seated around her">
<figcaption>Act III, conventionally lit<span class="cn-photo-credit">Photo: Color&amp;Noise</span></figcaption>
</figure>

${E.instagram('DXA_Ld6AgAN', { caption: 'The company on its own plot' })}

<p>Somewhere in the second act a small cohort of children crossed as doves. They were perhaps seven or eight years old, they were entirely composed, and nothing in the company’s published material, the venue listing or the tour press accounts for them at all. Touring companies cast local students constantly and credit them never. The doves remain unexplained here because they are unexplained everywhere.</p>

<p>A second audience was in that house, and it was not the one the Harris sells to. Two Ukrainian-language creators posted the evening from backstage, standing beside a ballerina still in her tutu, narrating in Ukrainian over footage of the Jester and the black tutu, framing the night as Ukrainian artists presenting a hundred-and-fifty-year-old ballet in an American metropolis. One of them carries 140,000 followers and tagged the post Ukrainians in America. A company assembled from the ballet of the National Opera of Ukraine is touring North America continuously because touring is what is available to it, and the people who came to see it included a constituency for whom the evening was not principally about lighting design. That sits underneath the whole production and the production says nothing about it, which is probably correct.</p>

<p>Both of those posts call the production Symphony of Fire. One of them pluralises it to Fires. There is no fire in it.</p>

${E.instagram('DehiQAnJKVK', { caption: 'Backstage and front of house, the night after' })}

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/cygnets-pas-de-quatre.webp" alt="Four dancers in plain white tutus linked hand to hand in a line, dancing the pas de quatre">
<figcaption>The cygnets, unlit by choice<span class="cn-photo-credit">Photo: Color&amp;Noise</span></figcaption>
</figure>

<p>The company is a touring operation rather than a resident one: founded by <strong>Oleksandr Stoianov</strong> out of dancers from the ballet of the National Opera of Ukraine, first substantial tour thirty-five theatres across France from 2014, and since then a near-permanent circuit. No cast list for the 14th exists on the company’s event page, on the Harris listing, or anywhere else reachable, which is ordinary for a one-night date and still a discourtesy to the dancers. Tickets ran fifty-two to a hundred and twelve dollars. The Harris seats 1,499.</p>

<figure class="cn-photo">
<img src="https://jojhqdfsuhwqugtgkppt.supabase.co/storage/v1/object/public/article-images/swan-lake-harris-2026/pas-de-deux-moon.webp" alt="A dancer in white supports a ballerina in a deep backbend beneath a painted moon on a dark stage">
<figcaption>The white adagio<span class="cn-photo-credit">Photo: Color&amp;Noise</span></figcaption>
</figure>

<p>It did not sell. There were whole rows empty in the upper tier and gaps on the main floor at curtain, which on a Wednesday in October against a company most of this city has never heard of is not a mystery, merely a waste. I had been admiring the engineering of the tutus for some minutes before it occurred to me to watch the dancing, which is its own small failure of attention.</p>

<p>The room corrected me. At the first entrance of the lit corps, phones came up across the house in a wave and stayed up, then went down again within a few bars once the swans began moving together. Nobody filmed the cygnets, which is the only number in the ballet everybody can already hum. And at the end that thin house stood up. Somebody filmed the bow from the dark and posted it at eleven that night, and what carries on the recording is not the image but the volume — sustained, unembarrassed, going on past the point where an audience of that size has any business still clapping. That is not an audience the production failed to find. It is an audience the city failed to send.</p>

${E.instagram('DegDP2Xuyi9', { caption: 'The bow, filmed from the dark at eleven' })}

<p class="cn-cover-credit">Cover image: Swan Lake: Symphony of Lights, Harris Theater, October 14, 2026. Photo: Color&amp;Noise</p>`,
  sources: [
    { name: 'Grand Kyiv Ballet — Swan Lake: Symphony of Lights, Harris Theater, October 14 2026', url: 'https://www.grandkyivballet.com.ua/en/events/the-swan-lake-symphony-of-lights-harris-theater-october-14-2026/' },
    { name: 'Grand Kyiv Ballet', url: 'https://www.grandkyivballet.com.ua/en/' },
    { name: 'Harris Theater for Music and Dance', url: 'https://www.harristheaterchicago.org/' },
    { name: 'Harris Theater — Grand Kyiv Ballet listing', url: 'https://www.harristheaterchicago.org/grand-kyiv-ballet' },
    { name: 'D142 — Swan Lake eyewitness posts (6)', url: 'research/posts/D142.md' },
  ],
  photos: [
    // Six frames shot from the house on the night by the editor, cropped and
    // recompressed, hosted in the article-images bucket: 331KB against the
    // §5.1 600KB page budget. The cover is cropped out of a portrait original
    // so it does not occupy a full screen above the headline; the rest are
    // full-frame.
    //
    // A Canvas grade notification arrived in the same batch, carrying the
    // editor's email address and a course result. It is not a ballet photograph
    // and was never uploaded.
    { slot: 'cover', subject: 'The lit corps with Odette supported', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'body-1', subject: 'Four swans in illuminated tutus under the moon', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'body-2', subject: 'Von Rothbart crossing the lit corps, unlit', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'body-3', subject: 'Act III ballroom, Odile under conventional light', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'body-4', subject: 'The four cygnets, pas de quatre, unlit', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'body-5', subject: 'The white adagio under the moon', source: 'Editor, from the house', license: 'CLEAR', credit: 'Color&Noise' },
    { slot: 'embed-1', subject: 'Grand Kyiv Ballet on its own plot', source: 'Instagram — @grandkyivballet', license: 'EMBED',
      contact: 'https://www.instagram.com/p/DXA_Ld6AgAN/', credit: 'read from the embed' },
  ],
},

]
