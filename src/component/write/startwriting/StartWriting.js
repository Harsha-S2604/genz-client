import React, {Component} from 'react';

export default class StartWriting extends Component {
    render() {
        return (
            <div>
                <h1>Publish, grow, and earn, all in one place.</h1>
                <p>If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. Here, your writing can thrive in a network supported by millions of readers — not ads.</p>
                <button className="btn btn-outline-dark" data-toggle="modal" data-target="#signInModalCenter">Start writing</button>
            </div>
        )
    }
}