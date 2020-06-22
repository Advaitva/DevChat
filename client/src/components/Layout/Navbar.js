import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              <h4>DevChat</h4>
            </a>
          </div>
          <div className="optionsContainer">
            <Link
              to="/profiles"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>Members</li>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>Login</li>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <li>SignUp</li>
            </Link>
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
