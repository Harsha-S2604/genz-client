import React, {Component} from 'react';
import {TiTick} from 'react-icons/ti';
import NotFound from '../notfound/NotFound';

export default class Published extends Component {

    componentDidMount() {
        document.title = "Genz - Published"
    }

    render() {
        return (
            <div className="pt-5">
                { this.props.location && this.props.location.state && this.props.location.state.isBlogPostSuccess ? 
                    <center>
                        <h3 className="text-success"><TiTick style={{fontSize: "40px"}}/>Blog published successfully.</h3>
                        <h5><a href="/stories">Click here</a> to check your stories.</h5>
                    </center> : <NotFound />
                }
            </div>
        )
    }
}