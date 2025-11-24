import { useLanguage } from '../context/LanguageContext'
import { useRef, useState } from 'react'

// Product data organized by categories
const productSections = {
  flashSale: [
    {
      id: 1,
      name: 'Mushroom Sauce',
      brand: 'Healthroom',
      price: '€8.92',
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=300&fit=crop',
      tag: 'Flash Sale'
    },
    {
      id: 2,
      name: 'Ghetto Gastro',
      price: '€20.72',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
      tag: 'Flash Sale'
    }
  ],
  popular: [
    {
      id: 3,
      name: 'Seasoned Avocado',
      weight: '0.3 Kg',
      price: '€4.29',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop',
      tag: 'Popular'
    },
    {
      id: 4,
      name: '6 Pieces Eggs',
      quantity: '6 Pieces',
      price: '€6.92',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop',
      tag: 'Popular'
    },
    {
      id: 5,
      name: 'Premium Juice',
      price: '€5.99',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop',
      tag: 'Popular'
    }
  ],
  newArrivals: [
    {
      id: 6,
      name: 'Hot Vegetable Plate',
      price: '€15.07',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
      tag: 'New'
    },
    {
      id: 7,
      name: 'Regular Tomatoes',
      price: '€10.67',
      image: 'https://images.unsplash.com/photo-1546470427-e212d0d4b0ce?w=300&h=300&fit=crop',
      tag: 'New'
    },
    {
      id: 8,
      name: 'Ghetto Gastro Pancake',
      price: '€10.69',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop',
      tag: 'New'
    }
  ],
  snacks: [
    {
      id: 9,
      name: 'Special Sauce',
      price: '€12.50',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop'
    },
    {
      id: 10,
      name: 'Cookie Pack',
      price: '€8.99',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop'
    }
  ],
  breakfast: [
    {
      id: 11,
      name: 'Organic Cereal',
      price: '€7.49',
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Greek Yogurt',
      price: '€3.29',
      image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=300&fit=crop'
    }
  ],
  canned: [
    {
      id: 13,
      name: 'Beans Can',
      price: '€2.99',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop'
    },
    {
      id: 14,
      name: 'Tuna Can',
      price: '€4.50',
      image: 'https://images.unsplash.com/photo-1579205506040-1e5ce6ea3650?w=300&h=300&fit=crop'
    }
  ],
  coffee: [
    {
      id: 15,
      name: 'Arabica Coffee',
      price: '€12.99',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=300&fit=crop'
    },
    {
      id: 16,
      name: 'Espresso Blend',
      price: '€14.50',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=300&fit=crop'
    }
  ]
}

const promoSlides = [
  {
    id: 1,
    title: 'Weekend Special',
    subtitle: 'Fresh Vegetables',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=300&fit=crop',
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    title: 'Morning Boost',
    subtitle: 'Breakfast Combo',
    discount: 'Buy 1 Get 1',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=300&fit=crop',
    buttonText: 'Order Now'
  },
  {
    id: 3,
    title: 'Organic Week',
    subtitle: 'Fresh Fruits',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=300&fit=crop',
    buttonText: 'Discover'
  }
]

export default function Home() {
  const { t } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="space-y-8 pb-24 pt-4">
      <PromoSlider />
      <FlashSaleSection />
      <PopularItemsSection />
      <NewArrivalsSection />
      <CategorySection title="Snacks" products={productSections.snacks} />
      <CategorySection title="Breakfast" products={productSections.breakfast} />
      <CategorySection title="Canned" products={productSections.canned} />
      <CategorySection title="Coffee" products={productSections.coffee} />
    </div>
  )
}

function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="relative h-64 rounded-2xl overflow-hidden">
        {promoSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white max-w-md">
              <span className="inline-block px-3 py-1 bg-green-600 rounded-full text-sm font-semibold mb-2">
                {slide.discount}
              </span>
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg mb-4">{slide.subtitle}</p>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
        >
          <i className="bx bx-chevron-left text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
        >
          <i className="bx bx-chevron-right text-2xl" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {promoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlashSaleSection() {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <SectionWrapper 
      title="Flash Sale" 
      subtitle="Limited time offers"
      onScrollLeft={() => scroll(-1)}
      onScrollRight={() => scroll(1)}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {productSections.flashSale.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function PopularItemsSection() {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <SectionWrapper 
      title="Popular Items" 
      subtitle="Most loved by customers"
      onScrollLeft={() => scroll(-1)}
      onScrollRight={() => scroll(1)}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {productSections.popular.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function NewArrivalsSection() {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <SectionWrapper 
      title="New Arrivals" 
      subtitle="Fresh from the market"
      onScrollLeft={() => scroll(-1)}
      onScrollRight={() => scroll(1)}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {productSections.newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function CategorySection({ title, products }) {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <SectionWrapper 
      title={title} 
      onScrollLeft={() => scroll(-1)}
      onScrollRight={() => scroll(1)}
    >
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function SectionWrapper({ title, subtitle, children, onScrollLeft, onScrollRight }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onScrollLeft}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          >
            <i className="bx bx-chevron-left text-xl" />
          </button>
          <button 
            onClick={onScrollRight}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          >
            <i className="bx bx-chevron-right text-xl" />
          </button>
        </div>
      </div>
      {children}
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <div className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        {product.tag && (
          <span className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
            product.tag === 'Flash Sale' 
              ? 'bg-red-500 text-white'
              : product.tag === 'Popular'
              ? 'bg-orange-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {product.tag}
          </span>
        )}
        <button className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-gray-600 transition-all hover:bg-white hover:text-green-600 dark:bg-gray-800/90 dark:text-gray-300">
          <i className="bx bx-heart text-lg" />
        </button>
      </div>
      
      <div className="p-3">
        {product.brand && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
        )}
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{product.name}</h3>
        
        {product.weight && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.weight}</p>
        )}
        {product.quantity && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.quantity}</p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900 dark:text-white">{product.price}</span>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white transition-all hover:bg-green-700">
            <i className="bx bx-plus text-lg" />
          </button>
        </div>
      </div>
    </div>
  )
}