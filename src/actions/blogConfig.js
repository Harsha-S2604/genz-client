export const fetchBlogsAndStore = (email) => {
    return async(dispatch) => {
        try {
            var url = new URL("http://localhost:8080/genz-server/blog-api/fetch-blogs")
            url.searchParams.append("email", email)
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