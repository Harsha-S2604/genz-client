import React, { Component } from "react";
import {FcGoogle} from 'react-icons/fc';
import {AiFillFacebook} from 'react-icons/ai';
import {MdEmail} from 'react-icons/md';

export default class GetStarted extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="card-config">
                        <div className="card shadow mx-auto card-width">
                            <h2 className="primary-color text-center card-title padding-10">Join GENZ</h2>
                            <div className="container">
                                <div className="text-center">
                                    <button type="button" className="btn btn-light col-12"><FcGoogle />&nbsp; Sign up with Google</button><br/><br/>
                                    <button type="button" className="btn btn-light col-12"><AiFillFacebook />&nbsp; Sign up with Facebook</button><br/><br/>
                                    <button type="button" className="btn btn-light col-12"><MdEmail />&nbsp; Sign up with Email</button><br/><br/>
                                    <p className="padding-top-10 pb-4">Already have an account? <a className="primary-color" href="/signin">Sign in</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}