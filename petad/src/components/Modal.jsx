import "./Modal.css";
import "./Button.css";
import React, { useState } from "react";
import { useContext } from "react";
import { petsContext } from "./Context";

function Modal(props) {
  const { modalShow, showLogin } = useContext(petsContext);
  const [signUpModal, setSignUpModal] = useState(false);

  const handleSignMode = () => {
    setSignUpModal(!signUpModal);
  };

  const [signInObj, setSignInObj] = useState({
    email: "",
    password: "",
  });

  const checkSignIn = () => {
    console.log(signInObj);
  };

  const [signUpObj, setSignUpObj] = useState({
    email: "",
    password: "",
    password2: "",
    phone: "",
  });

  const checkSignUp = () => {
    console.log(signUpObj);
  };

  return (
    <>
      {modalShow ? (
        <div className="modal">
          {signUpModal ? (
            <div className="modal-card">
              <div className="modal-top">
                <h2>Sign Up</h2>{" "}
                <button className="main" onClick={(e) => showLogin()}>
                  X
                </button>
              </div>

              <label className="label">Email</label>
              <input
                type="text"
                className="modal-input"
                onChange={(e) =>
                  setSignUpObj({ ...signUpObj, email: e.target.value })
                }
              ></input>
              <label className="label">Password</label>
              <input
                type="password"
                className="modal-input"
                onChange={(e) =>
                  setSignUpObj({ ...signUpObj, password: e.target.value })
                }
              ></input>
              <label className="label">Repeat password</label>
              <input
                type="password"
                className="modal-input"
                onChange={(e) =>
                  setSignUpObj({ ...signUpObj, password2: e.target.value })
                }
              ></input>
              <label className="label">Phone number</label>
              <input
                type="text"
                className="modal-input"
                onChange={(e) =>
                  setSignUpObj({ ...signUpObj, phone: e.target.value })
                }
              ></input>
              <button className="main second" onClick={handleSignMode}>
                Sign In
              </button>
              <button className="main" onClick={checkSignUp}>
                Submit
              </button>
            </div>
          ) : (
            <div className="modal-card">
              <div className="modal-top">
                <h2>Sign In</h2>{" "}
                <button className="main" onClick={(e) => showLogin()}>
                  X
                </button>
              </div>
              <label className="label">Email</label>
              <input
                type="text"
                className="modal-input"
                onChange={(e) =>
                  setSignInObj({ ...signInObj, email: e.target.value })
                }
              ></input>
              <label className="label">Password</label>
              <input
                type="password"
                className="modal-input"
                onChange={(e) =>
                  setSignInObj({ ...signInObj, password: e.target.value })
                }
              ></input>

              <button className="main second" onClick={handleSignMode}>
                Sign Up
              </button>
              <button className="main" onClick={checkSignIn}>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Modal;
