import { useAppStore } from '../store/AppStore'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useAppStore()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="glass-icon-button h-10 w-10 text-xs font-bold"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'EL' : 'EN'}
    </button>
  )
}
