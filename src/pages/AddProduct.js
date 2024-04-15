import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";

const AddProduct = () => {
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to submit the form data
    fetch("http://localhost:8000/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add Product successful:", data);
        alert("Product added Successfully!");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  if (!isAuthorized) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Only the admin can add products.</p>
        <a href="/login">log in</a>
      </div>
    );
  }

  return (
    <div className="add-book-container">
      <Navbar />
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div id="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Price:</label>
          <input
            className="form-control"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Description:</label>
          <input
            className="form-control"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Category:</label>
          <input
            className="form-control"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Image URL:</label>
          <input
            className="form-control"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div id="form-group">
          <label>Rating:</label>
          <input
            className="form-control"
            name="rating"
            type="number"
            value={formData.rating}
            //input must be betwen 1-5 as it's displayed as "num"/5 , set some kind of limit on client-side
            onChange={handleInputChange} 
          />
        </div>

        <div id="form-group">
          <label>Quantity in stock:</label>
          <input
            className="form-control"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddProduct;
