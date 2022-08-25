import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../actions/commonActionCreaters";

import "../css/Login.css";

// Todo
// error handling
function Login(props) {
  let [state, changeState] = useState({ email: "", password: "" });

  let typeInputRef = useRef();

  let handleClickButtom = (e) => {
    e.preventDefault();

    // Convert email to lower case string

    // handle login event
    props.dispatch(
      login(
        state.email.toLowerCase(),
        state.password,
        typeInputRef.current.checked ? "seller" : "user"
      )
    );
  };

  let handleChangeEmail = (e) => {
    e.preventDefault();

    changeState({
      ...state,
      email: e.target.value,
    });
  };

  let handleChangePassword = (e) => {
    e.preventDefault();

    changeState({
      ...state,
      password: e.target.value,
    });
  };

  return (
    <div className="login_signUp font-sans lg:text-xl md:text-lg base mt-11">
      {/* Redirecting user to home page if logged In */}
      {props.auth.isLoggedIn && <Redirect to="/" />}

      <h1 className="text-6xl font-bold">Sign In</h1>
      <form method="post" action="/">
        <input
          type="text"
          placeholder="User Email"
          required="required"
          value={state.email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          required="required"
          value={state.password}
          onChange={handleChangePassword}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="checkbox"
            type="checkbox"
            name="Seller"
            style={{ marginBottom: 0, marginRight: "5px" }}
            ref={typeInputRef}
          />
          Seller
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block btn-large"
          onClick={handleClickButtom}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
