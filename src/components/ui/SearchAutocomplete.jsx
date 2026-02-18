import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from './GlassPanel'
import { useAppStore } from '../../store/AppStore'

export default function SearchAutocomplete({ compact = false, className = '' }) {
  const { copy, language, searchTerm, setSearchTerm, searchResults } = useAppStore()

  const hasTerm = useMemo(() => searchTerm.trim().length > 0, [searchTerm])

  return (
    <div className={`relative ${className}`}>
      <label className="sr-only" htmlFor={compact ? 'compact-search' : 'hero-search'}>
        {copy.searchPlaceholder}
      </label>

      <div className={`glass-button relative ${compact ? 'h-10' : 'h-14'} flex items-center rounded-full px-2`}>
        <i className="bx bx-search pointer-events-none text-xl text-emerald-300" aria-hidden="true" />
        <input
          id={compact ? 'compact-search' : 'hero-search'}
          // type="search"
          autoComplete="off"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="h-full w-full bg-transparent px-3 text-sm text-white placeholder:text-slate-300/70 focus:outline-none"
        />
        {searchTerm ? (
          <button
            type="button"
            className="h-8 w-8 flex items-center justify-center flex-none rounded-full text-slate-200 transition hover:bg-white/10"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            <i className="bx bx-x text-xl" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {hasTerm ? (
        <GlassPanel className="absolute inset-x-0 top-[calc(100%+0.6rem)] z-30 p-2">
          {searchResults.length ? (
            <ul className="space-y-1">
              {searchResults.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-white/8"
                    onClick={() => setSearchTerm('')}
                  >
                    <img
                      src={product.image}
                      alt={product.name[language]}
                      className="h-10 w-10 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{product.name[language]}</p>
                      <p className="text-xs text-slate-300">{product.quantity}</p>
                    </div>
                    <i className="bx bx-right-arrow-alt ml-auto text-lg text-emerald-300" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl px-3 py-4 text-sm text-slate-300">{copy.searchEmpty}</p>
          )}
        </GlassPanel>
      ) : null}
    </div>
  )
}
