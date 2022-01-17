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
            <div>
                <div className="container">
                    <button type="button" onClick={() => this.props.showRegisterForm(false)} className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                        <span className="font-size-25" aria-hidden="true">&times;</span>
                    </button>
                    <center style={{paddingTop: "40px"}}>
                        <AiFillLike style={{fontSize: "75px", color: "#673ab7"}}/><br /><br />
                        <h4>We have successfully registered your email. Please, Login to continue.</h4>
                    </center>
                </div>
            </div>
        )
    }
}