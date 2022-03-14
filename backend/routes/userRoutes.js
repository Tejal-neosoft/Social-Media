import express from 'express'
import { register, login, logout, follow, updatePassword, updateProfile, deleteMyProfile, myProfile, getAllProfile, getUserProfile, forgetPassword, resetPassword } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.route('/register').post(register)
userRouter.route('/login').post(login)
userRouter.route('/logout').get(logout)
userRouter.route('/follow/:id').get(isAuthenticated, follow)
userRouter.route('/updatePassword').put(isAuthenticated, updatePassword)
userRouter.route('/updateProfile').put(isAuthenticated, updateProfile)
userRouter.route('/deleteMyProfile').delete(isAuthenticated, deleteMyProfile)
userRouter.route('/myProfile').get(isAuthenticated, myProfile)
userRouter.route('/getAllProfile').get(isAuthenticated, getAllProfile)
userRouter.route('/getUserProfile/:id').get(isAuthenticated, getUserProfile)
userRouter.route('/forgetPassword').post(forgetPassword)
userRouter.route('/resetPassword/:token').put(resetPassword)


export default userRouter   