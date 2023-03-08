import { useParams } from "react-router-dom";
import "./Pet.css";
import Modal from "../components/Modal";
import { useState } from "react";

function Pet() {
  const { id } = useParams();

  const [mascota, setMascota] = useState([]);

  const getPetData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search/:${id}`);
      const data = await response.json();
      setMascota([...data]);
      console.log(mascota);

      // return data;
    } catch (e) {
      console.log("error en el fetch del search por id", e);
    }
  };

  return (
    <div>
      <Modal />
      <div className="pet-card">
        <div>PHOTO</div>
        <h3>NAME</h3>
        <div>Type: </div>

        <div>Height: </div>
        <div>Weight: </div>
        <div>Status: </div>
        <button className="main" onClick={getPetData}>
          Adopt
        </button>
        <button className="main second">Foster</button>
      </div>
    </div>
  );
}

export default Pet;
