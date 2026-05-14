export function articleKey(article) {
  const id = article?.link || article?.url
  if (id) return id
  const when = article?.pubDate || article?.publishedAt
  return `${article?.title ?? 'article'}-${when ?? ''}`
}
