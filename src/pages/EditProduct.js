import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
          `http://localhost:8000/product/edit/${id}`,
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

    fetch(`http://localhost:8000/product/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product sucessfully updated");
        window.location.href = "/";
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <div className="edit-product-container">
      <Navbar />
      {isAuthorized ? (
        <>
          <h1>{product.title}</h1>
          <form onSubmit={handleSubmit}>
            <div id="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                name="title"
                type="text"
                value={updatedProduct.title}
                onChange={handleInputChange}
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
              />
            </div>

            <div id="form-group">
              <label>Rating:</label>
              <input
                className="form-control"
                name="rating"
                type="number"
                min={1}
                max={5}
                value={updatedProduct.rating}
                onChange={handleInputChange}
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
              />
            </div>

            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
      <Footer/>
    </div>
  );
};

export default EditProduct;
