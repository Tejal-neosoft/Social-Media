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
            payload: error
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
        console.log(data)
        dispatch({
            type: "loadingSuccess",
            payload: data.post
        })

    } catch (error) {
        dispatch({
            type: "loadingFaliure",
            payload: error
        })

    }

}