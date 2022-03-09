import ErrorHandler from '../utils/ErrorHandler.js';
import jwt from "jsonwebtoken";
import userModel from '../models/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            next(new ErrorHandler("Please Login First", 401));
            return
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded._id);
        next()
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}
