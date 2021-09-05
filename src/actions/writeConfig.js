export const addForOptionWriteBlog = (option) => {

    return (dispatch) => {
        dispatch({type: "WRITE_CONFIG", data: {writeOption: option}})
    }

}

export const resetOptionWriteBlog = () => {

    return (dispatch) => {
        dispatch({type: "RESET_BLOG_OPIONS"})
    }

}

export const deleteBlogOption = (index) => {
    
    return (dispatch) => {
        dispatch({type: "DELETE_BLOG_OPION", data:{index}})
    }

}