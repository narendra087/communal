import Post from '../models/Post.js'
import User from '../models/User.js'

// *** CREATE
export const createPost = async(req, res) => {
  try {
    const { userId, description, postImgPath } = req.body
    
    const user = await User.findById(userId)
    
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      description,
      userImgPath: user.imgPath,
      postImgPath,
      likes: {},
      comments: []
    })
    await newPost.save()
    
    const post = await Post.find()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
}

// *** READ
export const getFeedPosts = async(req, res) => {
  try {
    const feedPosts = await Post.find()
    res.status(201).json(feedPosts)
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
}

export const getUserPosts = async(req, res) => {
  try {
    const { userId } = req.params
    
    const userPosts = await Post.find({userId})
    res.status(201).json(userPosts)
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
}

// *** UPDATE
export const likePost = async(req, res) => {
  try {
    const { postId } = req.params
    const { userId } = req.body
    
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({msg: 'Post does not exist.'})
    
    const isLiked = post.likes.get(userId)
    
    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {likes: post.likes},
      {new: true}
    )
    
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
}