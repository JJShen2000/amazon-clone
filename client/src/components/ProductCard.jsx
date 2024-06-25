import React from "react";
import { Rating } from "@mui/material";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const getFraction = (number) => {
    return (number - Math.floor(number)).toFixed(2) * 100;
  };

  return (
    <div className="productCard">
      <img src={product.img} className="productCard__image"></img>
      <h2 className="productCard__name">{product.name}</h2>
      <div className="productCard__rating">
        <Rating
          name={`${product.name}-rating`}
          value={product.rating}
          precision={0.5}
          readOnly
          sx={{ color: "#DE7921" }}
          size="small"
          //   className="productCard__rating--star"
        />
        <span className="productCard__rating--Number">
          {product.ratingNumber.toLocaleString()}
        </span>
      </div>
      <div className="productCard__price">
        <span className="productCard__price--symbol">$</span>
        <span className="productCard__price--whole">{Math.floor(product.price).toLocaleString()}</span>
        <span className="productCard__price--fraction">
          {getFraction(product.price)}
        </span>
      </div>
      <button className="productCard__cart">Add to cart</button>
    </div>
  );
};

export default ProductCard;
