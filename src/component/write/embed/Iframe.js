import React, {Component} from 'react';

export default class Iframe extends Component {
    render () {
        return (
            <div>
                <iframe src={this.props.url} height="200" width="300"></iframe>
            </div>
        )
    }
}