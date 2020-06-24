import React, { Component } from "react";
import "./styles/login-register.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
  }
  render() {
    return (
      <div>
        <div className="body">
          <h1>Log In</h1>
          <div className="form">
            <div className="input-Div">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
              <label className="label-name" htmlFor="email">
                <span className="label-span">E-mail</span>
              </label>
            </div>

            <div className="input-Div">
              <input
                type="password"
                name="password"
                id="pass"
                autoComplete="off"
                value={this.state.password}
                onChange={this.onChange}
                required
              />

              <label className="label-name" htmlFor="password">
                <span className="label-span">Password</span>
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
