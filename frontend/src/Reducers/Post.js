import { createReducer } from '@reduxjs/toolkit'

const initialState = {}


export const likeUnlikeReducer = createReducer(initialState, {
    likeUnlikeRequest: (state) => {
        state.loading = true
    },
    likeUnlikeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeUnlikeFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addCommentRequest: (state) => {
        state.loading = true
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addCommentFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
        state.loading = true
    },
    deleteCommentSuccess: (state, action) => {
        console.log(action.payload, "action.payload")
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null
    },
    clearMessage: (state) => {
        state.message = null
    }
})

export const getMyPostsReducers = createReducer(initialState, {
    getMyPostsRequest: (state) => {
        state.loading = true
    },
    getMyPostsSuccess: (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.posts = action.payload;
    },
    getMyPostsFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})