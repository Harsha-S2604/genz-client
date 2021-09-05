import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import './_embed.scss'
export default class Embed extends Component {
    render() {
        return (
            <div className="embed-padding">
                <div className="row">
                    <div className="col">
                        <input type="text" placeholder="embed" />
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}