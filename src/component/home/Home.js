import React, { Component } from "react";
import RecentArticles from './recent articles/RecentArticles'
import FollowUs from './follow us/FollowUs'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentArticles: []
        }
    }

    componentDidMount() {
        this.setState({
            recentArticles: [
            {
                "id": 1,
                "title": "demo_title_1",
                "description": "A demo is what you give to show how something works. You might give a demo of your fancy new espresso machine to your weekend guests, so they'll know how to use it. Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "John",
                "created at": "2020-12-06",
                "image":"static/demo.png"
            },
            {
                "id": 2,
                "title": "demo_title_2",
                "description": "Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "John",
                "created at": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 3,
                "title": "demo_title_3",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "John",
                "created at": "2020-12-07",
                "image":"static/demo.png"
            }
    
        ]
    })
}
    
    render() { 
        var recentArticles = []
        for(let i = 0 ; i < this.state.recentArticles.length; i++) {
            recentArticles.push(<RecentArticles 
                key={this.state.recentArticles[i].id} 
                title={this.state.recentArticles[i].title}
                description={this.state.recentArticles[i].description}/>)
        }
        return (
            <div>
                <div className="container padding-top-3">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-10">
                            <div>
                                <h2 className="recent-articles-header-style">Recent articles</h2>
                                <div>
                                    {recentArticles}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <FollowUs />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}