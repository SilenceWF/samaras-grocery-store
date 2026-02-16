import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GlassPanel from '../components/ui/GlassPanel'
import GlowButton from '../components/ui/GlowButton'
import { useAppStore } from '../store/AppStore'
import { formatPrice } from '../utils/format'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  paymentMethod: 'card',
}

function validate(values) {
  const nextErrors = {}

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Name is required.'
  }

  if (!values.email.includes('@')) {
    nextErrors.email = 'A valid email is required.'
  }

  if (!values.phone.trim() || values.phone.replace(/\D/g, '').length < 8) {
    nextErrors.phone = 'Enter a valid phone number.'
  }

  if (!values.address.trim()) {
    nextErrors.address = 'Delivery address is required.'
  }

  return nextErrors
}

export default function Checkout() {
  const { language, copy, cartItems, subtotal, shipping, total, clearCart } = useAppStore()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isPlaced, setPlaced] = useState(false)

  const isCartEmpty = useMemo(() => cartItems.length === 0, [cartItems])

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((previousValues) => ({ ...previousValues, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (isCartEmpty) {
      return
    }

    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setPlaced(true)
    clearCart()
  }

  return (
    <section className="grid gap-4 px-4 pb-24 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <GlassPanel className="p-5 sm:p-6">
        <h1 className="display-title text-3xl text-white">{copy.checkoutTitle}</h1>
        <p className="mt-2 text-sm text-slate-300">{copy.checkoutSubtitle}</p>

        {isPlaced ? (
          <div className="mt-6 rounded-3xl border border-emerald-300/25 bg-emerald-500/10 p-5">
            <p className="text-sm font-semibold text-emerald-200">{copy.orderPlaced}</p>
            <Link to="/" className="mt-4 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200">
              {copy.continueShopping}
            </Link>
          </div>
        ) : (
          <form className="mt-5 grid gap-3" onSubmit={onSubmit} noValidate>
            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                value={values.fullName}
                onChange={onChange}
                className="mt-1 h-12 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
                placeholder="Maria Papadopoulou"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-rose-300">{errors.fullName}</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  className="mt-1 h-12 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
                  placeholder="you@email.com"
                />
                {errors.email ? <p className="mt-1 text-xs text-rose-300">{errors.email}</p> : null}
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={onChange}
                  className="mt-1 h-12 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
                  placeholder="+30 69..."
                />
                {errors.phone ? <p className="mt-1 text-xs text-rose-300">{errors.phone}</p> : null}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="address">
                Delivery address
              </label>
              <input
                id="address"
                name="address"
                value={values.address}
                onChange={onChange}
                className="mt-1 h-12 w-full rounded-2xl border border-white/12 bg-white/6 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
                placeholder="Street, number, floor"
              />
              {errors.address ? <p className="mt-1 text-xs text-rose-300">{errors.address}</p> : null}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="paymentMethod">
                Payment
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={values.paymentMethod}
                onChange={onChange}
                className="mt-1 h-12 w-full rounded-2xl border border-white/12 bg-[#173329] px-4 text-sm text-white focus:border-emerald-300 focus:outline-none"
              >
                <option value="card">Card</option>
                <option value="cash">Cash on delivery</option>
                <option value="wallet">Digital wallet</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.14em] text-slate-300" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={values.notes}
                onChange={onChange}
                className="mt-1 min-h-28 w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
                placeholder="Doorbell, preferred delivery window..."
              />
            </div>

            <GlowButton type="submit" className="mt-2 w-full" icon="bx bx-check-shield">
              {copy.placeOrder}
            </GlowButton>
          </form>
        )}
      </GlassPanel>

      <GlassPanel className="h-fit p-5 sm:p-6">
        <h2 className="display-title text-2xl text-white">Order Summary</h2>

        <ul className="mt-4 space-y-2 text-sm text-slate-200">
          {cartItems.map((item) => (
            <li key={item.product.id} className="flex items-start justify-between gap-3">
              <span>
                {item.quantity}x {item.product.name[language]}
              </span>
              <span>{formatPrice(item.lineTotal, copy.locale, copy.currency)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-white/12 pt-4 text-sm text-slate-200">
          <div className="flex justify-between">
            <span>{copy.subtotal}</span>
            <span>{formatPrice(subtotal, copy.locale, copy.currency)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>{copy.shipping}</span>
            <span>{formatPrice(shipping, copy.locale, copy.currency)}</span>
          </div>
          <div className="mt-3 flex justify-between text-base font-semibold text-white">
            <span>{copy.total}</span>
            <span>{formatPrice(total, copy.locale, copy.currency)}</span>
          </div>
        </div>

        {isCartEmpty && !isPlaced ? (
          <p className="mt-4 text-xs text-rose-300">Your cart is empty. Add products before placing order.</p>
        ) : null}
      </GlassPanel>
    </section>
  )
}
