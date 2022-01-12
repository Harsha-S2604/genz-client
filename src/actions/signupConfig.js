var userApiCommonPattern = "http://localhost:8080/api/v1/users/"

export const saveRegisteredEmail = (email) => {

    return (dispatch) => {
        dispatch({type: "SAVE_REGISTERED_EMAIL", data: {email}})
    }

}

export const showLoginForm = (isShowLoginForm) => {

    return (dispatch) => {
        dispatch({type: "SHOW_LOGIN_FORM", data: {isShowLoginForm}})
    }

}

export const getCodeCount = (email) => {

    return async (dispatch) => {
        try {
            var url = new URL(userApiCommonPattern+"verify/count")
            let _data = {
                "email": email,
            }
            
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Genz-Token': '4439EA5BDBA8B179722265789D029477'

                },
                body: JSON.stringify(_data),
            })
            const json = await response.json()
            if(json.success) {
                dispatch({type: "SAVE_COUNT_DATA", data: json.data})
            } else {
                dispatch({type: "SAVE_COUNT_DATA_ERR", message: json.message})
            }

        } catch(err) {
            return dispatch({type: "SAVE_COUNT_DATA_ERR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }

}