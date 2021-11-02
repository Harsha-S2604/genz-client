import { combineReducers } from "redux";
import writeConfig from "./writeConfig"; 
import signupConfig from "./signupConfig";
import profileConfig from "./profileConfig";
import signinConfig from "./signinConfig";

export default combineReducers({
    writeConfig,
    signupConfig,
    profileConfig,
    signinConfig,
})