import React, { Component } from "react";
import Image from './image/Image';
import ContentWrite from "./contentWrite/ContentWrite";
import {AiFillEdit, AiOutlinePlayCircle} from 'react-icons/ai';
import {BiCodeAlt} from 'react-icons/bi';
import {FiEdit2} from 'react-icons/fi';
import {BsImage} from 'react-icons/bs';
import {ImEmbed} from 'react-icons/im';
import {connect} from 'react-redux';
import {addForOptionWriteBlog, resetOptionWriteBlog, deleteBlogOption} from '../../actions/writeConfig';
import Code from "./code/Code";
import Video from "./video/Video";
import Embed from "./embed/Embed";

import './_write.scss'

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnableTitle: false,
            isEnableDescription: false,
            title: "",
            description: "",
            blogOptions: []
        }
    }

    componentDidMount() {
        this.buildBlogMenuOptions();
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = 'Are you sure?'; // Legacy method for cross browser support
        }
        return 'Are you sure?'; // Legacy method for cross browser support
      };
      

    componentDidUpdate(prevProps) {
        if(prevProps.createBlogArr.length !== this.props.createBlogArr.length) {
            this.buildBlogMenuOptions();
        }

    }

    buildBlogMenuOptions = () => {
        let blogOptions = []
        for(let i = 0 ; i < this.props.createBlogArr.length ; i++) {
            switch(this.props.createBlogArr[i]) {
                case "image":
                    blogOptions.push(<Image {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i}/>)
                    break; 
                case "contentWrite":
                    blogOptions.push(<ContentWrite {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i}/>)
                    break;
                case "code":
                    blogOptions.push(<Code {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
                    break;
                case "video":
                    blogOptions.push(<Video {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
                    break;
                case "embed":
                    blogOptions.push(<Embed {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
                    break;
                default:
                    break;       

            }
        }
        
        this.setState({
            blogOptions
        })
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
        if(this.state.title) {
            var isEnableTitle = !this.state.isEnableTitle;
            this.setState({
                isEnableTitle
            })
        }
        
    }

    handleMenuChange = (event) => {
        const {name} = event.currentTarget;
        this.props.onClickAddWriteConfig(name);
    }

    handleDescriptionBlur = () => {
        if(this.state.description) {
            var isEnableDescription = !this.state.isEnableDescription
            this.setState({
                isEnableDescription
            })
        }  
    }

    handlePlusButton = () => {
        console.log("handle plus button");
    }

    handleReset = () => {
        this.setState({
            title: "",
            description: "",
            isEnableTitle: false,
            isEnableDescription: false,
        })
        this.props.onClickReset();
    }



    render() {
        return (
            <div>
                <div className="container" style={{paddingTop: "3%"}}>
                    {/* {!(this.props.cookies.get("email") && this.props.cookies.get("id")) ? 
                    <div>
                        <h1>Publish, grow, and earn, all in one place.</h1>
                        <p>If you have a story to tell, knowledge to share, or a perspective to offer — welcome home. Here, your writing can thrive in a network supported by millions of readers — not ads.</p>
                        <button className="btn btn-outline-dark" data-toggle="modal" data-target="#signInModalCenter">Start writing</button>
                    </div> :  */}
                    <div>
                        <div className="row">
                            <div className="col-lg-9 col-md-7 col-sm-4 col-xs-1">
                                <h2 className="primary-color">Create Blog</h2>
                            </div>
                            <div className="col">
                                <div className="d-flex">
                                    <div style={{marginRight: "2%"}}>
                                        <button className="btn btn-outline-dark">Preview</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-outline-dark" onClick={this.handleReset}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="padding-top-3">
                           
                                {!this.state.isEnableTitle ?
                                <div className="form-group">
                                    <label htmlFor="title"><h4><b>Title</b></h4></label><br /><br />
                                    <input 
                                        className="blog__title"
                                        name = "title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        type="text" id="title" 
                                        required 
                                        placeholder="enter the title" onBlur={this.handleTitleBlur}/> 
                                </div>:

                                    <div>
                                        <div className="row">
                                            <div className="col-lg-9 col-md-7 col-sm-4 col-xs-1">
                                                <h4><b>Title</b></h4>
                                            </div>
                                            <div className="col">
                                                <button className="button-remove-bg no-link" 
                                                    onClick={this.handleTitleBlur}>
                                                        <h5 className="edit-color"><AiFillEdit className="pr-1"/>{" "}edit</h5>
                                                </button>
                                            </div>
                                        </div>
                                        <hr className="hr__width"/>
                                        <h3>{this.state.title}</h3>
                                    </div>
                                     }

                                    <div style={{paddingTop: "5%"}}>
                                    {!this.state.isEnableDescription ? 
                                    <div className="form-group">
                                        <label htmlFor="description"><h4><b>Description</b></h4></label><br /><br />
                                        <textarea 
                                            className="blog__description"
                                            name = "description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            type="text" id="description" 
                                            required 
                                            placeholder="Enter the description..." onBlur={this.handleDescriptionBlur}/> 
                                    </div> :
                                        <div>
                                        <div className="row">
                                            <div className="col-lg-9 col-md-7 col-sm-4 col-xs-1">
                                                <h4><b>Description</b></h4>
                                            </div>
                                            <div className="col">
                                                <button className="button-remove-bg" 
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
                                    <div>
                                        {this.state.blogOptions}
                                    </div>
                                    <div className="plus__padding"> 
                                        <center>
                                            <div className="wrapper">
                                                <input type="checkbox" />
                                                <div className="btn__write-options"></div>
                                                <div className="tooltip">
                                                    <button className="button-remove-bg inline-tooltip" onClick={this.handleMenuChange} title="code" name="code"><BiCodeAlt className="code-icon__css" /></button>
                                                    <button className="button-remove-bg inline-tooltip" onClick={this.handleMenuChange} title="content" name="contentWrite"><FiEdit2 className="code-icon__css" /></button>
                                                    <button className="button-remove-bg inline-tooltip" onClick={this.handleMenuChange} title="image" id="image" name="image"><BsImage className="code-icon__css" /></button>
                                                    <button className="button-remove-bg inline-tooltip" onClick={this.handleMenuChange} title="video" name="video"><AiOutlinePlayCircle className="code-icon__css" /></button>
                                                    <button className="button-remove-bg inline-tooltip" onClick={this.handleMenuChange} title="embed" name="embed"><ImEmbed className="code-icon__css" /></button>
                                                </div>
                                            </div>
                                        </center>
                                    </div>
                        </div>
                     </div>
                    {/* } */}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let { writeConfig } = state;
    return { ...writeConfig }
  }
  
  const mapDispatchProps = (dispatch) => {
    return {
        onClickAddWriteConfig: (option) => dispatch(addForOptionWriteBlog(option)),
        onClickReset: () => dispatch(resetOptionWriteBlog()),
        deleteBlogOption: (index) => dispatch(deleteBlogOption(index))
    }
  }

export default connect(mapStatetoProps, mapDispatchProps)(Write);