import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.name : "";
  const isAuthorized = isLoggedIn && userName === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="nav">
      <Link to="/">
        <img src={require("../assets/e-Shop-s.png")} width={100} alt="logo" />
      </Link>
      <br />
      {isLoggedIn && (
        <>
          <Link to="/cart">Cart</Link>
          <br />
          <button onClick={handleLogout}>Logout</button>
          <br />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
        </>
      )}
      {isAuthorized && (
        <>
          <Link to="/product/add">Add Product</Link>
          <br />
        </>
      )}
    </div>
  );
};

export default Navbar;
