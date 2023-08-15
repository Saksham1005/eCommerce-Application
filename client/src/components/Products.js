import React, { Component } from "react";
import { connect } from "react-redux";

import { getProducts } from "../actions/commonActionCreaters";

import Product from "./Product";

class Products extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  render() {
    const { products } = this.props.products;
    const { user } = this.props.auth;

    return (
      <div className="products">
        <div className="product">
          {products.map((product, index) => {
            return (
              <Product
                name={product.name}
                price={product.price}
                description={product.description}
                img={product.img}
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

export default connect(mapStateToProps)(Products);
