import React, {Component} from 'react';

import './__displayblog.scss';

export default class DisplayBlog extends Component {

    handleBlogDelete = (blogId) => {
        console.log("DELETE BLOG", blogId)
    }

    handleBlogEdit = (blogId) => {
        console.log("EDIT BLOG", blogId)
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <a className="display-blog__href" href={"/stories/"+this.props.blog.BlogID+"/"+this.props.blog.BlogTitle.split(" ").join("-")}><h3>{this.props.blog.BlogTitle}</h3></a>
                        <p className="display-blog__description">{this.props.blog.BlogDescription}</p>
                        <p style={{color: "gray"}}>{"Created on "+Buffer.from(this.props.blog.BlogCreatedAt, 'base64').toString()+", Last updated on " + Buffer.from(this.props.blog.BlogLastUpdatedAt, 'base64').toString()}</p>
                    </div>
                    <div>
                        <button className="btn btn-outline-dark" style={{margin: "5px"}} onClick={() => this.handleBlogEdit(this.props.blog.BlogID)}>Edit</button>
                        <span><button className="btn btn-outline-dark" onClick={() => this.handleBlogDelete(this.props.blog.BlogID)}>Delete</button></span>
                    </div>
                </div>
            </div>
        )
    }
}