import { useState } from 'react'
import { Search, Filter, MapPin, Phone, Globe, Navigation, Building2, PhoneCall } from 'lucide-react'
import { mockLocations } from '../data/mockLocations'

function EmergencyHotlines() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  const uniqueLocations = ['All', ...new Set(mockLocations.map(loc => loc.location))]
  const uniqueTypes = ['All', ...new Set(mockLocations.map(loc => loc.type))]

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.phone.includes(searchTerm)
    const matchesLocation = selectedLocation === 'All' || location.location === selectedLocation
    const matchesType = selectedType === 'All' || location.type === selectedType
    return matchesSearch && matchesLocation && matchesType
  })

  const getTypeColor = (type) => {
    return type === 'Hotline' 
      ? 'bg-accent-orange text-white border-accent-orange-dark' 
      : 'bg-primary-blue text-white border-primary-blue-dark'
  }

  const getTypeIcon = (type) => {
    return type === 'Hotline' ? PhoneCall : Building2
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Emergency Hotlines & Evacuation Centers</h1>
        <p className="text-gray-600 text-sm md:text-base">Find emergency contacts and evacuation centers near you</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Search size={18} className="text-primary-blue" />
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, address, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Filter size={18} className="text-primary-blue" />
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            >
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Filter size={18} className="text-primary-blue" />
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            >
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="space-y-5">
        {filteredLocations.length === 0 ? (
          <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg text-center border border-gray-100">
            <Phone size={56} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No locations found matching your criteria.</p>
          </div>
        ) : (
          filteredLocations.map(location => {
            const TypeIcon = getTypeIcon(location.type)
            return (
              <div
                key={location.id}
                className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-primary-blue border border-gray-100"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg md:text-xl font-bold text-gray-900">
                        {location.name}
                      </h2>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border flex items-center gap-1.5 ${getTypeColor(location.type)}`}
                      >
                        <TypeIcon size={14} />
                        {location.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-primary-blue mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-600">Address: </span>
                        <span className="text-sm md:text-base">{location.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-accent-orange flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm text-gray-600">Phone: </span>
                        <a 
                          href={`tel:${location.phone}`}
                          className="text-primary-blue hover:text-primary-blue-dark hover:underline font-medium text-sm md:text-base"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-primary-blue flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm text-gray-600">Location: </span>
                        <span className="text-sm md:text-base">{location.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 pt-2 border-t border-gray-100">
                      <Navigation size={16} className="text-gray-400 flex-shrink-0" />
                      <span>Coordinates: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default EmergencyHotlines
