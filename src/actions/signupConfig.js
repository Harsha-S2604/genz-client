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

export const changeShowVerification = (isShowVerification) => {
    return (dispatch) => {
        dispatch({type: "CHANGE_SHOW_VERIFICATION", data: {isShowVerification}})
    }
}

export const onChangeEmail = (email) => {
    return (dispatch) => {
        dispatch({type: "ON_CHANGE_REGISTRATION_EMAIL", data: {email}})
    }
}

export const onChangeName = (username) => {
    return (dispatch) => {
        dispatch({type: "ON_CHANGE_REGISTRATION_NAME", data: {username}})
    }
}

export const onChangePassword = (password) => {
    return (dispatch) => {
        dispatch({type: "ON_CHANGE_REGISTRATION_PASSWORD", data: {password}})
    }
}

export const sendVerificationCode = (email) => {
    return async (dispatch) => {
        try {
            var url = new URL(userApiCommonPattern+"verify/send")
            let _data = {
                "email": email,
            }
            
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                dispatch({type: "IS_CODE_SENT", data: json.success})
            } else {
                dispatch({type: "IS_CODE_SENT_ERR", message: json.message})
            }

        } catch(err) {
            return dispatch({type: "IS_CODE_SENT_ERR", message: "Sorry, something went wrong. Our team is working on it. Please, try again later."})
        }
    }

}