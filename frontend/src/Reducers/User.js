import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const userReducer = createReducer(initialState, {
    loginRequest: (state) => {
        state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loginFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },

    registerRequest: (state) => {
        state.loading = true
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;

    },
    registerFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },


    loadingRequest: (state) => {
        state.loading = true
    },
    loadingSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    loadingFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

    },
    logoutRequest: (state) => {
        state.loading = true
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;

    },
    logoutFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearError: (state) => {
        state.error = null
    }

})
export const getPostOfFollowingReducer = createReducer(initialState, {
    getPostOfFollowingRequest: (state) => {
        state.loading = true
    },
    getPostOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    getPostOfFollowingFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null
    }

})
export const getAllUsers = createReducer(initialState, {
    getAllUsersRequest: (state) => {
        state.loading = true
    },
    getAllUsersSuccess: (state, action) => {
        console.log(state.post)
        state.loading = false;
        state.users = action.payload;
    },
    getAllUsersFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null
    }

})