import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'

const Navbar = ({ category, setCategory }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const select = (id) => {
    setCategory(id)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#"
          className="font-serif text-xl font-semibold tracking-tight text-white transition hover:text-amber-200/90"
          onClick={(e) => {
            e.preventDefault()
            select('general')
          }}
        >
          News-Sphere
        </a>

        <nav
          className="hidden flex-wrap items-center justify-end gap-1 md:flex"
          aria-label="News categories"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => select(c.id)}
              className={
                category === c.id
                  ? 'rounded-full bg-amber-500/15 px-3 py-1.5 text-sm font-medium text-amber-200 ring-1 ring-amber-500/35 transition'
                  : 'rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100'
              }
            >
              {c.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-category-nav"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Toggle categories</span>
          {mobileOpen ? (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-category-nav"
        className={
          mobileOpen
            ? 'border-t border-white/10 bg-zinc-950/95 px-4 py-3 md:hidden'
            : 'hidden'
        }
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => select(c.id)}
              className={
                category === c.id
                  ? 'rounded-full bg-amber-500/15 px-3 py-1.5 text-sm font-medium text-amber-200 ring-1 ring-amber-500/35'
                  : 'rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-300'
              }
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
