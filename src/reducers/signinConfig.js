const signinConfigInitState = {
    isShowRegisterForm: false
}

const signinConfig = (state = signinConfigInitState, action) => {
    
    switch(action.type) {
        case "SHOW_REGISTER_FORM":
            return {
                ...state,
                isShowRegisterForm: action.data.isShowRegisterForm
            }
        default:
            break;
    }

    return state;
}

export default signinConfig;