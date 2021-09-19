import React, {Component} from 'react';
import WriteOptionCancel from '../../extras/WriteOptionCancel';
import './_image.scss';
import toast from 'react-hot-toast';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            imageURL: "",
            error : {
                fileNameErrorMsg: ""
            }
        }
    }

    handleImageDelete = () => {
        this.props.unsetFileName(this.props.createBlogArrObj.id);
        this.props.unsetBlogData(this.props.createBlogArrObj.id);
    }


    // generate base64 for an image file
    getDataURL = (image) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(image)
    })

    handleImageChange = async (event) => {
        const image = event.target.files[0];
        const mimetype = image['type'];
        if(mimetype.split('/')[0] === "image") {
            await this.getDataURL(image)
                .then(dataURL => {
                    // update filename
                    this.props.updateFileName(this.props.createBlogArrObj.id, image.name);

                    // set url
                    this.props.setBlogData(this.props.createBlogArrObj.id, dataURL);
                })
                .catch((error) => {
                    toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later", {
                        duration: 5000,
                        position: 'top-right',
                    })
                })
            
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