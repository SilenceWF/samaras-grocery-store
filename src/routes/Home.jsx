import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { 
  Home, 
  LayoutGrid, 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Filter,
  BookOpen,
  Headset,
  Truck,
  Award,
  Clock,
  Star,
  Phone,
  Mail
} from 'lucide-react';

// --- Mock Data & Translations ---
const TRANSLATIONS = {
  en: {
    search: "Search products...",
    address: "2464 Royal Ln. Mesa",
    addressLabel: "Your address",
    viewAll: "View All",
    categories: "Categories",
    popular: "Popular Items",
    new: "New Arrivals",
    flash: "Flash Sale",
    addToCart: "Add",
    currency: "$",
    mealPlanTitle: "Meal Plan with Grocery Store",
    promoTitle: "Making the most of your grocery",
    welcome: "Welcome back, Friend!",
    welcomeSub: "Find the freshest goods for your family.",
    whyChoose: "Why Choose Samaras",
    delivery: "Fast Delivery in Evosmos",
    reviews: "Google Reviews",
    storeInfo: "Store Information",
    nav: { home: "Home", cats: "Categories", recipes: "Recipes", profile: "Profile", support: "Support" }
  },
  el: {
    search: "Αναζήτηση προϊόντων...",
    address: "Λεωφ. Βασιλίσσης Σοφίας 12",
    addressLabel: "Η διεύθυνσή σας",
    viewAll: "Προβολή όλων",
    categories: "Κατηγορίες",
    popular: "Δημοφιλή",
    new: "Νέες Αφίξεις",
    flash: "Προσφορές",
    addToCart: "Προσθήκη",
    currency: "€",
    mealPlanTitle: "Πλάνο Διατροφής",
    promoTitle: "Αξιοποιήστε τα ψώνια σας",
    welcome: "Καλωσήρθατε!",
    welcomeSub: "Βρείτε τα πιο φρέσκα προϊόντα.",
    whyChoose: "Γιατί να μας επιλέξετε",
    delivery: "Διανομή στον Εύοσμο",
    reviews: "Κριτικές Google",
    storeInfo: "Πληροφορίες Καταστήματος",
    nav: { home: "Αρχική", cats: "Κατηγορίες", recipes: "Συνταγές", profile: "Προφίλ", support: "Υποστήριξη" }
  }
};

const CATEGORIES = [
  { id: 1, name: { en: "Snacks", el: "Σνακ" }, color: "bg-orange-100 dark:bg-orange-900/30", icon: "🍿" },
  { id: 2, name: { en: "Breakfast", el: "Πρωινό" }, color: "bg-yellow-100 dark:bg-yellow-900/30", icon: "🥣" },
  { id: 3, name: { en: "Drinks", el: "Ποτά" }, color: "bg-blue-100 dark:bg-blue-900/30", icon: "🥤" },
  { id: 4, name: { en: "Coffee", el: "Καφές" }, color: "bg-amber-100 dark:bg-amber-900/30", icon: "☕" },
  { id: 5, name: { en: "Canned", el: "Κονσέρβες" }, color: "bg-rose-100 dark:bg-rose-900/30", icon: "🥫" },
  { id: 6, name: { en: "Fruits", el: "Φρούτα" }, color: "bg-red-100 dark:bg-red-900/30", icon: "🍎" },
  { id: 7, name: { en: "Sauce", el: "Σάλτσες" }, color: "bg-orange-100 dark:bg-orange-900/30", icon: "🍯" },
  { id: 8, name: { en: "Vegetables", el: "Λαχανικά" }, color: "bg-green-100 dark:bg-green-900/30", icon: "🥦" },
];

const PRODUCTS = [
  { id: 101, name: { en: "Mushroom Sauce", el: "Σάλτσα Μανιταριών" }, weight: "24oz", price: 8.92, image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=200", type: "popular" },
  { id: 102, name: { en: "Ghetto Gastro", el: "Ghetto Gastro" }, weight: "1 Kg", price: 20.72, image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200", type: "popular" },
  { id: 103, name: { en: "Mixed Nuts", el: "Μίξη Ξηρών Καρπών" }, weight: "24oz", price: 3.01, image: "https://images.unsplash.com/photo-1536591375315-19697892687a?auto=format&fit=crop&q=80&w=200", type: "popular" },
  { id: 104, name: { en: "Avocado", el: "Αβοκάντο" }, weight: "0.5 Kg", price: 4.29, image: "https://images.unsplash.com/photo-1523049673856-606ae93a9c9b?auto=format&fit=crop&q=80&w=200", type: "popular" },
  { id: 105, name: { en: "Fresh Eggs", el: "Φρέσκα Αυγά" }, weight: "6 Pieces", price: 6.92, image: "https://images.unsplash.com/photo-1587486913049-53fc88980fa1?auto=format&fit=crop&q=80&w=200", type: "new" },
  { id: 106, name: { en: "Premium Muffin", el: "Μάφιν Σοκολάτας" }, weight: "1 Piece", price: 2.50, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=200", type: "new" },
  { id: 107, name: { en: "Granola Pack", el: "Γκρανόλα" }, weight: "500g", price: 12.50, image: "https://images.unsplash.com/photo-1517093704936-47eb85b13c12?auto=format&fit=crop&q=80&w=200", type: "flash" },
];

const REVIEWS = [
  { id: 1, name: "Maria P.", rating: 5, text: { en: "Best local market! Always fresh.", el: "Το καλύτερο της γειτονιάς! Πάντα φρέσκα." } },
  { id: 2, name: "Nikos K.", rating: 5, text: { en: "Fast delivery and great prices.", el: "Γρήγορη διανομή και καλές τιμές." } },
  { id: 3, name: "Elena S.", rating: 4, text: { en: "Love the variety of bio products.", el: "Λατρεύω την ποικιλία στα βιολογικά." } },
];

// --- Contexts ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [cartCount, setCartCount] = useState(2);

  // --- Theme Logic CSS-Based ---
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'el' : 'en');

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t: TRANSLATIONS[lang], cartCount }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`relative group flex flex-col w-14 h-14 items-center justify-center p-4 rounded-full cursor-pointer transition-all duration-200 ${active ? 'text-green-600 bg-green-50/20 dark:bg-green-900/5' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-green-800/20'}`}>
    <Icon size={26} strokeWidth={active ? 2.5 : 2} />
    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-green-500 rounded-l-full" />}
  </div>
);

const MobileNavItem = ({ icon: Icon, label, active }) => (
  <div className={`flex flex-col items-center justify-center gap-1 p-2 cursor-pointer ${active ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
  </div>
);

const CategoryCard = ({ category, t }) => (
  <div className="flex flex-col items-center gap-2 min-w-[80px] snap-start cursor-pointer group">
    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-105 ${category.color}`}>
      {category.icon}
    </div>
    <span className="text-xs sm:text-sm font-medium text-secondary">{category.name[t === TRANSLATIONS.en ? 'en' : 'el']}</span>
  </div>
);

const ProductCard = ({ product, lang, t }) => (
  <div className="min-w-[160px] w-[160px] sm:min-w-[190px] sm:w-[190px] bg-surface rounded-3xl p-3 sm:p-4 shadow-sm border border-subtle flex flex-col snap-start relative group hover:shadow-md transition-all">
    <div className="h-32 sm:h-40 w-full rounded-2xl overflow-hidden mb-3 bg-surface relative">
      <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <h3 className="font-bold text-main text-sm sm:text-base truncate">{product.name[lang]}</h3>
    <p className="text-xs text-secondary mb-3">{product.weight}</p>
    
    <div className="mt-auto flex items-center justify-between">
      <span className="font-bold text-main text-base sm:text-lg">{t.currency}{product.price.toFixed(2)}</span>
      <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center btn-primary">
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  </div>
);

const SectionSlider = ({ title, items, type, lang, t }) => {
  const scrollRef = useRef(null);
  const filteredItems = items.filter(i => i.type === type);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-1 text-secondary hover:bg-green-600 cursor-pointer rounded-full hidden sm:block"><ChevronLeft size={20} /></button>
          <button onClick={() => scroll('right')} className="p-1 text-secondary hover:bg-green-600 cursor-pointer rounded-full hidden sm:block"><ChevronRight size={20} /></button>
          <span className="text-sm text-green-500 cursor-pointer font-medium sm:hidden">{t.viewAll}</span>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar px-1">
        {filteredItems.map(product => (
          <ProductCard key={product.id} product={product} lang={lang} t={t} />
        ))}
      </div>
    </div>
  );
};

// --- Main Layout Parts ---

const Header = () => {
  const { t, theme, toggleTheme, lang, toggleLang, cartCount } = useApp();
  
  return (
    <div className="sticky top-8 bg-color-surface backdrop-blur-md z-20 py-4 px-6 shadow-sm md:shadow-none rounded-full">
      <div className="flex flex-row md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Address */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="w-10 h-10 rounded-full gs-button flex items-center justify-center shadow-lg text-green-500">
             <MapPin size={20} />
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-secondary">{t.addressLabel}</p>
            <p className="text-sm font-bold text-primary truncate max-w-[150px] sm:max-w-none">{t.address}</p>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 w-auto md:max-w-xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={t.search}
              className="w-full h-12 pl-12 pr-2 md:pr-12 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/50 outline-none transition-all"
            />
            <div className="hidden gs-button md:block absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl cursor-pointer hover:bg-green-500 hover:text-white transition-colors text-gray-400 shadow-lg">
               <Filter size={16} />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 justify-end">
          <button onClick={toggleLang} className="w-10 h-10 rounded-full gs-button flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 hover:text-green-500 font-bold text-xs border border-gray-100 dark:border-gray-700">
             {lang === 'en' ? 'EL' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full gs-button flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 hover:text-green-500 border border-gray-100 dark:border-gray-700">
             {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div className="relative cursor-pointer">
            <div className="w-10 h-10 rounded-full gs-button flex items-center justify-center shadow-lg text-gray-700 dark:text-gray-300 hover:text-green-500 border border-gray-100 dark:border-gray-700">
              <ShoppingBag size={18} />
            </div>
            <span className="absolute -top-1 -right-1 bg-amber-500 text-amber-900 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WelcomeCard = ({ t }) => (
  <div className="bg-surface p-6 rounded-3xl shadow-sm my-8 flex items-center justify-between border border-subtle">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">{t.welcome}</h1>
      <p className="text-secondary">{t.welcomeSub}</p>
    </div>
    <div className="hidden sm:flex bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-10 h-10" />
    </div>
  </div>
);

const Banners = ({ t }) => (
  <div className="flex gap-4 overflow-x-auto snap-x hide-scrollbar mb-8">
    {/* Banner 1 */}
    <div className="min-w-[280px] sm:min-w-[320px] h-40 sm:h-48 rounded-3xl bg-lime-800 relative overflow-hidden snap-start flex-shrink-0 group cursor-pointer">
      <div className="absolute inset-0 p-6 flex flex-col justify-center z-10 max-w-[70%]">
        <span className="bg-white/20 w-fit px-2 py-1 rounded-lg text-xs text-white mb-2 backdrop-blur-sm">Feature</span>
        <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 uppercase">{t.mealPlanTitle}</h3>
      </div>
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300" className="absolute right-0 top-0 h-full w-2/3 object-cover mask-image-linear-gradient group-hover:scale-105 transition-transform duration-500" style={{maskImage: 'linear-gradient(to right, transparent, black)'}} alt="Meal Plan" />
    </div>
    
    {/* Banner 2 */}
    <div className="min-w-[280px] sm:min-w-[320px] h-40 sm:h-48 rounded-3xl bg-purple-800 relative overflow-hidden snap-start flex-shrink-0 group cursor-pointer">
      <div className="absolute inset-0 p-6 flex flex-col justify-center z-10 max-w-[60%]">
        <span className="bg-white/20 w-fit px-2 py-1 rounded-lg text-xs text-white mb-2 backdrop-blur-sm">Promo</span>
        <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 uppercase">{t.promoTitle}</h3>
      </div>
      <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300" className="absolute -right-4 top-0 h-full w-2/3 object-cover group-hover:scale-105 transition-transform duration-500" alt="Ice Cream" style={{maskImage: 'linear-gradient(to right, transparent, black)'}} alt="Meal Plan" />
    </div>

    {/* Banner 3 */}
    <div className="min-w-[280px] sm:min-w-[320px] h-40 sm:h-48 rounded-3xl bg-yellow-600 relative overflow-hidden snap-start flex-shrink-0 group cursor-pointer">
      <div className="absolute inset-0 p-6 flex flex-col justify-center z-10 max-w-[60%]">
        <span className="bg-white/20 w-fit px-2 py-1 rounded-lg text-xs text-white mb-2 backdrop-blur-sm">Promo</span>
        <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 uppercase">{t.promoTitle}</h3>
      </div>
      <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300" className="absolute -right-4 top-0 h-full w-2/3 object-cover group-hover:scale-105 transition-transform duration-500" alt="Ice Cream" style={{maskImage: 'linear-gradient(to right, transparent, black)'}} alt="Meal Plan" />
    </div>
    {/* Banner 4 */}
    <div className="min-w-[280px] sm:min-w-[320px] h-40 sm:h-48 rounded-3xl bg-teal-800 relative overflow-hidden snap-start flex-shrink-0 group cursor-pointer">
      <div className="absolute inset-0 p-6 flex flex-col justify-center z-10 max-w-[60%]">
        <span className="bg-white/20 w-fit px-2 py-1 rounded-lg text-xs text-white mb-2 backdrop-blur-sm">Promo</span>
        <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2 uppercase">{t.promoTitle}</h3>
      </div>
      <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300" className="absolute -right-4 top-0 h-full w-2/3 object-cover group-hover:scale-105 transition-transform duration-500" alt="Ice Cream" style={{maskImage: 'linear-gradient(to right, transparent, black)'}} alt="Meal Plan" />
    </div>
  </div>
);

const WhyChooseUs = ({ t, lang }) => (
  <div className="mb-12 bg-green-50 dark:bg-green-900/10 rounded-3xl p-8">
    <h2 className="text-xl font-bold text-primary mb-6 text-center">{t.whyChoose}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: Award, title: { en: "Top Quality", el: "Κορυφαία Ποιότητα" }, desc: { en: "Handpicked daily for you.", el: "Επιλεγμένα καθημερινά για εσάς." } },
        { icon: Truck, title: { en: "Fast Delivery", el: "Γρήγορη Παράδοση" }, desc: { en: "Same day delivery available.", el: "Παράδοση αυθημερόν." } },
        { icon: MapPin, title: { en: "Local Store", el: "Τοπικό Κατάστημα" }, desc: { en: "Supporting local farmers.", el: "Στηρίζουμε τους παραγωγούς." } },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
            <item.icon size={24} />
          </div>
          <h3 className="font-bold text-primary">{item.title[lang]}</h3>
          <p className="text-sm text-secondary">{item.desc[lang]}</p>
        </div>
      ))}
    </div>
  </div>
);

const DeliverySection = ({ t }) => (
  <div className="mb-12 relative overflow-hidden rounded-3xl bg-teal-900 text-white p-8">
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-3">{t.delivery}</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          We deliver to Evosmos, Kordelio, and surrounding Thessaloniki areas. 
          Orders over 30€ get free delivery!
        </p>
        <button className="bg-white hover:bg-teal-300 text-black hover:text-teal-900 hover:shadow-lg px-6 py-3 rounded-xl font-bold cursor-pointer transition-all duration-500">
          Check Availability
        </button>
      </div>
      <div className="w-full md:w-1/3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="text-green-400" size={20} />
          <span className="font-medium">Delivery Hours:</span>
        </div>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>Mon - Fri: 09:00 - 21:00</li>
          <li>Saturday: 09:00 - 16:00</li>
          <li>Sunday: Closed</li>
        </ul>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
  </div>
);

const Reviews = ({ t, lang }) => (
  <div className="mb-12">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-primary flex items-center gap-2">
        {t.reviews}
        <span className="text-yellow-500 flex text-sm items-center"><Star size={16} fill="currentColor" /> 4.9</span>
      </h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {REVIEWS.map(review => (
        <div key={review.id} className="bg-surface p-5 rounded-2xl shadow-sm border border-subtle">
          <div className="flex gap-1 mb-2 text-yellow-400">
            {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
          <p className="text-primary text-sm mb-3 italic">"{review.text[lang]}"</p>
          <p className="text-xs font-bold text-secondary">- {review.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const StoreInfo = ({ t }) => (
  <div className="bg-surface rounded-3xl border-t border-subtle p-8 shadow-lg">
    <h2 className="text-xl font-bold text-primary mb-6">{t.storeInfo}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="text-green-500 mt-1" size={20} />
          <div>
            <p className="font-bold text-primary">Samaras Fruit Market</p>
            <p className="text-secondary text-sm">2464 Royal Ln. Mesa (Mock Address)</p>
            <p className="text-secondary text-sm">Evosmos, Thessaloniki</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-green-500" size={20} />
          <p className="text-primary">+30 2310 123456</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-green-500" size={20} />
          <p className="text-primary">info@samarasmarket.gr</p>
        </div>
      </div>
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400">
        {/* Mock Map Placeholder */}
        <span>Map View Placeholder</span>
      </div>
    </div>
    <div className="mt-8 text-center text-sm border-t border-dashed border-green-800/50 pt-4">
      <span class="text-secondary opacity-50">© 2025 Οπωροπαντοπωλείο Σαμαράς. All rights reserved. Handcrafted with</span> <i class="bx bxs-heart text-red-500"></i><span class="text-secondary opacity-50"> by <a href="https://lexmichaels.com" target="_blank" rel="noopener noreferrer">Lex Michaels</a> in Greece. </span>
    </div>
  </div>
);

const MainContent = () => {
  const { t, lang } = useApp();
  const [activeTab, setActiveTab] = useState('popular');
  const catRef = useRef(null);

  return (
    <div className="pb-24 md:pb-8 px-2 md:px-0 max-w-7xl mx-auto w-full">
      <WelcomeCard t={t} />
      
      <Banners t={t} />

      {/* Categories */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-bold text-gprimary">{t.categories}</h2>
        <span className="text-sm text-green-500 hover:text-green-700 cursor-pointer font-medium">{t.viewAll}</span>
      </div>
      <div ref={catRef} className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar mb-4 px-1">
        {CATEGORIES.map(cat => (
          <CategoryCard key={cat.id} category={cat} t={t} />
        ))}
      </div>

      {/* Desktop: Show stacked rows */}
      <div className="hidden md:block">
        <SectionSlider title={t.popular} items={PRODUCTS} type="popular" lang={lang} t={t} />
        <SectionSlider title={t.new} items={PRODUCTS} type="new" lang={lang} t={t} />
      </div>

      {/* Mobile: Tab Switcher */}
      <div className="md:hidden">
        <div className="flex gap-6 mb-6 pb-2 overflow-x-auto">
          {[{ id: 'popular', label: t.popular }, { id: 'new', label: t.new }, { id: 'flash', label: t.flash }].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-2xl font-black whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-primary' : 'text-secondary opacity-30'}`}
            >
              {tab.label}
              {/* {activeTab === tab.id && <div className="absolute -bottom-2.5 left-0 w-full h-1 bg-green-500 rounded-t-full" />} */}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 animate-fadeIn mb-12">
           {PRODUCTS.filter(p => p.type === activeTab || (activeTab === 'flash' && p.type === 'flash')).length > 0 ? (
             PRODUCTS.filter(p => p.type === activeTab || (activeTab === 'flash' && p.type === 'flash')).map(product => (
               <div key={product.id} className="w-full"><ProductCard product={product} lang={lang} t={t} /></div>
             ))
           ) : <div className="col-span-2 text-center py-10 text-gray-400">No items</div>}
        </div>
      </div>

      <WhyChooseUs t={t} lang={lang} />
      <DeliverySection t={t} />
      <Reviews t={t} lang={lang} />
      <StoreInfo t={t} />
    </div>
  );
};

const RootLayout = () => {
  const { t } = useApp();
  return (
    <div className="flex h-screen w-full font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-300">
      
      {/* Desktop Sidebar (Compact Rail Style) */}
      <aside className="hidden md:flex w-24 flex-col items-center py-6 h-full z-30 px-3">
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-green-500/30">
          <span className="text-white font-bold text-xl">S</span>
        </div>

        <nav className="flex flex-col gap-4 w-full h-fit px-2 content-center my-auto bg-surface border border-subtle rounded-full py-2 shadow-sm">
          <SidebarItem icon={Home} label={t.nav.home} active />
          <SidebarItem icon={LayoutGrid} label={t.nav.cats} />
          <SidebarItem icon={BookOpen} label={t.nav.recipes} />
          <SidebarItem icon={User} label={t.nav.profile} />
        </nav>
        
        <div className="h-12 mt-4">
          <SidebarItem icon={Headset} label={t.nav.support} />
        </div>
      </aside>

      {/* Main Scrollable Area */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Header />
          <MainContent />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-subtle px-6 py-3 flex justify-between items-center z-50 safe-area-pb">
        <MobileNavItem icon={Home} active />
        <MobileNavItem icon={LayoutGrid} />
        <div className="relative -top-6 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/40 border-4 border-white dark:border-gray-900">
          <ShoppingBag size={24} />
        </div>
        <MobileNavItem icon={User} />
        <MobileNavItem icon={Menu} />
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RootLayout />
      <style>{`
        /* --- THEME VARIABLES DEFINITION (Matches index.css) --- */
        :root {
          /* Light Theme Defaults */
          --color-background: #f6f5f4 !important;
          --color-surface: #ffffff !important;
          --color-text: #1f2937 !important;
          --color-text-secondary: #4b5563 !important;
          --color-border: #e5e7eb !important;
          --color-primary: #435153 !important;
          --color-primary-hover: #16b649 !important;
          font-family: system-ui, sans-serif !important;
        }

        .dark {
          /* Dark Theme Defaults */
          --color-background: #041006 !important;
          --color-surface: #1e3b2e !important;
          --color-text: #f8fafc !important;
          --color-text-secondary: #94b8ab !important;
          --color-border: #33554c !important;
          --color-primary: #ffffff !important;
          --color-primary-hover: #16b649 !important;
        }

        body {
          margin: 0;
          background-color: var(--color-background);
          color: var(--color-text);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .safe-area-pb { padding-bottom: env(safe-area-inset-bottom, 20px); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </AppProvider>
  );
}
