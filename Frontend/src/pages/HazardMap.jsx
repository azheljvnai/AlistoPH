import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { AlertTriangle, Droplets, Info } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons with orange and blue colors
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
      mapContainer.style.height = '400px'
      mapContainer.style.minHeight = '400px'
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Hazard Map</h1>
        <p className="text-gray-600 text-sm md:text-base">Interactive map showing fault lines and flood-prone areas</p>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent-orange rounded-full border-2 border-accent-orange-dark"></div>
            <span className="text-sm md:text-base text-gray-700 font-medium">Fault Lines</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-blue rounded-full border-2 border-primary-blue-dark"></div>
            <span className="text-sm md:text-base text-gray-700 font-medium">Flood-Prone Areas</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm md:text-base flex items-start gap-2">
          <Info size={18} className="text-primary-blue mt-0.5 flex-shrink-0" />
          This map shows known fault lines and flood-prone areas in the Philippines. Click on markers to see more information.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <MapContainer
          center={[14.5995, 121.0000]}
          zoom={11}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
          className="z-0"
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
                <div className="min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={18} className="text-accent-orange" />
                    <h3 className="font-semibold text-accent-orange text-base">{fault.name}</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{fault.description}</p>
                  <p className="text-xs text-gray-500">
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
                <div className="min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets size={18} className="text-primary-blue" />
                    <h3 className="font-semibold text-primary-blue text-base">{area.name}</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{area.description}</p>
                  <p className="text-xs text-gray-500">
                    Coordinates: {area.lat.toFixed(4)}, {area.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend and Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-accent-orange" />
            Fault Lines
          </h3>
          <ul className="space-y-3">
            {faultLines.map(fault => (
              <li key={fault.id} className="text-sm md:text-base text-gray-700 border-l-4 border-accent-orange pl-3">
                <span className="font-semibold">{fault.name}:</span> {fault.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Droplets size={20} className="text-primary-blue" />
            Flood-Prone Areas
          </h3>
          <ul className="space-y-3">
            {floodProneAreas.map(area => (
              <li key={area.id} className="text-sm md:text-base text-gray-700 border-l-4 border-primary-blue pl-3">
                <span className="font-semibold">{area.name}:</span> {area.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HazardMap
