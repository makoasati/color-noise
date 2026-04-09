// Content moderation — automated comment filtering.
// Terms are stored here for filtering only, never displayed to users.

// Short or ambiguous terms: checked with word boundaries to avoid false positives
const WORD_BOUNDARY_TERMS = [
  'fag', 'jap', 'gook', 'nip', 'dyke', 'spic', 'lesbo', 'homo',
  'cracker', 'honky', 'mick', 'kyke',
]

// Clear hate-speech terms with no innocent meaning: checked as substrings
const SUBSTRING_TERMS = [
  // Anti-Black
  'nigger', 'nigga', 'nigg', 'coon', 'jigaboo', 'sambo',
  'porch monkey', 'jungle bunny', 'darkie', 'pickaninny', 'spook',
  // Anti-Latino
  'wetback', 'beaner', 'spick',
  // Anti-Asian
  'chink', 'zipperhead', 'slant eye', 'slanteye', 'chinaman', 'gooks',
  // Anti-Jewish
  'kike', 'heeb', 'hebe', 'yid', 'jewboy', 'shylock',
  // Anti-Indigenous
  'redskin', 'squaw', 'injun',
  // Anti-Middle Eastern / South Asian
  'raghead', 'towelhead', 'camel jockey', 'sand nigger', 'paki',
  // Anti-Roma
  'gyppo',
  // Homophobic
  'faggot', 'faggots', 'faggotry', 'poofter', 'battyboy', 'batty boy',
  'tranny', 'shemale', 'he-she',
  // Sexist / misogynistic
  'cunt', 'cunts', 'whore', 'slut', 'skank', 'twat', 'cumslut',
  // Ableist
  'retard', 'retards', 'retarded', 'spastic', 'mongoloid',
  // Threats / self-harm encouragement
  'kill yourself', 'kys', 'go kill', 'end yourself',
  // White-supremacist / hate ideology
  'white power', 'white supremac', 'heil hitler', 'sieg heil',
  '14 words', 'race war', 'race traitor', 'mudshark', 'coal burner',
  'white genocide', 'great replacement',
]

// Common character substitution evasions → canonical character
const NORM_MAP = {
  '@': 'a', '4': 'a', '3': 'e', '1': 'i', '!': 'i',
  '0': 'o', '$': 's', '5': 's', '+': 't', '7': 't',
  '(': 'c', '|': 'l', '8': 'b', '¡': 'i', '€': 'e',
  '*': '', '.': ' ',
}

function normalize(text) {
  return text
    .toLowerCase()
    .split('')
    .map(c => NORM_MAP[c] !== undefined ? NORM_MAP[c] : c)
    .join('')
}

export function containsProfanity(text) {
  const norm = normalize(text)
  // Also strip non-alphanumeric (except spaces) to catch n.i.g.g.e.r style evasion
  const stripped = norm.replace(/[^a-z0-9 ]/g, ' ')

  for (const term of SUBSTRING_TERMS) {
    const t = normalize(term).replace(/[^a-z0-9 ]/g, ' ')
    if (stripped.includes(t) || norm.includes(normalize(term))) return true
  }

  for (const term of WORD_BOUNDARY_TERMS) {
    const t = normalize(term)
    if (new RegExp(`\\b${t}\\b`).test(stripped)) return true
  }

  return false
}
