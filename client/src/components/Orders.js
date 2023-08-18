import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getOrders } from "../actions/userActionCreater";

import Product from "./Product";

// Common component for Orders, orders, Orders
// Complete it by history logi
class Orders extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(getOrders());
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
                img={order.product.img}
                price={order.product.price}
                description={order.product.description}
                rating={order.product.rating}
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

export default connect(mapStateToProps)(Orders);
