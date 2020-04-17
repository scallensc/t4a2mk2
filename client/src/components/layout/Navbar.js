import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../../App.css'
class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav className="z-depth-0">
                    <div className="nav-wrapper blue-grey darken-4">
                        <Link
                            to="/"
                            className="col s5 brand-logo center black-text"
                            >
                            <i className="material-icons">headset</i>
                            
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;