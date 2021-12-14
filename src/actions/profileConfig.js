export const getUserProfileAndStore = (user_id) => {

    return async (dispatch) => {
        try {
            var url = new URL("http://localhost:8080/genz-server/user-api/fetch-profile")
            url.searchParams.append("userId", user_id)
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
                dispatch({type: "SAVE_USER_PROFILE_DATA", data: json.data})
            } else {
                dispatch({type: "FETCH_USER_PROFILE_ERROR", message: json.message})
            }

        } catch(err) {
            return dispatch({type: "FETCH_USER_PROFILE_ERROR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }

}

export const userProfileLoader = () => {
    return (dispatch) => {
        dispatch({type: "IS_PROFILE_LOADER_TRUE"})
    }
}

export const userProfileLoaderFalse = () => {
    return (dispatch) => {
        dispatch({type: "IS_PROFILE_LOADER_FALSE"})
    }
}

export const editUserName = (userName) => {
    return(dispatch) => {
        dispatch({type:"EDIT_USER_NAME", userName})
    }
}

export const updateUserName = (userName, userId) => {
    return async(dispatch) => {
        try {

        } catch(error) {

        }
    }
}