import React, {Component} from 'react';
import { connect } from 'react-redux';
import { editAboutYou, editUserName } from '../../../actions/profileConfig';
import { toast } from 'react-toastify';
import axios from 'axios';

class EditAboutYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutYou: ""
        }
    }

    componentDidMount() {
        this.setState({
            aboutYou: this.props.aboutYou
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.aboutYou !== this.props.aboutYou) {
            this.setState({
                aboutYou: this.props.aboutYou
            })
        }
    }

    handleAboutYouChange = (event) => {
        const {value} = event.target
        if(value.length > 200) {
            return
        }
        this.props.editAboutYou(value)
    }

    handleAboutYouSave = () => {
        let aboutYouConfig = {
            userId: this.props.userProfileData["UserId"],
            aboutYou: this.state.aboutYou
        }
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        axios.post('http://localhost:8080/genz-server/user-api/edit-aboutyou', aboutYouConfig, reqConfig)
            .then(response => {
                if(response.data.success) {
                    window.location.reload();
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((err) => {
                toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
            })
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="edit_about_you" tabIndex="-1" role="dialog" aria-labelledby="edit_about_you" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="container">
                                    <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                                        <span className="font-size-25" aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="pt-2"><b>Edit about you</b></h4>
                                    <div className="pt-3">
                                        <form>
                                            <div className="form-group">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <label className="pb-3" htmlFor="about_you"><b>About You</b></label>
                                                    </div>
                                                    <div>
                                                        {200-this.state.aboutYou.length+"/200"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <textarea type="text" 
                                                            name="about_you"
                                                            required
                                                            value={this.state.aboutYou}
                                                            className="form-control"
                                                            id="about_you" aria-describedby="aboutYouHelp" placeholder="Enter here"
                                                            onChange={this.handleAboutYouChange}
                                                        />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div style={{float: "right", paddingTop: "30px", paddingBottom: "10px"}}>
                                        <button className="btn btn-outline-dark" onClick={this.handleAboutYouSave}>Save</button>
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

const mapStatetoProps = (state) => {
    let { profileConfig } = state;
    return { ...profileConfig }
}

const mapDispatchProps = (dispatch) => {
    return {
        editAboutYou: (aboutYou) => dispatch(editAboutYou(aboutYou))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(EditAboutYou)