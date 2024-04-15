import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
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
      product.title.length > 20 ?
        product.title.slice(0, 25) + "..."
        : product.title;

    alert(`${pr_title} (${product.quantity}) was added to cart!`);
    //temporary alert - add an cart icon that has the number of items (in the cart) displayed for user if there is at least one item
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;

  const isAuthorized = isLoggedIn && userName === "admin";

  return (
    <div className="book-container-book">
      <Navbar />
      <img src={product.image} width={250} alt="product_image" />

      <h1 className="book-title">{product.title}</h1>
      <h5 className="book-author">CAD$ {product.price}</h5>

      <div className="book-details">
        <p>Category: {product.category}</p>
        <p>Rating: {product.rating}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Description: {product.description}</p>
      </div>

      <div className="book-btn-container">
        {isAuthorized && (
          <div>
            <Link
              className="book-btn edit-book-btn"
              to={`/product/edit/${product._id}`}
            >
              Edit Prodcut
            </Link>
            <button
              className="book-btn delete-book-btn"
              data-id={product._id}
              onClick={handleDelete}
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
          }}
        >
          <button
            onClick={() => {
              if (quantity > 1) setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;