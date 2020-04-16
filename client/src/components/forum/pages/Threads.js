import React, { Component } from 'react';
import axios from 'axios';
// import 'materialize-css';
import { Icon, Button, Card, Row, Col } from 'react-materialize';

class Threads extends Component {
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
            <Row>
                <div className="container">
                    <div className="col s12 grey lighten-4 full-width">>
                    {this.state.topics.map((topics) => (
                        <Card
                            actions={[
                                <a key="1" href="#">Enter here</a>,
                            ]}
                            className="grey darken-1"
                            closeIcon={<Icon>close</Icon>}
                            revealIcon={<Icon>more_vert</Icon>}
                            textClassName="white-text"
                            title={<h4>{topics.name}</h4>}
                        >
                            I am a very simple card.
                        </Card>
                    ))}
                    </div>
                </div>
            </Row>
        )
    }
};

export default Threads;