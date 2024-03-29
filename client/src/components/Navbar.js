import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { logout } from "../actions/commonActionCreaters";

import "../scss/Dropdown.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleLogoutButtom = (e) => {
    // e.preventDefault();

    this.props.dispatch(logout());
  };

  render() {
    const { isLoggedIn, user } = this.props.auth;
    const { type, name } = user;

    return (
      <div className="nav-container text-xl lg:text-2xl font-semibold shadow-lg">
        <div className="left">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold">
            eCommerce
          </p>

          <Link to="/">Products</Link>

          {isLoggedIn && type === "seller" && (
            <Link
              to="/add_product"
              className="whitespace-nowrap"
              style={{ display: "grid", gridTemplateRows: "1fr 1fr`" }}
            >
              <p>Add a Product</p>

              <img
                src="/product.png"
                className="lg:w-8 sm:w-6 w-4 add_product"
                alt="Add Product!"
              />
            </Link>
          )}
        </div>
        <div className="right sm:flex sm:justify-end">
          <div className="empty"></div>

          {isLoggedIn && (
            <div style={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
              {/* Dropdown */}

              <div className="dropdown">
                <Link to="/profile" className="dropbtn">
                  {name.split(" ")[0]}
                </Link>

                <img
                  src="/profile.png"
                  className="lg:w-8 w-6 profile"
                  alt="Profile!"
                />

                <div className="dropdown-content">
                  <Link to="/wishlist" className="link">
                    <img
                      src="/wishlist.png"
                      className="lg:w-8 w-6 profile"
                      alt="Wishlist"
                    />
                    Wishlist
                  </Link>
                  <Link to="/cart" className="link">
                    <img
                      src="/cart.png"
                      className="lg:w-8 w-6 profile"
                      alt="Cart"
                    />
                    Cart
                  </Link>
                  <Link to="/orders" className="link">
                    <img
                      src="/orders.png"
                      className="lg:w-8 w-6 profile"
                      alt="Orders"
                    />
                    Orders
                  </Link>
                </div>
              </div>

              <button type="submit" onClick={this.handleLogoutButtom}>
                Logout
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
              <Link to="/login">SignIn</Link>

              <Link to="/signUp">SignUp</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
