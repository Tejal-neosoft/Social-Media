import axios from 'axios'

export const likeUnlike = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "likeUnlikeRequest"
        })
        const { data } = await axios.get(`/api/post/${id}`)
        console.log(data)
        dispatch({
            type: "likeUnlikeSuccess",
            payload: data.message
        })
    }
    catch (error) {
        dispatch({
            type: "likeUnlikeFaliure",
            payload: error
        })

    }
}
export const addComment = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest"
        })

        const { data } = await axios.put(`/api/comment/${id}`,
            {
                comment
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        )
        dispatch({
            type: "addCommentSuccess",
            payload: data.message
        })
    }
    catch (error) {
        dispatch({
            type: "addCommentFaliure",
            payload: error
        })
    }
}
export const deleteCommentReducer = (id, commentId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest"
        })
        const { data } = await axios.delete(`/api/comment/${id}`, {
            data: { commentId },
        });

        console.log(data, "data in post actions")
        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message
        })
    }
    catch (error) {
        dispatch({
            type: "deleteCommentFaliure",
            payload: error
        })
    }
}
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getMyPostsRequest"
        })
        const { data } = await axios.get("/api/getMyposts")
        console.log(data, "data")
        dispatch({
            type: "getMyPostsSuccess",
            payload: data.post
        })

    } catch (error) {
        dispatch({
            type: "getMyPostsFaliure",
            payload: error
        })

    }

}