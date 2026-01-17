import { MapPin, Bell, Cloud, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mockWeather } from '../data/mockWeather'
import { mockPosts } from '../data/mockPosts'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function Home() {
  const currentLocation = 'Pasig, Metro Manila'
  const recentPosts = mockPosts.slice(0, 2)

  return (
    <div className="max-w-md mx-auto px-3 sm:px-4 pb-6">
      {/* Location Header */}
      <div className="flex items-center justify-between py-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-primary-blue/10 rounded-lg">
            <MapPin size={20} className="text-primary-blue" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Your Location</p>
            <p className="text-sm font-bold text-gray-900">{currentLocation}</p>
          </div>
        </div>
        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-all touch-manipulation active:scale-95">
          <Bell size={22} className="text-gray-700" />
        </button>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 mb-5 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-6xl font-bold text-white mb-2 leading-none">{mockWeather.temperature}°C</div>
            <div className="text-white text-base font-medium opacity-95">{mockWeather.condition}</div>
            <div className="text-white text-sm opacity-80 mt-1">{mockWeather.location}</div>
          </div>
          <Cloud size={56} className="text-white opacity-90" />
        </div>
      </div>

      {/* Map Widget */}
      <div className="bg-white rounded-2xl shadow-lg mb-5 overflow-hidden border border-gray-100">
        <div style={{ height: '280px', width: '100%' }}>
          <MapContainer
            center={[14.5764, 121.0851]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      </div>

      {/* Community Posts Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Community Posts</h2>
          <Link 
            to="/community" 
            className="text-sm text-primary-blue font-semibold flex items-center gap-1.5 hover:gap-2 transition-all touch-manipulation group"
          >
            See More <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">No posts available yet.</p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3">
            {recentPosts.map(post => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 min-w-[300px] flex-shrink-0 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-blue-light rounded-full flex items-center justify-center text-white font-bold text-base shadow-md">
                    {post.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{post.userName}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                      {post.type || 'General'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                  {post.message}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors touch-manipulation">
                    <Heart size={16} />
                    <span className="text-xs font-medium">Like</span>
                  </button>
                  <Link 
                    to="/community" 
                    className="text-xs text-primary-blue font-semibold hover:underline touch-manipulation"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
