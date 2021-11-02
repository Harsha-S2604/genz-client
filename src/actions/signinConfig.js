export const showRegisterForm = (isShowRegisterForm) => {

    return (dispatch) => {
        dispatch({type: "SHOW_REGISTER_FORM", data: {isShowRegisterForm}})
    }

}