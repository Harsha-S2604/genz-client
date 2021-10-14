import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';
import UserSignup from "../../model/UserSignup";
import axios from "axios";

export default class GetStarted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            email: "",
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            usernameErrorMessage: ""
        }
    }

    handleRegister = () => {
        let email = this.state.email
        let user = new UserSignup()
        user.email = email;
        user.isVerified = false;
        user.isPasswordSet = false;
        axios.post('http://localhost:3004/users', user)
            .then(response => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
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
                            <div className="container">
                                {
                                    this.state.showForm ? 
                                    <div className="text-center">
                                        <button className="btn btn-outline-dark back-button__css mt-2" onClick={this.handleShowForm}> Back </button>
                                    </div> : null
                                }
                                <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
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
                                                        {this.state.usernameErrorMessage !== "" ? <p className="text-danger pt-2" style={{marginBottom: "0px"}}><i>{this.state.usernameErrorMessage}</i></p> : null}
                                                        
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
                                                        {this.state.emailErrorMessage !== "" ? <p className="text-danger pt-2" style={{marginBottom: "0px"}}><i>{this.state.emailErrorMessage}</i></p> : null}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="pb-3">
                                                        <input  type="password"
                                                                name="password"
                                                                required
                                                                className="form-control"
                                                                value={this.state.password}
                                                                onChange={this.handleChange}
                                                                id="password" aria-describedby="passwordHelp" placeholder="Password" />
                                                        {this.state.passwordErrorMessage !== "" ? <p className="text-danger pt-2" style={{marginBottom: "0px"}}>{this.state.passwordErrorMessage}</p> : null}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="pb-3">
                                                        <input  type="password"
                                                                name="confirmPassword"
                                                                required
                                                                className="form-control"
                                                                value={this.state.confirmPassword}
                                                                onChange={this.handleChange}
                                                                id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" />
                                                        {this.state.confirmPasswordErrorMessage !== "" ? <p className="text-danger pt-2" style={{marginBottom: "0px"}}>{this.state.confirmPasswordErrorMessage}</p> : null}
                                                    </div>
                                                </div><br/>
                                                <div className="form-group">
                                                    <input type="checkbox" className="switch" id="show password" 
                                                    name="show password" onChange={this.handleChange} 
                                                    value="Show Password" />&nbsp;
                                                    <label  className="pb-3" htmlFor="show password">Show password</label>
                                                </div>
                                                <center>
                                                    <div className="form-group margin-bottom-15 mt-3">
                                                        <button type="button" className="btn-config btn-primary-col" onClick={this.handleRegister}>Continue</button>
                                                    </div>  
                                                </center>
                                                
                                            </form>
                                        </div>
                                            : 
                                        <div className="text-center">
                                            <button type="button" className="btn btn-light"><FcGoogle />&nbsp; Sign up with Google</button><br/><br/>
                                            <button type="button" className="btn btn-light"><AiFillFacebook />&nbsp; Sign up with Facebook</button><br/><br/>
                                            <button type="button" className="btn btn-light" onClick={this.handleShowForm}><MdEmail />&nbsp; Sign up with Email</button><br/><br/>
                                            <p className="padding-top-10 pb-4">Already have an account? <a className="primary-color" href="/signin">Sign in</a></p> 
                                        </div>
                                    }
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