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
        return (
            <div className="view-blog__padding">
                <div>
                    {
                        this.props.isFetchStoryLoader ? 
                        <center>
                            <Loader />
                        </center> :
                        <main>
                            <article className="view-blog__article-layout">
                                <header className="view-blog__header-layout">
                                    <div className="view-blog__root">
                                        <div className="view-blog__title-layout">
                                            <h1 className="view-blog__title">{this.props.viewBlogData.BlogTitle}</h1>
                                        </div>
                                        <div className="view-blog__description-layout">
                                            <p className="view-blog__description">{this.props.viewBlogData.BlogDescription}</p>
                                        </div>
                                        <div className="view-blog__author-layout">
                                            <div className="view-blog__author">
                                                <address id="byline">By <a className="view-blog__author-profile" href="/profile">John</a></address>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="view-blog__utility">
                                        <time className="view-blog__time" dateTime={this.props.viewBlogData.BlogCreatedAt}>{moment(this.props.viewBlogData.BlogCreatedAt).format('LL')}</time>
                                        <div className="view-blog__share">
                                            <button className="view-blog__share-button" aria-haspopup="true"
                                            aria-controls="expanded-share-kit" >Share</button>
                                        </div>
                                    </div>
                                </header>
                                <section className="view-blog__body">
                                    <Markup content={this.props.viewBlogData.BlogContent} />
                                </section>
                            </article>
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