import React, {Component} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import {BsReddit, BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';
import {AiFillRedditCircle} from 'react-icons/ai';
import {FaReddit} from 'react-icons/fa';
import './__profile.scss';

export default class Profile extends Component {
    render() {
        return (
            <div className="outer">
                <div className="container pt-5">
                    <div className="card mx-auto" style={{maxWidth: "1000px"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-1 col-md-1 col-sm-1">
                                    <div class="card__profile">
                                        <img
                                            src="https://randomuser.me/api/portraits/men/51.jpg"
                                            alt="A man smiling"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div class="card__name">
                                        <h4>John Wick</h4>
                                        <div class="card__handle">
                                            <span class="handle">@John_wick</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <button className="btn btn-outline-dark"><AiFillEdit />{" "}Edit</button>
                                </div>
                            </div>
                            <hr />
                            <ul id="profile__tab" className="nav navlinks">
                                <li className="active"><a data-toggle="tab" href="#profileHome">Home</a></li>
                                <li><a data-toggle="tab" href="#profileAbout">About</a></li>
                                <li><a data-toggle="tab" href="#profileContacts">Contacts</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="profileHome" className="tab-pane active">
                                    <h4 className="primary-color"><b>Blog analysis</b></h4>
                                    <div className="d-flex flex-row justify-content-between margin_top__2">
                                      <div className="blog_analysis__box">
                                        <h5><b>Total views</b></h5>
                                        <p>1056 views</p>
                                      </div>
                                      <div className="blog_analysis__box">
                                        <h5><b>Total likes</b></h5>
                                        <p>144 likes</p>
                                      </div>
                                      <div className="blog_analysis__box">
                                        <h5><b>Profile reached</b></h5>
                                        <p>1045 people</p>
                                      </div>
                                    </div>
                                </div>
                                <div id="profileAbout" className="tab-pane">
                                    <p>I'm name.. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, dicta. Veniam pariatur minima voluptas culpa rem. Suscipit veritatis vel non neque alias, molestiae id incidunt natus ipsum vero, quod aut qui sequi quis laudantium architecto exercitationem recusandae eius. Incidunt velit quasi debitis, commodi vero optio nesciunt perspiciatis quidem quos accusantium! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius harum minima, ipsum animi. Provident quae hic, perspiciatis accusamus quaerat iure tenetur explicabo dicta quos aspernatur quis, delectus itaque vel.</p>
                                </div>
                                <div id="profileContacts" className="tab-pane">
                                  <div className="row">
                                    <div className="col-lg-1"><a href="#reddit"><BsReddit className="contact__reddit"/></a></div>
                                    <div className="col-lg-1"><a href="#facebook"><BsFacebook className="contact__fb"/></a></div>
                                    <div className="col-lg-1"><a href="#twitter"><BsTwitter className="contact__tw"/></a></div>
                                    <div className="col-lg-1"><a href="#instagram"><BsInstagram className="contact__insta"/></a></div>
                                  </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 