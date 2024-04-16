import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div class="card p-1 align-items-center m-5 " style={{borderColor: "#143A27"}}>
        <h1 class="card-title">Login</h1>

        {error && <p>{error}</p>}

        {errors.length > 0 && (
          <ul id="error">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleLogin} class="card-body">
          <div class="mb-1">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
      <Footer pos={"absolute"}/>
    </div>
  );
};
export default Login;
