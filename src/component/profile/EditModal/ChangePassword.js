import React, {Component} from 'react';

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
                var passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
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
                } else {

                    if(passwordPattern.test(value)) {
                        this.setState({
                            newPasswdErr: "",
                            newPasswd: value
                        })
                    } else {
                        this.setState({
                            newPasswdErr: "*should contain atleast 1 uppercase letter, 1 lowercase letter, 1 numeric, 1 special character.",
                            newPasswd: value
                        })
                    }

                }
                break;

            case "confirm_new_passwd":
                break;
            
            default:
                break;
                
        }
    }
    render() {
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
                                                className="form-control" 
                                                name="old_passwd"
                                                id="old_passwd"
                                            />
                                        </div>
                                        <div className="form-group pb-3">
                                            <label htmlFor="new_passwd"><b>New Password</b></label>
                                            <input type="password"
                                                required
                                                className="form-control" 
                                                name="new_passwd"
                                                id="new_passwd"
                                            />
                                        </div>
                                        <div className="form-group pb-3">
                                            <label htmlFor="confirm_new_passwd"><b>Confirm New Password</b></label>
                                            <input type="password"
                                                required
                                                className="form-control" 
                                                name="confirm_new_passwd"
                                                id="confirm_new_passwd"
                                            />
                                        </div>
                                    </form>
                                    <div style={{float: "right"}}>
                                        <button className="btn btn-outline-dark">Save</button>
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

export default ChangePassword