import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";

const HomePage = ({ products }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
      console.log(decoded);
    }
  }, []);

  return (
    <div className="index-container">
      <Navbar />
      {userName && <p>Hello, {userName}!</p>}
      {products.map((product) => (
        <div key={product._id} className="book-container">
          <img src={product.image} width={100} alt="product_image"/>
          <div className="title-box">
            <label className="book-title">
              <a
                href={
                  userName.length > 0 ? `/product/${product._id}` : "/login"
                }
                className="title-link"
              >
                {product.title}
              </a>
            </label>
          </div>
          <div className="info-box">
            <p className="book-info">CAD$ {product.price.toFixed(2)}</p>
            <p className="book-info">Rating: {product.rating} / 5</p>
          </div>
        </div>
      ))}
      <br />
      <br />
    </div>
  );
};

export default HomePage;
