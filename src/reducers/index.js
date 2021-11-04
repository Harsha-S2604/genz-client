import { combineReducers } from "redux";
import writeConfig from "./writeConfig"; 
import signupConfig from "./signupConfig";
import profileConfig from "./profileConfig";
import signinConfig from "./signinConfig";
import blogConfig from "./blogConfig";

export default combineReducers({
    writeConfig,
    signupConfig,
    profileConfig,
    signinConfig,
    blogConfig,
})