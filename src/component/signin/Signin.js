import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import UserSignin from "../../model/UserSignin";
import axios from 'axios';


export default class Signin extends Component {

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
            loggedAccVerfied: ""
        }
    }

    handleLogin = async () => {
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let user = new UserSignin();
        user.email = email;
        user.password = password;
        try {
            const response = await axios.post("http://localhost:8080/genz-server/user-api/login", user)
            if(response.data.success) {
                console.log(response.data.data)
                this.setState({
                    loggedEmail: response.data.data.Email,
                    loggedId: response.data.data.id,
                    loggedAccVerfied: response.data.data.IsVerified,
                    loginErrorMessage: "", 
                    isLoggedIn: true
                })
            this.props.cookies.set('email', this.state.loggedEmail);
            this.props.cookies.set('id', this.state.loggedId);
            this.props.cookies.set('isVerified', this.state.loggedAccVerfied);
            this.props.cookies.set('isLoggedIn', this.state.isLoggedIn);

            } else {
                this.setState({loginErrorMessage: response.data.errorMessage, isLoggedIn: false})
            }
        } catch(error) {
            console.log(error);
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
        const isEnabled = (this.state.passwordErrorMessage === "" && this.state.emailErrorMessage === "" && this.state.password !== "" && this.state.email !== "")
        return (
            <div>
                <div className="modal fade" id="signInModalCenter" tabIndex="-1" role="dialog" aria-labelledby="signInModalCenter" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="container">
                                    <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                                        <span className="font-size-25" aria-hidden="true">&times;</span>
                                    </button>
                                    <div className="pb-4"></div>
                                    <h2 className="primary-color text-center card-title pt-4">Welcome to GenZ blog</h2><br/>
                                    <div className="container">
                                        <div>
                                            <button type="button" className="btn btn-light col-12"><FcGoogle />&nbsp; Sign in with Google</button><br/><br/>
                                            <button type="button" className="btn btn-light col-12"><AiFillFacebook />&nbsp; Sign in with Facebook</button><br/><br/>
                                        </div><br/>
                                        <hr className="sep-login-hr" data-content="Have password? continue with your email address" /><br/>
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
                                                {this.state.emailErrorMessage !== "" ? <p className="text-danger pt-2">{this.state.emailErrorMessage}</p> : null}
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
                                                {this.state.passwordErrorMessage !== "" ? <p className="text-danger pt-2">{this.state.passwordErrorMessage}</p> : null}
                                                        
                                            </div><br/>
                                            <div className="form-group">
                                                <input type="checkbox" className="switch" id="show password" 
                                                name="show password" onChange={this.handleChange} 
                                                value="Show Password" />&nbsp;
                                                <label  className="pb-3" htmlFor="show password">Show password</label>
                                            </div>

                                            <div>
                                                {this.state.loginErrorMessage ? <p className="text-danger pt-2">{this.state.loginErrorMessage}</p> : null}
                                            </div>
                                            
                                            <div className="form-group">
                                                <button type="button" onClick={this.handleLogin} className="btn-config btn-primary-col" disabled={!isEnabled}>Log in</button>
                                            </div>
                                        </form><br/>
                                        <p>Don't have an account? <a className="primary-color" href="/register">Sign up</a></p>
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