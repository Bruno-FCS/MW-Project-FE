import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        const userName = decodedToken.name;
        setIsAuthorized(userName === "admin");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setIsAuthorized(false);
      }
    }

    fetch(`http://localhost:8000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]);

  if (!product || Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`http://localhost:8000/product/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          alert("Successfully deleted");
          window.location.href = "/";
        } else {
          console.error("Error deleting product:", response.statusText);
        }
      } else {
        console.error("No token found in local storage");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = () => {

    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
      let parsedCart = JSON.parse(savedCart);
      let existingProduct = parsedCart.find((product) => product._id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        parsedCart.push({
          ...product,
          quantity: quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(parsedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ ...product, quantity: quantity }])
      );
    }
    let pr_title =
      product.title.length > 20
        ? product.title.slice(0, 25) + "..."
        : product.title;

    if(!isLoggedIn){
      window.location.href = "/login";
      alert("Please login to access your added items!")
    }
    else {
      alert(`${pr_title} was added to the cart!`);
    }
  };

  return (
    <div className="product-container">
      <Navbar />
      <div
        className="product-details"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
        }}
      >
        <img src={product.image} width={250} alt="product_image" />
        <div>
          <h1 className="product-title">{product.title}</h1>
          <h5 className="product-price">CAD$ {product.price}</h5>
          <div className="product-details">
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Description: {product.description}</p>
          </div>
          <div className="product-actions">
            {isAuthorized && (
              <div>
                <Link
                  className="product-btn edit-product-btn"
                  to={`/product/edit/${product._id}`}
                  style={{
                    backgroundColor: "#39b575",
                    color: "white",
                    textDecoration: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Edit Product
                </Link>
                <button
                  className="product-btn delete-product-btn"
                  data-id={product._id}
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "#39b575",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Delete Product
                </button>
              </div>
            )}
            <div
              style={{
                display: "flex",
                width: 150,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                style={{
                  backgroundColor: "#39b575",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                style={{
                  backgroundColor: "#39b575",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                +
              </button>
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: "#39b575",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer pos={"absolute"}/>
    </div>
  );
};

export default ProductPage;
