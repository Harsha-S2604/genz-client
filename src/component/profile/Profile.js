import React, {Component} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import './__profile.scss';

export default class Profile extends Component {
    render() {
        return (
            <div className="outer">
                <div className="container" style={{paddingTop: "100px", marginLeft: "400px"}}>
                    <div className="card" style={{maxWidth: "1000px"}}>
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
                                <li className="active"><a data-toggle="tab" aria-controls="home" role="tab" href="#profileHome">Home</a></li>
                                <li><a data-toggle="tab" href="#profileAbout">About</a></li>
                                <li><a data-toggle="tab" href="#profileContacts">Contacts</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="profileHome" className="tab-pane active">
                                    <h4 className="primary-color"><b>Blog analysis</b></h4>
                                    <div class="insights">
          <div class="insight">
            <div class="heading">
              People Reached
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>7%</span>
              </div>
            </div>
            <div class="number">
              1,090
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="insight">
            <div class="heading">
              Post Engagement
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>25%</span>
              </div>
            </div>
            <div class="number">
              305
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div class="insight">
            <div class="heading">
              Page Likes
              <div class="score">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 262.361 262.362"
                  width="8"
                  height="8"
                  fill="#44c790"
                >
                  <path
                    d="M286.935 197.287L159.028 69.381c-3.613-3.617-7.895-5.424-12.847-5.424s-9.233 1.807-12.85 5.424L5.424 197.287C1.807 200.904 0 205.186 0 210.134s1.807 9.233 5.424 12.847c3.621 3.617 7.902 5.425 12.85 5.425h255.813c4.949 0 9.233-1.808 12.848-5.425 3.613-3.613 5.427-7.898 5.427-12.847s-1.814-9.23-5.427-12.847z"
                  />
                </svg>
                <span>18%</span>
              </div>
            </div>
            <div class="number">
              13
              <div class="info">
                More Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
                                </div>
                                <div id="profileAbout" className="tab-pane">
                                    <p>This is about page</p>
                                </div>
                                <div id="profileContacts" className="tab-pane">
                                    <p>This is contacts page</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 