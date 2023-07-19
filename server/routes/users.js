import express from 'express'
import {
  getUser,
  getuserFriends,
  addRemoveFriend,
} from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// *** READ
router.get('/:id', verifyToken, getUser)
router.get('/:id/friebds', verifyToken, getuserFriends)

// *** UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend)

export default router