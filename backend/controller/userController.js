import ErrorHandler from '../utils/ErrorHandler.js';
import userModel from '../model/userModel.js'
import postModel from '../model/postModel.js'
import { sendData, sendPost } from '../middleware/SendData.js'
import { sendEmail } from '../middleware/sendEmail.js';
import crypto from 'crypto'


export const register = (async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let users = await userModel.findOne({ email });
        if (users) {
            next(new ErrorHandler("User already exist", 409));
        }
        else {
            users = await userModel.create({
                name,
                email,
                password,
                avatar: { public_id: "sample.id", url: "sample url" },
            });

            const isMatch = await users.matchPassword(password);

            if (!isMatch) {
                next(new ErrorHandler("Incorrect Password", 400));
                return
            }
            sendData(users, 202, res)
        }
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }

})
export const login = (async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            next(new ErrorHandler("User does not exist", 404));
            return
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            next(new ErrorHandler("Incorrect Password", 400));
            return
        }
        sendData(user, 202, res)

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});
export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "Logged out",
            });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};

export const follow = (async (req, res, next) => {
    try {
        const userToFollow = await userModel.findById(req.params.id);//tejal
        const loginUser = await userModel.findById(req.user._id);//sam

        if (!userToFollow) {
            next(new ErrorHandler("User not found", 404));
            return;
        }

        if (loginUser.following.includes(userToFollow._id)) {
            const index = loginUser.following.indexOf(userToFollow._id);
            loginUser.following.splice(index, 1)
            await loginUser.save();


            const index1 = userToFollow.followers.indexOf(loginUser._id);
            userToFollow.followers.splice(index1, 1)
            await userToFollow.save();

            next(new ErrorHandler("user unfollowed ", 200));
            return
        }
        else {
            loginUser.following.push(userToFollow._id);
            userToFollow.followers.push(loginUser._id);

            await loginUser.save();
            await userToFollow.save();

            next(new ErrorHandler("User followed sucessfully", 200));

        }

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const updatePassword = (async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id).select("+password");

        const { oldpassword, newpassword } = req.body;

        if (!oldpassword || !newpassword) {
            next(new ErrorHandler("Password should not be empty", 400));

        }

        const isMatch = await user.matchPassword(oldpassword);
        console.log(isMatch)

        if (!isMatch) {
            next(new ErrorHandler("Incorrect old password", 404));
        }

        user.password = newpassword;
        await user.save();
        next(new ErrorHandler("password updated", 200));

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const updateProfile = (async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        const { name, email } = req.body;
        console.log(name, email)
        console.log(user)

        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        await user.save()
        next(new ErrorHandler("profile updated succesfully", 201));


    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const deleteMyProfile = (async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        const post = user.posts;
        const followersData = user.followers
        const followingData = user.following
        const userId = user._id

        await user.remove()
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })

        for (let i = 0; i < post.length; i++) {
            const postsdata = await postModel.findById(post[i])
            console.log(postsdata)
            postsdata.remove()
        }

        for (let i = 0; i < followersData.length; i++) {
            const follower = await userModel.findById(followersData[i])
            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1)
            await follower.save()
        }

        for (let i = 0; i < followingData.length; i++) {
            const follows = await userModel.findById(followingData[i])
            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index, 1)
            await follows.save()
        }

        next(new ErrorHandler("profile deleted successfully", 200));

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }

})

export const myProfile = (async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id).populate("posts")
        sendPost(user, 202, res)

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})
export const getUserProfile = (async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).populate("posts")
        if (!user) {
            next(new ErrorHandler("user not found", 404));
        }
        sendPost(user, 202, res)

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const getAllProfile = (async (req, res, next) => {
    try {
        const user = await userModel.find({})
        sendPost(user, 202, res)
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const forgetPassword = (async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            next(new ErrorHandler("User does not exist", 404));
            return
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetPasswordToken}`

        const message = `reset password link ${resetUrl}`;

        try {
            sendEmail({
                email: user.email,
                subject: "Reset Password",
                message
            })
            next(new ErrorHandler("Email sent successfully ", 202));
            return

        }
        catch (error) {
            console.log(error.message)
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            next(new ErrorHandler(error.message, 500));
            return
        }
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const resetPassword = (async (req, res, next) => {
    try {
        const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            next(new ErrorHandler("Invalid token or has expired", 401));

        }
        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()
        next(new ErrorHandler("password reset", 500));

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));

    }
})



