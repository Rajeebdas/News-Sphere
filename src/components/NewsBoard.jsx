import { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import { CATEGORIES } from '../constants/categories'
import { articleKey } from '../utils/articleKey'
import { regionLabelForCountry } from '../utils/newsUrl'

/** NewsData.io uses different slugs than NewsAPI; "top" is the closest to general headlines. */
function newsDataCategory(category) {
  if (category === 'general') return 'top'
  return category
}

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30">
      <div className="aspect-[16/10] animate-pulse bg-zinc-800/80" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
        <div className="h-4 w-[80%] animate-pulse rounded bg-zinc-800" />
        <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
      </div>
    </div>
  )
}

function SkeletonHero() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="aspect-[4/3] min-h-[220px] animate-pulse bg-zinc-800/80 md:min-h-[320px]" />
        <div className="space-y-4 p-6 sm:p-8 md:p-10">
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
          <div className="h-8 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-8 w-[92%] animate-pulse rounded bg-zinc-800" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  const apiKey = import.meta.env.VITE_API_KEY
  const categoryLabel =
    CATEGORIES.find((c) => c.id === category)?.label ?? 'News'

  const regionLabel = regionLabelForCountry('in')

  useEffect(() => {
    if (!apiKey) return undefined

    let cancelled = false
    const cat = encodeURIComponent(newsDataCategory(category))
    const url = `https://newsdata.io/api/1/latest?apikey=${encodeURIComponent(apiKey)}&country=in&category=${cat}&language=en`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.status === 'error' || data.status === 'failure') {
          setError(data.message || 'Could not load headlines.')
          setArticles([])
          setStatus('error')
          return
        }
        const results = data.results
        if (!Array.isArray(results)) {
          setError(data.message || 'Unexpected response from NewsData.io.')
          setArticles([])
          setStatus('error')
          return
        }
        setArticles(results)
        setStatus('success')
      })
      .catch(() => {
        if (cancelled) return
        setError('Network error. Check your connection and try again.')
        setArticles([])
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [category, apiKey])

  const [featured, ...rest] = articles

  const header = (
    <header className="space-y-2 text-center md:text-left">
      <p className="text-sm font-medium uppercase tracking-widest text-amber-500/90">
        {regionLabel}
      </p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {categoryLabel}
        <span className="text-zinc-500"> — latest headlines</span>
      </h1>
    </header>
  )

  if (!apiKey) {
    return (
      <div className="space-y-10">
        {header}
        <div
          className="rounded-2xl border border-amber-500/25 bg-amber-950/30 px-6 py-8 text-center"
          role="alert"
        >
          <p className="font-medium text-amber-100">
            Add{' '}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-200">VITE_API_KEY</code> to your{' '}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-200">.env</code> file (NewsData.io
            key) and restart the dev server. For Netlify, set{' '}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-amber-200">VITE_API_KEY</code> under
            Environment variables and redeploy.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {header}

      {status === 'loading' && (
        <div className="space-y-8">
          <SkeletonHero />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="rounded-2xl border border-red-500/30 bg-red-950/40 px-6 py-8 text-center"
          role="alert"
        >
          <p className="font-medium text-red-200">{error}</p>
          <p className="mt-2 text-sm text-red-300/80">
            Confirm your NewsData.io key and plan limits. If the API returns an error message above, adjust
            your request or category.
          </p>
        </div>
      )}

      {status === 'success' && articles.length === 0 && (
        <p className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-12 text-center text-zinc-400">
          No stories returned for this selection. Try another category.
        </p>
      )}

      {status === 'success' && articles.length > 0 && (
        <div className="space-y-10">
          {featured && (
            <NewsItem
              key={articleKey(featured)}
              variant="hero"
              title={featured.title}
              description={featured.description}
              src={featured.image_url}
              url={featured.link}
              publishedAt={featured.pubDate ?? featured.publishedAt}
            />
          )}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((news) => (
                <NewsItem
                  key={articleKey(news)}
                  title={news.title}
                  description={news.description}
                  src={news.image_url}
                  url={news.link}
                  publishedAt={news.pubDate ?? news.publishedAt}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NewsBoard
