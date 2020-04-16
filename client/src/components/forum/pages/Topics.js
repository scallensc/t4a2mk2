import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Topics extends Component {
    state = {
        topics: []
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
        const url = "/pages/topic/"
        return (
            <div class="row">
                <div class="container">
                    <div class="col s12">
                        <h4 align="center">Forum Topics</h4>
                        <br></br>
                        {this.state.topics.map((topics) => (
                            <div class="row" border-radius="5">
                                <div class="col s12 blue-grey lighten-1 z-depth-2" border="5px solid">
                                    <div class="col s8 blue-grey lighten-1">
                                        <div class="white-text">
                                            <h3><span class="text">{topics.name}</span></h3>
                                            <h4><span class="text"><Link to={url + topics.id}>Enter Here </Link></span></h4>
                                        </div>
                                    </div>
                                    <div class="col s4 blue-grey lighten-1">
                                        <div class="white-text" size="32">
                                            <h3>{"Threads: " + topics.thread_count}</h3>
                                            <div class="white-text">{"Last active: " + topics.Threads[0].last_up}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}



export default Topics;