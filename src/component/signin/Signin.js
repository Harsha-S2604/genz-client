import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import UserSignin from "../../model/UserSignin";
import axios from 'axios';
import { toast } from 'react-toastify';
import GetStarted from "../getStarted/GetStarted";
import SigninBody from "./SigninBody";
import GetStartedBody from "../getStarted/GetStartedBody";
import { showRegisterForm } from "../../actions/signinConfig";
import { connect } from "react-redux";
import { showLoginForm } from "../../actions/signupConfig";


class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            loginErrorMessage: "",
            isLoggedIn: false,
            loggedEmail: "",
            loggedId: "",
            loggedAccVerfied: "",
            isShowSignUpForm: false
        }
    }

    handleShowSignUpForm = () => {
        let isShowSignUpForm = !this.state.isShowSignUpForm
        this.setState({
            isShowSignUpForm
        })
    }

    handleLogin = async () => {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let user = new UserSignin();
        user.email = email;
        user.password = password;
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        try {
            const response = await axios.post("http://localhost:8080/genz-server/user-api/login", user, reqConfig)
            if(response.data.success) {
                this.setState({
                    loggedEmail: response.data.data.Email,
                    loggedId: response.data.data.UserId,
                    loggedAccVerfied: response.data.data.IsEmailVerified,
                    loginErrorMessage: "", 
                    isLoggedIn: true
                })
            this.props.cookies.set('email', this.state.loggedEmail);
            this.props.cookies.set('id', this.state.loggedId);
            this.props.cookies.set('isVerified', this.state.loggedAccVerfied);
            this.props.cookies.set('isLoggedIn', this.state.isLoggedIn);
            this.props.cookies.set('name', response.data.data.Name)

            } else {
                this.setState({loginErrorMessage: response.data.message, isLoggedIn: false})
            }
        } catch(error) {
            console.log(error);
            toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
        }
        
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
            case "password":
                if(value === "") {
                    this.setState({
                        passwordErrorMessage: "*Field required",
                        password: value
                    })
                } else {
                    if(value.length < 6) {
                        this.setState({
                            password: value,
                            passwordErrorMessage: "*Password must be at least 6 characters"
                        })    
                    } else {
                        this.setState({
                            password: value,
                            passwordErrorMessage: ""
                        })
                    }
                }
                break;
            case "show password":
                let passwordField = document.getElementById("password")
                if(event.target.checked) {
                    passwordField.type = "text" 
                } else {
                    passwordField.type = "password"
                }
                break;
            default:
                break;
        }
    }

    render() {
        if(this.state.isLoggedIn) {
            window.location = "/";
        }
        return (          
            <div>
                <div className="modal fade" id="signInModalCenter" tabIndex="-1" role="dialog" aria-labelledby="signInModalCenter" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                {
                                    this.props.isShowRegisterForm ? <div><GetStartedBody {...this.props}/></div>:
                                    <div className="container">
                                        <SigninBody {...this.props} cookies={this.props.cookies} handleLoggedIn={this.props.handleLoggedIn}/>
                                        <p className="container">Don't have an account? <a className="primary-color" onClick={() => this.props.showRegisterForm(true)}href="#signup">Sign up</a></p>
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
    const {signinConfig} = state;
    return {...signinConfig}
}

const mapDispatchProps = (dispatch) => {
    return {
        showRegisterForm: (isShowRegisterForm) => dispatch(showRegisterForm(isShowRegisterForm)),
        showLoginForm: (isShowLoginForm) => dispatch(showLoginForm(isShowLoginForm))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(Signin)