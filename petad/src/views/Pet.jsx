import { useParams } from "react-router-dom";
import "./Pet.css";
import Modal from "../components/Modal";
import { useState, useEffect, useContext } from "react";
import { logContext } from "../components/logContext";
function Pet() {
  const { id } = useParams();
  const { loggedUser } = useContext(logContext);

  const [showError, setShowError] = useState(false);

  const [mascota, setMascota] = useState([]);
  
  const getPetData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/pet/${id}`);
      const data = await response.json();
      setMascota(data);
    } catch (e) {
      console.log("error en el fetch del search por id", e);
    }
  };

  const beAdopted = async () => {
    if (mascota.status === "Adopted") {
      setShowError(true);
    } else {
      const adoptObject = { userId: loggedUser.userId, petId: id };
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", "Bearer " + loggedUser.token);

      const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(adoptObject),
      };
      console.log(options.body);
      const response = await fetch("http://localhost:3001/pet/adopt", options);
      const data = await response.json();

      const response2 = await fetch(
        "http://localhost:3001/pet/adopted",
        options
      );
      const data2 = await response2.json();
    }
  };

  const beSaved = async () => {
    const adoptObject = { userId: loggedUser.userId, petId: id };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(adoptObject),
    };
    console.log(options.body);
    const response = await fetch("http://localhost:3001/pet/save", options);
    const data = await response.json();
  };

  const beFostered = async () => {
    if (mascota.status === "Fostered" || mascota.status === "Adopted") {
      setShowError(true);
    } else {
      const adoptObject = { userId: loggedUser.userId, petId: id };
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", "Bearer " + loggedUser.token);

      const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(adoptObject),
      };
      console.log(options.body);
      const response = await fetch("http://localhost:3001/pet/foster", options);
      const data = await response.json();

      const response2 = await fetch(
        "http://localhost:3001/pet/fostered",
        options
      );
      const data2 = await response2.json();
    }
  };

  useEffect(() => {
    getPetData();
  }, []);

  return (
    <div>
      <Modal />
      <div className="pet-card">
        <img src={mascota.image} alt="" />

        <h3>{mascota.name}</h3>

        <div>Type: {mascota.type}</div>

        <div>Height: {mascota.height}</div>
        <div>Weight: {mascota.weight}</div>
        <div>Status: {mascota.status}</div>
        {showError ? (
          <div>
            Sorry, {loggedUser.username}! {mascota.name} is already{" "}
            {mascota.status}
          </div>
        ) : null}
        <div className="buttons-container">
          <button
            className="main"
            onClick={() => {
              beAdopted();
            }}
          >
            Adopt
          </button>
          <button
            className="main second"
            onClick={() => {
              beFostered();
            }}
          >
            Foster
          </button>
          <button
            className="main second"
            onClick={() => {
              beSaved();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pet;
