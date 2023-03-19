import "./Home.css";

import { Link } from "react-router-dom";

import Modal from "../components/Modal";
import {  useContext } from "react";
import { logContext } from "../components/logContext";



function Home() {
  const { loggedIn,  showLogin } = useContext(logContext);
  



 



  return (
    <>
      <div className="home-container">
        <Modal />
        <div className="cont-left">
          <h1>Ready? Pet, Go! </h1>
          <p>
            Don't you wonder what does addopting a pet feels like? Join our
            community and find out. Hundreds of pets are waiting for you to meet
            them!
          </p>
          {loggedIn ? (
            <button className="main">
              <Link to={{ pathname: "/user/:id" }} className="nav-item">
                My personal area
              </Link>
            </button>
          ) : (
            <button className="main" onClick={(e) => showLogin()}>
              Log In
            </button>
          )}
          
        </div>
        <img src="https://paradepets.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1254/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.webp" alt="Cute puppies"></img>
      </div>
    </>
  );
}

export default Home;
