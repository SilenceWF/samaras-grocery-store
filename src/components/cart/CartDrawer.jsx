import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import GlassPanel from '../ui/GlassPanel'
import GlowButton from '../ui/GlowButton'
import { useAppStore } from '../../store/AppStore'
import { formatPrice } from '../../utils/format'

export default function CartDrawer() {
  const {
    copy,
    language,
    cartItems,
    subtotal,
    shipping,
    total,
    updateCartItem,
    removeFromCart,
    isCartOpen,
    closeCart,
  } = useAppStore()

  useEffect(() => {
    if (!isCartOpen) {
      return undefined
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        closeCart()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEscape)
    }
  }, [closeCart, isCartOpen])

  return (
    <>
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md transform flex-col bg-[#10231c]/96 p-4 shadow-2xl transition duration-500 sm:p-6 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="display-title text-2xl text-white">{copy.cartTitle}</h2>
          <button
            type="button"
            onClick={closeCart}
            className="glass-icon-button"
            aria-label="Close cart"
          >
            <i className="bx bx-x text-xl" aria-hidden="true" />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto pr-1">
          {cartItems.length ? (
            cartItems.map((item) => (
              <GlassPanel key={item.product.id} className="p-3">
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name[language]}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-white">{item.product.name[language]}</p>
                    <p className="text-xs text-slate-300">{item.product.quantity}</p>
                    <p className="mt-1 text-sm font-semibold text-emerald-300">
                      {formatPrice(item.lineTotal, copy.locale, copy.currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="glass-icon-button h-8 w-8"
                      onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <i className="bx bx-minus text-lg" aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
                    <button
                      type="button"
                      className="glass-icon-button h-8 w-8"
                      onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <i className="bx bx-plus text-lg" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="ml-1 rounded-full p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove product"
                    >
                      <i className="bx bx-trash text-base" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </GlassPanel>
            ))
          ) : (
            <GlassPanel className="p-5 text-center">
              <i className="bx bx-shopping-bag text-4xl text-emerald-300" aria-hidden="true" />
              <p className="mt-3 text-sm text-slate-200">{copy.emptyCart}</p>
            </GlassPanel>
          )}
        </div>

        <GlassPanel className="mt-4 p-4">
          <ul className="space-y-2 text-sm text-slate-200">
            <li className="flex items-center justify-between">
              <span>{copy.subtotal}</span>
              <span>{formatPrice(subtotal, copy.locale, copy.currency)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>{copy.shipping}</span>
              <span>{formatPrice(shipping, copy.locale, copy.currency)}</span>
            </li>
            <li className="mt-2 flex items-center justify-between text-base font-semibold text-white">
              <span>{copy.total}</span>
              <span>{formatPrice(total, copy.locale, copy.currency)}</span>
            </li>
          </ul>
          <p className="mt-2 text-xs text-emerald-300">{copy.freeDelivery}</p>
        </GlassPanel>

        <div className="mt-4 flex gap-3">
          <Link to="/cart" onClick={closeCart} className="flex-1">
            <GlowButton variant="secondary" className="w-full">
              {copy.continueShopping}
            </GlowButton>
          </Link>
          <Link to="/checkout" onClick={closeCart} className="flex-1">
            <GlowButton className="w-full">{copy.checkout}</GlowButton>
          </Link>
        </div>
      </aside>
    </>
  )
}
