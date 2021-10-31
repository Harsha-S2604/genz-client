import { combineReducers } from "redux";
import writeConfig from "./writeConfig"; 
import signupConfig from "./signupConfig";
import profileConfig from "./profileConfig";

export default combineReducers({
    writeConfig,
    signupConfig,
    profileConfig
})