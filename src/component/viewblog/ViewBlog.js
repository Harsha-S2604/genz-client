import React, {Component} from 'react';
import { displayBlog, fetchStoryLoader } from '../../actions/blogConfig';
import './__viewblog.scss';
import Loader from '../extras/Loader';
import { connect } from 'react-redux';
import moment from 'moment';
import { Markup } from 'interweave';

class ViewBlog extends Component {
    componentDidMount() {
        // console.log(this.props.location.state.email, this.props.location.state.blogId)
        this.props.fetchStoryLoader(true);
        this.props.displayBlog(this.props.location.state.blogId, this.props.location.state.email, this.props.location.state.isGetDraft);
    }
    render() {
        // console.log("this.props.viewBlogData", this.props.viewBlogData.User.Email.split("@")[0])
        return (
            <div className="view-blog__padding">
                <div className="view-blog__main">
                    {
                        this.props.isFetchStoryLoader ? 
                        <center>
                            <Loader />
                        </center> :
                        <main className="view-blog__main-content">
                            <section className="view-blog__content-section">
                                <header>
                                    <div className="view-blog__content-header">
                                        GENZ
                                    </div>
                                    <h1 className="view-blog__content-title">{this.props.viewBlogData.BlogTitle}</h1>
                                    <p className="view-blog__time" dateTime={this.props.viewBlogData.BlogCreatedAt}>{moment(this.props.viewBlogData.BlogCreatedAt).format('LL')}</p>
                                    <h2 className="view-blog__content__description">{this.props.viewBlogData.BlogDescription}</h2>
                                    <div className="view-blog__author-layout">
                                        <div className="view-blog__author">
                                            <address id="byline">By <a className="view-blog__author-profile" href="/profile">John</a></address>
                                        </div>
                                    </div>
                                    <hr />
                                </header>
                            </section>
                            <section className="view-blog__content-section">
                                <div className="content-body">
                                    <article>
                                        <section className="view-blog__body-content">
                                            <Markup content={this.props.viewBlogData.BlogContent} />
                                        </section>
                                    </article>
                                </div>
                            </section>
                            <div className="dotted_hr"></div>
                        </main>

                    }
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    const {blogConfig} = state;
    return {...blogConfig}
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchStoryLoader: (isFetchStoryLoader) => dispatch(fetchStoryLoader(isFetchStoryLoader)),
        displayBlog: (blogId, email, isGetDraft) => dispatch(displayBlog(blogId, email, isGetDraft))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(ViewBlog);