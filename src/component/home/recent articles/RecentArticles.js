import React, {Component} from 'react';
import demo from '../../../assets/demo.jpg'

export default class RecentArticles extends Component {

    render() {
        return (
            <div className="recent-articles-content-style">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="mb-2">
                            <img src={demo} className="profile-radius-50" alt="Avatar" /><span className="author-style">{this.props.author}</span>
                        </div>
                        <h4><b>{this.props.title}</b>
                        <span className="recent-article-footer-config">{this.props.created}</span>
                        </h4>
                        <p className="description-style containers"><span>{this.props.description}</span></p>
                    </div>
                    <div className="col">
                        <img src={demo} width="200px" height="134px" alt="demo goes here" />
                    </div>
                </div>
            </div>
        )
    }
}