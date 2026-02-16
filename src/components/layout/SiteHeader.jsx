import { Link, useNavigate } from 'react-router-dom'
import SearchAutocomplete from '../ui/SearchAutocomplete'
import { STORE_LOCATION } from '../../data/catalog'
import { useAppStore } from '../../store/AppStore'

export default function SiteHeader() {
  const { language, toggleLanguage, cartCount, copy, openCart } = useAppStore()
  const navigate = useNavigate()

  return (
    <header className="sticky top-3 z-30 mb-6">
      <div className="glass-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[1.6rem] p-3 sm:grid-cols-[138px_minmax(0,1fr)_138px] sm:gap-3 sm:p-4">
        <button
          type="button"
          onClick={() => navigate('/contact')}
          className="glass-button hidden h-10 w-[138px] items-center gap-2 rounded-full px-2.5 text-left sm:flex"
        >
          <span className="glass-icon-button h-7 w-7 shrink-0">
            <i className="bx bxs-map text-base" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-emerald-300">Location</span>
            <span className="line-clamp-1 text-xs text-white">{STORE_LOCATION.address}</span>
          </span>
        </button>

        <SearchAutocomplete compact className="justify-self-center w-full max-w-[420px] sm:max-w-[440px]" />

        <div className="ml-auto flex w-[138px] items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="glass-icon-button relative h-10 w-10 text-xs font-bold text-white"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'EL' : 'EN'}
          </button>

          <button
            type="button"
            onClick={openCart}
            className="glass-icon-button relative h-10 w-10"
            aria-label={copy.cartOpen}
          >
            <i className="bx bx-cart text-xl" aria-hidden="true" />
            {cartCount ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>

          <Link to="/contact" className="glass-icon-button h-10 w-10" aria-label="Open profile">
            <i className="bx bx-user text-xl" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  )
}
