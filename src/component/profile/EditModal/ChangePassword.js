import axios from 'axios';
import React, {Component} from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

var userApiCommonPattern = "http://localhost:8080/api/v1/users/"
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPasswd: "",
            newPasswd: "",
            confirmNewPasswd: "",
            oldPasswdErr: "",
            newPasswdErr: "",
            confirmNewPasswdErr: ""
        }
    }

    changePassword = () => {
        let passwordObj = {
            userId: this.props.userProfileData["UserId"],
            oldPasswd: this.state.oldPasswd,
            newPasswd: this.state.newPasswd,
            confirmPasswd: this.state.confirmNewPasswd
        }
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        axios.post(userApiCommonPattern+'change-passwd', passwordObj, reqConfig)
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        oldPasswd: "",
                        newPasswd: "",
                        confirmNewPasswd: "",
                        oldPasswdErr: "",
                        newPasswdErr: "",
                        confirmNewPasswdErr: ""  
                    })
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((err) => {
                toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
            })
    }

    handlePasswordChange = (event) => {
        const {name, value} = event.target
        switch(name) {
            case "old_passwd":
                if(value === "") {
                    this.setState({
                        oldPasswdErr: "*Field Required",
                        oldPasswd: value
                    })
                } else if(value.length < 6) {
                    this.setState({
                        oldPasswdErr: "*Password should be minimum of 6 characters",
                        oldPasswd: value
                    })
                } else {
                    this.setState({
                        oldPasswd: value,
                        oldPasswdErr: ""
                    })
                }
                break;
            
            case "new_passwd":
                if(value === "") {
                    this.setState({
                        newPasswdErr: "*Field Required",
                        newPasswd: value
                    })
                } else if(value.length < 6) {
                    this.setState({
                        newPasswdErr: "*Password should be minimum of 6 characters",
                        newPasswd: value
                    })
                } else if(value === this.state.oldPasswd) {
                    this.setState({
                        newPasswdErr: "*New password cannot be same as old password",
                        newPasswd: value
                    })
                } else { 
                    this.setState({
                        newPasswdErr: "",
                        newPasswd: value
                    })
                }
                break;

            case "confirm_new_passwd":
                if(value === "") {
                    this.setState({
                        confirmNewPasswdErr: "*Field Required",
                        confirmNewPasswd: value
                    })
                } else if(value !== this.state.newPasswd) {
                    this.setState({
                        confirmNewPasswd: value,
                        confirmNewPasswdErr: "*Password do not match"
                    })
                } else {
                    this.setState({
                        confirmNewPasswd: value,
                        confirmNewPasswdErr: ""
                    })
                }
                break;
            
            default:
                break;
                
        }
    }
    render() {
        const isDisabled = !(this.state.confirmNewPasswdErr === "" && this.state.newPasswdErr === "" && this.state.oldPasswdErr === "" && this.state.oldPasswd !== "" && this.state.newPasswd !== "" && this.state.confirmNewPasswd !== "")
        return (
            <div className="modal fade" id="chng_passwd" tabIndex="-1" role="dialog" aria-labelledby="chng_passwd" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="container">
                                <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                                    <span className="font-size-25" aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="pt-2"><b>Change Password</b></h4>
                                <div className="pt-3">
                                    <form>
                                        <div className="form-group pb-3">
                                            <label htmlFor="old_passwd"><b>Old Password</b></label>
                                            <input type="password"
                                                required
                                                value={this.state.oldPasswd}
                                                className="form-control"
                                                onChange={this.handlePasswordChange}
                                                name="old_passwd"
                                                id="old_passwd"
                                            />
                                            {
                                                this.state.oldPasswdErr ? 
                                                <span className="error_message_css_config pt-2">{this.state.oldPasswdErr}</span>:null
                                            }
                                        </div>
                                        <div className="form-group pb-3">
                                            <label htmlFor="new_passwd"><b>New Password</b></label>
                                            <input type="password"
                                                required
                                                onChange={this.handlePasswordChange}
                                                value={this.state.newPasswd}
                                                className="form-control" 
                                                name="new_passwd"
                                                id="new_passwd"
                                            />
                                            {
                                                this.state.newPasswdErr ? 
                                                <span className="error_message_css_config pt-2">{this.state.newPasswdErr}</span>:null
                                            }
                                        </div>
                                        <div className="form-group pb-3">
                                            <label htmlFor="confirm_new_passwd"><b>Confirm New Password</b></label>
                                            <input type="password"
                                                required
                                                onChange={this.handlePasswordChange}
                                                value={this.state.confirmNewPasswd}
                                                className="form-control" 
                                                name="confirm_new_passwd"
                                                id="confirm_new_passwd"
                                            />
                                            {
                                                this.state.confirmNewPasswdErr ? 
                                                <span className="error_message_css_config pt-2">{this.state.confirmNewPasswdErr}</span>:null
                                            }
                                        </div>
                                    </form>
                                    <div style={{float: "right"}}>
                                        <button className="btn btn-outline-dark" disabled={isDisabled} onClick={this.changePassword}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let { profileConfig } = state;
    return { ...profileConfig }
}

const mapDispatchProps = (dispatch) => {
    return {
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(ChangePassword)