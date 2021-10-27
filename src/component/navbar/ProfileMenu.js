import React, {Component} from 'react';
import "./__navbar.scss"

export default class ProfileMenu extends Component {
    render() {
        return (
            <div className="container">
                <div className="pb-3">
                    <a className="link__config" href="/profile">Your Profile</a><br/>
                </div>
                <div className="pb-3">
                    <a className="link__config" href="/stories">Stories</a>
                </div>
                <div className="pb-3">
                    <a className="link__config" href="/stories">Sign out</a>
                </div>
            </div>
        )
    }
}