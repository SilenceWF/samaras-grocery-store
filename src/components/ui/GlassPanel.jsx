import clsx from 'clsx'

export default function GlassPanel({ as: Component = 'div', className, children, ...props }) {
  const Tag = Component

  return (
    <Tag className={clsx('glass-panel rounded-3xl border border-white/12', className)} {...props}>
      {children}
    </Tag>
  )
}
