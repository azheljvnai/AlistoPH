import express from 'express'

const router = express.Router()

// @route   GET /api/locations
// @desc    Get emergency locations (hotlines, evacuation centers)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, city, province } = req.query
    
    // TODO: Replace with actual database query
    // For now, return mock data
    
    const mockLocations = [
      {
        id: 1,
        name: 'National Emergency Hotline',
        type: 'Hotline',
        phone: '911',
        location: 'Nationwide'
      }
    ]
    
    res.json({
      success: true,
      count: mockLocations.length,
      data: mockLocations
    })
  } catch (error) {
    console.error('Get locations error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
