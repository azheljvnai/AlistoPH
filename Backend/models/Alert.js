import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Alert type is required'],
    enum: ['Typhoon', 'Flood', 'Earthquake', 'Volcanic Activity', 'Landslide', 'Fire', 'Tsunami', 'Other']
  },
  severity: {
    type: String,
    required: [true, 'Severity level is required'],
    enum: ['Low', 'Medium', 'High', 'Critical']
  },
  title: {
    type: String,
    required: [true, 'Alert title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Alert description is required'],
    trim: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    region: String,
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    address: String
  },
  source: {
    type: String,
    enum: ['PAGASA', 'NDRRMC', 'PHIVOLCS', 'User Report', 'System'],
    default: 'System'
  },
  sourceUrl: String,
  affectedAreas: [{
    city: String,
    province: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for geospatial queries
alertSchema.index({ 'location.coordinates': '2dsphere' })
alertSchema.index({ type: 1, severity: 1, isActive: 1 })
alertSchema.index({ createdAt: -1 })

const Alert = mongoose.model('Alert', alertSchema)

export default Alert
