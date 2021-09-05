import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import './_image.scss'
export default class Image extends Component {
    render() {
        return (
            <div className="image-padding-css">
                <div className="row">
                    <div className="col">
                        <input id="blog__images" className="blog-image__input" type="file" />
                        <label className="blog-image__label" htmlFor="blog__images">
                            Browse a image
                        </label>
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}