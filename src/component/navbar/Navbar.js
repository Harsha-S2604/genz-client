import React, {Component} from 'react';
import {Switch, Route, NavLink, BrowserRouter as Router} from "react-router-dom";
import {FaSignInAlt, FaUserPlus, FaSignOutAlt} from 'react-icons/fa';
import {RiPencilFill} from 'react-icons/ri';
import {BsFillBookmarksFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineAutoStories} from 'react-icons/md';
import Home from '../home/Home';
import Signin from '../signin/Signin';
import GetStarted from '../getStarted/GetStarted';
import Write from '../write/Write';
import Favorties from '../favorites/Favorites';
import Profile from '../profile/Profile';
import { withCookies } from 'react-cookie';
import EmailVerificationMessage from '../emailVerify/EmailVerificationMessage';
import NotFound from '../notfound/NotFound';
import { NavDropdown } from 'react-bootstrap';
import Published from '../write/Published';

import "./__navbar.scss"
import Stories from '../stories/Stories';
import ViewBlog from '../viewblog/ViewBlog';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeBottomColor: {"borderBottom": "3px solid #673ab7"},
            showCollapseMenu: false,
            modalOpen: false,
            isLoggedIn: false,
            isShowProfileMenu: false
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

    handleSignout = (e) => {
        e.preventDefault();
        this.props.cookies.remove("email")
        this.props.cookies.remove("id")
        this.props.cookies.remove("isVerified")
        this.props.cookies.remove("isLoggedIn")
        this.props.cookies.remove("name")
        window.location = "/"
    }

    

    toggleMenu = () => {
        this.setState({
            showCollapseMenu: !this.state.showCollapseMenu
        })       
    }

    handleShowProfileMenu = () => {
        let isShowProfileMenu = !this.state.isShowProfileMenu
        this.setState({
            isShowProfileMenu
        })
    }
    
    render() {
        return (
            <div>
                <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top navbar-toggleable-md shadow">
                    <div className="container">
                        <NavLink className="navbar-brand" id="navbar-title" to="/">GenZ</NavLink>
                        <button className="navbar-toggler navbar-toggler-right collapsed" onClick={this.toggleMenu} 
                            type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {!(this.props.cookies.get("email") && this.props.cookies.get("id")) ? 
                            <div className={"collapse navbar-collapse justify-content-end "} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a data-toggle="modal" href="/signin" data-backdrop="static" data-target="#signInModalCenter" 
                                        data-keyboard="false" className="pointer nav-link"><FaSignInAlt style={{marginRight: "5px"}}/>Sign in</a>
                                    </li>
                                    <li className="nav-item">
                                        <a  data-toggle="modal" href="/register" data-backdrop="static" data-target="#getStartedModal" 
                                            data-keyboard="false" className="pointer nav-link"><FaUserPlus style={{marginRight: "5px"}}/>Get Started</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/write"
                                        activeStyle={this.state.activeBottomColor}><RiPencilFill style={{marginRight: "5px"}}/>Write</NavLink>
                                    </li>
                                </ul>
                            </div> : <div className={"collapse navbar-collapse justify-content-end"} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavDropdown title={<div><CgProfile style={{fontSize: "18px", color: "black", marginRight: "5px"}}/>{" "}Hi, {this.props.cookies.get("name")}</div>} id="basic-nav-profile-dropdown" style={{content: "none"}}>
                                            <NavDropdown.Item href="/profile"><CgProfile />{" "}Your Profile</NavDropdown.Item>
                                            <NavDropdown.Item href="/write"><RiPencilFill />{" "}Write</NavDropdown.Item>
                                            <NavDropdown.Item href="/stories"><MdOutlineAutoStories />{" "}Stories</NavDropdown.Item>
                                            <NavDropdown.Item href="/favorites"><BsFillBookmarksFill />{" "}Favorites</NavDropdown.Item>
                                            <NavDropdown.Item href="/signout" onClick={this.handleSignout}><FaSignOutAlt />{" "}Sign out</NavDropdown.Item>
                                        </NavDropdown>
                                    </li>                                    
                                </ul>
                            </div>
                        }
                        
                    </div>
                </nav>
                <Signin {...this.props} cookies={this.props.cookies} handleLoggedIn={this.handleLoggedIn}/>
                <GetStarted {...this.props}/>
                <Switch>
                    <Route exact path="/" component={() => <Home cookies={this.props.cookies}/>} />
                    <Route exact path="/write" data-target="#signInModalCenter" component={() => <Write cookies={this.props.cookies}/>} />
                    <Route exact path="/stories" component={() => <Stories cookies={this.props.cookies}/>} />
                    <Route exact path="/favorites" component={() => <Favorties cookies={this.props.cookies}/>} />
                    <Route exact path="/profile" component={() => <Profile cookies={this.props.cookies}/>} />
                    <Route exact path="/write/published"  render={(props) => <Published {...props}/>} />
                    <Route exact path="/email_verification" component={() => <EmailVerificationMessage cookies={this.props.cookies}/>} />
                    <Route exact path="/stories/:id/:title" component={(props) => <ViewBlog {...props}/>} />
                    <Route component={() => <NotFound />} />
                </Switch>
                </Router>
            </div>
        )
    }
}

export default withCookies(Navbar);