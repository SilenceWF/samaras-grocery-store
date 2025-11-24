import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('el')}
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
          language === 'el' 
            ? 'bg-green-600 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        title="Ελληνικά"
      >
        🇬🇷
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
          language === 'en' 
            ? 'bg-green-600 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
        title="English"
      >
        🇺🇸
      </button>
    </div>
  )
}