/**
 * Server-side NewsAPI proxy — Developer plan allows server requests, not browser calls from production.
 * Set NEWS_API_KEY in Netlify → Site configuration → Environment variables.
 */
export const handler = async (event) => {
  const key = process.env.NEWS_API_KEY || process.env.VITE_API_KEY
  if (!key) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'error',
        message:
          'Server missing NEWS_API_KEY (or VITE_API_KEY). Add NEWS_API_KEY in Netlify → Environment variables and redeploy.',
      }),
    }
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders(), body: JSON.stringify({ message: 'Method not allowed' }) }
  }

  const params = event.queryStringParameters || {}
  const country = params.country || 'in'
  const category = params.category

  const upstream = new URLSearchParams({ country, apiKey: key })
  if (category) upstream.set('category', category)

  const url = `https://newsapi.org/v2/top-headlines?${upstream.toString()}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: JSON.stringify(data),
    }
  } catch {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      body: JSON.stringify({ status: 'error', message: 'Upstream request failed.' }),
    }
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  }
}
