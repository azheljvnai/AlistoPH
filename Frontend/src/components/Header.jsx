import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Cloud, MessageSquare, Phone, MapPin, LogIn, LogOut, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.png'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/weather', label: 'Weather', icon: Cloud },
    { path: '/community', label: 'Community', icon: MessageSquare },
    { path: '/emergency', label: 'Emergency', icon: Phone },
    { path: '/hazard-map', label: 'Hazard Map', icon: MapPin },
  ]

  return (
    <header className="bg-gradient-to-r from-primary-blue to-primary-blue-dark text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            <img 
              src={logo} 
              alt="AlistoPH Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold whitespace-nowrap tracking-tight">AlistoPH</span>
          </Link>
          
          {/* Desktop Navigation - Text Only */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {navItems.map(item => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap ${
                    active 
                      ? 'bg-white/20 text-white font-semibold shadow-lg' 
                      : 'hover:bg-white/10 text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-4 text-sm text-white/90">
                  <User size={18} />
                  <span className="max-w-[120px] truncate">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-lg transition-all duration-200 font-medium hover:bg-white/10 text-white/90 hover:text-white whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-lg transition-all duration-200 font-medium hover:bg-white/10 text-white/90 hover:text-white whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Icons Only */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-white/20 pt-4">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {navItems.map(item => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl transition-all touch-manipulation ${
                      active 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-white/90 px-2">
                    <User size={18} />
                    <span className="truncate">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:bg-white/10 text-white/90 hover:text-white"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:bg-white/10 text-white/90 hover:text-white"
                >
                  <LogIn size={18} />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
