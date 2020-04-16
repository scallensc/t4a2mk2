import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LogOutButton } from "../buttons/LogOutButton.jsx"
import { ForumButton } from "../buttons/ForumButton.jsx"
class Dashboard extends Component {

    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.email}
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{ fontFamily: "monospace" }}>Audioboard</span>
                            </p>
                        </h4>
                        <div>
                        <LogOutButton/>
                        </div>
                        <div>
                        <Link to="/forum">
                        <ForumButton />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard