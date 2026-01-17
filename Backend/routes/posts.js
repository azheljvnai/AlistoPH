import express from 'express'
import Post from '../models/Post.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, location, limit = 20, page = 1 } = req.query
    
    const query = {}
    if (type) query.type = type
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('user', 'name email')
    
    const total = await Post.countDocuments(query)
    
    res.json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: posts
    })
  } catch (error) {
    console.error('Get posts error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      user: req.user._id,
      userName: req.user.name
    })
    
    const populatedPost = await Post.findById(post._id).populate('user', 'name email')
    
    res.status(201).json({
      success: true,
      data: populatedPost
    })
  } catch (error) {
    console.error('Create post error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// @route   POST /api/posts/:id/like
// @desc    Like/Unlike a post
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    
    const likeIndex = post.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    )
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1)
    } else {
      post.likes.push({ user: req.user._id })
    }
    
    await post.save()
    
    res.json({
      success: true,
      data: post
    })
  } catch (error) {
    console.error('Like post error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
