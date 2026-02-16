/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProductById, searchCatalog, uiDictionary } from '../data/catalog'
import { clampQuantity } from '../utils/format'

const STORAGE_KEYS = {
  language: 'samaras_language',
  cart: 'samaras_cart',
}

const AppStoreContext = createContext(null)

function readJSON(storageKey, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) {
      return fallbackValue
    }

    return JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

export function AppStoreProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const storedLanguage = readJSON(STORAGE_KEYS.language, null)
    if (storedLanguage === 'en' || storedLanguage === 'el') {
      return storedLanguage
    }
    return 'en'
  })

  const [cart, setCart] = useState(() => readJSON(STORAGE_KEYS.cart, {}))
  const [isCartOpen, setCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, JSON.stringify(language))
  }, [language])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeout = setTimeout(() => setToastMessage(''), 2200)
    return () => clearTimeout(timeout)
  }, [toastMessage])

  const copy = uiDictionary[language]

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([productId, quantity]) => {
        const product = getProductById(productId)

        if (!product) {
          return null
        }

        const safeQuantity = clampQuantity(quantity)
        return {
          product,
          quantity: safeQuantity,
          lineTotal: safeQuantity * product.price,
        }
      })
      .filter(Boolean)
  }, [cart])

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.lineTotal, 0)
  }, [cartItems])

  const shipping = subtotal >= 35 || subtotal === 0 ? 0 : 3.9
  const total = subtotal + shipping

  const searchResults = useMemo(() => {
    return searchCatalog(searchTerm).slice(0, 6)
  }, [searchTerm])

  const addToCart = (productId, quantity = 1) => {
    setCart((previousCart) => {
      const currentQuantity = Number(previousCart[productId] || 0)
      const nextQuantity = clampQuantity(currentQuantity + Number(quantity))
      return {
        ...previousCart,
        [productId]: nextQuantity,
      }
    })

    setToastMessage(copy.inCart)
  }

  const removeFromCart = (productId) => {
    setCart((previousCart) => {
      const nextCart = { ...previousCart }
      delete nextCart[productId]
      return nextCart
    })
  }

  const updateCartItem = (productId, quantity) => {
    const safeQuantity = clampQuantity(quantity)

    if (safeQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((previousCart) => ({
      ...previousCart,
      [productId]: safeQuantity,
    }))
  }

  const clearCart = () => setCart({})

  const toggleLanguage = () => {
    setLanguage((previousLanguage) => (previousLanguage === 'en' ? 'el' : 'en'))
  }

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    copy,
    cart,
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    searchTerm,
    setSearchTerm,
    searchResults,
    toastMessage,
    setToastMessage,
  }

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const context = useContext(AppStoreContext)

  if (!context) {
    throw new Error('useAppStore must be used inside AppStoreProvider')
  }

  return context
}
