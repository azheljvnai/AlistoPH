import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            AlistoPH
          </Link>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/weather"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/weather') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Weather Info
            </Link>
            <Link
              to="/community"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/community') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Community Posts
            </Link>
            <Link
              to="/emergency"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/emergency') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Emergency Hotlines
            </Link>
            <Link
              to="/hazard-map"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/hazard-map') 
                  ? 'bg-blue-700 font-semibold' 
                  : 'hover:bg-blue-700'
              }`}
            >
              Hazard Map
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
