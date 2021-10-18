const signupConfigInitState = {
    registeredEmail: ""
}

const signupConfig = (state = signupConfigInitState, action) => {

    switch(action.type) {

        case "SAVE_REGISTERED_EMAIL":
            console.log("From reducers", action.data.email)
            return {
                ...state,
                registeredEmail: action.data.email
            }
    }

    return state;
}

export default signupConfig;
