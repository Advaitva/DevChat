import React, { Component } from "react";
import "./styles/navbar.css";
import logo from "./logo.png";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div id="logo">
            <img src={logo} alt="logo" id="logopng"></img>
            <h4>DevChat</h4>
          </div>
          <div className="optionsContainer">
            <li>Members</li>
            <li>Login</li>
            <li>Sign Up</li>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
