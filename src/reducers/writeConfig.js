const writeConfigInitState = {
    createBlogArr : []
}

const writeConfig = (state = writeConfigInitState, action) => {

    switch(action.type) {
        case "WRITE_CONFIG":
            let createBlogArr = [...state.createBlogArr]
            createBlogArr.push(action.data.writeOption);
            return {
                ...state,
                createBlogArr: createBlogArr
            }
        case "DELETE_BLOG_OPION":
            return {
                ...state,
                createBlogArr: [
                    ...state.createBlogArr.slice(0, action.data.index),
                    ...state.createBlogArr.slice(action.data.index + 1)
                ],
            }
        case "RESET_BLOG_OPIONS":
            return {
                ...state,
                createBlogArr: []
            } 
    }

    return state;

} 

export default writeConfig;