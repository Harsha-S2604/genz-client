const signupConfigInitState = {
    registeredEmail: "",
    isShowLoginForm: false,
    isCodeSent: 0,
    isShowVerification: false,
    email : "",
    username: "",
    password: "",
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
        
        case "IS_CODE_SENT":
            return {
                ...state,
                isCodeSent: action.data,
                isCodeSentErr: ""
            }
        
        case "IS_CODE_SENT_ERR":
            return {
                ...state,
                isCodeSentErr: action.message,
                isCodeSent: false

            }
        
        case "CHANGE_SHOW_VERIFICATION":
            return {
                ...state,
                isShowVerification: action.data.isShowVerification
            }
        
        case "ON_CHANGE_REGISTRATION_EMAIL":
            return {
                ...state,
                email: action.data.email
            }
        
        case "ON_CHANGE_REGISTRATION_NAME":
            return {
                ...state,
                username: action.data.username
            }
        
        case "ON_CHANGE_REGISTRATION_PASSWORD":
            return {
                ...state,
                password: action.data.password
            }
        
        default:
            break;
    }

    return state;
}

export default signupConfig;
