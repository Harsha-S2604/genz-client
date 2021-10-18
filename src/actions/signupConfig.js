
export const saveRegisteredEmail = (email) => {

    return (dispatch) => {
        dispatch({type: "SAVE_REGISTERED_EMAIL", data: {email}})
    }

}