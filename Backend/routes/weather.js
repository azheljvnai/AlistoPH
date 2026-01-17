import express from 'express'

const router = express.Router()

// @route   GET /api/weather
// @desc    Get weather information
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { lat, lng, city } = req.query
    
    // TODO: Integrate with actual weather API (OpenWeatherMap, etc.)
    // For now, return mock data
    
    const mockWeather = {
      temperature: 25,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 15,
      location: city || 'Metro Manila',
      lastUpdated: new Date().toISOString()
    }
    
    res.json({
      success: true,
      data: mockWeather
    })
  } catch (error) {
    console.error('Get weather error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
