import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToSection = (sectionId) => {
    const executeScroll = () => {
      const node = document.getElementById(sectionId)
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (location.pathname !== '/') {
      navigate('/')
      requestAnimationFrame(() => setTimeout(executeScroll, 60))
    } else {
      executeScroll()
    }
  }

  return (
    <Outlet />
  )
}