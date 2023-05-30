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
    const { products } = this.props.products;
    const { user, isLoggedIn } = this.props.auth;

    return (
      <div className="products">
        {!isLoggedIn && <Redirect to="/login" />}

        <div className="product">
          {products.map((product, index) => {
            return (
              <Product
                name={product.name}
                price={product.price}
                description={product.description}
                rating={product.rating}
                isSaved={product.isSaved}
                productId={product._id}
                key={product._id}
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

export default connect(mapStateToProps)(Cart);
