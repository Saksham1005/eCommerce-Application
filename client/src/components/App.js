import React, { useState, Component } from "react";
import { connect, useSelector } from "react-redux";

import "../App.scss";
import "../css/Navbar.css";
import Bottom_App_Design from "./Bottom_App_Design";

import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { authenticateUser } from "../actions/commonActionCreaters";

import { GuardSpinner } from "react-spinners-kit";

import {
  Navbar,
  Page404,
  Login,
  SignUp,
  Products,
  Add_product,
  Profile,
  Wishlist,
  Cart,
  Orders,
} from "./index";

import { Route, Link, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Persisting the user
    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const data = jwt_decode(token);
      // console.log(data);
      this.props.dispatch(authenticateUser(data));
    }
  }

  render() {
    const { products, auth } = this.props;

    let inProgress = products.inProgress || auth.inProgress;

    return (
      <div className="App">
        <Navbar />

        {inProgress && (
          <div className="loader">
            <GuardSpinner
              size={50}
              color="#686769"
              frontColor="#00ff89"
              backColor="#686769"
              loading={inProgress}
            />
          </div>
        )}

        <Switch>
          <Route exact path="/" component={Products} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/signUp" component={SignUp} />

          <Route exact path="/add_product" component={Add_product} />

          <Route exact path="/profile" component={Profile} />

          <Route exact path="/Wishlist" component={Wishlist} />

          <Route exact path="/cart" component={Cart} />

          <Route exact path="/orders" component={Orders} />

          <Route component={Page404} />
        </Switch>

        <Bottom_App_Design />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
