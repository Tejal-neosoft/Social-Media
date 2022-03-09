import express from 'express'
import { isAuthenticated } from '../middleware/auth.js'
import { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing } from '../controller/postControllers.js'
const router = express.Router()

router.route('/create').post(isAuthenticated, createPost)
router.route('/post/:id').get(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated, deletePost)

router.route('/getPostOfFollowing').get(isAuthenticated, getPostOfFollowing)


export default router   