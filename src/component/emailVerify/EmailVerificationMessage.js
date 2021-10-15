import React, {Component} from 'react';
import {AiOutlineMail, AiOutlineSmile} from 'react-icons/ai';

export default class EmailVerificationMessage extends Component {
    render() {
        return (
            <div style={{marginTop: "50px"}}>
                <center>
                    <AiOutlineMail style={{fontSize:"250px"}}/>
                    <h3 style={{color: "#3500D3"}}>Your account has been made. <br /> Please verify it by clicking the activation link that has been sent to your email within 48 hours... Thank you <AiOutlineSmile /></h3>
                </center>

            </div>
        )
    }
}