import ArticleImage from './ArticleImage'
import { formatRelativeTime } from '../utils/time'

const NewsItem = ({
  title,
  description,
  src,
  url,
  publishedAt,
  variant = 'card',
}) => {
  const timeLabel = formatRelativeTime(publishedAt)
  const safeTitle = title?.trim() || 'Headline unavailable'
  const alt = safeTitle.slice(0, 120)

  const linkClasses =
    'inline-flex items-center gap-1 text-sm font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400'

  if (variant === 'hero') {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950 shadow-xl shadow-black/40">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] min-h-[220px] md:aspect-auto md:min-h-[320px]">
            <ArticleImage
              key={src ?? 'hero-fallback'}
              src={src}
              alt={alt}
              loading="eager"
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-zinc-950/30 md:to-zinc-950" />
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
            {timeLabel && (
              <p className="text-xs font-medium uppercase tracking-wider text-amber-400/90">{timeLabel}</p>
            )}
            <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {safeTitle}
            </h2>
            {description && (
              <p className="line-clamp-4 text-base leading-relaxed text-zinc-400">{description}</p>
            )}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                Read full story
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-lg shadow-black/20 transition hover:border-amber-500/25 hover:shadow-amber-500/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <ArticleImage
          key={src ?? 'card-fallback'}
          src={src}
          alt={alt}
          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {timeLabel && (
          <p className="text-xs font-medium text-zinc-500">{timeLabel}</p>
        )}
        <h3 className="font-serif text-lg font-semibold leading-snug text-white line-clamp-3">
          {safeTitle}
        </h3>
        {description && (
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">{description}</p>
        )}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClasses} mt-auto pt-1`}
          >
            Read more
            <span aria-hidden>→</span>
          </a>
        ) : (
          <span className="mt-auto text-sm text-zinc-600">Link unavailable</span>
        )}
      </div>
    </article>
  )
}

export default NewsItem
