import React, {Component} from 'react';
import {AiOutlineMail} from 'react-icons/ai';
import NotFound from '../notfound/NotFound';
import { withCookies } from 'react-cookie';


class EmailVerificationMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationCode: "",
            hiddenEmail : "",
            createdTime: ""
        }
    }

    composeHiddenEmail = (email) => {
        let replacedEmail = email[0];
        let emailAtIndex = email.indexOf("@")
        for(let i = 1 ; i < emailAtIndex; i++) {
            replacedEmail += "*"
        }
        return replacedEmail+email.substring(emailAtIndex)
    };

    componentDidMount() {
        if(this.props.cookies.get("registeredEmail") && this.props.cookies.get("createdTime")) {
            let emailFromRegisterForm = this.props.cookies.get("registeredEmail")
            // let emailFromRegisterForm = "harsha@gmail.com"
            let createdTime = new Date(this.props.cookies.get("createdTime"))
            createdTime.setHours(createdTime.getHours() + 1);
            let finalCreatedTime = new Date(createdTime.getTime()).toLocaleTimeString();
            let finalHiddenEmail = this.composeHiddenEmail(emailFromRegisterForm)
            this.setState({
                hiddenEmail: finalHiddenEmail,
                createdTime: finalCreatedTime
            })
        }
        
    }

    render() {
        if(this.props.cookies.get("registeredEmail") && this.props.cookies.get("createdTime")) {
            return (
                <div style={{marginTop: "50px"}}>
                    <center>
                        <div>
                            <AiOutlineMail style={{fontSize:"80px"}}/>
                            <h3 className="primary-color">Email Verification</h3>
                        </div>
                        <div className="pt-3">
                            <div className="card p-2 shadow-sm" style={{width: "30rem"}}>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label  className="pb-3" style={{float:"left"}} htmlFor="email">Verification Code</label>
                                            <input  type="text"
                                                    name="verification_code"
                                                    required
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    id="verification_code" aria-describedby="verification_codeHelp" placeholder="Enter 6-Digit Code" />
                                        </div>
                                        <div className="form-group pt-3">
                                            <button className="btn btn-success form-control" type="button">Verify</button>
                                        </div>
                                    </form>
                                    <p className="pt-3">
                                        {"We sent you a verification code to your email " + this.state.hiddenEmail + ". The code will expire at " + this.state.createdTime}
                                    </p>
                                    <button className="btn-config btn-primary-col" type="button">re-send verification code</button>
                                </div>
                            </div>
                        </div>
                    </center>
    
                </div>
            )
        } else {
            return (
                <NotFound />
            )
        }
        
    }
}

export default withCookies(EmailVerificationMessage);