const writeConfigInitState = {
    createBlogArr : []
}

const writeConfig = (state = writeConfigInitState, action) => {

    switch(action.type) {
        case "WRITE_CONFIG":
            let createBlogArr = state.createBlogArr
            createBlogArr.push(action.data.writeOption);
            return {
                ...state,
                createBlogArr: createBlogArr
            }
        case "RESET_BLOG_OPIONS":
            state.createBlogArr.splice(0, state.createBlogArr.length)
            return {
                ...state
            } 
        default:
            return state
    }

} 

export default writeConfig;