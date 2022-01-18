import React, {Component} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import UserSignin from "../../model/UserSignin";
import axios from 'axios';
import { toast } from 'react-toastify';

var userApiCommonPattern = "http://localhost:8080/api/v1/users/"
export default class SigninBody extends Component {

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
            isShowSignUpForm: false,
            isLoggingIn: false,
        }
    }

    handleShowSignUpForm = () => {
        let isShowSignUpForm = !this.state.isShowSignUpForm
        this.setState({
            isShowSignUpForm
        })
    }

    handleLogin = async () => {
        this.setState({
            isLoggingIn: true
        })
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
            const response = await axios.post(userApiCommonPattern+"login", user, reqConfig)
            if(response.data.success) {
                await this.setState({
                    isLoggingIn: false,
                    loggedEmail: response.data.data.Email,
                    loggedId: response.data.data.UserId,
                    loggedAccVerfied: response.data.data.IsEmailVerified,
                    loginErrorMessage: "", 
                    isLoggedIn: true
                })
            await this.props.cookies.set('email', this.state.loggedEmail);
            await this.props.cookies.set('id', this.state.loggedId);
            await this.props.cookies.set('isVerified', this.state.loggedAccVerfied);
            await this.props.cookies.set('isLoggedIn', this.state.isLoggedIn);
            await this.props.cookies.set('name', response.data.data.Name)
            window.location="/"

            } else {
                this.setState({loginErrorMessage: response.data.message, isLoggedIn: false, isLoggingIn: false})
            }
        } catch(error) {
            this.setState({
                isLoggingIn: false
            })
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
        const isEnabled = (this.state.passwordErrorMessage === "" && this.state.emailErrorMessage === "" && this.state.password !== "" && this.state.email !== "")
        return (
            <div>
                <button type="button" onClick={() => this.props.showLoginForm(false)} className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                    <span className="font-size-25" aria-hidden="true">&times;</span>
                </button>
                <div className="pb-4"></div>
                <h2 className="primary-color text-center card-title pt-4">Welcome to GenZ blog</h2><br/>
                <div className="container">
                    {/* <div>
                        <button type="button" className="btn btn-light col-12"><FcGoogle />&nbsp; Sign in with Google</button><br/><br/>
                        <button type="button" className="btn btn-light col-12"><AiFillFacebook />&nbsp; Sign in with Facebook</button><br/><br/>
                    </div><br/>
                    <hr className="sep-login-hr" data-content="Have an account? continue with your email address" /><br/> */}
                    <form>
                        <div className="form-group">
                            <label  className="pb-3" htmlFor="email">Email</label>
                            <input  type="email"
                                    name="email"
                                    required
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            {this.state.emailErrorMessage !== "" ? <div className="error_message_css_config pt-2"><i>{this.state.emailErrorMessage}</i></div> : null}
                        </div><br/>
                        <div className="form-group">
                            <label  className="pb-3" htmlFor="password">Password</label>
                            <input  type="password" 
                                    name="password"
                                    required
                                    className="form-control" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    id="password" placeholder="Enter password" />
                            {this.state.passwordErrorMessage !== "" ? <div className="error_message_css_config pt-2"><i>{this.state.passwordErrorMessage}</i></div> : null}
                                    
                        </div><br/>
                        <div className="form-group">
                            <input type="checkbox" className="switch" id="show password" 
                            name="show password" onChange={this.handleChange} 
                            value="Show Password" />&nbsp;
                            <label  className="pb-3" htmlFor="show password">Show password</label>
                        </div>

                        <div>
                            {this.state.loginErrorMessage ? <div className="error_message_css_config pb-2"><i>{"*"+this.state.loginErrorMessage}</i></div> : null}
                        </div>
                        
                        <div className="form-group">
                            {
                                this.state.isLoggingIn ? 
                                <button className="btn-config btn-primary-col" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                                    <span className="sr-only">Logging in...</span>
                                </button> : <button type="button" onClick={this.handleLogin} className="btn-config btn-primary-col" disabled={!isEnabled}>Log in</button>
                            }
                        </div>
                    </form><br/>
                </div>  
            </div>

        )
    }
}