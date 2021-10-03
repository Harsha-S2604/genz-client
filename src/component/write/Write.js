/* Hey dude, do not remove any imports below. 
There are here for purposes. So, be careful while developing. 
Thanks.*/

import {AiFillEdit} from 'react-icons/ai';
// import {BiCodeAlt} from 'react-icons/bi';
// import {FiEdit2} from 'react-icons/fi';
// import {BsImage} from 'react-icons/bs';
// import {ImEmbed} from 'react-icons/im';

import React, { Component } from "react";
import Image from './image/Image';
import ContentWrite from "./contentWrite/ContentWrite";
import { confirmAlert } from 'react-confirm-alert';
import {convertToRaw} from 'draft-js';
import {connect} from 'react-redux';
import {addForOptionWriteBlog, resetOptionWriteBlog, deleteBlogOption,
        updateFileName, setBlogData, unsetBlogData, unsetFileName} from '../../actions/writeConfig';
import Code from "./code/Code";
import Video from "./video/Video";
import Embed from "./embed/Embed";
import { Editor } from 'react-draft-wysiwyg';
import './_write.scss'
import 'react-confirm-alert/src/react-confirm-alert.css';
import StartWriting from './startwriting/StartWriting';

class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnableTitle: false,
            isEnableDescription: false,
            title: "",
            description: "",
            blogOptions: [],
            editorState: "",
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

        if(prevProps.createBlogArr.length !== this.props.createBlogArr.length || prevProps.createBlogArr !== this.props.createBlogArr) {
            this.buildBlogMenuOptions();
        }

    }

    buildBlogMenuOptions = () => {
        let blogOptions = []
        for(let i = 0 ; i < this.props.createBlogArr.length ; i++) {
            switch(this.props.createBlogArr[i].name) {
                case "image":
                    blogOptions.push(<Image {...this.props} createBlogArrObj={this.props.createBlogArr[i]} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i].name+"_"+this.props.createBlogArr[i].id}/>)
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

    handleContentWrite = (editorState) => {
        this.setState({
            editorState
        })
    }

    clearAllData = () => {
        this.setState({
            title: "",
            description: "",
            isEnableTitle: false,
            isEnableDescription: false,
            editorState: ""
        })
        this.props.onClickReset();
    }


    uploadImgCallBack = (image) => {
        return new Promise(
            (resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    resolve({ data: { link: reader.result } })
                }
                reader.onerror = reject
                reader.readAsDataURL(image)
            }
        )
    }


    handleReset = () => {
        if(this.state.title || this.state.description || this.state.isEnableTitle || this.state.isEnableDescription
            || this.props.createBlogArr.length > 0 || this.state.editorState) {

            // confitmation message to reset button
            confirmAlert({
                title: 'Are you sure?',
                message: 'Information you’ve entered may not be saved.',
                buttons: [
                  {
                    label: 'Reset',
                    onClick: () => this.clearAllData()
                  },
                  {
                    label: 'Cancel',
                  }
                ]
            });
        }
        
    }



    render() {
        const isSubmitDisabled = !(this.state.title && this.state.description && this.state.editorState)
        return (
            <div>
                <div className="container" style={{paddingTop: "3%"}}>
                    {!(this.props.cookies.get("email") && this.props.cookies.get("id")) ? 
                        <StartWriting /> : 
                        <div>
                            <div className="d-flex flex-row">
                                <div className="col-lg-9 col-md-7 col-sm-2 col-xs-2" style={{paddingRight: "35%"}}>
                                    <h2 className="primary-color">Write Blog</h2>
                                </div>
                                <div className="col">
                                    <button className="btn btn-outline-dark" onClick={this.handleReset}>Reset</button>
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
                                            placeholder="Type here..." onBlur={this.handleTitleBlur}/> 
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

                                {!this.state.isEnableDescription ? 
                                    <div className="form-group" style={{paddingTop: "5%"}}>
                                        <label htmlFor="description"><h4><b>Description</b></h4></label><br /><br />
                                        <textarea 
                                            className="blog__description"
                                            name = "description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            type="text" id="description" 
                                            required 
                                            placeholder="Type here..." onBlur={this.handleDescriptionBlur}/> 
                                    </div> :
                                    <div style={{paddingTop: "5%"}}>
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

                                <div className="contentwrite-padding">
                                    <h4 style={{paddingBottom: "1%"}}>Content</h4>
                                    <Editor id="content" className="form-control"
                                        toolbarClassName="editor__toolbar"
                                        editorState={this.state.editorState}
                                        placeholder="Type here..."
                                        onEditorStateChange={(event) => this.handleContentWrite(event)} 
                                        required
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            image:{
                                                uploadCallback: this.uploadImgCallBack,
                                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                alt: { present: true, mandatory: false },}
                                            }} />
                                </div>
                                <div className="blog__submit">
                                    <div className="d-flex flex-row">
                                        <div className="p-2">
                                            <button className="btn btn-outline-dark" disabled={isSubmitDisabled}>Save</button>
                                        </div>
                                        <div className="p-2">
                                            <button className="btn btn-outline-dark" disabled={isSubmitDisabled}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                                        
                                {/* FOR LATER DEVELOPMENT*/}
                                {/* <div>
                                    {this.state.blogOptions}
                                </div> */}

                                {/* <div className="plus__padding"> 
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
                                </div> */}
                            </div>
                        </div>
                    } 
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
        deleteBlogOption: (index) => dispatch(deleteBlogOption(index)),
        updateFileName: (id, fileName) => dispatch(updateFileName(id, fileName)),
        setBlogData: (id, data) => dispatch(setBlogData(id, data)),
        unsetFileName: (id) => dispatch(unsetFileName(id)),
        unsetBlogData: (id) => dispatch(unsetBlogData(id))
    }
  }

export default connect(mapStatetoProps, mapDispatchProps)(Write);