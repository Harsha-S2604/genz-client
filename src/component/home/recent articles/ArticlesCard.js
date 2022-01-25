import React, {Component} from 'react';
import demo from '../../../assets/demo.jpg'
import "./__articlescard.scss";
import moment from 'moment';
import {MdOutlineBookmarkAdd} from 'react-icons/md';
import { Link } from 'react-router-dom';


export default class ArticlesCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isDesktop: false
        };
    }

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }


    updatePredicate  = () => {
        this.setState
        ({ isDesktop: window.innerWidth > 625 });
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    handleSaveStory = () => {
        console.log("SAVE STORY")
    }

    render() {
        const isDesktop = this.state.isDesktop;
        return (
            <div className="articles__style">
                <article>
                    <div className="articles__aligns">
                        <div className="articles__card-flex">
                            <div className="articles__card">
                                <div className="articles__display">
                                    <div className="articles__card-header">
                                        <div>
                                            <img src={demo} className="article__avatar" alt="Avatar" />
                                        </div>
                                        <div className="author__name">
                                            <div>
                                                <p className="author__name_1">{this.props.blog.User.Email.split("@")[0]}<span className="post__time"> .{moment(Buffer.from(this.props.blog.BlogCreatedAt, 'base64').toString()).format('ll')}</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn-config" onClick={this.handleSaveStory}><MdOutlineBookmarkAdd title="Add to your favorites to read it later." style={{fontSize: "20px"}}/></button>
                                        </div>
                                    </div>
                                    <div className="articles__card-body">
                                        <div className="articles__flex">
                                            <div className="articles__card-cont">
                                                <div className="articles__card-header articles__card-position">
                                                <Link className="articles-blog__href" 
                                                    to={{
                                                        pathname: "/stories/"+this.props.blog.BlogID+"/"+this.props.blog.BlogTitle.split(" ").join("-"),
                                                        state: { blogId: this.props.blog.BlogID, email: this.props.blog.User.Email, isGetDraft: this.props.blog.BlogIsDraft}
                                                    }}><h3 className="articles__card-header__main">{this.props.blog.BlogTitle}</h3></Link>
                                                </div>
                                                <div>
                                                    <p className="articles__card-description">{this.props.blog.BlogDescription}</p>
                                                </div>
                                            </div>
                                            <div className="articles__card-image">
                                                {
                                                    isDesktop?
                                                    <img src={"https://genztest.s3.ap-south-1.amazonaws.com/genz_story_image/"+this.props.blog.BlogID} width="130" height="100" alt="demo goes here" />:
                                                    <img src={"https://genztest.s3.ap-south-1.amazonaws.com/genz_story_image/"+this.props.blog.BlogID} width="56" height="56" alt="demo goes here" />

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <hr />
            </div>
        )
    }
}