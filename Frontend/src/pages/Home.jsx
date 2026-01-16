import { useState } from 'react'
import { Search, Filter, MapPin, Calendar, AlertTriangle } from 'lucide-react'
import { mockAlerts } from '../data/mockAlerts'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterSeverity, setFilterSeverity] = useState('All')

  const alertTypes = ['All', 'Typhoon', 'Flood', 'Earthquake', 'Volcanic Activity', 'Landslide']
  const severityLevels = ['All', 'High', 'Medium', 'Low']

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'All' || alert.type === filterType
    const matchesSeverity = filterSeverity === 'All' || alert.severity === filterSeverity
    return matchesSearch && matchesType && matchesSeverity
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-accent-orange text-white border-accent-orange-dark'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-primary-blue-light text-white border-primary-blue'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Disaster Alerts</h1>
        <p className="text-gray-600 text-sm md:text-base">Stay informed about current disaster alerts in the Philippines</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Search size={16} />
              Search
            </label>
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Filter size={16} />
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            >
              {alertTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} />
              Severity
            </label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition-all"
            >
              {severityLevels.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md text-center">
            <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No alerts found matching your criteria.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-primary-blue"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                      {alert.type}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getSeverityColor(alert.severity)}`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{alert.description}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary-blue" />
                    <span>{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary-blue" />
                    <span>{alert.date}</span>
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

export default Home
