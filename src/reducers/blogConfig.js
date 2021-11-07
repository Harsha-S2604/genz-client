import moment from 'moment';

const blogConfigInitialState = {
    blogs: [],
    blogsFetchError: "",
    isFetchStoriesLoader: false,
    viewBlogData: {},
    viewBlogDataError: "",
    isFetchStoryLoader: false,
}

const decodeTimeToBase64 = (time) => {
    let decodeData = Buffer.from(time, 'base64').toString();
    return moment(decodeData).format()
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
                blogsFetchError: action.message,
                isFetchStoriesLoader: false,
            }

        case "STORIES_LOADER":
            return{
                ...state,
                isFetchStoriesLoader: action.data.isFetchStoriesLoader
            }
        case "STORY_LOADER":
            return{
                ...state,
                isFetchStoryLoader: action.data.isFetchStoryLoader
            }
        case "VIEW_BLOG_DATA":
            var createdAt = decodeTimeToBase64(action.data.BlogCreatedAt)
            var updatedAt = decodeTimeToBase64(action.data.BlogLastUpdatedAt)
            action.data["BlogCreatedAt"] = createdAt
            action.data["BlogLastUpdatedAt"] = updatedAt
            return {
                ...state,
                viewBlogData: action.data,
                viewBlogDataError: "",
                isFetchStoryLoader: false,
            }
        case "FETCH_VIEW_BLOG_ERROR":
            return {
                ...state,
                viewBlogData: {},
                viewBlogDataError: action.message,
                isFetchStoryLoader: false,
            }
            
        default:
            break;
    }

    return state;
}

export default blogConfig;