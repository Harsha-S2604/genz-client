import React, {Component} from 'react';
import {Switch, Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import {FaSignInAlt, FaUserPlus} from 'react-icons/fa';
import {RiPencilFill} from 'react-icons/ri';
import Home from '../home/Home';
import Signin from '../signin/Signin';
import GetStarted from '../getStarted/GetStarted';
import Write from '../write/Write';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeBottomColor: {"borderBottom": "3px solid #002417"},
            showCollapseMenu: false
        }
    }

    

    toggleMenu = () => {
        this.setState({
            showCollapseMenu: !this.state.showCollapseMenu
        })       
    }
    
    render() {
        const show = this.state.showCollapseMenu ? "show" : "";
        return (
            <div>
                <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent navbar-toggleable-md sticky-top">
                    <div className="container">
                        <NavLink className="navbar-brand" id="navbar-title" to="/">Genz</NavLink>
                        <button className="navbar-toggler navbar-toggler-right collapsed" onClick={this.toggleMenu} 
                            type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            {(show === "show") ? <span className="my-1 mx-2 close">X</span> : 
                            <span className="navbar-toggler-icon"></span>}
                        </button>

                        <div className={"collapse navbar-collapse justify-content-end " + show} id="navbarSupportedContent">
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
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/signin"><Signin /></Route>
                    <Route exact path="/register"><GetStarted /></Route>
                    <Route exact path="/write"><Write /></Route>
                </Switch>
                </Router>
            </div>
        )
    }
}