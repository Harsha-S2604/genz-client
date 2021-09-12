import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import './_image.scss'
export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            error : {
                fileNameErrorMsg: ""
            }
        }
    }

    handleImageDelete = () => {
        this.props.unsetFileName(this.props.createBlogArrObj.id);
        this.props.unsetBlogData(this.props.createBlogArrObj.id);
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const mimetype = image['type'];
        if(mimetype.split('/')[0] === "image") {
            // const url = URL.createObjectURL(event.target.files[0]);
            this.props.updateFileName(this.props.createBlogArrObj.id, image.name);
            // this.props.setBlogData(this.props.createBlogArrObj.id, url);
            this.setState({
                fileName: this.props.createBlogArrObj.fileName,
                error : {
                    ...this.state.error,
                    fileNameErrorMsg: ""
                }
            })
        } else {
            this.setState({
                error : {
                    ...this.state.error,
                    fileNameErrorMsg: "*Invalid file type. Please upload only image."
                }
            })
        }
    }
    render() {
        return (
            <div className="image-padding-css">
                <div className="row">
                    <div className="col">
                        <input id={"blog__images_"+this.props.createBlogArrObj.id} className="blog-image__input"
                               type="file"
                               accept="image/*"
                               onChange={this.handleImageChange} />
                        <label className="blog-image__label" htmlFor={"blog__images_"+this.props.createBlogArrObj.id}>
                            Browse a image
                        </label>
                    </div>
                    <div className="col">
                        <WriteOptionCancel {...this.props}/>
                    </div>
                    {
                            this.props.createBlogArrObj.fileName ? 
                            <p className="fileName__errMsg primary-color">
                                <i><b>{"*"+this.state.fileName}</b></i>
                                <button className="remove__delete-background" onClick={this.handleImageDelete}>&#10005;</button>
                            </p> : null
                    }
                    {
                        this.state.error.fileNameErrorMsg ? 
                        <p className="text-danger fileName__errMsg"><i><b>{this.state.error.fileNameErrorMsg}</b></i></p> : null
                    }
                </div>
            </div>
        )
    }
}