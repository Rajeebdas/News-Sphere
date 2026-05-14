/** Region label helper (NewsData URL in NewsBoard uses country=in by default). */
export function regionLabelForCountry(code) {
  const c = String(code || 'in').toLowerCase()
  if (c === 'in') return 'India'
  if (c === 'us') return 'United States'
  if (c === 'gb') return 'United Kingdom'
  return c.toUpperCase()
}
