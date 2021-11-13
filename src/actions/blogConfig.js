export const fetchBlogsAndStore = (email, isGetDraft) => {
    return async(dispatch) => {
        try {
            var url = new URL("http://localhost:8080/genz-server/blog-api/fetch-blogs")
            url.searchParams.append("email", email)
            url.searchParams.append("get_draft", isGetDraft)
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Genz-Token': '4439EA5BDBA8B179722265789D029477'

                }
            })
            const json = await response.json()
            if(json.success) {
                dispatch({type: "SAVE_BLOGS_DATA", data: json.data})
            } else {
                dispatch({type: "FETCH_BLOGS_ERROR", message: json.message})
            }


        } catch(error) {
            return dispatch({type: "FETCH_BLOGS_ERROR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }
}

export const fetchStoriesLoader = (isFetchStoriesLoader) => {
    return (dispatch) => {
        dispatch({type:"STORIES_LOADER", data:{isFetchStoriesLoader}})
    }
}

export const fetchStoryLoader = (isFetchStoryLoader) => {
    return (dispatch) => {
        dispatch({type:"STORY_LOADER", data:{isFetchStoryLoader}})
    }
}

export const displayBlog = (blogId, email, isGetDraft) => {
    return async (dispatch) => {
        try {
            var url = new URL("http://localhost:8080/genz-server/blog-api/fetch-blog")
            url.searchParams.append("email", email)
            url.searchParams.append("blogId", blogId)
            url.searchParams.append("get_draft", isGetDraft)
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Genz-Token': '4439EA5BDBA8B179722265789D029477'

                }
            })
            const json = await response.json()
            if(json.success) {
                dispatch({type: "VIEW_BLOG_DATA", data: json.data})
            } else {
                dispatch({type: "FETCH_VIEW_BLOG_ERROR", message: json.message})
            }
        } catch(error) {
            return dispatch({type: "FETCH_VIEW_BLOG_ERROR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }
}

export const homeLoader = (isHomeLoader) => {
    return (dispatch) => {
        dispatch({type:"HOME_LOADER", data:{isHomeLoader}})
    }
}

export const fetchRecentBlogs = () => {
    return async(dispatch) => {
        try {
            var url = new URL("http://localhost:8080/genz-server/blog-api/recent-blogs")
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Genz-Token': '4439EA5BDBA8B179722265789D029477'

                }
            })
            const json = await response.json()
            if(json.success) {
                dispatch({type: "RECENT_BLOGS_DATA", data: json.data})
            } else {
                dispatch({type: "RECENT_BLOGS_DATA_ERROR", message: json.message})
            }
        } catch(error) {
            return dispatch({type: "RECENT_BLOGS_DATA_ERROR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }
}