import "./User.css";
import Modal from "../components/Modal";
import PetCard from "../components/PetCard";
import { useContext, useState, useEffect } from "react";
import { logContext } from "../components/logContext";

function User() {
  const { loggedIn, logUser, loggedUser } = useContext(logContext);

  const [updatingObject, setUpdatingObject] = useState({username: loggedUser.username});

  const updatingUser = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(updatingObject),
    };

    const response = await fetch(
      `http://localhost:3001/user/${loggedUser.UserId}`,
      options
    );
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <Modal />
      <div className="user-card">
        <h3>{loggedUser.username}</h3>

       
        <label className="user-label">email</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) =>
            setUpdatingObject({ ...updatingObject, email: e.target.value })
          }
        ></input>
        <label className="user-label">First Name</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) =>
            setUpdatingObject({ ...updatingObject, firstname: e.target.value })
          }
        ></input>
        <label className="user-label">Last Name</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) =>
            setUpdatingObject({ ...updatingObject, lastname: e.target.value })
          }
        ></input>
        <label className="user-label">Phone Number</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) =>
            setUpdatingObject({
              ...updatingObject,
              phonenumber: e.target.value,
            })
          }
        ></input>

        <button
          className="main"
          onClick={() => {
            updatingUser();
          }}
        >
          Save Changes
        </button>
        <button className="main second" onClick={(e) => logUser()}>
          Log Out
        </button>
      </div>
      {/* <div>
        <h3>My pets</h3>
        <PetCard/>
        <PetCard/>
        <PetCard/>
      </div> */}
    </div>
  );
}

export default User;
