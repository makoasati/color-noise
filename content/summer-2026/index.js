// Chicago Summer 2026 recap package — all 72 dossier entries, the #65/#70/#71
// clusters expanded, plus the Cinco de Mayo absence. Consumed by
// scripts/seed-summer-2026.js
const parts = []
for (let i = 1; i <= 24; i++) {
  try { parts.push(...require('./part' + i)) } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e
  }
}
// Later parts override earlier ones on the same ref, so part8.js can carry a
// rewrite without the original having to be deleted from part1–7.
const byRef = new Map()
for (const a of parts) byRef.set(a.ref || a.title, a)
module.exports = [...byRef.values()]
