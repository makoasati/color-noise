// Populate covers from organiser / publisher images, appraised individually.
// Each was fetched, confirmed to return image/jpeg, and checked for subject
// relevance before inclusion. Rejected candidates are listed at the bottom
// with the reason, so nobody re-adds them later.
const fs = require('fs')

const ACCEPT = {
  D21: {
    url: 'https://cdn.choosechicago.com/uploads/2020/05/028_20130905_SUMMERDANCE-scaled.jpg',
    credit: 'Courtesy Choose Chicago',
    alt: 'Dancers on the open-air floor at Chicago SummerDance in Grant Park',
  },
  D38: {
    url: 'https://cdn.choosechicago.com/uploads/2023/06/Pride-Parade-ALL-MEDUIM-SIZE-2019-195.jpg',
    credit: 'Courtesy Choose Chicago',
    alt: 'Crowds along the Chicago Pride Parade route in Northalsted',
  },
  D43: {
    url: 'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/32224224/d7f2b552-d100-4227-b4b3-f13d79c0510f.jpg',
    credit: 'Courtesy Villapalooza',
    alt: 'Villapalooza in La Villita Park, Little Village',
  },
  D44: {
    url: 'https://storage.googleapis.com/latination-website-bucket-new/uploads/9db39276-chicago-el-grito-festival-stage-600x335.jpg',
    credit: 'Via Latination',
    alt: 'The El Grito festival stage in Grant Park',
  },
  'D65-GC': {
    url: 'https://media.nbcchicago.com/2022/05/chicago-summer-festivals.jpg',
    credit: 'Via NBC Chicago',
    alt: 'Tents at a Chicago summer art fair',
  },
}

// Appraised and REJECTED — do not re-add:
//   D54  roscoevillage.org/rvn_logo_web-3.png   -> a chamber logo, 15KB PNG, not a photograph
//   DX1  Block Club summer-guide og:image        -> is a Bud Billiken Parade photo, wrong event
//   D35  do312.com generic share image           -> Do312's site-wide card, nothing to do with Mayfest
//   D39  northalsted.com event page              -> no og:image published
//   D58  pandafestchicago.com                    -> no og:image published

function patch(src, ref, hit) {
  const anchor = "ref: '" + ref + "',"
  const i = src.indexOf(anchor)
  if (i === -1) return null
  const target = "cover_image: ''"
  const j = src.indexOf(target, i)
  if (j === -1) return null
  const nextRef = src.indexOf("ref: '", i + anchor.length)
  if (nextRef !== -1 && j > nextRef) return null
  return src.slice(0, j) +
    'cover_image: ' + JSON.stringify(hit.url) +
    ',\n  cover_credit: ' + JSON.stringify(hit.credit) +
    ',\n  cover_alt: ' + JSON.stringify(hit.alt) +
    src.slice(j + target.length)
}

let written = 0
for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
  const p = 'content/summer-2026/' + f
  let s = fs.readFileSync(p, 'utf8')
  for (const e of Object.entries(ACCEPT)) {
    const out = patch(s, e[0], e[1])
    if (out) { s = out; written++; console.log('ok   ' + e[0]) }
  }
  fs.writeFileSync(p, s)
}
console.log('patched ' + written)
