import React, { Component } from "react";
import "./styles/login-register.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div class="body">
          <h1>Log In</h1>
          <div class="form">
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

            <div>
              <button type="submit" id="submit">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
