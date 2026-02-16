/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

const LanguageContext = createContext({ language: 'en', setLanguage: () => {}, t: (key) => key })

export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider
      value={{
        language: 'en',
        setLanguage: () => {},
        t: (key) => key,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
