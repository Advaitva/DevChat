import React, { Component } from "react";
import "./styles/login-register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password: this.state.password2,
    };
    console.log(newUser);
  }
  render() {
    return (
      <div>
        <div className="body">
          <h1>Sign Up</h1>
          <div className="form">
            <div className="input-Div">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
              <label className="label-name" htmlFor="name">
                <span className="label-span">Name</span>
              </label>
            </div>
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
            <span id="mailMessage">
              (This will be considered as a gravatar e-mail and the Wordpress
              profile image will be used.)
            </span>

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
            <div className="input-Div">
              <input
                type="password"
                name="password2"
                id="pass2"
                autoComplete="off"
                value={this.state.password2}
                onChange={this.onChange}
                required
              />
              <label className="label-name" htmlFor="password2">
                <span className="label-span">Confirm Password</span>
              </label>
            </div>
            <div>
              <button type="submit" id="submit" onClick={this.onSubmit}>
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
