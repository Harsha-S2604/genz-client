import React, {Component} from 'react';
import {AiOutlineMail} from 'react-icons/ai';
import NotFound from '../notfound/NotFound';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';



var userApiCommonPattern = "http://localhost:8080/api/v1/users/"
class EmailVerificationMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verificationCode: "",
            hiddenEmail : "",
            createdTime: "",
            isVerified: false,
            verificationCodeErr: "",
            seconds: 30,
            isHideResend: true,
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
            let createdTime = new Date(this.props.cookies.get("createdTime"))
            createdTime.setHours(createdTime.getHours() + 1);
            let finalCreatedTime = new Date(createdTime.getTime()).toLocaleTimeString();
            let finalHiddenEmail = this.composeHiddenEmail(emailFromRegisterForm)
            this.setState({
                hiddenEmail: finalHiddenEmail,
                createdTime: finalCreatedTime
            })
            this.startTimer();
        }
        
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        switch(name) {
            case "verification_code":
                if(value.length !== 6) {
                    this.setState({
                        verificationCodeErr: "*verification code should be a 6 digit number"
                    })
                } else {
                    this.setState({
                        verificationCodeErr: ""
                    })
                }

                this.setState({
                    verificationCode: value
                })
                break;

            default:
                break;

        }

    }

    startTimer = () => {
        if(this.state.seconds > 0) {
            this.interval = setInterval(() => this.countDown(), 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.interval);
          this.setState({
              isHideResend: false
          })
        }
      }

    handleVerifiyCode = () => {
        let email = this.props.cookies.get("registeredEmail")
        let verificationCode = this.state.verificationCode

        let userVerificationCode = {
            "verificationCode": verificationCode,
            "email": email,
        }

        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        
        axios.post(userApiCommonPattern+'verify', userVerificationCode, reqConfig)
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        isVerified: true
                    })
                } else {
                    this.setState({
                        isVerified: false
                    })
                    toast.error(response.data.message);

                }
            })
            .catch((error) => {
                this.setState({
                    isVerified: false
                })
                toast.error("Something went wrong. Our team is working on it. Please try again later.")
            })
    }

    render() {
        if(this.state.isVerified) {
            return (
                <Redirect to="/email_verification_success" />
            )
        }
        const isDisabled = (this.state.verificationCodeErr === "" && this.state.verificationCode !== "")
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
                                            {
                                                this.state.verificationCodeErr ? 
                                                <p className="text-danger">{this.state.verificationCodeErr}</p> : null
                                            }
                                        </div>
                                        <div className="form-group pt-3">
                                            <button onClick={this.handleVerifiyCode} className="btn btn-success form-control" type="button" disabled={!isDisabled}>Verify</button>
                                        </div>
                                    </form>
                                    <p className="pt-3">
                                        {"We sent you a verification code to your email " + this.state.hiddenEmail + ". The code will expire at " + this.state.createdTime}
                                    </p>
                                    <button className="btn-config btn-primary-col" type="button" disabled={this.state.isHideResend}>re-send verification code</button><br /><br />
                                    <p style={{color: "gray"}}>resend verification code in {this.state.seconds}s</p>
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