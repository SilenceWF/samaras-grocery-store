import { Link } from 'react-router-dom'
import GlassPanel from '../components/ui/GlassPanel'
import GlowButton from '../components/ui/GlowButton'
import { useAppStore } from '../store/AppStore'
import { formatPrice } from '../utils/format'

export default function Cart() {
  const {
    copy,
    language,
    cartItems,
    subtotal,
    shipping,
    total,
    updateCartItem,
    removeFromCart,
    clearCart,
  } = useAppStore()

  return (
    <section className="grid gap-4 px-4 pb-24 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
      <GlassPanel className="p-5 sm:p-6">
        <h1 className="display-title text-3xl text-white">{copy.cartTitle}</h1>

        {cartItems.length ? (
          <ul className="mt-5 space-y-3">
            {cartItems.map((item) => (
              <li key={item.product.id} className="rounded-3xl border border-white/10 bg-white/6 p-3 sm:p-4">
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name[language]}
                    className="h-18 w-18 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.product.name[language]}</p>
                    <p className="text-xs text-slate-300">{item.product.quantity}</p>
                    <p className="mt-1 text-sm text-emerald-300">
                      {formatPrice(item.product.price, copy.locale, copy.currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="glass-icon-button h-8 w-8"
                      onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                    >
                      <i className="bx bx-minus" aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center text-sm text-white">{item.quantity}</span>
                    <button
                      type="button"
                      className="glass-icon-button h-8 w-8"
                      onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                    >
                      <i className="bx bx-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-200 transition hover:text-rose-100"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/6 p-8 text-center">
            <p className="text-sm text-slate-300">{copy.emptyCart}</p>
            <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200">
              {copy.continueShopping}
            </Link>
          </div>
        )}
      </GlassPanel>

      <GlassPanel className="h-fit p-5 sm:p-6">
        <h2 className="display-title text-2xl text-white">{copy.checkout}</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-200">
          <li className="flex justify-between">
            <span>{copy.subtotal}</span>
            <span>{formatPrice(subtotal, copy.locale, copy.currency)}</span>
          </li>
          <li className="flex justify-between">
            <span>{copy.shipping}</span>
            <span>{formatPrice(shipping, copy.locale, copy.currency)}</span>
          </li>
          <li className="mt-3 flex justify-between text-base font-semibold text-white">
            <span>{copy.total}</span>
            <span>{formatPrice(total, copy.locale, copy.currency)}</span>
          </li>
        </ul>

        <p className="mt-3 text-xs text-emerald-300">{copy.freeDelivery}</p>

        <div className="mt-5 space-y-2">
          <Link to="/checkout" className="block">
            <GlowButton className="w-full" icon="bx bx-credit-card-front">
              {copy.checkout}
            </GlowButton>
          </Link>
          <button type="button" className="glass-button w-full rounded-full px-4 py-3 text-sm" onClick={clearCart}>
            Clear cart
          </button>
        </div>
      </GlassPanel>
    </section>
  )
}
