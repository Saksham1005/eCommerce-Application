import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCart } from "../actions/userActionCreater";

import Product from "./Product";

// Common component for Cart, orders, cart
// Complete it by history logi
class Cart extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(getCart());
  }

  render() {
    const { orders } = this.props.product_state;
    const { user, isLoggedIn } = this.props.auth;

    return (
      <div className="products">
        {!isLoggedIn && <Redirect to="/login" />}

        <div className="product">
          {orders.map((order, index) => {
            return (
              <Product
                name={order.product.name}
                price={order.product.price}
                img={order.product.img}
                description={order.product.description}
                rating={order.product.rating}
                isSaved={order.product.isSaved}
                productId={order.product._id}
                key={order._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product_state: state.products,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Cart);
