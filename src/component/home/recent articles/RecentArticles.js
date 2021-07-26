import React, {Component} from 'react';
import demo from '../../../assets/demo.jpg'

export default class RecentArticles extends Component {

    render() {
        return (
            <div className="recent-articles-content-style">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <h4><b>{this.props.title}</b></h4>
                        <p className="description-ellipsis">{this.props.description}</p>
                    </div>
                    <div className="col">
                        <img src={demo} width="200px" height="134px" alt="demo goes here" />
                    </div>
                </div>
            </div>
        )
    }
}