import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/catalog'
import { useAppStore } from '../store/AppStore'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/ui/ProductCard'
import QuickViewModal from '../components/home/QuickViewModal'
import GlassPanel from '../components/ui/GlassPanel'

const sortOptions = [
  { id: 'featured', label: { en: 'Featured', el: 'Προτεινόμενα' } },
  { id: 'price-low', label: { en: 'Price: Low to high', el: 'Τιμή: Χαμηλή προς υψηλή' } },
  { id: 'price-high', label: { en: 'Price: High to low', el: 'Τιμή: Υψηλή προς χαμηλή' } },
  { id: 'name', label: { en: 'Name', el: 'Όνομα' } },
]

export default function Category() {
  const { categoryId } = useParams()
  const { language, copy } = useAppStore()
  const [sortBy, setSortBy] = useState('featured')
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const category = categories.find((entry) => entry.id === categoryId)

  const sortedProducts = useMemo(() => {
    const baseProducts = getProductsByCategory(categoryId)

    switch (sortBy) {
      case 'price-low':
        return [...baseProducts].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...baseProducts].sort((a, b) => b.price - a.price)
      case 'name':
        return [...baseProducts].sort((a, b) => a.name[language].localeCompare(b.name[language]))
      default:
        return [...baseProducts].sort((a, b) => Number(b.featured) - Number(a.featured))
    }
  }, [categoryId, language, sortBy])

  if (!category) {
    return (
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <GlassPanel className="p-8 text-center">
          <h1 className="display-title text-3xl text-white">Category not found</h1>
          <p className="mt-2 text-sm text-slate-300">This category does not exist in our catalog.</p>
          <Link to="/" className="mt-5 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            {copy.continueShopping}
          </Link>
        </GlassPanel>
      </section>
    )
  }

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        title={`${category.label[language]} ${copy.categoryTitleSuffix}`}
        subtitle={`${sortedProducts.length} products available`}
      />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((entry) => (
          <Link
            key={entry.id}
            to={`/category/${entry.id}`}
            className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
              entry.id === categoryId
                ? 'bg-emerald-500 text-white'
                : 'border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {entry.label[language]}
          </Link>
        ))}
      </div>

      <GlassPanel className="mb-6 flex flex-wrap items-center justify-center gap-3 p-4">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-300">Sort</span>
        <div className="flex flex-wrap justify-center gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortBy(option.id)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                sortBy === option.id
                  ? 'bg-emerald-500 text-white'
                  : 'border border-white/10 bg-white/8 text-slate-200 hover:bg-white/15'
              }`}
            >
              {option.label[language]}
            </button>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(selectedProduct) => setQuickViewProduct(selectedProduct)}
          />
        ))}
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  )
}
