import { useParams, Link } from 'react-router-dom'

const categoryProducts = {
  breakfast: [
    { id: 1, name: 'Greek Yogurt', price: '€3.29', image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=300&h=300&fit=crop' },
    { id: 2, name: 'Organic Cereal', price: '€7.49', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=300&fit=crop' },
    { id: 3, name: 'Fresh Eggs', price: '€6.92', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop' },
    { id: 4, name: 'Whole Wheat Bread', price: '€2.49', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop' }
  ],
  coffee: [
    { id: 5, name: 'Arabica Coffee', price: '€12.99', image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=300&fit=crop' },
    { id: 6, name: 'Espresso Blend', price: '€14.50', image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=300&fit=crop' },
    { id: 7, name: 'French Roast', price: '€11.99', image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&h=300&fit=crop' }
  ]
}

export default function Category() {
  const { categoryId } = useParams()
  const products = categoryProducts[categoryId] || []

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
          {categoryId}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Discover our selection of {categoryId} products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all hover:shadow-lg"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 dark:text-white">{product.price}</span>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white transition-all hover:bg-green-700">
                  <i className="bx bx-plus text-lg" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}