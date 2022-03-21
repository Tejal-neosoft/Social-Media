import axios from 'axios'
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest"
        })
        console.log(email, password)
        const { data } = await axios.post("/api/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "loginSuccess",
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: "loginFaliure",
            payload: error.response.data.message
        })

    }

}
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadingRequest"
        })
        const { data } = await axios.get("/api/myProfile", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch({
            type: "loadingSuccess",
            payload: data.post
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: "loadingFaliure",
            payload: error
        })

    }

}
export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest"
        })
        await axios.get("/api/logout")
        dispatch({
            type: "logoutSuccess",
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: "logoutFaliure",
            payload: error
        })

    }

}
export const getPostOfFollowing = () => async (dispatch) => {
    try {
        dispatch({
            type: "getPostOfFollowingRequest"
        })
        const { data } = await axios.get("/api/getPostOfFollowing")
        console.log(data.post, "data")
        dispatch({
            type: "getPostOfFollowingSuccess",
            payload: data.post
        })

    } catch (error) {
        dispatch({
            type: "getPostOfFollowingFaliure",
            payload: error
        })

    }

}
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllUsersRequest"
        })
        const { data } = await axios.get("/api/getAllProfile")
        console.log(data, "data")
        dispatch({
            type: "getAllUsersSuccess",
            payload: data.post
        })

    } catch (error) {
        dispatch({
            type: "getAllUsersFaliure",
            payload: error
        })

    }

}
