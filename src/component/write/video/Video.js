import React, {Component} from 'react';
import './_video.scss'
export default class Video extends Component {
    render() {
        return (
            <div className="video-padding">
                <input type="text" placeholder="Video url" />
            </div>
        )
    }
}