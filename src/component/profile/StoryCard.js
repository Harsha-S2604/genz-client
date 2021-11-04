import React, {Component} from 'react';

class StoryCard extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-9">
                    <a href="/title" className="stories__title"><h5><b>{this.props.story.title}</b></h5></a>
                    <p className="stories__description">{this.props.story.description}</p>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-outline-dark">Edit</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-dark">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoryCard;