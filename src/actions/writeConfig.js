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