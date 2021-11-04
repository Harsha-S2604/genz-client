import React, {Component} from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

import './__displayblog.scss';

export default class DisplayBlog extends Component {

    handleBlogDelete = async (blogId, email) => {
        try {
            this.props.fetchStoriesLoader(true);
            let reqConfig = {
                headers: {
                    "X-Genz-Token": "4439EA5BDBA8B179722265789D029477",
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            }
            var url = new URL("http://localhost:8080/genz-server/blog-api/remove-blog")
            url.searchParams.append("email", email)
            url.searchParams.append("blogId", blogId)
            axios.post(url, {}, reqConfig)
                .then((response) => {
                    if(response.data.success) {
                        this.props.fetchBlogs();
                        toast.success("Blog deleted successfully.");
                    } else {
                        this.props.fetchStoriesLoader(false);
                        toast.error(response.data.message)
                    }
                })
                .catch(error => {
                    toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
                })
        } catch(error) {
            this.props.fetchStoriesLoader(false);
            toast.error("Sorry my friend, There's a problem from our side. We'll fix it ASAP. Please try again later.")
        }
        

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
                        <button className="btn btn-outline-dark" style={{margin: "5px"}} onClick={() => this.handleBlogEdit(this.props.blog.BlogID, this.props.cookies.get("email"))}>Edit</button>
                        <span><button className="btn btn-outline-dark" onClick={() => this.handleBlogDelete(this.props.blog.BlogID, this.props.cookies.get("email"))}>Delete</button></span>
                    </div>
                </div>
            </div>
        )
    }
}