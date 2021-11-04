const profileConfigInitState = {
    userProfileData: {},
    userProfileDataError: "",
    userProfileDataFetchLoader: false
}


const profileConfig = (state = profileConfigInitState, action) => {
    
    switch(action.type) {
        case "SAVE_USER_PROFILE_DATA":
            return {
                ...state,
                userProfileData: action.data,
                userProfileDataError: "",
                userProfileDataFetchLoader: false
            }
        
        case "FETCH_USER_PROFILE_ERROR":
            return {
                ...state,
                userProfileData: {},
                userProfileDataError: action.message,
                userProfileDataFetchLoader: false
            }

        case "IS_PROFILE_LOADER_TRUE":
            return {
                ...state,
                userProfileDataFetchLoader: true
            }
        
        case "IS_PROFILE_LOADER_FALSE":
            return {
                ...state,
                userProfileDataFetchLoader: false
            }
        
        default:
            break;
    }

    return state;
} 



export default profileConfig;