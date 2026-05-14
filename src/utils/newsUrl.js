/** Default country for headlines. NewsAPI often returns no articles for `in` on the free Developer plan; override with VITE_NEWS_COUNTRY=in if your key returns data. */
export const NEWS_COUNTRY = import.meta.env.VITE_NEWS_COUNTRY || 'us'

export function regionLabelForCountry(code) {
  const c = String(code || 'in').toLowerCase()
  if (c === 'in') return 'India'
  if (c === 'us') return 'United States'
  if (c === 'gb') return 'United Kingdom'
  return c.toUpperCase()
}

/**
 * Use Netlify function on deployed hosts; localhost uses direct NewsAPI (allowed on Developer plan).
 */
export function shouldUseNewsProxy() {
  if (typeof window === 'undefined') return true
  const h = window.location.hostname
  return h !== 'localhost' && h !== '127.0.0.1'
}

export function buildHeadlinesUrl(category, apiKeyForDev) {
  const params = new URLSearchParams({ country: NEWS_COUNTRY })
  if (category !== 'general') params.set('category', category)

  if (shouldUseNewsProxy()) {
    return `/.netlify/functions/news?${params.toString()}`
  }

  if (!apiKeyForDev) return null
  params.set('apiKey', apiKeyForDev)
  return `https://newsapi.org/v2/top-headlines?${params.toString()}`
}
