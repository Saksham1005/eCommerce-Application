import React, { useState, Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../css/Login.css";
import { addProduct } from "../actions/sellerActionCreater";

class Add_product extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      image: "",
      description: "",
    };
  }

  handleChangeValue = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  handleClickButton = (e) => {
    e.preventDefault();
    let { name, price, image, description } = this.state;

    // handle add Product
    // see this
    this.props.dispatch(addProduct(name, price, image, description));

    this.setState({
      name: "",
      price: "",
      image: "",
      description: "",
    });
  };

  handleFileChange(selectorFiles) {
    // Working with fileList
    // console.log(selectorFiles);
    // this.state({
    //   image: selectorFiles,
    // });
  }

  // handle file input
  // Todo
  // error handling

  render() {
    return (
      <div className="add_product login_signUp mt-11">
        {/* Redirecting user to home page if logged In */}
        {this.props.auth.user.type !== "seller" && <Redirect to="/" />}

        <h1 className="text-6xl font-bold">Add Product</h1>

        <form action="/seller/addProduct" method="post">
          <input
            type="text"
            placeholder="Name"
            required="required"
            value={this.state.name}
            onChange={(e) => this.handleChangeValue("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            required="required"
            value={this.state.price}
            onChange={(e) => this.handleChangeValue("price", e.target.value)}
          />

          <div style={{ padding: 0, border: 0 }}>
            <label htmlFor="">Product Image- </label>
            <input
              type="file"
              name="productImage"
              id="productImage"
              placeholder="Choose Product Image."
              style={{ marginBottom: 0 }}
              required="required"
              value={this.state.image}
              onChange={(e) => this.handleFileChange(e.target.files)}
            />
          </div>

          <input
            type="text"
            placeholder="Description"
            required="required"
            value={this.state.description}
            onChange={(e) =>
              this.handleChangeValue("description", e.target.value)
            }
          />

          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            onClick={this.handleClickButton}
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

export default connect(mapStateToProps)(Add_product);
