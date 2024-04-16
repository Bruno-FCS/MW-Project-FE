import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: 0,
    quantity: 0,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  const isAuthorized = isLoggedIn && userName === "admin";

  const { id } = useParams();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mw-project-be.vercel.app/product/edit/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = await response.json();

        setProduct(data.product);

        setUpdatedProduct({
          title: data.product.title,
          price: data.product.price,
          description: data.product.description,
          category: data.product.category,
          image: data.product.image,
          rating: data.product.rating,
          quantity: data.product.quantity,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updatedProduct);

    const sendData = {
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
      category: updatedProduct.category,
      image: updatedProduct.image,
      rating: updatedProduct.rating,
      quantity: updatedProduct.quantity,
    };

    fetch(`https://mw-project-be.vercel.app/product/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product successfully updated");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div
      className="edit-product-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Navbar />
      {isAuthorized ? (
        <div
          className="edit-product-form"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            {product.title}
          </h1>
          <form onSubmit={handleSubmit}>
            <div
              className="form-group"
              style={{
                marginBottom: "1.5rem",
              }}
            >
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Title:
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                value={updatedProduct.title}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Price:</label>
              <input
                className="form-control"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Description:</label>
              <input
                className="form-control"
                name="description"
                type="text"
                value={updatedProduct.description}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Category:</label>
              <input
                className="form-control"
                name="category"
                type="text"
                value={updatedProduct.category}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Image URL:</label>
              <input
                className="form-control"
                name="image"
                type="text"
                value={updatedProduct.image}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Rating:</label>
              <input
                className="form-control"
                name="rating"
                type="number"
                value={updatedProduct.rating}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div id="form-group">
              <label>Quantity in stock:</label>
              <input
                className="form-control"
                name="quantity"
                type="number"
                value={updatedProduct.quantity}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#39b575",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#39b575",
          }}
        >
          You are not authorized to view this page.
        </p>
      )}
    </div>
  );
};

export default EditProduct;
