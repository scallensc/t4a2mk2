import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { LogOutButton } from "../buttons/LogOutButton.jsx"
import { ForumButton } from "../buttons/ForumButton.jsx"
class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

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
                        <div onClick={this.onLogoutClick}>
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
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);