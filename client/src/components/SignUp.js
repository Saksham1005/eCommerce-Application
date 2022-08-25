import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../actions/commonActionCreaters";

import "../css/Login.css";

// Todo
// error handling
function SignUp(props) {
  let [state, changeState] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  let typeInputRef = useRef();

  let handleClickButtom = (e) => {
    e.preventDefault();

    // Convert email to lower case string

    // handle signUp event
    props.dispatch(
      signUp(
        state.name,
        state.email.toLowerCase(),
        state.password,
        state.confirm_password,
        typeInputRef.current.checked ? "seller" : "user"
      )
    );
  };

  let handleChangeName = (e) => {
    e.preventDefault();

    changeState({
      ...state,
      name: e.target.value,
    });
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

  let handleChangeConfirmPassword = (e) => {
    e.preventDefault();

    changeState({
      ...state,
      confirm_password: e.target.value,
    });
  };

  // let handleChangeType = (e) => {
  //   e.preventDefault();

  //   console.log(e.target.checked);

  //   changeState({
  //     ...state,
  //     value: e.target.checked,
  //   });
  // };

  return (
    <div className="login_signUp font-sans lg:text-xl md:text-lg base mt-11">
      {/* Redirecting user to home page if logged In */}
      {props.auth.isLoggedIn && <Redirect to="/" />}
      <h1 className="text-6xl font-bold">Sign Up</h1>
      <form method="post" action="/login">
        <input
          type="text"
          placeholder="User Name"
          required="required"
          value={state.name}
          onChange={handleChangeName}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          required="required"
          value={state.confirm_password}
          onChange={handleChangeConfirmPassword}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="checkbox"
            type="checkbox"
            name="Seller"
            style={{ marginBottom: 0, marginRight: "5px" }}
            ref={typeInputRef}
            // onChange={handleChangeType}
          />{" "}
          Seller
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block btn-large "
          onClick={handleClickButtom}
        >
          Sign Up
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

export default connect(mapStateToProps)(SignUp);
