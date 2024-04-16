import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

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
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <br />
      <br />
      <Footer/>
    </div>
  );
};

export default HomePage;
