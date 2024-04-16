import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TAX = 0.13;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map((product) => {
      if (product._id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((product) => {
      if (product._id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateCart(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    updateCart(updatedCart);
  };

  const handleCheckOut = () => {
    updateCart([]);
    setDisplay("flex");
  };

  const totalPrice = () => {
    return cart
      .map((product) => product.price * product.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toFixed(2);
  };

  return (
    <div className="index-container" >
      <Navbar />
      <div
        style={{
          backgroundColor: "#3495EB",
          color: "white",
          width: 600,
          textAlign: "center",
          padding: 10,
          margin: 10,
          display: display,
        }}
      >
        Your order has been processed successfully, thank you for shopping with
        e-Shop!
      </div>

      {cart.map((product) => (
        
        <div key={product._id} className="product-container">
          <img src={product.image} width={75} alt={product.title} />
          <div className="title-box">
            <label className="product-title">
              <a href={`/product/${product._id}`} className="title-link">
                {product.title}
              </a>
            </label>
          </div>
          <div className="info-box">
            <p className="product-info">
              Unit price: CAD$ {product.price.toFixed(2)}
            </p>
            <p className="product-info">
              Quantity:{" "}
              <button onClick={() => handleDecreaseQuantity(product._id)}>
                -
              </button>
              {product.quantity}
              <button onClick={() => handleIncreaseQuantity(product._id)}>
                +
              </button>
            </p>
            <p className="product-info">
              Subtotal: CAD$ {(product.quantity * product.price).toFixed(2)}
            </p>
          </div>
          <button onClick={() => handleRemoveFromCart(product._id)}>
            Remove from Cart
          </button>
          <br />
          <br />
        </div>
      ))}

      {cart.length > 0 ? (
        <div>
          <div class="d-flex card align-items-center ">
            <div class="card-header">Summary</div>
            <div>Total: CAD$ {totalPrice()}</div>
            <div>Tax (13%): CAD$ {(totalPrice() * TAX).toFixed(2)}</div>
            <div style={{ fontWeight: "bold" }}>
              Final Price: CAD$ {(totalPrice() * (1 + TAX)).toFixed(2)}
            </div>
          </div>
          <button onClick={handleCheckOut}>Place Order</button>
        </div>
      ) : (
        <div 
          class="d-flex justify-content-center align-self-center rounded fw-bold" 
          style={{color: "#143A27", marginTop: 50, marginBottom: 50}}
        >
          Your cart is empty...
        </div>
      )}
      <Footer pos={"absolute"}/>
    </div>
  );
};

export default CartPage;
