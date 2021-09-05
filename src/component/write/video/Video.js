import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import './_video.scss'
export default class Video extends Component {
    render() {
        return (
            <div className="video-padding">
                <div className="row">
                    <div className="col">
                        <input type="text" placeholder="Video url" />
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props}/>
                    </div>
                </div>

            </div>
        )
    }
}