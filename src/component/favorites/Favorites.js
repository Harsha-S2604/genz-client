import React, {Component} from 'react';

export default class Favorties extends Component {
    componentDidMount() {
        document.title = "Genz - Your Favorites"
    }
    
    render() {
        return (
            <div>
                <div className="container">
                    <p>This is a favorites page</p>
                </div>
            </div>
        )
    }
} 