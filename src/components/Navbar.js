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
    <nav
      className="navbar"
      style={{
        backgroundColor: "#39b575",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: 20,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../assets/e-Shop-s.png")}
          width={100}
          alt="logo"
          style={{ marginRight: "1rem" }}
        />
      </Link>
      <div
        className="navbar-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {isLoggedIn && (
          <>
            <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
              Cart
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#39b575",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </>
        )}
        {isAuthorized && (
          <Link
            to="/product/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Product
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
