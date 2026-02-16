import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../ui/GlassPanel'
import GlowButton from '../ui/GlowButton'
import { useAppStore } from '../../store/AppStore'
import { formatPrice } from '../../utils/format'

export default function QuickViewModal({ product, onClose }) {
  const { language, copy, addToCart } = useAppStore()

  useEffect(() => {
    if (!product) {
      return undefined
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onEscape)

    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [onClose, product])

  if (!product) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/65"
        onClick={onClose}
        aria-label="Close quick view"
      />

      <div className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-3xl -translate-y-1/2">
        <GlassPanel className="overflow-hidden p-3 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
            <img
              src={product.image}
              alt={product.name[language]}
              className="h-56 w-full rounded-3xl object-cover sm:h-full"
            />

            <div className="flex flex-col gap-4 p-1 sm:p-2">
              <div>
                <h3 className="display-title text-2xl text-white">{product.name[language]}</h3>
                <p className="mt-1 text-sm text-slate-300">{product.description[language]}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{copy.productDetails}</p>
                <div className="mt-3 space-y-1 text-sm text-slate-200">
                  <p>Size: {product.quantity}</p>
                  <p>Category: {product.category}</p>
                  <p>Status: {product.inStock ? 'In stock' : 'Out of stock'}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <p className="text-2xl font-semibold text-emerald-300">
                  {formatPrice(product.price, copy.locale, copy.currency)}
                </p>
                <div className="flex gap-2">
                  <GlowButton
                    className={`flex-1 ${product.inStock ? '' : 'cursor-not-allowed opacity-50'}`}
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? copy.addToCart : language === 'el' ? 'Εκτός αποθέματος' : 'Out of stock'}
                  </GlowButton>
                  <Link to={`/product/${product.id}`} className="flex-1" onClick={onClose}>
                    <GlowButton className="w-full" variant="secondary">
                      {copy.quickView}
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </>
  )
}
