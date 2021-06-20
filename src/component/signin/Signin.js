import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';

export default class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnable: false 
        }
    }

    handleLogin = () => {
        console.log("login")
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="card-config">
                        <div className="card shadow mx-auto card-width">
                            <div className="card-body">
                                <h2 className="primary-color text-center card-title pt-4">Welcome to GENZ</h2><br/>
                                <div className="container">
                                    <div>
                                        <button type="button" className="btn btn-light col-12"><FcGoogle />{" "}Sign in with Google</button><br/><br/>
                                        <button type="button" className="btn btn-light col-12"><AiFillFacebook />{" "}Sign in with Facebook</button><br/><br/>
                                    </div><br/>
                                    <hr className="sep-login-hr" data-content="Have password? continue with your email address" /><br/>
                                    <form>
                                        <div className="form-group">
                                            <label  className="pb-3" htmlFor="email">Email</label>
                                            <input  type="email"
                                                    name="email"
                                                    required
                                                    className="form-control" 
                                                    id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div><br/>
                                        <div className="form-group">
                                            <label  className="pb-3" htmlFor="password">Password</label>
                                            <input  type="password" 
                                                    name="password"
                                                    required
                                                    className="form-control" 
                                                    id="password" placeholder="Enter password" />
                                        </div><br/>
                                        <div className="form-group">
                                            <button type="button" onClick={this.handleLogin} className="btn-config btn-primary-col" disabled={!this.state.isEnable}>Log in</button>
                                        </div>
                                    </form><br/>
                                    <p>Don't have an account? <a className="primary-color" href="/register">Sign up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}