import { useState } from 'react'
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
      ? 'bg-red-100 text-red-800 border-red-300' 
      : 'bg-blue-100 text-blue-800 border-blue-300'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Emergency Hotlines & Evacuation Centers</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name, address, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Locations List */}
      <div className="space-y-4">
        {filteredLocations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            No locations found matching your criteria.
          </div>
        ) : (
          filteredLocations.map(location => (
            <div
              key={location.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {location.name}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(location.type)}`}
                    >
                      {location.type}
                    </span>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">📍 Address:</span>
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">📞 Phone:</span>
                      <a 
                        href={`tel:${location.phone}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">🌍 Location:</span>
                      <span>{location.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">Coordinates:</span>
                      <span>{location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EmergencyHotlines
