import { Thermometer, Gauge, Wind, Droplets, Cloud, RefreshCw } from 'lucide-react'
import { mockWeather } from '../data/mockWeather'

function WeatherInfo() {
  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50 border-green-200'
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (aqi <= 150) return 'text-accent-orange bg-orange-50 border-orange-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getAirQualityLabel = (aqi) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
    return 'Unhealthy'
  }

  const weatherCards = [
    {
      title: 'Temperature',
      value: `${mockWeather.temperature}°C`,
      icon: Thermometer,
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
      description: 'Current temperature'
    },
    {
      title: 'Heat Index',
      value: `${mockWeather.heatIndex}°C`,
      icon: Gauge,
      color: 'text-accent-orange',
      bgColor: 'bg-orange-50',
      description: 'Feels like temperature'
    },
    {
      title: 'Air Quality',
      value: mockWeather.airQualityIndex,
      icon: Wind,
      color: getAirQualityColor(mockWeather.airQualityIndex).split(' ')[0],
      bgColor: getAirQualityColor(mockWeather.airQualityIndex).split(' ')[1],
      description: getAirQualityLabel(mockWeather.airQualityIndex),
      isAqi: true
    },
    {
      title: 'Humidity',
      value: `${mockWeather.humidity}%`,
      icon: Droplets,
      color: 'text-primary-blue',
      bgColor: 'bg-blue-50',
      description: 'Relative humidity'
    },
    {
      title: 'Wind Speed',
      value: `${mockWeather.windSpeed} km/h`,
      icon: Wind,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Wind velocity'
    },
    {
      title: 'Condition',
      value: mockWeather.condition,
      icon: Cloud,
      color: 'text-gray-700',
      bgColor: 'bg-gray-50',
      description: 'Current weather condition'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Weather Information</h1>
        <p className="text-gray-600 text-sm md:text-base">Current weather conditions and forecasts</p>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700">{mockWeather.location}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RefreshCw size={16} />
            <span>Last updated: {mockWeather.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {weatherCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div 
              key={index}
              className={`${card.bgColor} p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-blue`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-700">{card.title}</h3>
                <Icon size={24} className={card.color} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${card.color}`}>
                {card.value}
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          )
        })}
      </div>

      {/* Weather Summary */}
      <div className="mt-6 bg-gradient-to-r from-primary-blue to-primary-blue-light p-5 md:p-6 rounded-xl shadow-md text-white">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Cloud size={24} />
          Weather Summary
        </h3>
        <p className="text-sm md:text-base leading-relaxed opacity-95">
          The current weather in {mockWeather.location} shows {mockWeather.condition.toLowerCase()} conditions 
          with a temperature of {mockWeather.temperature}°C. The heat index is {mockWeather.heatIndex}°C, 
          making it feel warmer than the actual temperature. Air quality is {mockWeather.airQuality.toLowerCase()} 
          with an AQI of {mockWeather.airQualityIndex}. Humidity is at {mockWeather.humidity}% and 
          wind speed is {mockWeather.windSpeed} km/h.
        </p>
      </div>
    </div>
  )
}

export default WeatherInfo
