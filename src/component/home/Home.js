import React, { Component } from "react";
import ArticlesCard from './recent articles/ArticlesCard'
import FollowUs from './follow us/FollowUs'
import "./__home.scss";
import { connect } from "react-redux";
import { fetchRecentBlogs, homeLoader } from "../../actions/blogConfig";
import Loader from "../extras/Loader";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentArticles: [],
            trendingArticles: []
        }
    }

    componentDidMount() {
        this.props.homeLoader(true);
        this.props.fetchRecentBlogs();
        this.props.homeLoader(false);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.recentBlogData != this.props.recentBlogData) {
            this.setState({
                recentArticles: this.props.recentBlogData
            })
        }
    }
    
    render() {
        return (
            <div>
                <div className="container padding-top-3">
                    {
                        this.props.isHomeLoader ? 
                        <Loader /> :
                    
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-10">
                                <div className="articles-content-style">
                                    <div style={{marginBottom: "100px"}}>
                                        <h2 className="articles-header-style"><b>Recent articles</b></h2>
                                        <hr className="hr__articles"/>
                                        {
                                            this.state.recentArticles && this.state.recentArticles.length > 0 ?
                                            <div>
                                                {
                                                    this.state.recentArticles.map((blog, index) => {
                                                        return (
                                                        <ArticlesCard 
                                                            key={"RA_"+index}
                                                            blog={blog}/>
                                                        )
                                                    })
                                                }
                                            </div> : 
                                            <div>
                                                <h4>Uh-Oh! No articles found.</h4>
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <h2 className="articles-header-style"><b>Trending articles</b></h2>
                                        <hr className="hr__articles"/>
                                        {
                                            this.props.trendingBlogData.length > 0 ?
                                            <div>
                                                Display trending articles here
                                            </div> : 
                                            <div>
                                                <h4>Uh-Oh! No articles found.</h4>
                                            </div>
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col">
                                <FollowUs />
                            </div>
                        </div>
                    }
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
        fetchRecentBlogs: () => dispatch(fetchRecentBlogs()),
        homeLoader: (isHomeLoader) => dispatch(homeLoader(isHomeLoader))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Home);