import React, {Component} from 'react';
import './_image.scss'
export default class Image extends Component {
    render() {
        return (
            <div className="image-padding-css">
                <input type="file" />
            </div>
        )
    }
}