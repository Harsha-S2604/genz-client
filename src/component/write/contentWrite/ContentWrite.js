import React, {Component} from 'react';
import './_contentwrite.scss'

export default class ContentWrite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentInput: ""
        }
    }

    render() {
        return (
            <div className="contentwrite-padding">
                <input type="text" />
            </div>
        )
    }
}