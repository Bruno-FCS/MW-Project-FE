import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: 0,
    quantity: 0,
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  const isAuthorized = userName === "admin";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduct);

    fetch("https://mw-project-be.vercel.app/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product successfully added");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
      <div
        className="add-product-container"
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
            className="add-product-form"
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
              Add New Product
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
                  value={newProduct.title}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Price:
                </label>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Description:
                </label>
                <input
                  className="form-control"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Category:
                </label>
                <input
                  className="form-control"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Image URL:
                </label>
                <input
                  className="form-control"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Rating:
                </label>
                <input
                  className="form-control"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  //input must be betwen 1-5 as it's displayed as "num"/5 , set some kind of limit on client-side
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div
                className="form-group"
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Quantity in stock:
                </label>
                <input
                  className="form-control"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
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
        <Footer/>
      </div>
  );
};

export default AddProduct;
