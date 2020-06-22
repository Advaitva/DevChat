import React, { Component } from "react";
import "./styles/navbar.css";
import logo from "./logo.png";
class Navbar extends Component {
  render() {
    const nav = document.querySelector(".optionsContainer");
    const navSlide = () => {
      nav.classList.toggle("nav-active");
    };
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
            <li>SignUp</li>
          </div>
          <div className="burger">
            <div className="line1" onClick={navSlide}></div>
            <div className="line2" onClick={navSlide}></div>
            <div className="line3" onClick={navSlide}></div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
