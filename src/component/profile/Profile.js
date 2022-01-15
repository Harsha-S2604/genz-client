import React, {Component} from 'react';
import {FaUserCircle, FaKey} from 'react-icons/fa';
import {BsReddit, BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';
import {MdModeEditOutline} from 'react-icons/md';
import { connect } from 'react-redux';
import { getUserProfileAndStore, userProfileLoader } from '../../actions/profileConfig';
import './__profile.scss';
import Loader from '../extras/Loader';
import EditName from './EditModal/EditName';
import EditAboutYou from './EditModal/EditAboutYou';
import EditContact from './EditModal/EditContact';
import ChangePassword from './EditModal/ChangePassword';

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
        userProfile = userProfile.replace(/""/g, '"-"')
        console.log(userProfile)
        userProfile = JSON.parse(userProfile)
        let userName = this.state.userProfileData["Email"].split("@")[0]
        this.setState({
            userProfile,
            userName
        })
        this.buildContacts()

    }

    buildContacts = () => {
        let contactsJSX = []
        let contactsJSON = this.state.userProfile["contact"]
        for(let social in contactsJSON) {
            switch(social) {
                case "reddit":
                    contactsJSX.push(<div key="reddit" className="p-2"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsReddit className="contact__reddit"/></a></div>)
                    break;
                case "twitter":
                    contactsJSX.push(<div key="tw" className="p-2"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsTwitter className="contact__tw"/></a></div>);
                    break;
                case "facebook":
                    contactsJSX.push(<div key="fb" className="p-2"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsFacebook className="contact__fb"/></a></div>);
                    break;
                case "instagram":
                    contactsJSX.push(<div key="ig" className="p-2"><a target="_blank" href={contactsJSON[social]} rel="noreferrer"><BsInstagram className="contact__insta"/></a></div>);
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
        if(this.props.userProfileDataFetchLoader) {
            return (
                <Loader />
            )
        }
        return (
            <div className="profile_padding">
                <div className="container">
                    <div className="container">
                    <div className="profile_header">
                        <div className="profile_header__main">
                            <div className="profile_header__main-padding">
                                <span className="profile_header__span">
                                    <h2 className="profile_header__your-info">Your Info</h2>
                                </span>
                            </div>
                        </div>
                        <div className="profile_chnge-passwd">
                            <a className="edit_css"
                                data-toggle="modal" 
                                data-target="#chng_passwd"
                                href="#chng_passwd"><FaKey />{" "}Change Password</a>
                        </div>
                    </div>
                    <div className="profile_main">
                        <div className="card rounded shadow-sm mb-5">
                            <div className="card-body">
                                <div className="container">
                                    <div className="profile-pic__flex">
                                        <div className="profile-pic__main-padding">
                                            <span className="profile_header__span">
                                                <FaUserCircle className="profile_pic--icon"/>
                                            </span>
                                        </div>
                                        <div className="profile-pic__desc">
                                            <p>Personalize your account with a photo. This is the profile photo people will see.</p>
                                            <div>
                                                <div className="pt-3">
                                                    <input id="story_image" name="story_image" className="blog-image__input"
                                                        type="file"
                                                        accept="image/*" />
                                                    <label className="blog-image__label" htmlFor={"story_image"}>
                                                        Add a photo
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="container">
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <span className="profile-traits__css">username</span>
                                        </div>
                                        <div>
                                            <span><b>{this.state.userProfileData["Name"]}</b></span>
                                        </div>
                                        <div>
                                            <span><a
                                                data-toggle="modal" 
                                                data-target="#editModalCenter" 
                                                className="edit_css" href="#edit_name"><MdModeEditOutline />{" "}Edit name</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-5 rounded shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span><b>About you</b></span>
                                    </div>
                                    <div>
                                        <a 
                                            className="edit_css" 
                                            data-toggle="modal" 
                                            data-target="#edit_about_you"
                                            href="#edit_about_you"><MdModeEditOutline />{" "}Edit about you</a>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <p>{this.state.userProfile["about"]}</p>
                                </div>
                            </div>

                        </div>
                        <div className="card mb-5 rounded shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span><b>Profile info</b></span>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="profile-traits__css">Email</span>
                                    </div>
                                    <div>
                                        <span><b>{this.state.userProfileData["Email"]}</b></span>
                                    </div>
                                    <div>
                                        <span className="profile-traits__css">Your email is used for unique account identification.</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="profile-traits__css">Country of region</span>
                                    </div>
                                    <div>
                                        <span><b>India</b></span>
                                    </div>
                                    <div>
                                        <span className="profile-traits__css">Your country and region are used for privacy settings.</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="profile-traits__css">Blog URL</span>
                                    </div>
                                    <div>
                                        <span><b>nil</b></span>
                                    </div>
                                    <div>
                                        <span className="profile-traits__css">blog url used for other users to view your blogs.</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card mb-5 rounded shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span><b>Contact</b></span>
                                    </div>
                                    <div>
                                        <a  
                                            className="edit_css" 
                                            data-toggle="modal" 
                                            data-target="#edit_contact"
                                            href="#edit_contact"><MdModeEditOutline />{" "}Edit contact</a>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex">
                                    {this.state.contactsJSX.length > 0 ? this.state.contactsJSX:
                                    <div>
                                        <h3>No Contacts</h3>
                                        <p style={{color: "gray"}}>Click edit to add your contacts</p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="card mb-5 rounded shadow-sm">
                            <div className="card-body">
                                <span><b>Blog analysis</b></span>
                                <hr />
                                <div className="d-flex flex-row justify-content-between margin_top__2">
                                    <div className="blog_analysis__box">
                                        <h5><b>Total views</b></h5>
                                        <p>0 views</p>
                                    </div>
                                    <div className="blog_analysis__box">
                                        <h5><b>Total likes</b></h5>
                                        <p>0 likes</p>
                                    </div>
                                    <div className="blog_analysis__box">
                                        <h5><b>Profile reached</b></h5>
                                        <p>0 people</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <EditName />
                <EditAboutYou />
                <EditContact />
                <ChangePassword />
            </div>
            // <div className="outer">
            //     <div className="container pt-5">
            //         <div className="card mx-auto" style={{maxWidth: "1000px"}}>
            //             <div className="card-body">
            //                 {
            //                     this.props.userProfileDataFetchLoader ? 
            //                         <Loader /> :
            //                         this.props.userProfileDataError ? <h4>{this.props.userProfileDataError}</h4> :
            //                         <div>
            //                             <div className="row">
            //                                 <div className="col-lg-1 col-md-1 col-sm-1">
            //                                     <div className="card__profile">
            //                                         <img
            //                                             src="https://randomuser.me/api/portraits/men/51.jpg"
            //                                             alt="A man smiling"
            //                                         />
            //                                     </div>
            //                                 </div>
            //                                 <div className="col-lg-8 col-md-8 col-sm-8">
            //                                     <div className="card__name">
            //                                         <h4>{this.state.userProfileData["Name"]}</h4>
            //                                         <div className="card__handle">
            //                                             <span className="handle" style={{color: "gray"}}>{"@"+this.state.userName}</span>
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                                 <div className="col">
            //                                     <button onClick={this.handleEditProfile} className="btn btn-outline-dark"><AiFillEdit />{" "}Edit</button>
            //                                 </div>
            //                             </div>
            //                             <hr />
            //                             <ul id="profile__tab" className="nav navlinks">
            //                                 <li><a data-toggle="tab" className="active" href="#profileHome">Home</a></li>
            //                                 <li><a data-toggle="tab" href="#profileAbout">About</a></li>
            //                                 <li><a data-toggle="tab" href="#profileStories" onClick={this.fetchStories}>Stories</a></li>
            //                                 <li><a data-toggle="tab" href="#profileContacts">Contact</a></li>
            //                             </ul>
            
            //                             <div className="tab-content">
            //                                 <div id="profileHome" className="tab-pane active">
            //                                     <h4 className="primary-color"><b>Blog analysis</b></h4>
            //                                     <div className="d-flex flex-row justify-content-between margin_top__2">
            //                                     <div className="blog_analysis__box">
            //                                         <h5><b>Total views</b></h5>
            //                                         <p>1056 views</p>
            //                                     </div>
            //                                     <div className="blog_analysis__box">
            //                                         <h5><b>Total likes</b></h5>
            //                                         <p>144 likes</p>
            //                                     </div>
            //                                     <div className="blog_analysis__box">
            //                                         <h5><b>Profile reached</b></h5>
            //                                         <p>1045 people</p>
            //                                     </div>
            //                                     </div>
            //                                 </div>
            //                                 <div id="profileAbout" className="tab-pane">
            //                                     <p>{this.state.userProfile["about"] ? this.state.userProfile["about"] : 
            //                                     <div>
            //                                         <h3>{"About "+this.state.userProfileData["Name"]}</h3>
            //                                         <p style={{color: "gray"}}>Click edit to change your description</p>
            //                                     </div>}</p>
            //                                 </div>
            //                                 <div id="profileStories" className="tab-pane">
            //                                     <h4 className="primary-color profileStories__margin-bottom">Stories</h4>
            //                                     {
            //                                         this.state.userStories.map((story, index) => {
            //                                             return (
            //                                                 <div>
            //                                                     <StoryCard key={index} story={story}/>
            //                                                     <hr />
            //                                                 </div>
            //                                             )
            //                                         })
            //                                     }
            //                                 </div>
            //                                 <div id="profileContacts" className="tab-pane">
            //                                     <div className="row">
            //                                         {this.state.contactsJSX.length > 0 ? this.state.contactsJSX:
            //                                             <div>
            //                                                 <h3>No Contacts</h3>
            //                                                 <p style={{color: "gray"}}>Click edit to add your contacts</p>
            //                                             </div>}
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                 }
                            
                            
            //             </div>
            //         </div>
            //     </div>
            // </div>
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