import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/layout/SiteHeader'
import MobileNav from '../components/layout/MobileNav'
import CartDrawer from '../components/cart/CartDrawer'
import { useAppStore } from '../store/AppStore'
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout() {
  const { toastMessage } = useAppStore()

  return (
    <div className="app-bg min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <div className="relative z-10">
        <main className="mx-auto w-full max-w-[1320px] px-3 pb-32 pt-3 sm:px-4 sm:pb-32 lg:px-7">
          <SiteHeader />
          <Outlet />
          <footer className="px-4 pb-32 pt-3 text-center text-sm text-emerald-100/50 font-semibold sm:px-6 sm:pb-28 lg:px-8">
            <p>
              &copy; 2025 Οπωροπαντοπωλείο Σαμαράς. All rights reserved. Handcrafted with{' '}
              <span className="font-semibold text-emerald-300" aria-hidden="true">
                ♥
              </span>{' '}
              by{' '}
              <a
                href="https://lexmichaels.com"
                target="_blank"
                rel="noreferrer"
                className="font-black text-emerald-300 hover:text-emerald-500 italic"
              >
                Lex Michaels
              </a>{' '}
              in Greece.
            </p>
          </footer>
        </main>
      </div>

      <MobileNav />
      <CartDrawer />
      <Analytics />

      <div
        className={`fixed left-1/2 top-20 z-50 -translate-x-1/2 transition duration-300 ${
          toastMessage ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
        aria-live="polite"
      >
        <div className="rounded-full border border-emerald-300/30 bg-[#0f3327]/95 px-4 py-2 text-sm text-emerald-100 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          {toastMessage}
        </div>
      </div>
    </div>
  )
}
