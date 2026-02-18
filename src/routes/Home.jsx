import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  appDownloadLinks,
  categories,
  getProductsByTab,
  googleBranchOverview,
  googleReviewHighlights,
  googleVisitingTips,
  loyaltyHighlights,
  productTabs,
  promoCards,
  recipes,
  storeGalleryPhotos,
  STORE_LOCATION,
  weeklyDeals,
  whyChooseItems,
} from '../data/catalog'
import { useAppStore } from '../store/AppStore'
import GlassPanel from '../components/ui/GlassPanel'
import GlowButton from '../components/ui/GlowButton'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import QuickViewModal from '../components/home/QuickViewModal'

export default function Home() {
  const { language, copy } = useAppStore()
  const [activeTab, setActiveTab] = useState(productTabs[0].id)
  const [isTabLoading, setIsTabLoading] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const tabSwitchTimeoutRef = useRef(null)

  const tabProducts = useMemo(() => getProductsByTab(activeTab), [activeTab])

  useEffect(() => {
    return () => {
      if (tabSwitchTimeoutRef.current) {
        clearTimeout(tabSwitchTimeoutRef.current)
      }
    }
  }, [])

  const onNewsletterSubmit = (event) => {
    event.preventDefault()

    if (!email.includes('@')) {
      setNewsletterStatus('error')
      return
    }

    setNewsletterStatus('success')
    setEmail('')
  }

  const onTabChange = (nextTab) => {
    if (nextTab === activeTab) {
      return
    }

    if (tabSwitchTimeoutRef.current) {
      clearTimeout(tabSwitchTimeoutRef.current)
    }

    setIsTabLoading(true)
    tabSwitchTimeoutRef.current = setTimeout(() => {
      setActiveTab(nextTab)
      setIsTabLoading(false)
    }, 250)
  }

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] p-2">
        <div className="absolute inset-0">
          <div className="hero-gradient absolute inset-0" />
          <div className="hero-noise absolute inset-0" />
        </div>

        <div className="relative z-10">
          <GlassPanel className="hero-overlay overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] text-emerald-200">
                  <i className="bx bxs-map text-sm" aria-hidden="true" />
                  {STORE_LOCATION.address}
                </p>
                <h1 className="display-title text-balance text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  {copy.greeting}
                </h1>
                <p className="mt-3 max-w-xl text-pretty text-base text-slate-200 sm:text-lg">{copy.heroSubtitle}</p>

                {/* <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/category/fruits">
                    <GlowButton icon="bx bx-right-arrow-alt">{copy.heroCta}</GlowButton>
                  </Link>
                  <a href="#weekly-deals">
                    <GlowButton variant="secondary" icon="bx bx-bolt-circle">
                      {copy.heroSecondaryCta}
                    </GlowButton>
                  </a>
                </div> */}
              </div>

              <div className="relative min-h-[310px] overflow-hidden rounded-[1.55rem] border border-white/12">
                <img
                  src={storeGalleryPhotos[0].image}
                  alt={storeGalleryPhotos[0].alt[language]}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/35 to-transparent" />
                <GlassPanel className="absolute left-1/2 top-1/2 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-300">
                        {language === 'el' ? 'Ωράριο Καταστήματος' : 'Store Hours'}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">08:00 - 21:00</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-300">
                        {language === 'el' ? 'Κυριακή' : 'Sunday'}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">{language === 'el' ? 'Κλειστό' : 'Closed'}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-200" />
                      </div>
                      <p className="mt-2 text-xs text-slate-300">
                        {language === 'el'
                          ? '78% των παραλαβών της ημέρας έχουν ήδη τοποθετηθεί.'
                          : "78% of today's arrivals are already on shelves."}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {promoCards.map((card) => (
            <article
              key={card.id}
              className="group relative min-h-[230px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/25"
            >
              <img
                src={card.image}
                alt={card.title[language]}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${card.tone}`} />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 p-5">
                <span className="glass-pill inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  {card.label}
                </span>
                <h3 className="mt-4 max-w-[18ch] text-balance text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                  {card.title[language]}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={language === 'el' ? 'Φωτογραφίες Καταστήματος' : 'Store Photos'}
          subtitle={
            language === 'el'
              ? 'Μια ματιά στο χώρο και στη φρεσκάδα του Σαμαρά.'
              : 'A quick look inside Samaras and the day-to-day fresh stock.'
          }
        />
        <div className="grid auto-rows-[230px] gap-3 md:grid-cols-4 md:auto-rows-[180px]">
          {storeGalleryPhotos.map((photo) => (
            <article
              key={photo.id}
              className={`group relative overflow-hidden rounded-[1.35rem] border border-white/10 ${photo.className}`}
            >
              <img
                src={photo.image}
                alt={photo.alt[language]}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={copy.sectionCategories}
          action={
            <Link to="/category/fruits" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">
              {copy.sectionViewAll}
            </Link>
          }
        />

        <div className="scrollbar-thin -mx-1 flex snap-x gap-2.5 overflow-y-visible overflow-x-auto px-1 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visiable">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="glass-panel no-shadow group flex h-[110px] w-[110px] shrink-0 snap-start flex-col items-center justify-center rounded-[1.95rem] p-1 text-center transition hover:-translate-y-1"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-3xl transition">
                <span role="img" aria-hidden="true">
                  {category.emoji}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] font-black leading-tight tracking-[0.05em] text-white/50 mx-4">
                {category.label[language]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[1.7rem] p-4 sm:p-5">
          <div className="scrollbar-thin mb-5 flex items-center justify-start gap-2 overflow-x-auto p-4 sm:justify-center">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-[0_0_18px_rgba(0,200,83,0.25)]'
                    : 'bg-white/7 text-slate-200 hover:bg-white/12'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>

          {isTabLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card h-64 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tabProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(selectedProduct) => setQuickViewProduct(selectedProduct)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="weekly-deals" className="px-4 sm:px-6 lg:px-8">
        <GlassPanel className="overflow-hidden p-5 sm:p-7 border-none">
          <SectionHeading
            title={copy.weeklyDealsTitle}
            subtitle={copy.weeklyDealsSubtitle}
            className="mb-4"
            titleClassName="text-3xl sm:text-4xl"
          />

          <div className="grid gap-3 md:grid-cols-2">
            {weeklyDeals.map((deal) => (
              <div key={deal.id} className="soft-pop-card rounded-[1.2rem] p-4 transition hover:-translate-y-0.5">
                <p className="glass-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200">
                  {deal.discount}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{deal.title[language]}</h3>
                <p className="mt-1 text-sm text-slate-300">{deal.expiresIn[language]}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionWhyChoose} />
        <div className="grid gap-3 md:grid-cols-3">
          {whyChooseItems.map((item) => (
            <GlassPanel
              key={item.id}
              className="group flex min-h-[170px] flex-col items-center justify-center p-5 text-center transition border-none"
            >
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-2xl text-emerald-300 transition group-hover:scale-105">
                <i className={`bx ${item.icon}`} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-white">{item.title[language]}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description[language]}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionTestimonials} />
        <GlassPanel className="relative overflow-hidden p-5 sm:p-7 border-none">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                {language === 'el' ? 'Google Reviews' : 'Google Reviews'}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{googleBranchOverview.name}</h3>
              <p className="text-sm text-slate-300">{googleBranchOverview.nameEn}</p>
              <p className="mt-3 text-sm font-semibold text-white">
                {'★★★★★'} {googleBranchOverview.rating} ({googleBranchOverview.reviewCount}{' '}
                {language === 'el' ? 'κριτικές' : 'reviews'})
              </p>
              <p className="mt-3 text-sm text-slate-200">{googleBranchOverview.address}</p>
              <p className="mt-1 text-sm text-slate-300">{googleBranchOverview.phone}</p>
              <p className="mt-1 text-sm text-slate-300">{googleBranchOverview.hours[language]}</p>
              <p className="mt-3 inline-flex rounded-full border border-emerald-300/25 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                {googleBranchOverview.awarded[language]}
              </p>
            </article>

            <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">
              {googleReviewHighlights.map((highlight) => (
                <article
                  key={highlight.id}
                  className={`rounded-3xl border border-white/10 bg-white/5 p-4 ${highlight.id === 'service' ? 'sm:col-span-2' : ''}`}
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-emerald-300">{highlight.title[language]}</p>
                  <p className="mt-2 text-sm text-slate-200">{highlight.text[language]}</p>
                </article>
              ))}

              <article className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">
                  {language === 'el' ? 'Ώρες αιχμής' : 'Peak times'}
                </p>
                <p className="mt-2 text-sm text-slate-200">{googleVisitingTips.peak[language]}</p>
              </article>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-emerald-300">
                  {language === 'el' ? 'Πιο ήσυχες ώρες' : 'Quieter times'}
                </p>
                <p className="mt-2 text-sm text-slate-200">{googleVisitingTips.quiet[language]}</p>
              </article>
            </div>
          </div>
        </GlassPanel>
      </section>

      {/* <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionRecipes} />
        <div className="grid gap-3 md:grid-cols-3">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="group relative overflow-hidden rounded-[1.6rem] border border-white/10">
              <img
                src={recipe.image}
                alt={recipe.title[language]}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="glass-pill inline-flex rounded-full px-2 py-1 text-xs uppercase tracking-[0.14em] text-emerald-200">
                  {recipe.duration}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">{recipe.title[language]}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionLoyalty} />
        <GlassPanel className="loyalty-pop p-5 sm:p-7 border-none">
          <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Samaras Club</p>
              <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Unlock premium perks.</h3>
              <p className="mt-3 text-sm text-slate-300">Cashback, VIP offers, and priority delivery windows for members.</p>
              <GlowButton className="mt-5" icon="bx bx-diamond">
                {copy.loyaltyButton}
              </GlowButton>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {loyaltyHighlights.map((highlight) => (
                <div key={highlight.id} className="soft-pop-card rounded-3xl border p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-xl text-emerald-200">
                    <i className={`bx ${highlight.icon}`} aria-hidden="true" />
                  </span>
                  <h4 className="mt-3 text-base font-semibold text-white">{highlight.title[language]}</h4>
                  <p className="mt-2 text-sm text-slate-300">{highlight.description[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </section> */}

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionNewsletter} />
        <GlassPanel className="p-5 sm:p-7 border-none">
          <h3 className="display-title text-3xl text-white">{copy.newsletterTitle}</h3>
          <p className="mt-2 max-w-xl text-sm text-slate-300">{copy.newsletterSubtitle}</p>

          <form className="mt-5 flex gap-3 sm:flex-row" onSubmit={onNewsletterSubmit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-full border border-white/14 bg-white/6 px-4 text-sm text-white placeholder:text-slate-300/70 focus:border-emerald-300 focus:outline-none"
              required
            />
            <GlowButton type="submit" className="h-12 px-7" icon="bx bx-paper-plane">
              {copy.newsletterButton}
            </GlowButton>
          </form>

          {newsletterStatus === 'success' ? (
            <p className="mt-3 text-sm text-emerald-300">Thanks, your email has been added.</p>
          ) : null}
          {newsletterStatus === 'error' ? (
            <p className="mt-3 text-sm text-rose-300">Please enter a valid email address.</p>
          ) : null}
        </GlassPanel>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionHours} />
        <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
          <GlassPanel className="p-5 border-none">
            <h3 className="display-title text-2xl text-white">{copy.mapTitle}</h3>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-200">
              <i className="bx bx-map text-base text-emerald-300" aria-hidden="true" />
              {STORE_LOCATION.address}
            </p>
            <ul className="hours-grid mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {copy.storeHours.map((entry) => (
                <li key={entry}>
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-slate-300">{entry.split(':')[0]}</span>
                  <span className="mt-0.5 block font-semibold text-white">{entry.split(':').slice(1).join(':').trim()}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2 text-sm text-slate-100">
              <p className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3 py-2">
                <i className="bx bx-phone mr-2 text-base text-emerald-300" aria-hidden="true" />
                {STORE_LOCATION.phone}
              </p>
              <p className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3 py-2">
                <i className="bx bx-envelope mr-2 text-base text-emerald-300" aria-hidden="true" />
                hello@samarasgrocery.gr
              </p>
            </div>
          </GlassPanel>

          <div className="overflow-hidden rounded-3xl border border-white/12">
            <iframe
              title="Samaras Grocery map"
              className="h-full min-h-[280px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                STORE_LOCATION.mapsQuery,
              )}&output=embed`}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <SectionHeading title={copy.sectionApp} />
        <GlassPanel className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6 border-none">
          <p className="max-w-xl text-sm text-slate-200">
            Install the Samaras app for instant reordering, live delivery tracking, and smart weekly reminders.
          </p>

          <div className="flex flex-wrap gap-2">
            {appDownloadLinks.map((link) => (
              <button key={link.id} type="button" className="glass-button rounded-full px-4 py-2 text-sm font-semibold">
                <i className={`bx ${link.icon} mr-2 text-lg`} aria-hidden="true" />
                {link.label}
              </button>
            ))}
          </div>
        </GlassPanel>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}
