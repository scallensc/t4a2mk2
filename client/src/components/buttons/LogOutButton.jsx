import React, { Component } from "react";

class LogOutButton extends Component {

    render() {
        return (
            <div className="col s12 center-align">
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Logout
                </button>
            </div>
        )
    }
}

export { LogOutButton }