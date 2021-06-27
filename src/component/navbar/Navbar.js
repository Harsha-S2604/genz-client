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
            activeBottomColor: {"borderBottom": "3px solid #3500D3"},
            showCollapseMenu: false,
            modalOpen: false
        }
    }

    handleModalOpen = () => {
        this.setState((prevState) => {
           return{
              modalOpen: !prevState.modalOpen
           }
        })
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
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent navbar-toggleable-md">
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
                                    <a data-toggle="modal" href="/signin" data-target="#signInModalCenter" 
                                       className="pointer nav-link"><FaSignInAlt />{" "}Sign in</a>
                                </li>
                                <li className="nav-item">
                                    <a  data-toggle="modal" href="/register" data-target="#getStartedModal" 
                                        className="pointer nav-link"><FaUserPlus />{" "}Get Started</a>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/write"
                                    activeStyle={this.state.activeBottomColor}><RiPencilFill />{" "}write</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Signin />
                <GetStarted />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/write" component={Write} />
                </Switch>
                </Router>
            </div>
        )
    }
}