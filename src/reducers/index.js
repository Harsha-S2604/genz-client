import { combineReducers } from "redux";
import writeConfig from "./writeConfig"; 
import signupConfig from "./signupConfig";

export default combineReducers({
    writeConfig,
    signupConfig
})