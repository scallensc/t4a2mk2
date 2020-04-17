import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Topics extends Component {
    state = {
        topics: [],
    }
    componentDidMount() {
        const url = "/api/forum/topics";
        axios.get(url).then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({ topics: data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    render() {
        const url = "/topic/"
        return (
            <div className="row">
                <div className="container">
                    <div className="col s12">
                        <h4 align="center" color="white">Forum Topics</h4>
                        <br></br>
                        {this.state.topics.map((topics) => (
                            // a = topics.Threads[0].last_up = topics.Threads[0].last_up.any() !== null,
                            // a = topics.thread_count = topics.thread_count.any() !== null),
                            <div className="row" key={`row ${topics.name}`}>
                                <div className="col s12" key={`col ${topics.name}`}>
                                    <div className="card blue-grey darken-4" key={`card ${topics.name}`} >
                                        <div className="card-content white-text" key={`card-content ${topics.name}`}>
                                            <span className="card-title" key={topics.name}>{topics.name}</span>
                                            <p key={topics.thread_count}>{"Threads: " + topics.thread_count}</p>
                                            <p key={topics.Threads[0].last_up}>{"Last active: " + topics.Threads[0].last_up}</p>
                                        </div>
                                        <div className="card-action" key={url + topics.id}>
                                            <Link to={url + topics.id}>Enter {topics.name} Here </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Topics;