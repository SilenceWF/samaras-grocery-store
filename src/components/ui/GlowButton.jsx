import clsx from 'clsx'

export default function GlowButton({
  className,
  children,
  icon,
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300',
        variant === 'primary' && 'glow-button text-white',
        variant === 'secondary' && 'glass-button text-white/90',
        className,
      )}
      {...props}
    >
      {icon ? <i className={clsx(icon, 'text-lg')} aria-hidden="true" /> : null}
      {children}
    </button>
  )
}
