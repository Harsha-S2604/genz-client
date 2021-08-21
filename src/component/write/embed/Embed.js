import React, {Component} from 'react';
import './_embed.scss'
export default class Embed extends Component {
    render() {
        return (
            <div className="embed-padding">
                <input type="text" placeholder="embed" />
            </div>
        )
    }
}