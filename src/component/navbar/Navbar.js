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
import ProfileMenu from './ProfileMenu';
import { withCookies } from 'react-cookie';
import EmailVerificationMessage from '../emailVerify/EmailVerificationMessage';
import NotFound from '../notfound/NotFound';
import { Popover, OverlayTrigger } from 'react-bootstrap';
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

    handleSignout = () => {
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
        const show = this.state.showCollapseMenu ? "show" : "";
        const popOverProfileMenuStyle = {
            borderBottom: "1px solid #D3D3D3",
            backgroundColor: "#fff",
            textAlign: "center",
            fontSize: "20px",
            paddingTop: "20px"
        } 
        const popoverProfileMenu = (
            <Popover id="popover-basic" style={{boxShadow: "rgb(230, 230, 230) 0px 1px 4px"}}>
              <Popover.Header style={popOverProfileMenuStyle}>{"Hi, " + this.props.cookies.get("name")}</Popover.Header>
              <Popover.Body style={{padding: "20px", width:"225px"}}>
                <ProfileMenu {...this.props}/>
              </Popover.Body>
            </Popover>
          );
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
                                        className="pointer nav-link"><FaSignInAlt style={{marginRight: "5px"}}/>Sign in</a>
                                    </li>
                                    <li className="nav-item">
                                        <a  data-toggle="modal" href="/register" data-target="#getStartedModal" 
                                            className="pointer nav-link"><FaUserPlus style={{marginRight: "5px"}}/>Get Started</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/write"
                                        activeStyle={this.state.activeBottomColor}><RiPencilFill style={{marginRight: "5px"}}/>Write</NavLink>
                                    </li>
                                </ul>
                            </div> : <div className={"collapse navbar-collapse justify-content-end " + show} id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a href="/signout" onClick={this.handleSignout} className="pointer nav-link"><FaSignOutAlt style={{marginRight: "5px"}}/>Sign out</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/favorites"
                                        activeStyle={this.state.activeBottomColor}><BsFillBookmarksFill style={{marginRight: "5px"}}/>Favorites</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/write"
                                        activeStyle={this.state.activeBottomColor}><RiPencilFill style={{marginRight: "5px"}}/>Write</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverProfileMenu}>
                                        <button className="btn-config nav-link" onClick={this.handleShowProfileMenu}><CgProfile style={{marginRight: "5px"}}/>Profile</button>
                                    </OverlayTrigger>
                                    </li>
                                </ul>
                            </div>
                        }
                        
                    </div>
                </nav>
                <Signin cookies={this.props.cookies} handleLoggedIn={this.handleLoggedIn}/>
                <GetStarted {...this.props}/>
                <Switch>
                    <Route exact path="/" component={() => <Home cookies={this.props.cookies}/>} />
                    <Route exact path="/write" data-target="#signInModalCenter" component={() => <Write cookies={this.props.cookies}/>} />
                    <Route exact path="/favorites" component={() => <Favorties cookies={this.props.cookies}/>} />
                    <Route exact path="/profile" component={() => <Profile cookies={this.props.cookies}/>} />
                    <Route exact path="/email_verification" component={() => <EmailVerificationMessage cookies={this.props.cookies}/>} />
                    <Route component={() => <NotFound />} />
                </Switch>
                </Router>
            </div>
        )
    }
}

export default withCookies(Navbar);