import React, { Component } from "react";
import axios from 'axios';

class Test extends Component {
    constructor() {
        super()
        this.state = {
            topics: []
        };
    }

    componentDidMount() {

        axios.get('/topics')
            .then(res => {
                const topics = res.data;
                this.setState({ topics });
            });
    };

    render() {
        return (
            <div className="Test" >
                <div className="left">
                    <table>
                        <tr>
                            <th>Topic ID</th>
                            <th>Topic Name</th>
                        </tr>
                        {this.state.topics.map(topic =>
                            <tr>
                                <td>{topic.id}</td>
                                <td>{topic.name}</td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
        );
    };
};

export { Test }