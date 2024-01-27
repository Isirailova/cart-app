import React from "react";
import PropTypes from "prop-types";
import "./productCard.style.css";

const ProductCard = ({ product, addProductToCart }) => {
  const { imageUrl, description, price, name, inStock } = product;

  const onAddClickHandler = () => {
    //this one is coming from parent component.
    //and updates the state
    addProductToCart(product);
  };
  return (
    <div className="product-card">
      <div className="image-box">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="product-name">
        <h5>{name}</h5>
        <p>in stock:{inStock}</p>
      </div>
      <div className="price-view">
        <p id="description">{description}</p>
        <h5 id="price">{price}$</h5>
      </div>
      <button onClick={onAddClickHandler}>Add</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    inStock: PropTypes.number,
  }).isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

export default ProductCard;
