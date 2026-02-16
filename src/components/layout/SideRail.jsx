import { NavLink } from 'react-router-dom'
import { navigation } from '../../data/catalog'
import { useAppStore } from '../../store/AppStore'

export default function SideRail() {
  const { language } = useAppStore()

  return (
    <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-20 xl:flex xl:w-24 xl:flex-col xl:items-center xl:py-6">
      <div className="glass-panel flex h-14 w-14 items-center justify-center rounded-2xl">
        <span className="display-title text-xl text-emerald-300">S</span>
      </div>

      <nav className="glass-panel mt-8 flex flex-col gap-3 rounded-full px-2 py-4">
        {navigation.map((entry) => (
          <NavLink
            key={entry.id}
            to={entry.to}
            className={({ isActive }) =>
              `group relative flex h-11 w-11 items-center justify-center rounded-full text-xl transition ${
                isActive
                  ? 'bg-emerald-500/25 text-emerald-200 shadow-[0_0_20px_rgba(0,200,83,0.3)]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`
            }
            title={entry.label[language]}
          >
            <i className={`bx ${entry.icon}`} aria-hidden="true" />
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
