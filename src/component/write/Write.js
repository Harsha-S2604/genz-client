/* Hey dude, do not remove any imports below.
There are here for purposes. So, be careful while developing.
Thanks.*/

import {AiFillEdit} from 'react-icons/ai';
// import {BiCodeAlt} from 'react-icons/bi';
// import {FiEdit2} from 'react-icons/fi';
// import {BsImage} from 'react-icons/bs';
// import {ImEmbed} from 'react-icons/im';
// import Code from "./code/Code";
// import Video from "./video/Video";
// import Embed from "./embed/Embed";
// import Image from './image/Image';
// import ContentWrite from "./contentWrite/ContentWrite";

import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {connect} from 'react-redux';
import {addForOptionWriteBlog, resetOptionWriteBlog, deleteBlogOption,
        updateFileName, setBlogData, unsetBlogData, unsetFileName, setBlogTitle, setBlogDescription,
        setBlogEditorState, blogPublishLoader, setBlogImage} from '../../actions/writeConfig';
import { Editor } from 'react-draft-wysiwyg';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StartWriting from './startwriting/StartWriting';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserSignin from '../../model/UserSignin';
import AddBlog from '../../model/AddBlog';
import { Redirect } from 'react-router-dom';
import "./image/_image.scss";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './_write.scss'

var blogApiCommonPattern = "http://localhost:8080/api/v1/blogs/"
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
            isBlogPostSuccess: false,
            editorConfig: {}
        }
    }

    componentDidMount() {
        document.title = "Genz - Write"
        // this.buildBlogMenuOptions();
    }

    // componentDidUpdate(prevProps) {

    //     if(prevProps.createBlogArr.length !== this.props.createBlogArr.length || prevProps.createBlogArr !== this.props.createBlogArr) {
    //         this.buildBlogMenuOptions();
    //     }

    // }

    /* For later development */
    // buildBlogMenuOptions = () => {
    //     let blogOptions = []
    //     for(let i = 0 ; i < this.props.createBlogArr.length ; i++) {
    //         switch(this.props.createBlogArr[i].name) {
    //             case "image":
    //                 blogOptions.push(<Image {...this.props} createBlogArrObj={this.props.createBlogArr[i]} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i].name+"_"+this.props.createBlogArr[i].id}/>)
    //                 break;
    //             case "contentWrite":
    //                 blogOptions.push(<ContentWrite {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i}/>)
    //                 break;
    //             case "code":
    //                 blogOptions.push(<Code {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
    //                 break;
    //             case "video":
    //                 blogOptions.push(<Video {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
    //                 break;
    //             case "embed":
    //                 blogOptions.push(<Embed {...this.props} buildBlogMenuOptions={this.buildBlogMenuOptions} optionIndex={i} key={this.props.createBlogArr[i]+" "+i} />)
    //                 break;
    //             default:
    //                 break;

    //         }
    //     }

    //     this.setState({
    //         blogOptions
    //     })
    // }

    handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case "title":
                this.props.setBlogTitle(value);
                break;
            case "description":
                this.props.setBlogDescription(value);
                break;
            case "story_image":
                this.props.setBlogImage(event.target.files[0]);
                break;
            default:
                break;
        }
    }

    handleTitleBlur = () => {
        if(this.props.title) {
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
        if(this.props.description) {
            var isEnableDescription = !this.state.isEnableDescription
            this.setState({
                isEnableDescription
            })
        }
    }

    handleContentWrite = (editorState) => {
        this.props.setBlogEditorState(editorState)
    }

    clearAllData = () => {
        this.setState({
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

    uploadBlogImage = async (file, userId, blogId) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('userId', userId)
            formData.append('blogId', blogId)
            const response = await axios.post(
                blogApiCommonPattern+"story/image/upload",
                formData,
                {
                  headers: {'Content-Type': 'multipart/form-data', 'X-Genz-Token': '4439EA5BDBA8B179722265789D029477'},
                }
              );
            
            const json = response.data
            return json
        } catch(err) {
            return ""
        }
    }

    handleAddBlog = async (htmlMarkup, is_draft) => {
        let blog = new AddBlog();
        blog.blogTitle = this.props.title;
        blog.blogDescription = this.props.description;
        blog.blogContent = htmlMarkup;
        blog.blogIsDraft = is_draft;
        blog.blogTotalViews = 0;
        blog.blogTotalLikes = 0;
        let user = new UserSignin();
        user.email = this.props.cookies.get("email")
        blog.user = user;
        let reqConfig = {
            headers: {
                "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }
        let userId = this.props.cookies.get("id")
        let file = this.props.blogImage
        try {
            const response = await axios.post(blogApiCommonPattern+"add", blog, reqConfig)
            if(response.data.success) {
                console.log(file)
                if(!(Object.keys(file).length === 0)) {
                    let isUploadedJson = await this.uploadBlogImage(file, userId, response.data["blog_id"])
                    if(!isUploadedJson || !isUploadedJson.success) {
                        throw new Error("Failed to publish, Something went wrong. Our team is working on it. Please try again later.")
                    }
                }
                           
                this.props.blogPublishLoader(false);
                if(!is_draft) {
                    this.setState({
                        isBlogPostSuccess: true
                    })
                } else {
                    toast.success("Blog saved to draft successfully.")
                }

            } else {
                this.props.blogPublishLoader(false);
                toast.error(response.data.message)
            }
        } catch(error) {
            this.props.blogPublishLoader(false);
            toast.error("Sorry, Something went wrong. Our team is working on it. Please try again later.")
        }
    }

    handleSubmitBlog = (is_draft) => {
        this.props.blogPublishLoader(true);
        const rawContentState = convertToRaw(this.props.editorContent.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        setTimeout(() => {
            this.handleAddBlog(markup, is_draft);
        }, 2000)
    }


    handleReset = () => {
        if(this.props.title || this.props.description || this.state.isEnableTitle || this.state.isEnableDescription
            || this.props.createBlogArr.length > 0 || this.props.editorContent) {

            // confitmation message to reset button
            confirmAlert({
                title: 'Are you sure?',
                message: 'Information you???ve entered may not be saved.',
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
        const isSubmitDisabled = !(this.props.title && this.props.description && this.props.editorContent)
        if(this.state.isBlogPostSuccess) {
            return (
                <Redirect to={{
                    pathname: "/write/published",
                    state: {"isBlogPostSuccess": this.state.isBlogPostSuccess}
                }}/>
            )
        }
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
                                            value={this.props.title}
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
                                        <h3>{this.props.title}</h3>
                                    </div>
                                }

                                {!this.state.isEnableDescription ?
                                    <div className="form-group" style={{paddingTop: "5%"}}>
                                        <label htmlFor="description"><h4><b>Description</b></h4></label><br /><br />
                                        <textarea
                                            className="blog__description"
                                            name = "description"
                                            value={this.props.description}
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
                                        <h5>{this.props.description}</h5>
                                    </div>
                                }
                                <div className="form-group" style={{paddingTop: "5%"}}>
                                    <h4><b>Story image</b><i style={{fontSize:"18px"}}> (optional)</i></h4>
                                    <div className="pt-3">
                                        <input id="story_image" name="story_image" className="blog-image__input"
                                            type="file"
                                            accept="image/*"
                                            onChange={this.handleChange} />
                                        <label className="blog-image__label" htmlFor={"story_image"}>
                                            Browse a image
                                        </label><span style={{marginLeft: "20px", color: "#673ab7"}}>{this.props.imageName}</span>
                                    </div>
                                </div>

                                <div className="contentwrite-padding">
                                    <h4 style={{paddingBottom: "1%"}}><b>Content</b></h4>
                                    <Editor id="content" className="form-control"
                                        toolbarClassName="editor__toolbar"
                                        editorState={this.props.editorContent}
                                        placeholder="Type here..."
                                        onEditorStateChange={(event) => this.handleContentWrite(event)}
                                        required
                                        handlePastedText={() => false}
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            image:{
                                                uploadCallback: this.uploadImgCallBack,
                                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                alt: { present: true, mandatory: false },
                                                defaultSize: {
                                                    height: '354',
                                                    width: '680',
                                                  },
                                                }
                                            }} />
                                </div>
                                <div className="blog__submit">
                                    {
                                        this.props.isBlogPublishLoader ?
                                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>:

                                        <div className="d-flex flex-row">
                                            <div className="p-2">
                                                <button className="btn btn-outline-dark" onClick={() => this.handleSubmitBlog(true)} disabled={isSubmitDisabled}>Save to draft</button>
                                            </div>
                                            <div className="p-2">
                                                <button className="btn btn-outline-dark" onClick={() => this.handleSubmitBlog(false)} disabled={isSubmitDisabled}>Publish</button>
                                            </div>
                                        </div>
                                    }
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
        unsetBlogData: (id) => dispatch(unsetBlogData(id)),
        setBlogTitle: (title) => dispatch(setBlogTitle(title)),
        setBlogImage: (file) => dispatch(setBlogImage(file)),
        setBlogDescription: (description) => dispatch(setBlogDescription(description)),
        setBlogEditorState: (editorState) => dispatch(setBlogEditorState(editorState)),
        blogPublishLoader: (isBlogPublishLoader) => dispatch(blogPublishLoader(isBlogPublishLoader))
    }
  }

export default connect(mapStatetoProps, mapDispatchProps)(Write);