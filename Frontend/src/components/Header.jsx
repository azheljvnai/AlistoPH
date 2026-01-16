import { Link, useLocation } from 'react-router-dom'
import { Home, Cloud, MessageSquare, Phone, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/weather', label: 'Weather', icon: Cloud },
    { path: '/community', label: 'Community', icon: MessageSquare },
    { path: '/emergency', label: 'Emergency', icon: Phone },
    { path: '/hazard-map', label: 'Hazard Map', icon: MapPin },
  ]

  return (
    <header className="bg-primary-blue text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 md:py-4">
          <Link to="/" className="flex items-center gap-2 mb-3 md:mb-0">
            <img 
              src={logo} 
              alt="AlistoPH Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <span className="text-xl md:text-2xl font-bold">AlistoPH</span>
          </Link>
          <nav className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-sm md:text-base ${
                    active 
                      ? 'bg-primary-blue-dark font-semibold shadow-md' 
                      : 'hover:bg-primary-blue-light'
                  }`}
                >
                  <Icon size={18} className="md:hidden" />
                  <Icon size={20} className="hidden md:block" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
