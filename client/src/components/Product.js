import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { connect } from "react-redux";
import {
  saveProduct,
  buyProduct,
  toggleProductInCart,
} from "../actions/userActionCreater";

// Catch Rating value
// const handleRating = (rate) => {
//   setRating(rate);
// };
// Initial rating value
// const [Rating, setRating] = useState(0);

function Product(props) {
  let handleSaveButtom = (e) => {
    let { productId, isSaved } = props;
    e.preventDefault();

    // handle save event
    props.dispatch(saveProduct(productId, isSaved));
  };

  let handleBuyButtom = (e) => {
    let { productId } = props;
    // qty
    e.preventDefault();

    // handle buy event
    props.dispatch(buyProduct(productId, 1));
  };

  let handleToggleCartButtom = (e) => {
    let { productId } = props;
    // qty
    e.preventDefault();

    // handle toggle cart event
    props.dispatch(toggleProductInCart(productId, 1));
  };

  let { name, price, description, img, rating, isSaved, productId } = props;

  return (
    <div className="container">
      <div className="left">
        <div className="product">
          <img
            src={img}
            className="productImg"
            alt="Product Image"
            style={{ maxWidth: "200px" }}
          />

          {/* Display Red or White Heart */}
          {isSaved === false && (
            <img
              src="white_heart.png"
              className="heart"
              alt="white heart"
              style={{ height: "30px", cursor: "pointer" }}
              onClick={handleSaveButtom}
            />
          )}

          {isSaved === true && (
            <img
              src="red_heart.png"
              className="heart"
              alt="red heart"
              style={{ height: "30px", cursor: "pointer" }}
              onClick={handleSaveButtom}
            />
          )}

          {props.auth.isLoggedIn && (
            <button
              className="add-to-cart-btn"
              onClick={handleToggleCartButtom}
            >
              Toggle Product to Cart
            </button>
          )}

          {props.auth.isLoggedIn && (
            <button className="buy-btn" onClick={handleBuyButtom}>
              Buy Now
            </button>
          )}
        </div>
      </div>

      <div className="right">
        <div className="characteristics">
          <div className="name newfont">{name}</div>
          <div className="description newfont" style={{ fontSize: "1em" }}>
            <p>{description}</p>
          </div>
        </div>
        <div className="price newfont" style={{ fontSize: "1.5em" }}>
          <div style={{ height: "35%" }} className="center">
            &#8377;{price}
          </div>
          <div style={{ height: "65%" }} className="center">
            {Math.round(rating * 100) / 100}&#9733; Rating
            <Rating
              initialValue={Math.round(rating * 100) / 100}
              readonly={true}
              label
              transition
              fillColor="#f1a545"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Product);
