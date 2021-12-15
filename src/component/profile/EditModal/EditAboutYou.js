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
        this.props.editAboutYou(value)
    }

    handleAboutYouSave = () => {
        console.log("Saved")
        toast.success("Saved")
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
                                                <label className="pb-3" htmlFor="about_you"><b>About You</b></label>
                                                <textarea type="text" 
                                                    name="about_you"
                                                    required
                                                    value={this.state.aboutYou}
                                                    className="form-control"
                                                    id="about_you" aria-describedby="aboutYouHelp" placeholder="Enter here"
                                                    onChange={this.handleAboutYouChange}
                                                />

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