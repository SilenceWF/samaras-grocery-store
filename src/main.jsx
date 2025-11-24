import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import RootLayout from './layouts/RootLayout'
import Home from './routes/Home'
import Category from './routes/Category'
import Product from './routes/Product'
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
        path: '/market',
        element: <ComingSoon
          eyebrow="Market"
          title="Online ordering with hyperlocal delivery is almost ready"
          description="We are putting the finishing touches on curated produce boxes, pantry bundles, and a seamless market experience."
          badge="Launching soon"
        />,
      },
      {
        path: '/stories',
        element: <ComingSoon
          eyebrow="Stories"
          title="Farm stories & seasonal rituals return shortly"
          description="Discover the growers, artisans, and recipes that shape Samaras Grocery. Subscribe below to get a heads up once it launches."
          badge="New"
        />,
      },
      {
        path: '/contact',
        element: <ComingSoon
          eyebrow="Επικοινωνία"
          title="Let's talk fresh produce"
          description="Prefer speaking to our team? Drop us a note and we will get back within 24h, or call 231 408 1267."
          badge="Always-on support"
        />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)