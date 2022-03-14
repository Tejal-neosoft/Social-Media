import mongoose from 'mongoose';
import ErrorHandler from '../utils/ErrorHandler.js';
import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';
import { sendPost } from '../middleware/SendData.js'

export const createPost = (async (req, res, next) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "mycloud.public_id",
                url: "mycloud.secure_url",
            },
            owner: req.user._id

        }
        const post = await postModel.create(newPostData);
        const user = await userModel.findById(req.user._id);

        user.posts.push(post._id);
        await user.save();
        next(new ErrorHandler("Post created succesfully", 201));
        return

    }
    catch (error) {
        next(new ErrorHandler(error, 500));
    }
});

export const deletePost = (async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            next(new ErrorHandler("Post not found", 404));
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            next(new ErrorHandler("Unauthorized", 409));

        }
        await post.remove()
        const user = await userModel.findById(req.user._id)

        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1)
        await user.save();
        next(new ErrorHandler("post deleted succesfully", 200));

    }
    catch (error) {
        next(new ErrorHandler(error, 500));

    }
})

export const likeAndUnlikePost = (async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            next(new ErrorHandler("Post not found", 404));
        }
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1)
            await post.save();

            next(new ErrorHandler("Post unliked ", 200));
            return
        }
        else {
            post.likes.push(req.user._id)
            await post.save();

            next(new ErrorHandler("Post liked succesfully", 200));
            return
        }
    }
    catch (error) {
        next(new ErrorHandler(error, 500));
    }
})

export const getPostOfFollowing = (async (req, res, next) => {
    try {
        const loginUser = await userModel.findById(req.user._id);

        const getPost = await postModel.find({
            owner: {
                $in: loginUser.following
            }
        })
        console.log(getPost, "getpost")

        sendPost(getPost, 202, res)

    }
    catch (error) {
        next(new ErrorHandler(error, 500));

    }
})

export const updateCaption = (async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id)

        const { caption } = req.body;

        if (!post) {
            next(new ErrorHandler("No post Available", 404));
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            next(new ErrorHandler("Unauthorized", 409));
        }

        post.caption = caption
        await post.save();

        next(new ErrorHandler("caption updated succesfully", 200));
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})

export const addUpdateComment = (async (req, res, next) => {

    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            next(new ErrorHandler("No post Available", 404));
        }
        let commentIndex = -1

        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index
            }
        })

        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();
            next(new ErrorHandler("comment updated", 200));
        }
        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })

            await post.save();
            next(new ErrorHandler("comment added", 200));


        }
    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));

    }



})

export const deleteComment = (async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id)

        if (!post) {
            next(new ErrorHandler("post not found", 404));
        }

        if (!req.body.commentId) {
            next(new ErrorHandler("comment not found", 404));

        }

        if (post.owner.toString() === req.user._id.toString()) { //login user who posted post
            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1)
                }
            })

            await post.save();
            next(new ErrorHandler("selected comment  deleted succesfully", 200));


        }
        else { //user who commented on post
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1)
                }
            })
            await post.save();
            next(new ErrorHandler(" your comment deleted succesfully", 200));
        }

    }
    catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
})