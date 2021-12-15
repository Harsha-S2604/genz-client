import React, {Component} from "react";
import {BsReddit, BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="modal fade" id="edit_contact" tabIndex="-1" role="dialog" aria-labelledby="edit_contact" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="container">
                                <button type="button" className="close remove-button-css" data-dismiss="modal" aria-label="Close">
                                    <span className="font-size-25" aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="pt-2"><b>Edit Contacts</b></h4>
                                <div className="pt-3">
                                    <div className="d-flex">
                                        <div className="m-2"><a target="_blank" href="https://www.reddit.com" rel="noreferrer"><BsReddit className="contact__reddit"/></a></div>
                                        <div className="m-2"><a target="_blank" href="https://www.facebook.com" rel="noreferrer"><BsFacebook className="contact__fb"/></a></div>
                                        <div className="m-2"><a target="_blank" href="https://www.twitter.com" rel="noreferrer"><BsTwitter className="contact__tw"/></a></div>
                                        <div className="m-2"><a target="_blank" href="https://www.instagram.com" rel="noreferrer"><BsInstagram className="contact__insta"/></a></div>
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

export default EditContact