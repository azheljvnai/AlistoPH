import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons
const faultLineIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const floodIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Static coordinates for fault lines and flood-prone areas
const faultLines = [
  { id: 1, name: 'West Valley Fault', lat: 14.5995, lng: 121.0000, description: 'Active fault line running through Metro Manila' },
  { id: 2, name: 'East Valley Fault', lat: 14.6500, lng: 121.1000, description: 'Active fault line in eastern Metro Manila' },
  { id: 3, name: 'Marikina Valley Fault', lat: 14.6507, lng: 121.1029, description: 'Major fault system in Marikina Valley' },
  { id: 4, name: 'Philippine Fault Zone', lat: 14.6760, lng: 121.0437, description: 'Major fault system in Quezon City area' }
]

const floodProneAreas = [
  { id: 1, name: 'Marikina River Basin', lat: 14.6507, lng: 121.1029, description: 'High flood risk area along Marikina River' },
  { id: 2, name: 'Pasig River Lowlands', lat: 14.5764, lng: 121.0851, description: 'Flood-prone area near Pasig River' },
  { id: 3, name: 'Manila Bay Coastal Area', lat: 14.5906, lng: 120.9798, description: 'Coastal flood risk zone' },
  { id: 4, name: 'Laguna Lake Area', lat: 14.3000, lng: 121.2000, description: 'Low-lying area prone to flooding' },
  { id: 5, name: 'Tullahan River Basin', lat: 14.6548, lng: 120.9842, description: 'Flood risk area in Caloocan' }
]

function HazardMap() {
  useEffect(() => {
    // Ensure map container has height
    const mapContainer = document.querySelector('.leaflet-container')
    if (mapContainer) {
      mapContainer.style.height = '600px'
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Hazard Map</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Fault Lines</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Flood-Prone Areas</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          This map shows known fault lines and flood-prone areas in the Philippines. 
          Click on markers to see more information.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <MapContainer
          center={[14.5995, 121.0000]}
          zoom={11}
          style={{ height: '600px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Fault Line Markers */}
          {faultLines.map(fault => (
            <Marker
              key={`fault-${fault.id}`}
              position={[fault.lat, fault.lng]}
              icon={faultLineIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold text-red-600 mb-1">{fault.name}</h3>
                  <p className="text-sm text-gray-700">{fault.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {fault.lat.toFixed(4)}, {fault.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Flood-Prone Area Markers */}
          {floodProneAreas.map(area => (
            <Marker
              key={`flood-${area.id}`}
              position={[area.lat, area.lng]}
              icon={floodIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold text-blue-600 mb-1">{area.name}</h3>
                  <p className="text-sm text-gray-700">{area.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {area.lat.toFixed(4)}, {area.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend and Information */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fault Lines</h3>
          <ul className="space-y-2">
            {faultLines.map(fault => (
              <li key={fault.id} className="text-gray-700">
                <span className="font-medium">{fault.name}:</span> {fault.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Flood-Prone Areas</h3>
          <ul className="space-y-2">
            {floodProneAreas.map(area => (
              <li key={area.id} className="text-gray-700">
                <span className="font-medium">{area.name}:</span> {area.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HazardMap
