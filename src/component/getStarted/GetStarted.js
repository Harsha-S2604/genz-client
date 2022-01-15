import React, { Component } from "react";
import UserSignup from "../../model/UserSignup";
import axios from "axios";
import { toast } from 'react-toastify';
import GetStartedBody from "./GetStartedBody";
import SigninBody from "../signin/SigninBody";
import { connect } from 'react-redux';
import { changeShowVerification, showLoginForm, onChangeEmail, onChangeName, onChangePassword, sendVerificationCode } from "../../actions/signupConfig";
import { showRegisterForm } from "../../actions/signinConfig";
import EmailVerificationMessage from "../emailVerify/EmailVerificationMessage";


var userApiCommonPattern = "http://localhost:8080/api/v1/users/"
class GetStarted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            usernameErrorMessage: "",
            passwordShow: false,
            registerMessage: "",
            isRegistering: false,
            isRegistered: false,
            isShowLoginForm: false
        }
    }

    handleRegister = () => {
        this.setState({
            isRegistering: true
        })
        let user = new UserSignup()
        user.email = this.state.email;
        user.name = this.state.username
        user.isEmailVerified = false;
        user.password = this.state.password;
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        axios.post(userApiCommonPattern+'register', user, reqConfig)
            .then(response => {
                if(response.data.success) {
                    this.props.cookies.set('registeredEmail', this.state.email);
                    this.props.cookies.set('createdTime', response.data.data)
                    this.setState({
                        registerMessage: response.data.message,
                        isRegistered: true,
                    })
                    this.resetRegisterState();
                } else {
                    this.setState({
                        isRegistering: false
                    })
                    toast.error(response.data.message);
                }
            })
            .catch((err) => {
                this.setState({
                    isRegistering: false
                })
                toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
            })
    }

    resetRegisterState = () => {
        this.setState({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            usernameErrorMessage: "",
            passwordShow: false,
            isRegistering: false
        })
    }

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleShowLoginForm=() => {
        this.setState({
            isShowLoginForm: !this.state.isShowLoginForm
        })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="getStartedModal" tabIndex="-1" role="dialog" aria-labelledby="getStartedModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                {
                                    this.props.isShowLoginForm ? 
                                    <div>
                                        <SigninBody {...this.props} showLoginForm={this.props.showLoginForm}/>
                                    </div> : 
                                    this.props.isShowVerification ? 
                                    <EmailVerificationMessage {...this.props}/> :
                                    <div className="container">
                                        <GetStartedBody {...this.props} />
                                        <p className="container pb-4">Already have an account? <a className="primary-color" onClick={() => this.props.showLoginForm(true)} href="#signin">Sign in</a></p> 
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    let { signupConfig } = state;
    return { ...signupConfig }
}

const mapDispatchProps = (dispatch) => {
    return {
        showLoginForm: (isShowLoginForm) => dispatch(showLoginForm(isShowLoginForm)),
        showRegisterForm: (isShowRegisterForm) => dispatch(showRegisterForm(isShowRegisterForm)),
        changeShowVerification: (isShowVerification) => dispatch(changeShowVerification(isShowVerification)),
        onChangeEmail: (email) => dispatch(onChangeEmail(email)),
        onChangeName: (username) => dispatch(onChangeName(username)),
        onChangePassword: (password) => dispatch(onChangePassword(password)),
        sendVerificationCode: (email) => dispatch(sendVerificationCode(email))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(GetStarted);