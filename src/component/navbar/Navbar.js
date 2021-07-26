import React, {Component} from 'react';
import {Switch, Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import {FaSignInAlt, FaUserPlus, FaSignOutAlt} from 'react-icons/fa';
import {RiPencilFill} from 'react-icons/ri';
import {BsFillBookmarksFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import Home from '../home/Home';
import Signin from '../signin/Signin';
import GetStarted from '../getStarted/GetStarted';
import Write from '../write/Write';
import Favorties from '../favorites/Favorites';
import Profile from '../profile/Profile';
import { withCookies } from 'react-cookie';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeBottomColor: {"borderBottom": "3px solid #3500D3"},
            showCollapseMenu: false,
            modalOpen: false,
            isLoggedIn: false
        }
    }

    handleLoggedIn = (val) => {
        if(val) {
            this.setState({
                isLoggedIn: true
            })
        } else {
            this.setState({
                isLoggedIn: false
            })
        }
    }

     handleSignout = () => {
         console.log(this.props.cookies)
         this.props.cookies.remove("email")
         this.props.cookies.remove("id")
         this.props.cookies.remove("isVerified")
         this.props.cookies.remove("isLoggedIn")
         window.location = "/"
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
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-toggleable-md shadow sticky-top">
                    <div className="container">
                        <NavLink className="navbar-brand" id="navbar-title" to="/">GenZ</NavLink>
                        <button className="navbar-toggler navbar-toggler-right collapsed" onClick={this.toggleMenu} 
                            type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            {(show === "show") ? <span className="my-1 mx-2 close">X</span> : 
                            <span className="navbar-toggler-icon"></span>}
                        </button>

                        {!(this.props.cookies.get("email") && this.props.cookies.get("id")) ? 
                            <div className={"collapse navbar-collapse justify-content-end " + show} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a data-toggle="modal" href="/signin" data-target="#signInModalCenter" 
                                        className="pointer nav-link"><FaSignInAlt />{" "}Sign in</a>
                                    </li>
                                    <li className="nav-item">
                                        <a  data-toggle="modal" href="/register" data-target="#getStartedModal" 
                                            className="pointer nav-link"><FaUserPlus />{" "}Get Started</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/write"
                                        activeStyle={this.state.activeBottomColor}><RiPencilFill />{" "}Write</NavLink>
                                    </li>
                                </ul>
                            </div> : <div className={"collapse navbar-collapse justify-content-end " + show} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a data-toggle="modal" href="/signout" onClick={this.handleSignout} className="pointer nav-link"><FaSignOutAlt />{" "}Sign out</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/favorites"
                                        activeStyle={this.state.activeBottomColor}><BsFillBookmarksFill />{" "}Favorites</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/write"
                                        activeStyle={this.state.activeBottomColor}><RiPencilFill />{" "}Write</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile"
                                        activeStyle={this.state.activeBottomColor}><CgProfile />{" "}Profile</NavLink>
                                    </li>
                                </ul>
                            </div>
                        }
                        
                    </div>
                </nav>
                <Signin cookies={this.props.cookies} handleLoggedIn={this.handleLoggedIn}/>
                <GetStarted />
                <Switch>
                    <Route exact path="/" component={() => <Home cookies={this.props.cookies}/>} />
                    <Route exact path="/write" component={Write} />
                    <Route exact path="/favorites" component={() => <Favorties cookies={this.props.cookies}/>} />
                    <Route exact path="/profile" component={() => <Profile cookies={this.props.cookies}/>} />

                </Switch>
                </Router>
            </div>
        )
    }
}

export default withCookies(Navbar);