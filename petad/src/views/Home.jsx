import "./Home.css";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useState, useContext } from "react";

import { petsContext } from "../components/Context";

function Home() {
  const { modalShow, showLogin } = useContext(petsContext);
  // const [modalShow, setModalShow] = useState(false);

  // const showLogin = () => {
  //   setModalShow(!modalShow);
  //   console.log('login')
  // };

  return (
    <>
      <div className="home-container">
        {/* {modalShow ? <Modal handleLogin={showLogin} /> : null} */}
        <Modal />
        <div className="cont-left">
          <h1>Ready? Pet, Go!</h1>
          <p>
            Don't you wonder what does addopting a pet feels like? Join our
            community and find out. Hundreds of pets are waiting for you to meet
            them!
          </p>
          {/* <button className="main" onClick={(e) => showLogin()}> */}
          <button className="main"  onClick={(e) => showLogin()}>Log In</button>
        </div>
        <img src="https://paradepets.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1254/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.webp"></img>
      </div>
    </>
  );
}

export default Home;
