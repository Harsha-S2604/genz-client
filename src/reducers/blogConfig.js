const blogConfigInitialState = {
    blogs: [],
    blogsFetchError: "",
    isFetchStoriesLoader: false,
}

const blogConfig = (state = blogConfigInitialState, action) => {

    switch(action.type) {
        case "SAVE_BLOGS_DATA":
            var blogsData;
            if(action.data) {
                blogsData = action.data
            } else {
                blogsData = []
            }
            return {
                ...state,
                blogs: blogsData,
                blogsFetchError: "",
                isFetchStoriesLoader: false,
            }
        case "FETCH_BLOGS_ERROR":
            return {
                ...state,
                blogs: [],
                blogsFetchError: action.message
            }

        case "STORIES_LOADER":
            return{
                ...state,
                isFetchStoriesLoader: action.data.isFetchStoriesLoader
            }
        default:
            break;
    }

    return state;
}

export default blogConfig;