const signupConfigInitState = {
    registeredEmail: "",
    isShowLoginForm: false
}

const signupConfig = (state = signupConfigInitState, action) => {

    switch(action.type) {

        case "SAVE_REGISTERED_EMAIL":
            console.log("From reducers", action.data.email)
            return {
                ...state,
                registeredEmail: action.data.email
            }

        case "SHOW_LOGIN_FORM":
            return {
                ...state,
                isShowLoginForm: action.data.isShowLoginForm

            }
        
        default:
            break;
    }

    return state;
}

export default signupConfig;
