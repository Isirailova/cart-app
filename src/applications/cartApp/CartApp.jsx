import React, { useState } from "react";
import { productData } from "../../assets/data/productData";
import "./cartApp.style.css";
import ProductCard from "../../components/productCard/ProductCard";

const CartApp = () => {
  const [productList, setProductList] = useState(productData);
  const [cartList, setCartList] = useState([]);

  const addProductToCart = (product) => {
    const productExists = cartList.find((el) => el.name === product.name);

    if (productExists) {
      const updatedCartList = cartList.map((el) => {
        if (el.name === product.name) {
          return { ...el, count: el.count + 1 };
        } else {
          return el;
        }
      });
      //now we update the cart
      setCartList(updatedCartList);
    } else {
      setCartList([...cartList, { ...product, count: 1 }]);
    }
  };

  const removeProductFromCart = (product) => {
    const updatedCartList = cartList.map((el) => {
      if (el.name === product.name && el.count > 1) {
        return { ...el, count: el.count - 1 };
      } else {
        return el;
      }
    });
    setCartList(updatedCartList);
  };

  const getTotalPrice = () => {
    return cartList.reduce((total, item) => total + item.price * item.count, 0);
  };

  const renderCartItem = (item, index) => (
    <li key={index}>
      <input type="text" value={item.name} readOnly />
      <button onClick={() => removeProductFromCart(item)}>-</button>
      <span>{item.count}</span>
      <button onClick={() => addProductToCart(item)}>+</button>
      <p>Total Price: ${item.price * item.count}</p>
    </li>
  );

  return (
    <div className="container">
      <div className="product-view">
        {productList.map((el, index) => (
          <ProductCard
            key={index}
            product={el}
            addProductToCart={addProductToCart}
          />
        ))}
      </div>
      <div className="add-item">
        {cartList.length > 0 && (
          <div>
            <p>Added items:</p>
            <ul style={{ margin: "0 100px", padding: "0" }}>
              {cartList.map(renderCartItem)}
            </ul>
            <div className="checkout">
              <p>Total Price for all items: ${getTotalPrice()}</p>
              <button>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartApp;
