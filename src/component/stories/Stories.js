import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchBlogsAndStore, fetchStoriesLoader } from '../../actions/blogConfig';
import DisplayBlog from '../displayblog/DisplayBlog';
import Loader from '../extras/Loader';
import "./__stories.scss"

class Stories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
        }
    }
    componentDidMount() {
        document.title = "Genz - Your Stories"
        this.fetchBlogs(this.props.cookies.get("email"), false);
    }

    fetchBlogs = (email, isGetDraft) => {
        try {
            this.props.fetchStoriesLoader(true);
            this.props.fetchBlogsAndStore(email, isGetDraft);
            // this.props.fetchStoriesLoader(false);
        } catch(err) {
            console.log(err);
        }
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.blogs.length !== this.props.blogs.length) {
            this.setState({
                blogs: this.props.blogs
            })
            console.log("demo blogs")
        }
    }

    render() {
        return (
            <div className="container stories__config">
                <h3><b>Your Stories</b></h3>
                <ul id="your_stories__tab" className="nav navlinks">
                    <li><a className="active" data-toggle="tab" href="#published" onClick={() => this.fetchBlogs(this.props.cookies.get("email"), false)}>Published</a></li>
                    <li><a data-toggle="tab" href="#draft" onClick={() => this.fetchBlogs(this.props.cookies.get("email"), true)}>Draft</a></li>
                </ul>
                <div className="tab-content">
                    <div id="published" style={{paddingTop: "50px"}} className="tab-pane active">
                        {
                            this.props.isFetchStoriesLoader ?
                            <Loader />: 
                            (this.props.blogs.length > 0) ?
                            <div>
                                {
                                    this.props.blogs.map((blog, index) => {
                                        return (
                                            <div>
                                                <DisplayBlog 
                                                    key={index} blog={blog} 
                                                    fetchStoriesLoader={this.props.fetchStoriesLoader}
                                                    fetchBlogs={this.fetchBlogs}
                                                    cookies={this.props.cookies}/><hr />
                                            </div>
                                        )
                                    })
                                }

                            </div> :
                            !(this.props.blogsFetchError) ?
                            <div style={{paddingTop: "30px"}}>
                                    <h4>You haven’t published any public stories yet.</h4>
                            </div> : 
                            <div>
                                <h4>{this.props.blogsFetchError}</h4>
                            </div>
                        }
                    </div>
                    <div id="draft" className="tab-pane" style={{paddingTop: "50px"}}>
                        {
                            this.props.isFetchStoriesLoader ?
                            <Loader />: 
                            (this.props.blogs.length > 0) ?
                            <div>
                                {
                                    this.props.blogs.map((blog, index) => {
                                        return (
                                            <div>
                                                <DisplayBlog 
                                                    key={index} blog={blog} 
                                                    fetchStoriesLoader={this.props.fetchStoriesLoader}
                                                    fetchBlogs={this.fetchBlogs}
                                                    cookies={this.props.cookies}/><hr />
                                            </div>
                                        )
                                    })
                                }

                            </div> :
                            !(this.props.blogsFetchError) ?
                            <div style={{paddingTop: "30px"}}>
                                    <h4>There are no drafts yet.</h4>
                            </div> : 
                            <div>
                                <h4>{this.props.blogsFetchError}</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {blogConfig} = state;
    return {...blogConfig}
}

const mapDispatchProps = (dispatch) => {
    return {
        fetchBlogsAndStore: (email, isGetDraft) => dispatch(fetchBlogsAndStore(email, isGetDraft)),
        fetchStoriesLoader: (isFetchStoriesLoader) => dispatch(fetchStoriesLoader(isFetchStoriesLoader))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Stories);