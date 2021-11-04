import React, {Component} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';
import UserSignup from "../../model/UserSignup";
import axios from "axios";
import { toast } from 'react-toastify';

export default class GetStartedBody extends Component {

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
            isRegistered: false
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
                console.log("Err", err,);
                console.log("Errors", this.props)
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
                break;
                

            default:
                break;
            } 
    }

    render() {
        if(this.state.isRegistered) {
            window.location = "/email_verification";
        }
        const isButtonDisabled = (this.state.emailErrorMessage === "" && this.state.passwordErrorMessage === "" && this.state.confirmPasswordErrorMessage === "" && this.state.usernameErrorMessage === "" 
        && this.state.email !== "" && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.username !== "")
        return (
            <div>
                {
                    this.state.showForm ? 
                    <div className="text-center">
                        <button className="btn btn-outline-dark back-button__css mt-2" onClick={this.handleShowForm}> Back </button>
                    </div> : null
                }
                <button type="button" onClick={() => this.props.showRegisterForm(false)} className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                    <span className="font-size-25" aria-hidden="true">&times;</span>
                </button>
                <div className="pb-4"></div>
                <h2 className="primary-color text-center card-title padding-top-10 pb-3">Join GenZ</h2>
                <div className="container">
                    {this.state.showForm ? 
                        <div>
                            <h4 className="primary-color text-center">Sign up with email</h4>
                            <p className="text-center">Enter your info to create an account.</p><br/>
                            <form>
                                <div className="form-group">
                                    <div className="pb-3">
                                        <input  type="text"
                                                name="username"
                                                required
                                                className="form-control"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                id="username" aria-describedby="usernameHelp" placeholder="Name" />
                                        {this.state.usernameErrorMessage !== "" ? <p className="error_message_css_config pt-2" style={{marginBottom: "0px"}}><i>{this.state.usernameErrorMessage}</i></p> : null}
                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="pb-3">
                                        <input  type="email"
                                                name="email"
                                                required
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                id="email" aria-describedby="emailHelp" placeholder="Email" />
                                        {this.state.emailErrorMessage !== "" ? <p className="error_message_css_config pt-2" style={{marginBottom: "0px"}}><i>{this.state.emailErrorMessage}</i></p> : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="pb-3">
                                        <input  type={this.state.passwordShow ? "text" : "password"}
                                                name="password"
                                                required
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                                id="password" aria-describedby="passwordHelp" placeholder="Password" />
                                        {this.state.passwordErrorMessage !== "" ? <p className="error_message_css_config pt-2" style={{marginBottom: "0px"}}><i>{this.state.passwordErrorMessage}</i></p> : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="pb-3">
                                        <input  type={this.state.passwordShow ? "text" : "password"}
                                                name="confirmPassword"
                                                required
                                                className="form-control"
                                                value={this.state.confirmPassword}
                                                onChange={this.handleChange}
                                                id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" />
                                        {this.state.confirmPasswordErrorMessage !== "" ? <p className="error_message_css_config pt-2" style={{marginBottom: "0px"}}><i>{this.state.confirmPasswordErrorMessage}</i></p> : null}
                                    </div>
                                </div><br/>
                                <div className="form-group">
                                    <input type="checkbox" className="switch" id="show_password" 
                                    name="show_password" onChange={this.handleChange} 
                                    value="Show Password" />&nbsp;
                                    <label  className="pb-3" htmlFor="show_password">Show Password</label>
                                </div>
                                {
                                    this.state.registerMessage ? 
                                    <p className="primary-color font_weight__900"><i>{"*"+this.state.registerMessage}</i></p> : null

                                }
                                <center>
                                    <div className="form-group margin-bottom-15 mt-3">
                                        {
                                            this.state.isRegistering ? 
                                            <button className="btn-config btn-primary-col" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                                                <span className="sr-only">Signing Up...</span>
                                            </button> : 
                                            <button type="button" className="btn-config btn-primary-col" onClick={this.handleRegister} disabled={!isButtonDisabled}>Continue</button>

                                        }
                                        
                                    </div>
                                        
                                </center>
                                
                            </form>
                        </div>
                            : 
                        <div className="text-center">
                            <button type="button" className="btn btn-light"><FcGoogle />&nbsp; Sign up with Google</button><br/><br/>
                            <button type="button" className="btn btn-light"><AiFillFacebook />&nbsp; Sign up with Facebook</button><br/><br/>
                            <button type="button" className="btn btn-light" onClick={this.handleShowForm}><MdEmail />&nbsp; Sign up with Email</button><br/><br/>
                        </div>
                    }
                </div>
            </div>

            
        )
    }
}