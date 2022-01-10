import React, {Component} from 'react';
import {AiFillLike} from 'react-icons/ai';

export default class EmailVerificationSuccess extends Component {

    componentDidMount() {
        if(this.props.emailVerify) {
            this.props.isEmailVerification()
        }
    }

    render() {
        return (
            <div style={{marginTop: "175px"}}>
                <div className="container">
                    <center>
                        <AiFillLike style={{fontSize: "75px", color: "#673ab7"}}/><br /><br />
                        <h2>We have successfully verified your email. Click on login to continue.</h2>
                    </center>
                </div>
            </div>
        )
    }
}