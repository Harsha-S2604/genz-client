import React, { Component } from "react";
import SigninBody from "./SigninBody";
import GetStartedBody from "../getStarted/GetStartedBody";
import { showRegisterForm } from "../../actions/signinConfig";
import { connect } from "react-redux";
import { showLoginForm } from "../../actions/signupConfig";


class Signin extends Component {

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
            isShowSignUpForm: false
        }
    }

    handleShowSignUpForm = () => {
        let isShowSignUpForm = !this.state.isShowSignUpForm
        this.setState({
            isShowSignUpForm
        })
    }



    render() {
        if(this.state.isLoggedIn) {
            window.location = "/";
        }
        return (          
            <div>
                <div className="modal fade" id="signInModalCenter" tabIndex="-1" role="dialog" aria-labelledby="signInModalCenter" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                {
                                    this.props.isShowRegisterForm ? <div><GetStartedBody {...this.props}/></div>:
                                    <div className="container">
                                        <SigninBody {...this.props} cookies={this.props.cookies} handleLoggedIn={this.props.handleLoggedIn}/>
                                        <p className="container">Don't have an account? <a className="primary-color" onClick={() => this.props.showRegisterForm(true)}href="#signup">Sign up</a></p>
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

const mapStatetoProps = (state) => {
    const {signinConfig} = state;
    return {...signinConfig}
}

const mapDispatchProps = (dispatch) => {
    return {
        showRegisterForm: (isShowRegisterForm) => dispatch(showRegisterForm(isShowRegisterForm)),
        showLoginForm: (isShowLoginForm) => dispatch(showLoginForm(isShowLoginForm))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(Signin)