import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'Post message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  location: {
    city: String,
    province: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  type: {
    type: String,
    enum: ['Earthquake', 'Flood', 'Typhoon', 'Fire', 'General', 'Emergency', 'Update'],
    default: 'General'
  },
  images: [{
    url: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    message: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
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

// Indexes
postSchema.index({ user: 1, createdAt: -1 })
postSchema.index({ 'location.coordinates': '2dsphere' })
postSchema.index({ type: 1, createdAt: -1 })
postSchema.index({ createdAt: -1 })

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length
})

const Post = mongoose.model('Post', postSchema)

export default Post
