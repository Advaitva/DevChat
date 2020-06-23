import React, { Component } from "react";
import "./styles/login-register.css";

class Register extends Component {
  render() {
    return (
      <div>
        <div class="body">
          <h1>Sign Up</h1>
          <div class="form">
            <div class="input-Div">
              <input
                type="text"
                name="name"
                id="name"
                autocomplete="off"
                required
              />
              <label class="label-name" for="name">
                <span class="label-span">Name</span>
              </label>
            </div>
            <div class="input-Div">
              <input
                type="text"
                name="email"
                id="email"
                autocomplete="off"
                required
              />
              <label class="label-name" for="email">
                <span class="label-span">E-mail</span>
              </label>
            </div>
            <span id="mailMessage">
              (This will be considered as a gravatar e-mail and the Wordpress
              profile image will be used.)
            </span>

            <div class="input-Div">
              <input
                type="password"
                name="password"
                id="pass"
                autocomplete="off"
                required
              />

              <label class="label-name" for="password">
                <span class="label-span">Password</span>
              </label>
            </div>
            <div class="input-Div">
              <input
                type="password"
                name="password2"
                id="pass2"
                autocomplete="off"
                required
              />
              <label class="label-name" for="password2">
                <span class="label-span">Confirm Password</span>
              </label>
            </div>
            <div>
              <button type="submit" id="submit">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
