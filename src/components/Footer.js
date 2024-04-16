import "../App.css";

const Footer = (props) => {
  return (
    <footer
      class="
        d-flex p-3 w-100
        text-white 
        justify-content-center 
        align-items-center
        bottom-0
        "
      style={{ backgroundColor: "#39B575", position: props.pos }}
    >
      <img src={require("../assets/e-Shop-s.png")} alt="logo" />
      <span style={{marginLeft: 10}}>
        © 2024 - Bruno Santos, Katherine Dorensky, Zeldrix Don
      </span>
    </footer>
  );
};

export default Footer;