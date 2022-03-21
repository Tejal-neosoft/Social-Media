import React, { useState, useEffect } from 'react'
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { likeUnlike, addComment } from '../../Actions/postActions'
import './Post.css'
import CommentCard from '../CommentCard/CommentCard'
import { getPostOfFollowing } from '../../Actions/userActions';
import { User } from '../User/User';

export const Post = ({ postId, caption, postImage, likes = [], comments = [], ownerImage, ownerName, ownerId, isDelete = false, isAccount = false, }) => {

    const dispatch = useDispatch()

    const [liked, setliked] = useState(false);

    const [likesUser, setLikesUser] = useState(false);
    const [comment, setComment] = useState({
        commentForm: "",
        commentToggle: false
    });

    const { user } = useSelector(
        (state) => state.user
    );


    const handleLike = async () => {
        setliked(!liked)
        await dispatch(likeUnlike(postId))
        if (isAccount) {
            alert.error("My account")
        }
        else {
            dispatch(getPostOfFollowing())

        }

    }

    const addCommentHandler = async (event) => {
        event.preventDefault()
        await dispatch(addComment(postId, comment.commentForm))
        if (isAccount) {
            alert.error("My account")
        }
        else {
            dispatch(getPostOfFollowing())

        }
    }

    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setliked(true)
            }
        })

    }, [likes, user._id])
    return (
        <div className="post">
            <div className="postHeader">
                <Button>
                    {
                        isAccount ? <MoreVert /> : null
                    }
                </Button>
            </div>

            <img src={postImage} alt="Post" />

            <div className="postDetails">
                <Avatar
                    src={ownerImage}
                    alt="User"
                    sx={{
                        height: "3vmax",
                        width: "3vmax",
                    }}
                />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {caption}
                </Typography>
            </div>

            <button
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    margin: "1vmax 2vmax",
                }}
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}>
                    {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
                </Button>

                <Button onClick={() => setComment({
                    commentToggle: !comment.commentToggle
                })}>
                    <ChatBubbleOutline />
                </Button>

                <Button>
                    {isDelete ? <DeleteOutline /> : null}
                </Button>

            </div>
            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>

                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>
            <Dialog open={comment.commentToggle} onClose={() => setComment({
                ...comment, commentToggle: !comment.commentToggle
            })}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>

                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={comment.commentForm}
                            onChange={(e) => setComment({ ...comment, commentForm: e.target.value })}
                            placeholder="Comment Here..."
                            required
                        />

                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </form>
                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                        ))
                    ) : (
                        <Typography>No comments Yet</Typography>
                    )}

                </div>
            </Dialog>
        </div>
    )
}
