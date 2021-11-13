import React, { Component } from "react";
import ArticlesCard from './recent articles/ArticlesCard'
import FollowUs from './follow us/FollowUs'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentArticles: [],
            trendingArticles: []
        }
    }

    componentDidMount() {
        this.setState({
            recentArticles: [
            {
                "id": 1,
                "title": "demo_title_1",
                "description": "A demo is what you give to show how something works. so they'll know how to use it. Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "John wick",
                "createdAt": "2020-12-06",
                "image":"static/demo.png"
            },
            {
                "id": 2,
                "title": "demo_title_2",
                "description": "Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "Mike tyson",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 3,
                "title": "demo_title_3",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 4,
                "title": "demo_title_4",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 5,
                "title": "demo_title_5",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            }
    
        ],
        trendingArticles: [
            {
                "id": 1,
                "title": "demo_title_1",
                "description": "A demo is what you give to show how something works. so they'll know how to use it. Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "John wick",
                "createdAt": "2020-12-06",
                "image":"static/demo.png"
            },
            {
                "id": 2,
                "title": "demo_title_2",
                "description": "Demo is short for demonstrate or demonstration. It can be a verb, as when a tech company demos its new tablet or laptop.",
                "author": "Mike tyson",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 3,
                "title": "demo_title_3",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 4,
                "title": "demo_title_4",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            },
            {
                "id": 5,
                "title": "demo_title_5",
                "description": "The sunset filled the entire sky with the deep color of rubies, setting the clouds ablaze. The waves crashed and danced along the shore, moving up and down in a graceful and gentle rhythm like they were dancing.",
                "author": "Robert alberto",
                "createdAt": "2020-12-07",
                "image":"static/demo.png"
            }
    
        ]
    })
}
    
    render() { 
        var recentArticles = []
        var trendingArticles = []
        for(let i = 0 ; i < this.state.recentArticles.length; i++) {
            recentArticles.push(<ArticlesCard 
                key={this.state.recentArticles[i].id} 
                title={this.state.recentArticles[i].title}
                description={this.state.recentArticles[i].description}
                created={this.state.recentArticles[i].createdAt} 
                author={this.state.recentArticles[i].author}/>)
        }

        for(let i = 0 ; i < this.state.trendingArticles.length; i++) {
            trendingArticles.push(<ArticlesCard 
                key={this.state.recentArticles[i].id} 
                title={this.state.recentArticles[i].title}
                description={this.state.recentArticles[i].description}
                created={this.state.recentArticles[i].createdAt} 
                author={this.state.recentArticles[i].author}/>)
        }
        return (
            <div>
                <div className="container padding-top-3">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-sm-10">
                            <div className="recent-articles-content-style">
                                <h2 className="recent-articles-header-style">Recent articles</h2>
                                <div>
                                    {recentArticles}
                                </div><br/><br /><br/>
                                <h2 className="recent-articles-header-style">Trending articles</h2>
                                <div>
                                    {trendingArticles}
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