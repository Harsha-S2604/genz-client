import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';

export default class GetStarted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            email: "",
            emailErrorMessage: ""
        }
    }

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleChange = () => {
        
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="card-config">
                        <div className="card shadow mx-auto card-width">
                            <h2 className="primary-color text-center card-title padding-top-10 pb-3">Join GENZ</h2>
                            <div className="container">
                                {this.state.showForm ? 
                                    <div>
                                        <h4 className="primary-color text-center card-title">Sign up with email</h4>
                                        <p className="text-center">Enter your email address to create an account.</p><br/>
                                        <form>
                                            <div className="form-group">
                                                {/* <label  className="pb-3" htmlFor="email">Email</label> */}
                                                <div className="text-center">
                                                    <input  type="email"
                                                            name="email"
                                                            required
                                                            className="form-control w-75"
                                                            value={this.state.email}
                                                            onChange={this.handleChange}
                                                            id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                                </div>
                                                {this.state.emailErrorMessage !== "" ? <p className="text-danger pt-2">{this.state.emailErrorMessage}</p> : null}
                                            </div><br/>
                                            <div className="form-group">
                                                <button type="button" className="btn-config btn-primary-col">continue</button>
                                            </div>
                                        </form>
                                        <div className="text-center">
                                            <button className="btn btn-primary" onClick={this.handleShowForm}> Back </button>
                                        </div>
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
        )
    }
}