import React, { Component } from "react";
import {AiFillEdit} from 'react-icons/ai';

export default class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnableTitle: false,
            isEnableDescription: false,
            title: "",
            description: ""
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case "title":
                this.setState({
                    title: value
                })
                break;
            case "description":
                this.setState({
                    description: value
                })
                break;
            
            default:
                break;
        }
    }

    handleTitleBlur = () => {
        var isEnableTitle = !this.state.isEnableTitle;
        this.setState({
            isEnableTitle
        })
    }

    handleDescriptionBlur = () => {
        var isEnableDescription = !this.state.isEnableDescription
        this.setState({
            isEnableDescription
        })
    }

    render() {
        return (
            <div>
                <div className="container" style={{paddingTop: "3%"}}>
                    {!(this.props.cookies.get("email") && this.props.cookies.get("id")) ? 
                    <div>
                        <h1>Publish, grow, and earn, all in one place.</h1>
                        <p>If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. Here, your writing can thrive in a network supported by millions of readers — not ads.</p>
                        <button className="btn btn-outline-dark" data-toggle="modal" data-target="#signInModalCenter">Start writing</button>
                    </div> : 
                    <div>
                        <div className="row">
                            <div className="col">
                                <h2 className="primary-color">Create Blog</h2>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-dark">Preview</button>
                            </div>
                        </div>
                        <div className="padding-top-3">
                           
                                {!this.state.isEnableTitle ?
                                <div className="form-group">
                                    <label htmlFor="title"><h4><b>Title</b></h4></label><br /><br />
                                    <input 
                                        className="title-css"
                                        name = "title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        type="text" id="title" 
                                        required 
                                        placeholder="enter the title" onBlur={this.handleTitleBlur}/> 
                                </div>:

                                    <div>
                                        <div className="row">
                                            <div className="col">
                                                <h4><b>Title</b></h4>
                                            </div>
                                            <div className="col">
                                                <button className="button-remove-bg no-link" 
                                                    onClick={this.handleTitleBlur}>
                                                        <h5 className="edit-color"><AiFillEdit className="pr-1"/>{" "}edit</h5>
                                                </button>
                                            </div>
                                        </div>
                                        <hr className="hr-width"/>
                                        <h3>{this.state.title}</h3>
                                    </div>
                                     }

                                    <div style={{paddingTop: "5%"}}>
                                    {!this.state.isEnableDescription ? 
                                        <div className="form-group">
                                        <label htmlFor="description"><h4><b>Description</b></h4></label><br /><br />
                                        <input 
                                            className="description-css"
                                            name = "description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            type="text" id="description" 
                                            required 
                                            placeholder="enter the description" onBlur={this.handleDescriptionBlur}/> 
                                    </div> :
                                        <div>
                                        <div className="row">
                                            <div className="col">
                                                <h4><b>Description</b></h4>
                                            </div>
                                            <div className="col">
                                                <button className="button-remove-bg no-link" 
                                                    onClick={this.handleDescriptionBlur}>
                                                        <h5 className="edit-color"><AiFillEdit className="pr-1"/>{" "}edit</h5>
                                                </button>
                                            </div>
                                        </div>
                                        <hr className="hr-width"/>
                                        <h5>{this.state.description}</h5>
                                        </div>

                                    }
                                    </div>
                        </div>
                     </div>
                    }
                </div>
            </div>
        )
    }
}