import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

const translations = {
  en: {
    // Navigation
    home: 'Home',
    categories: 'Categories',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    search: 'Search products...',
    cart: 'Cart',
    login: 'Login',
    
    // Hero
    heroTitle: 'Fresh Groceries Delivered to Your Door',
    heroSubtitle: 'Discover the finest selection of fresh produce, dairy, and pantry essentials',
    startShopping: 'Start Shopping',
    watchDemo: 'Watch Demo',
    
    // Sections
    flashSale: 'Flash Sale',
    popularItems: 'Popular Items',
    newArrivals: 'New Arrivals',
    snacks: 'Snacks',
    breakfast: 'Breakfast',
    canned: 'Canned',
    coffee: 'Coffee',
    limitedTime: 'Limited time offers',
    mostLoved: 'Most loved by customers',
    freshMarket: 'Fresh from the market',
    
    // Categories
    mainCategories: 'Main Categories',
    foodCategories: 'Food Categories',
    sounds: 'Sounds',
    drinks: 'Drinks',
    finish: 'Finish',
    sauce: 'Sauce',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    cookies: 'Cookies',
    fresh: 'Fresh',
    sales: 'Sales',
    food: 'Food',
    foodWine: 'Food & Wine',
    
    // Products
    addToCart: 'Add to Cart',
    viewAll: 'View All',
    
    // About
    whyChooseUs: 'Why Choose Samaras Grocery?',
    aboutDescription: 'Family-owned since 1985, bringing you the freshest local products with quality you can trust',
    qualityProducts: 'Quality guaranteed products',
    deliveryPromise: '45-minute delivery promise',
    localFarms: 'Fresh from local farms',
    securePayments: 'Secure online payments',
    
    // Contact
    getInTouch: 'Get in Touch',
    contactDescription: 'Have questions about our products or delivery? We\'re here to help!',
    callUs: 'Call us',
    emailUs: 'Email us',
    visitUs: 'Visit us',
    sendMessage: 'Send Message',
    storeHours: 'Store Hours',
    monSat: 'Monday - Saturday',
    sun: 'Sunday',
    
    // Footer
    freshDaily: 'Fresh Daily • Local First',
    allRights: 'All rights reserved'
  },
  el: {
    // Navigation
    home: 'Αρχική',
    categories: 'Κατηγορίες',
    products: 'Προϊόντα',
    about: 'Σχετικά',
    contact: 'Επικοινωνία',
    search: 'Αναζήτηση προϊόντων...',
    cart: 'Καλάθι',
    login: 'Σύνδεση',
    
    // Hero
    heroTitle: 'Φρέσκα Είδη Στο Σπίτι Σας',
    heroSubtitle: 'Ανακαλύψτε την καλύτερη ποικιλία από φρέσκα προϊόντα, γαλακτοκομικά και οικιακά είδη',
    startShopping: 'Ξεκινήστε Αγορές',
    watchDemo: 'Δείτε Βίντεο',
    
    // Sections
    flashSale: 'Εκπτώσεις',
    popularItems: 'Δημοφιλή',
    newArrivals: 'Νέες Αφίξεις',
    snacks: 'Σνακ',
    breakfast: 'Πρωινό',
    canned: 'Κονσέρβες',
    coffee: 'Καφές',
    limitedTime: 'Προσφορές περιορισμένου χρόνου',
    mostLoved: 'Τα αγαπημένα των πελατών',
    freshMarket: 'Φρέσκα από την αγορά',
    
    // Categories
    mainCategories: 'Κύριες Κατηγορίες',
    foodCategories: 'Κατηγορίες Τροφίμων',
    sounds: 'Ήχοι',
    drinks: 'Ποτά',
    finish: 'Τελειοποίηση',
    sauce: 'Σάλτσες',
    vegetables: 'Λαχανικά',
    fruits: 'Φρούτα',
    cookies: 'Μπισκότα',
    fresh: 'Φρέσκα',
    sales: 'Εκπτώσεις',
    food: 'Τρόφιμα',
    foodWine: 'Τρόφιμα & Κρασί',
    
    // Products
    addToCart: 'Προσθήκη',
    viewAll: 'Δείτε Όλα',
    
    // About
    whyChooseUs: 'Γιατί να Επιλέξετε το Σαμαράς;',
    aboutDescription: 'Οικογενειακή επιχείρηση από το 1985, σας φέρνουμε τα φρεσκότερα τοπικά προϊόντα με ποιότητα που μπορείτε να εμπιστευτείτε',
    qualityProducts: 'Εγγυημένη ποιότητα προϊόντων',
    deliveryPromise: 'Παράδοση σε 45 λεπτά',
    localFarms: 'Φρέσκα από τοπικές φάρμες',
    securePayments: 'Ασφαλείς ηλεκτρονικές πληρωμές',
    
    // Contact
    getInTouch: 'Επικοινωνήστε Μαζί Μας',
    contactDescription: 'Έχετε ερωτήσεις για τα προϊόντα μας ή την παράδοση; Είμαστε εδώ για να βοηθήσουμε!',
    callUs: 'Καλέστε μας',
    emailUs: 'Στείλτε email',
    visitUs: 'Επισκεφθείτε μας',
    sendMessage: 'Αποστολή Μηνύματος',
    storeHours: 'Ωράριο Λειτουργίας',
    monSat: 'Δευτέρα - Σάββατο',
    sun: 'Κυριακή',
    
    // Footer
    freshDaily: 'Φρέσκα Καθημερινά • Τοπικά Πρώτα',
    allRights: 'Με επιφύλαξη παντός δικαιώματος'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('el') // Default to Greek

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}