import React, {Component} from 'react';
import demo from '../../../assets/demo.jpg'
import "./__articlescard.scss";
import moment from 'moment';
import {MdOutlineBookmarkAdd} from 'react-icons/md';


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
                                                <p className="author__name_1">{this.props.author}<span className="post__time"> .{moment(this.props.created).format('ll')}</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn-config" onClick={this.handleSaveStory}><MdOutlineBookmarkAdd title="Add to your favorites" style={{fontSize: "20px"}}/></button>
                                        </div>
                                    </div>
                                    <div className="articles__card-body">
                                        <div className="articles__flex">
                                            <div className="articles__card-cont">
                                                <div className="articles__card-header articles__card-position">
                                                    <h2 className="articles__card-header__main">{this.props.title}</h2>
                                                </div>
                                                <div>
                                                    <p className="articles__card-description">{this.props.description}</p>
                                                </div>
                                            </div>
                                            <div className="articles__card-image">
                                                {
                                                    isDesktop?
                                                    <img src={demo} width="112" height="112" alt="demo goes here" />:
                                                    <img src={demo} width="56" height="56" alt="demo goes here" />

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