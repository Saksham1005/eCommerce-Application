import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { connect } from "react-redux";
import { saveProduct } from "../actions/userActionCreater";

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

  let { name, price, description, rating, isSaved, productId } = props;

  return (
    <div className="container">
      <div className="left">
        <div className="product">
          <img
            src="chair.jpg"
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
  return {};
}
export default connect(mapStateToProps)(Product);
