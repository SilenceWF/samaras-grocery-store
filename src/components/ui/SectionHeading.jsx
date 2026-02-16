import clsx from 'clsx'

export default function SectionHeading({
  title,
  subtitle,
  action,
  className,
  titleClassName,
  subtitleClassName,
}) {
  return (
    <div className={clsx('mb-5 flex items-end justify-between gap-3', className)}>
      <div>
        <h2 className={clsx('display-title text-2xl text-white sm:text-3xl', titleClassName)}>{title}</h2>
        {subtitle ? (
          <p className={clsx('mt-1 max-w-2xl text-sm text-slate-300', subtitleClassName)}>{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
