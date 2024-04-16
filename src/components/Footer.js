import "../App.css";

const Footer = () => {
  return (
    <footer
      class="
        mt-5 d-flex p-3 w-100
        position-absolute 
        text-white 
        justify-content-center 
        align-items-center"
      style={{ backgroundColor: "#39B575" }}
    >
      <img src={require("../assets/e-Shop-s.png")} alt="logo" />
      <span>
        © 2024 <b>e-Shop</b> by Bruno Santos, Katherine Dorensky, Zeldrix Don
      </span>
    </footer>
  );
};

export default Footer;
