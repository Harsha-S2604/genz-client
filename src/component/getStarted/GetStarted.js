import React, { Component } from "react";
import UserSignup from "../../model/UserSignup";
import axios from "axios";
import { toast } from 'react-toastify';
import GetStartedBody from "./GetStartedBody";
import SigninBody from "../signin/SigninBody";
import { connect } from 'react-redux';
import { showLoginForm } from "../../actions/signupConfig";
import { showRegisterForm } from "../../actions/signinConfig";



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
        axios.post('http://localhost:8080/genz-server/user-api/register', user, reqConfig)
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

    handleChange = (event) => {

        const {name, value} = event.target;
        switch(name) {
            case "email":
                if(value === "") {
                    this.setState({
                        emailErrorMessage: "*Field required",
                        email: value
                    })
                } else {
                    const emailRegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/
                    if(value.match(emailRegExp)) {
                        this.setState({
                            emailErrorMessage: "",
                            email: value
                        })
                    } else {
                        this.setState({
                            emailErrorMessage: "*Invalid email",
                            email: value
                        })
                    }
                }
                break;
            
            case "username":
                if(value === "") {
                    this.setState({
                        usernameErrorMessage: "*Field required",
                        username: value
                    })
                } else {
                    this.setState({
                        usernameErrorMessage: "",
                        username: value
                    })
                }
                break;
            case "password":
                var passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
                if(this.state.confirmPassword) {
                    if(value === this.state.confirmPassword) {
                        this.setState({
                            confirmPasswordErrorMessage: "" 
                        })
                    } else {
                        this.setState({
                            confirmPasswordErrorMessage: "*Password do not match."
                        })
                    }
                }
                
                if(value === "") {
                    this.setState({
                        passwordErrorMessage: "*Field required",
                        password: value
                    })
                } else if(!(value.length > 5)) {
                    this.setState({
                        passwordErrorMessage: "*Minimum 6 characters required.",
                        password: value
                    })
                } else {
                    if(passwordPattern.test(value)) {
                        this.setState({
                            passwordErrorMessage: "",
                            password: value
                        })
                    } else {
                        this.setState({
                            passwordErrorMessage: "*should contain atleast 1 uppercase letter, 1 lowercase letter, 1 numeric, 1 special character.",
                            password: value
                        })
                    }
                    
                }
                break;

            case "confirmPassword":
                if(value !== this.state.password) {
                    this.setState({
                        confirmPasswordErrorMessage: "*password do not match.",
                        confirmPassword: value
                    })
                } else {
                    this.setState({
                        confirmPasswordErrorMessage: "",
                        confirmPassword: value
                    })
                }
                break;

            case "show_password":
                if(event.target.checked) {
                    this.setState({
                        passwordShow: true
                    })
                } else {
                    this.setState({
                        passwordShow: false
                    })
                }
                

            default:
                break;
            } 
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
        showRegisterForm: (isShowRegisterForm) => dispatch(showRegisterForm(isShowRegisterForm))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(GetStarted);