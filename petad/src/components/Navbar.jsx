import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { petsContext } from "./Context";
import logo from "./logo2.png";

function Navbar() {
  const { modalShow, showLogin } = useContext(petsContext);

  return (
    <div className="navbar">
      <Link to={{ pathname: "/" }}>
        <img src={logo} alt="" className="logo" />
      </Link>

      <div className="nav-right">
        <Link to={{ pathname: "/" }} className="nav-item">
          Home
        </Link>
        <Link to={{ pathname: "/Search" }} className="nav-item">
          Search
        </Link>

        <div className="nav-item" onClick={(e) => showLogin()}>
          Log In
        </div>
      </div>
    </div>
  );
}

export default Navbar;
