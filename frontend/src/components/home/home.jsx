import React, { useEffect } from 'react'
import './Home.css'
import { User } from '../User/User'
import { Post } from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPostOfFollowing, getAllUsers } from '../../Actions/userActions'
import { Typography } from '@mui/material'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'

export const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, posts, error } = useSelector(
        (state) => state.postOfFollowing
    );
    const { loading: userLoading, users } = useSelector(
        (state) => state.allUsers
    );

    const { error: likeError, message } = useSelector(
        (state) => state.likeUnlike
    );

    useEffect(() => {
        dispatch(getPostOfFollowing())
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearError" })
        }
        if (likeError) {
            alert.error(likeError)
            dispatch({ type: "clearError" })

        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })

        }
    }, [alert, error, message, likeError, dispatch])
    return loading === true || userLoading === true ? <Loader /> : (
        <div className="home">
            <div className="homeleft">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            likes={post.likes}
                            comments={post.comments}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner._id}
                        />
                    ))
                ) : (
                    <Typography variant="h6">No posts yet</Typography>
                )}

            </div>
            <div className="homeright">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))
                ) : (
                    <Typography>No Users Yet</Typography>
                )}

            </div>
        </div>
    )
}
