import { mockWeather } from '../data/mockWeather'

function WeatherInfo() {
  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50'
    if (aqi <= 100) return 'text-yellow-600 bg-yellow-50'
    if (aqi <= 150) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getAirQualityLabel = (aqi) => {
    if (aqi <= 50) return 'Good'
    if (aqi <= 100) return 'Moderate'
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
    return 'Unhealthy'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Weather Information</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">{mockWeather.location}</h2>
          <span className="text-sm text-gray-500">Last updated: {mockWeather.lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Temperature Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Temperature</h3>
            <span className="text-3xl">🌡️</span>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {mockWeather.temperature}°C
          </div>
          <p className="text-sm text-gray-500">Current temperature</p>
        </div>

        {/* Heat Index Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Heat Index</h3>
            <span className="text-3xl">🔥</span>
          </div>
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {mockWeather.heatIndex}°C
          </div>
          <p className="text-sm text-gray-500">Feels like temperature</p>
        </div>

        {/* Air Quality Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Air Quality</h3>
            <span className="text-3xl">💨</span>
          </div>
          <div className={`text-4xl font-bold mb-2 px-4 py-2 rounded-lg ${getAirQualityColor(mockWeather.airQualityIndex)}`}>
            {mockWeather.airQualityIndex}
          </div>
          <p className="text-sm text-gray-500">{getAirQualityLabel(mockWeather.airQualityIndex)}</p>
        </div>

        {/* Humidity Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Humidity</h3>
            <span className="text-3xl">💧</span>
          </div>
          <div className="text-4xl font-bold text-blue-500 mb-2">
            {mockWeather.humidity}%
          </div>
          <p className="text-sm text-gray-500">Relative humidity</p>
        </div>

        {/* Wind Speed Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Wind Speed</h3>
            <span className="text-3xl">💨</span>
          </div>
          <div className="text-4xl font-bold text-gray-600 mb-2">
            {mockWeather.windSpeed} km/h
          </div>
          <p className="text-sm text-gray-500">Wind velocity</p>
        </div>

        {/* Condition Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Condition</h3>
            <span className="text-3xl">☁️</span>
          </div>
          <div className="text-2xl font-bold text-gray-700 mb-2">
            {mockWeather.condition}
          </div>
          <p className="text-sm text-gray-500">Current weather condition</p>
        </div>
      </div>

      {/* Weather Summary */}
      <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Weather Summary</h3>
        <p className="text-gray-700">
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
