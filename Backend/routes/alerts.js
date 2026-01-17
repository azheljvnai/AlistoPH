import express from 'express'
import Alert from '../models/Alert.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/alerts
// @desc    Get all alerts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, severity, location, isActive, limit = 50, page = 1 } = req.query
    
    const query = {}
    
    if (type) query.type = type
    if (severity) query.severity = severity
    if (isActive !== undefined) query.isActive = isActive === 'true'
    
    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('reportedBy', 'name email')
      .populate('verifiedBy', 'name email')
    
    const total = await Alert.countDocuments(query)
    
    res.json({
      success: true,
      count: alerts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: alerts
    })
  } catch (error) {
    console.error('Get alerts error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   GET /api/alerts/:id
// @desc    Get single alert
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('verifiedBy', 'name email')
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' })
    }
    
    res.json({
      success: true,
      data: alert
    })
  } catch (error) {
    console.error('Get alert error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   POST /api/alerts
// @desc    Create new alert
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const alert = await Alert.create({
      ...req.body,
      reportedBy: req.user._id
    })
    
    res.status(201).json({
      success: true,
      data: alert
    })
  } catch (error) {
    console.error('Create alert error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   PUT /api/alerts/:id
// @desc    Update alert
// @access  Private (Admin/Moderator)
router.put('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' })
    }
    
    res.json({
      success: true,
      data: alert
    })
  } catch (error) {
    console.error('Update alert error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   DELETE /api/alerts/:id
// @desc    Delete alert
// @access  Private (Admin/Moderator)
router.delete('/:id', protect, authorize('admin', 'moderator'), async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id)
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' })
    }
    
    res.json({
      success: true,
      message: 'Alert deleted'
    })
  } catch (error) {
    console.error('Delete alert error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
