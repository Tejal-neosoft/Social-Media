import { configureStore } from '@reduxjs/toolkit'
import { getPostOfFollowingReducer, userReducer, getAllUsers } from './Reducers/UserReducer'
import { likeUnlikeReducer, getMyPostsReducers } from './Reducers/postReducer'

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: getPostOfFollowingReducer,
        allUsers: getAllUsers,
        likeUnlike: likeUnlikeReducer,
        myPosts: getMyPostsReducers

    }
})

export default store;
