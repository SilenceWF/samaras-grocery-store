
import { useParams } from 'react-router-dom'

const productDetails = {
  1: {
    name: 'Greek Yogurt',
    brand: 'Local Farms',
    price: '€3.29',
    originalPrice: '€4.29',
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=400&fit=crop',
    description: 'Creamy Greek yogurt made from fresh milk. High in protein and perfect for breakfast or snacks.',
    details: [
      '500g package',
      'High protein content',
      'No artificial preservatives',
      'Made from local milk'
    ],
    nutrition: {
      calories: '120',
      protein: '10g',
      fat: '3.5g',
      carbs: '5g'
    }
  },
  2: {
    name: 'Arabica Coffee',
    brand: 'Premium Blend',
    price: '€12.99',
    originalPrice: '€15.99',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop',
    description: 'Premium Arabica coffee beans, roasted to perfection for a rich and smooth flavor profile.',
    details: [
      '250g package',
      '100% Arabica beans',
      'Medium roast',
      'Freshly roasted'
    ],
    nutrition: {
      calories: '5',
      protein: '0g',
      fat: '0g',
      carbs: '1g'
    }
  }
}

export default function Product() {
  const { productId } = useParams()
  const product = productDetails[productId]

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full max-w-md rounded-2xl object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                {product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">Product Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <i className="bx bx-check text-green-600" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">Nutrition (per serving)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Calories</span>
                <span className="font-semibold">{product.nutrition.calories}</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span className="font-semibold">{product.nutrition.protein}</span>
              </div>
              <div className="flex justify-between">
                <span>Fat</span>
                <span className="font-semibold">{product.nutrition.fat}</span>
              </div>
              <div className="flex justify-between">
                <span>Carbs</span>
                <span className="font-semibold">{product.nutrition.carbs}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
              Add to Cart
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
              <i className="bx bx-heart text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}