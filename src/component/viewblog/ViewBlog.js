import React, {Component} from 'react';
import { displayBlog, fetchStoryLoader } from '../../actions/blogConfig';
import './__viewblog.scss';
import Loader from '../extras/Loader';
import { connect } from 'react-redux';
import moment from 'moment';
import { Markup } from 'interweave';
import went_wrong from '../../assets/went_wrong.jpg'


class ViewBlog extends Component {
    async componentDidMount() {
        // console.log(this.props.location.state.email, this.props.location.state.blogId)
        let blogId = window.location.href.split("/")[4]
        this.props.fetchStoryLoader(true);
        await this.props.displayBlog(blogId, false);
        if(!this.props.viewBlogDataError) {
            document.title = "Genz - " + this.props.viewBlogData.BlogTitle
        } else {
            document.title = "Genz - Sorry something went wrong"
        }
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
                        this.props.viewBlogDataError ? 
                        <center>
                            <h3>Sorry something went wrong, please try again later.</h3>
                            <img src={went_wrong} className="went_wrong" alt="something_went_wrong" />
                        </center>:
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
                                    <img src={"data:image/jpeg;base64,"+this.props.viewBlogData.BlogImage} alt="article_image" height="550" width="450" />
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