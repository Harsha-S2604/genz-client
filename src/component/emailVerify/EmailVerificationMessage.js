import React, {Component} from 'react';
import {AiOutlineMail} from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';



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
            resentCount: null,
            isVerifying: false,
            isSending: false,
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
            let emailFromRegisterForm = this.props.email
            let finalHiddenEmail = this.composeHiddenEmail(emailFromRegisterForm)
            this.setState({
                hiddenEmail: finalHiddenEmail,
            })
    }

    composeTime = () => {

        let createdTime = new Date(this.props.cookies.get("createdTime"))
        createdTime.setHours(createdTime.getHours() + 1);
        let finalCreatedTime = new Date(createdTime.getTime()).toLocaleTimeString();
        this.setState({
            createdTime: finalCreatedTime
        })
    }    

    handleChange = (event) => {
        const {name, value} = event.target;

        switch(name) {
            case "verification_code":
                if(!(value.length >= 5 && value.length <= 6)) {
                    this.setState({
                        verificationCodeErr: "*verification code should be a 5 or 6 digit number"
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

    handleResend = async () => {
        this.setState({
            isSending: true
        })
        await this.props.sendVerificationCode(this.props.email)
        if(this.props.isCodeSent) {
            toast.success("Verification code sent to your email.")
        } else {
            toast.error(this.props.isCodeSentErr)
        }
        this.setState({
            isSending: false
        })
    }

    handleRegister = () => {
        this.setState({
            isVerifying: true
        })
        let user = {
            "email": this.props.email,
            "name": this.props.username,
            "password": this.props.password,
            "verificationCode": this.state.verificationCode
        }
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        axios.post(userApiCommonPattern+'register', user, reqConfig)
            .then(response => {
                if(response.data.success) {
                    console.log("registered successfully")
                } else {
                    console.log("Failed to register")
                    toast.error(response.data.message);
                }
                this.setState({
                    isVerifying: false
                })
            })
            .catch((err) => {
                this.setState({
                    isVerifying: false
                })
                console.log("failed to register")
                toast.error("Sorry dude, something went wrong. Our team is working on it. Please try again later.")
            })
    }

    handleVerifiyCode = () => {
        let email = this.props.email
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
        const isDisabled = (this.state.verificationCodeErr === "" && this.state.verificationCode !== "")
        return (
            <div className="p-4">
                <center>
                    <div>
                        <AiOutlineMail style={{fontSize:"80px"}}/>
                        <h3 className="primary-color">Email Verification</h3>
                    </div>
                    <hr />
                    <div className="pt-3">
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
                            {
                                this.state.isVerifying ? 
                                <button className="btn-config btn-primary-col" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                                    <span className="sr-only">Verifying...</span>
                                </button> : <button onClick={this.handleRegister} className="btn btn-success form-control" type="button" disabled={!isDisabled}>Verify</button>
                            }
                            </div>
                        </form>
                        <p className="pt-3">
                            {"We sent you a verification code to your email " + this.state.hiddenEmail + ". The code will expire after one hour."}
                        </p>
                        {
                                this.state.isSending ? 
                                <button className="btn-config btn-primary-col" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                                    <span className="sr-only">re-send verification code</span>
                                </button> : <div><button className="btn-config btn-primary-col" type="button" onClick={this.handleResend}>re-send verification code</button><br /><br /></div>
                        }
                                
                            
                    </div>
                </center>

            </div>
        )
        
        
    }
}

export default EmailVerificationMessage;