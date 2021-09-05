import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import "./_code.scss"

export default class Code extends Component {
    render() {
        return (
            <div className="code-padding">
                <div className="row">
                    <div className="col">
                        <input placeholder="code goes here" />
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props} />
                    </div>


                </div>
            </div>
        )
    }
}