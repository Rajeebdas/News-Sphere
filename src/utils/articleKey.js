export function articleKey(article) {
  if (article?.url) return article.url
  return `${article?.title ?? 'article'}-${article?.publishedAt ?? ''}`
}
