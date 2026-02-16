import { Link } from 'react-router-dom'
import GlassPanel from './GlassPanel'
import { formatPrice } from '../../utils/format'
import { useAppStore } from '../../store/AppStore'

export default function ProductCard({ product, onQuickView }) {
  const { language, copy, addToCart } = useAppStore()
  const isOutOfStock = !product.inStock

  return (
    <GlassPanel className="group flex h-auto flex-col p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] sm:p-4">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name[language]}
          loading="lazy"
          className="h-auto w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105 aspect-square"
        />

        {product.tabs.includes('flash') ? (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-500/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            {isOutOfStock ? (language === 'el' ? 'Εκτός' : 'Out') : 'Flash'}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-2 right-2 hidden rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition hover:bg-black/65 md:block md:opacity-0 md:group-hover:opacity-100"
        >
          {copy.quickView}
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <Link to={`/product/${product.id}`} className="line-clamp-1 text-sm font-semibold text-white hover:text-emerald-300">
          {product.name[language]}
        </Link>
        <p className="text-xs text-slate-300">{product.quantity}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <strong className="text-lg text-white">{formatPrice(product.price, copy.locale, copy.currency)}</strong>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          disabled={isOutOfStock}
          className={`glass-icon-button h-11 w-11 ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
          aria-label={`${copy.addToCart} ${product.name[language]}`}
        >
          <i className="bx bx-plus text-2xl" aria-hidden="true" />
        </button>
      </div>
    </GlassPanel>
  )
}
