import React, {Component} from 'react';
import {FaTwitter, FaFacebook, FaInstagram} from 'react-icons/fa';
import {FcReddit} from 'react-icons/fc';

export default class FollowUs extends Component {
    render() {
        return (
            <div style={{position: "fixed"}}>
                <h3 className="follow-us-header-style">Follow us</h3>
                <div className="d-flex p-2">
                    <div>
                        <a href="https://www.twitter.com" rel="noreferrer" target="_blank"><FaTwitter style={{fontSize: "30px"}}/></a>
                    </div>
                    <div>
                        <a href="https://www.facebook.com" rel="noreferrer" target="_blank" style={{paddingLeft: "2vh", color: "black"}}><FaFacebook style={{fontSize: "30px"}} /></a>
                    </div>
                    <div>
                        <a href="https://www.reddit.com" rel="noreferrer" target="_blank" style={{paddingLeft: "2vh"}}><FcReddit style={{fontSize: "30px"}} /></a>
                    </div>
                    <div>
                        <a href="https://www.instagram.com" rel="noreferrer" target="_blank" style={{color: "black", paddingLeft: "2vh"}}><FaInstagram style={{fontSize: "30px"}} /></a>
                    </div>

                </div>
            </div>
        )
    }
}