import ErrorHandler from '../utils/ErrorHandler.js';
import userModel from '../models/userModel.js'
import { sendData, sendPost } from '../middleware/SendData.js'

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


export const updateProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        const { name, email, avatar } = req.body;

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }


        await user.save();

        next(new ErrorHandler("Profile updated", 200));


    } catch (error) {
        next(new ErrorHandler(error.message, 500));

    }
};

export const myProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate(
            "posts followers following"
        );

        sendPost(user, 202, res)

    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
};


