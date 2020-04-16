import React, { Component } from 'react';
import axios from 'axios';

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
        return (
            <div class="row">
                <div class="col s12">
                    {this.state.topics.map((topics) => (
                        <div class="card grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{topics.name}</span>
                                <p>Placeholder for information about threads and last active etc.</p>
                            </div>
                            <div class="card-action">
                                <a href="#">Enter here</a>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }
};

export default Topics;