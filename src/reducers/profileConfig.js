const profileConfigInitState = {
    userProfileData: {},
    userProfileDataError: "",
    userProfileDataFetchLoader: false,
    userName: ""
}


const profileConfig = (state = profileConfigInitState, action) => {
    
    switch(action.type) {
        case "SAVE_USER_PROFILE_DATA":
            return {
                ...state,
                userProfileData: action.data,
                userName: action.data["Name"],
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

        case "EDIT_USER_NAME":
            let userName = action.userName
            return {
                ...state,
                userName
            }

        case "EDIT_USER_NAME_SUCCESS":
            let chngdUserName = action.userName
            let userProfileData = state.userProfileData
            userProfileData["Name"] = chngdUserName
            return {
                ...state,
                userProfileData
            }
        
        default:
            break;
    }

    return state;
} 



export default profileConfig;