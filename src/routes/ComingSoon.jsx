import { Link } from 'react-router-dom'

export default function ComingSoon({
  eyebrow = 'Coming soon',
  title = 'Αναβαθμίζουμε την εμπειρία.',
  description = 'Παραμένουμε στο παρασκήνιο για να τελειοποιήσουμε τη νέα ενότητα.',
  badge = 'In progress',
}) {
  return (
    <section className="section-wrapper flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="max-w-2xl rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-emerald-50 via-white to-lime-100 p-10 shadow-2xl dark:border-white/10 dark:bg-night-900/80">
        <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700 dark:bg-white/10 dark:text-emerald-300">
          {eyebrow}
        </span>
        <h1 className="mt-6 text-3xl text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-200">{description}</p>
        <p className="mt-5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{badge}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-500"
        >
          <i className="bx bx-home-heart text-lg" aria-hidden="true" />
          Επιστροφή στην αρχική
        </Link>
      </div>
    </section>
  )
}
