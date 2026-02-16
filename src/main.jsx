import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'
import './index.css'
import { AppStoreProvider } from './store/AppStore'
import RootLayout from './layouts/RootLayout'
import Home from './routes/Home'
import Category from './routes/Category'
import Product from './routes/Product'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
import ComingSoon from './routes/ComingSoon'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/category/:categoryId',
        element: <Category />,
      },
      {
        path: '/product/:productId',
        element: <Product />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/market',
        element: (
          <ComingSoon
            eyebrow="Market"
            title="Hyperlocal delivery is launching"
            description="We are finalizing curated baskets, same-day slots, and smart reorder flows."
            badge="Launching soon"
          />
        ),
      },
      {
        path: '/stories',
        element: (
          <ComingSoon
            eyebrow="Stories"
            title="Recipe stories are on the way"
            description="Discover seasonal meal ideas and local producer stories made for Samaras shoppers."
            badge="Editorial preview"
          />
        ),
      },
      {
        path: '/contact',
        element: (
          <ComingSoon
            eyebrow="Contact"
            title="Customer desk is available Monday to Saturday"
            description="For immediate support call +30 231 408 1267. Store delivery hours: 08:00 - 21:00, Sunday closed."
            badge="Always available"
          />
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStoreProvider>
      <RouterProvider router={router} />
    </AppStoreProvider>
  </StrictMode>,
)
