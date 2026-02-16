import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById, getProductsByCategory } from '../data/catalog'
import { useAppStore } from '../store/AppStore'
import GlassPanel from '../components/ui/GlassPanel'
import GlowButton from '../components/ui/GlowButton'
import ProductCard from '../components/ui/ProductCard'
import { formatPrice } from '../utils/format'

export default function Product() {
  const { productId } = useParams()
  const { language, copy, addToCart } = useAppStore()
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(productId)

  const relatedProducts = useMemo(() => {
    if (!product) {
      return []
    }

    return getProductsByCategory(product.category)
      .filter((entry) => entry.id !== product.id)
      .slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <GlassPanel className="p-8 text-center">
          <h1 className="display-title text-3xl text-white">Product not found</h1>
          <p className="mt-2 text-sm text-slate-300">The product you requested is no longer available.</p>
          <Link to="/" className="mt-5 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            {copy.continueShopping}
          </Link>
        </GlassPanel>
      </section>
    )
  }

  return (
    <section className="space-y-7 px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <GlassPanel className="overflow-hidden p-3 sm:p-4">
          <img
            src={product.image}
            alt={product.name[language]}
            className="h-full max-h-[520px] w-full rounded-3xl object-cover"
          />
        </GlassPanel>

        <GlassPanel className="flex flex-col p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{product.category}</p>
          <h1 className="display-title mt-2 text-4xl text-white">{product.name[language]}</h1>
          <p className="mt-3 text-sm text-slate-200">{product.description[language]}</p>

          <p className="mt-5 text-3xl font-semibold text-emerald-300">
            {formatPrice(product.price, copy.locale, copy.currency)}
          </p>

          <div className="mt-4 rounded-3xl border border-white/12 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{copy.productDetails}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>Size: {product.quantity}</li>
              <li>In stock: {product.inStock ? 'Yes' : 'No'}</li>
              <li>Tags: {product.tags.join(', ')}</li>
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/12 bg-white/5 p-1">
              <button
                type="button"
                className="glass-icon-button h-10 w-10"
                onClick={() => setQuantity((previousQuantity) => Math.max(1, previousQuantity - 1))}
                aria-label="Decrease quantity"
                disabled={!product.inStock}
              >
                <i className="bx bx-minus" aria-hidden="true" />
              </button>
              <span className="w-9 text-center text-sm font-semibold text-white">{quantity}</span>
              <button
                type="button"
                className="glass-icon-button h-10 w-10"
                onClick={() => setQuantity((previousQuantity) => previousQuantity + 1)}
                aria-label="Increase quantity"
                disabled={!product.inStock}
              >
                <i className="bx bx-plus" aria-hidden="true" />
              </button>
            </div>

            <GlowButton
              icon="bx bx-cart-add"
              onClick={() => addToCart(product.id, quantity)}
              disabled={!product.inStock}
              className={product.inStock ? '' : 'cursor-not-allowed opacity-50'}
            >
              {product.inStock ? copy.addToCart : language === 'el' ? 'Εκτός αποθέματος' : 'Out of stock'}
            </GlowButton>
          </div>
        </GlassPanel>
      </div>

      <div>
        <h2 className="display-title mb-4 text-2xl text-white">{copy.relatedProducts}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </section>
  )
}
