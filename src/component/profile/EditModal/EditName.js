import React, {Component} from 'react';
import { connect } from 'react-redux';
import { editUserName } from '../../../actions/profileConfig';
import { toast } from 'react-toastify';
import axios from 'axios';

var userApiCommonPattern = "http://localhost:8080/api/v1/users/"
class EditName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            editNameLoader: true,
            isSaveDisabled: true,
        }
    }

    componentDidMount() {
        this.setState({
            userName: this.props.userName,
            editNameLoader: false
        })
    }

    handleNameChange = async (event) => {
        const {value} = event.target
        await this.props.editUserName(value)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.userName !== this.props.userName) {
            this.setState({
                userName: this.props.userName,
                isSaveDisabled: false
            })
        }
    }

    handleChangeEditName = () => {
        let user = {
            userId: this.props.userProfileData["UserId"],
            name: this.state.userName
        }
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        axios.post(userApiCommonPattern+'edit/username', user, reqConfig)
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
                <div className="modal fade" id="editModalCenter" tabIndex="-1" role="dialog" aria-labelledby="editModalCenter" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="container">
                                    <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                                        <span className="font-size-25" aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="pt-2"><b>Edit Name</b></h4>
                                    <div className="pt-3">
                                        <form>
                                            <div className="form-group">
                                                <label className="pb-3" htmlFor="username"><b>Username</b></label>
                                                <input type="text" 
                                                    name="username"
                                                    required
                                                    value={this.state.userName}
                                                    className="form-control"
                                                    id="username" aria-describedby="usernameHelp" placeholder="Enter username"
                                                    onChange={this.handleNameChange}
                                                    />

                                            </div>
                                        </form>
                                    </div>
                                    <div style={{float: "right", paddingTop: "30px", paddingBottom: "10px"}}>
                                        <button className="btn btn-outline-dark" disabled={this.state.isSaveDisabled} onClick={this.handleChangeEditName}>Save</button>
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
        editUserName: (userName) => dispatch(editUserName(userName))
    }
}

export default connect(mapStatetoProps, mapDispatchProps)(EditName)