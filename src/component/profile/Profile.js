import React, {Component} from 'react';
import {AiFillEdit} from 'react-icons/ai';
import {BsReddit, BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';
import { connect } from 'react-redux';
import { getUserProfileAndStore, userProfileLoader } from '../../actions/profileConfig';
import './__profile.scss';
import StoryCard from './StoryCard';
class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            userProfileData: {},
            userProfile: {},
            contactsJSX: [],
            userName: "",
            userStories: []
        }
    }

    componentDidMount() {
        try {
            this.props.userProfileLoader();
            setTimeout(async () => {
                await this.props.getUserProfileAndStore(this.props.cookies.get("id"))
                await this.setState({
                    userProfileData: this.props.userProfileData
                })
                this.manipulateProfileData()
            }, 2000)
        } catch(error) {
            console.log("SOMETHING WENT WRONG")
        }
    }

    manipulateProfileData = () => {
        let userProfile = this.state.userProfileData["Profile"]
        userProfile = userProfile.replace(/""/g, '"-')
        userProfile = JSON.parse(userProfile)
        let userName = this.state.userProfileData["Email"].split("@")[0]
        this.setState({
            userProfile,
            userName
        })
        this.buildContacts()

    }

    handleEditProfile = () => {
        console.log("SHow edit profile")
    }

    fetchStories = () => {
        let userStories = [
            {
                "id": 1,
                "title": "demo_title_1",
                "description": "A demo is what you give to show how something works. so they'll know how to use it. Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "John wick",
                "createdAt": "2020-12-06",
                "image":"static/demo.png"
            },
            {
                "id": 2,
                "title": "demo_title_2",
                "description": "Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "Mike tyson",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 3,
                "title": "demo_title_3",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 4,
                "title": "demo_title_4",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 5,
                "title": "demo_title_5",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            }
        ]

        this.setState({
            userStories
        })
    }

    buildContacts = () => {
        let contactsJSX = []
        let contactsJSON = this.state.userProfile["contact"]
        for(let social in contactsJSON) {
            switch(social) {
                case "reddit":
                    contactsJSX.push(<div key="reddit" className="col-lg-1"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsReddit className="contact__reddit"/></a></div>)
                    break;
                case "twitter":
                    contactsJSX.push(<div key="tw" className="col-lg-1"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsTwitter className="contact__tw"/></a></div>);
                    break;
                case "facebook":
                    contactsJSX.push(<div key="fb" className="col-lg-1"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsFacebook className="contact__fb"/></a></div>);
                    break;
                case "instagram":
                    contactsJSX.push(<div key="ig" className="col-lg-1"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsInstagram className="contact__insta"/></a></div>);
                    break;
                default:
                    break;
            }
        }
        this.setState({
            contactsJSX
        })
    }



    render() {
        return (
            <div className="outer">
                <div className="container pt-5">
                    <div className="card mx-auto" style={{maxWidth: "1000px"}}>
                        <div className="card-body">
                            {
                                this.props.userProfileDataFetchLoader ? 
                                    <center>
                                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    </center> :
                                    this.props.userProfileDataError ? <h4>{this.props.userProfileDataError}</h4> :
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-1 col-md-1 col-sm-1">
                                                <div className="card__profile">
                                                    <img
                                                        src="https://randomuser.me/api/portraits/men/51.jpg"
                                                        alt="A man smiling"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8">
                                                <div className="card__name">
                                                    <h4>{this.state.userProfileData["Name"]}</h4>
                                                    <div className="card__handle">
                                                        <span className="handle" style={{color: "gray"}}>{"@"+this.state.userName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <button onClick={this.handleEditProfile} className="btn btn-outline-dark"><AiFillEdit />{" "}Edit</button>
                                            </div>
                                        </div>
                                        <hr />
                                        <ul id="profile__tab" className="nav navlinks">
                                            <li className="active"><a data-toggle="tab" href="#profileHome">Home</a></li>
                                            <li><a data-toggle="tab" href="#profileAbout">About</a></li>
                                            <li><a data-toggle="tab" href="#profileStories" onClick={this.fetchStories}>Stories</a></li>
                                            <li><a data-toggle="tab" href="#profileContacts">Contact</a></li>
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
                                                <p>{this.state.userProfile["about"] ? this.state.userProfile["about"] : 
                                                <div>
                                                    <h3>{"About "+this.state.userProfileData["Name"]}</h3>
                                                    <p style={{color: "gray"}}>Click edit to change your description</p>
                                                </div>}</p>
                                            </div>
                                            <div id="profileStories" className="tab-pane">
                                                <h4 className="primary-color profileStories__margin-bottom">Stories</h4>
                                                {
                                                    this.state.userStories.map((story, index) => {
                                                        return (
                                                            <div>
                                                                <StoryCard key={index} story={story}/>
                                                                <hr />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div id="profileContacts" className="tab-pane">
                                                <div className="row">
                                                    {this.state.contactsJSX.length > 0 ? this.state.contactsJSX:
                                                        <div>
                                                            <h3>No Contacts</h3>
                                                            <p style={{color: "gray"}}>Click edit to add your contacts</p>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let { profileConfig } = state;
    return { ...profileConfig }
}

const mapDispatchProps = (dispatch) => {
    return {
        getUserProfileAndStore: (userId) => dispatch(getUserProfileAndStore(userId)),
        userProfileLoader: () => dispatch(userProfileLoader())
    }
  }

export default connect(mapStatetoProps, mapDispatchProps)(Profile)