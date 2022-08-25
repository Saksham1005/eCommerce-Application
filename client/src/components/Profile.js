import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProfile } from "../actions/commonActionCreaters";
import "../css/Login.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  }

  changeNameValue = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  changePasswordValue = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  changeConfirmPasswordValue = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };

  handleClickSubmit = (e) => {
    e.preventDefault();

    let { name, password, confirm_password } = this.state;

    this.props.dispatch(updateProfile(name, password, confirm_password));
  };

  componentDidMount() {
    let { email, name } = this.props.auth.user;

    this.setState({ email, name });
  }

  render() {
    let { email, name, password, confirm_password } = this.state;
    let { isLoggedIn, user } = this.props.auth;

    return (
      <div className="login_signUp font-sans lg:text-xl md:text-lg base mt-11">
        {/* Redirecting user to home page if logged In */}
        {!isLoggedIn && <Redirect to="/login" />}

        <h1 className="text-6xl font-bold">Profile</h1>
        <form method="post" action="/">
          <input
            type="text"
            placeholder="Username"
            required="required"
            value={name}
            onChange={this.changeNameValue}
          />

          <input
            type="text"
            placeholder="Email"
            required="required"
            readOnly={true}
            value={email}
          />

          <div style={{ border: 0 }}>
            <label htmlFor="">Password- </label>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={this.changePasswordValue}
              style={{ marginBottom: 0 }}
            />
          </div>

          <div style={{ border: 0 }}>
            <label htmlFor="">Confirm Password- </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={this.changeConfirmPasswordValue}
              style={{ marginBottom: 0 }}
            />
          </div>

          <button
            type="submit"
            onClick={this.handleClickSubmit}
            className="btn btn-primary btn-block btn-large"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Profile);
