import express from 'express'
import { isAuthenticated } from '../middleware/auth.js'
import { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, addUpdateComment, deleteComment } from '../controller/postControllers.js'
const router = express.Router()

router.route('/create').post(isAuthenticated, createPost)
router.route('/post/:id').get(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated, deletePost).put(isAuthenticated, updateCaption)

router.route('/getPostOfFollowing').get(isAuthenticated, getPostOfFollowing)

router.route('/comment/:id').put(isAuthenticated, addUpdateComment).delete(isAuthenticated, deleteComment)


export default router   