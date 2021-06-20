import React, {Component} from 'react';
import {NavLink, BrowserRouter as Router} from "react-router-dom";
import {FaSignInAlt, FaUserPlus} from 'react-icons/fa';
import {RiPencilFill} from 'react-icons/ri';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeBottomColor: {"borderBottom": "3px solid #002417"}
        }
    }
    
    render() {
        return (
            <div>
                <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                    <div className="container">
                        <NavLink className="navbar-brand" id="navbar-title" to="/">Genz</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin"
                                    activeStyle={this.state.activeBottomColor}><FaSignInAlt />{" "}Sign in</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register"
                                    activeStyle={this.state.activeBottomColor}><FaUserPlus />{" "}Get Started</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/write"
                                    activeStyle={this.state.activeBottomColor}><RiPencilFill />{" "}write</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                </Router>
            </div>
        )
    }
}