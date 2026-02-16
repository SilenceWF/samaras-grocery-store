import { Link } from 'react-router-dom'
import GlassPanel from '../components/ui/GlassPanel'

export default function ComingSoon({
  eyebrow = 'Coming soon',
  title = 'Upgrading this area right now',
  description = 'We are polishing this part of the Samaras experience. Check back very soon.',
  badge = 'In progress',
}) {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <GlassPanel className="mx-auto max-w-3xl p-8 text-center sm:p-10">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          {eyebrow}
        </span>
        <h1 className="display-title mt-5 text-balance text-4xl text-white sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">{description}</p>
        <p className="mt-4 text-sm font-semibold text-emerald-300">{badge}</p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
        >
          <i className="bx bx-home-heart text-lg" aria-hidden="true" />
          Back to home
        </Link>
      </GlassPanel>
    </section>
  )
}
