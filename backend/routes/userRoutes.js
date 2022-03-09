import express from 'express'
import { register, login, logout, follow } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/logout').get(logout)
userRouter.route('/follow/:id').get(isAuthenticated, follow)


export default userRouter   