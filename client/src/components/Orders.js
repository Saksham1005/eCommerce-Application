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
    const { products } = this.props.products;
    const { user, isLoggedIn } = this.props.auth;
    console.log(products);

    return (
      <div className="products">
        {!isLoggedIn && <Redirect to="/login" />}

        <div className="product">
          {products.map((product, index) => {
            return (
              <Product
                name={product.product.name}
                price={product.product.price}
                description={product.product.description}
                rating={product.product.rating}
                productId={product.product._id}
                key={product.product._id}
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
    products: state.products,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Orders);
