import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = [];

    if (!formData.name) {
      fieldErrors.push("Name is required");
    }
    if (!formData.email) {
      fieldErrors.push("Email is required");
    }
    if (!formData.password) {
      fieldErrors.push("Password is required");
    }
    if (!formData.confirm_password) {
      fieldErrors.push("Confirm password is required");
    }

    if (fieldErrors.length > 0) {
      setErrors(fieldErrors.map((msg, index) => ({ id: index, msg })));
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors || []);
      } else {
        console.log("User registered successfully");
        alert("Registration successful!");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <p key={error.id} style={{ color: "red" }}>
              {error.msg}
            </p>
          ))}
        </div>
      )}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <Footer pos={"absolute"}/>
    </div>
  );
};
export default Register;