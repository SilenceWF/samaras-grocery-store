import { NavLink } from 'react-router-dom'
import { navigation } from '../../data/catalog'
import { useAppStore } from '../../store/AppStore'

export default function MobileNav() {
  const { language, cartCount, openCart } = useAppStore()

  return (
    <nav
      className="liquid-nav fixed bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-[min(34rem,calc(100%-1.1rem))] -translate-x-1/2 px-2 py-2"
      aria-label="Primary navigation"
    >
      <ul className="relative z-[1] flex items-center justify-between gap-1">
        {navigation.slice(0, 2).map((entry) => (
          <li key={entry.id}>
            <NavLink
              to={entry.to}
              className={({ isActive }) =>
                `flex min-h-11 min-w-11 items-center justify-center rounded-full text-xl transition ${
                  isActive ? 'bg-white/22 text-emerald-100 shadow-[0_10px_22px_rgba(0,0,0,0.26)]' : 'text-slate-200 hover:bg-white/12'
                }`
              }
              title={entry.label[language]}
            >
              <i className={`bx ${entry.icon}`} aria-hidden="true" />
            </NavLink>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-700/45 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.88),rgba(160,233,192,0.34)_45%,rgba(56,117,86,0.85)_100%)] text-2xl text-white shadow-[0_14px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl transition hover:scale-[1.05]"
            aria-label="Open cart"
          >
            <i className="bx bx-cart" aria-hidden="true" />
            {cartCount ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-emerald-700">
                {cartCount}
              </span>
            ) : null}
          </button>
        </li>

        {navigation.slice(2).map((entry) => (
          <li key={entry.id}>
            <NavLink
              to={entry.to}
              className={({ isActive }) =>
                `flex min-h-11 min-w-11 items-center justify-center rounded-full text-xl transition ${
                  isActive ? 'bg-white/22 text-emerald-100 shadow-[0_10px_22px_rgba(0,0,0,0.26)]' : 'text-slate-200 hover:bg-white/12'
                }`
              }
              title={entry.label[language]}
            >
              <i className={`bx ${entry.icon}`} aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
