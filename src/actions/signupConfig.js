
export const saveRegisteredEmail = (email) => {

    return (dispatch) => {
        dispatch({type: "SAVE_REGISTERED_EMAIL", data: {email}})
    }

}

export const showLoginForm = (isShowLoginForm) => {
    console.log("Sdfd")

    return (dispatch) => {
        dispatch({type: "SHOW_LOGIN_FORM", data: {isShowLoginForm}})
    }

}