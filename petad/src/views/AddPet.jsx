import "./AddPet.css";
import Modal from "../components/Modal";

import { useState, useEffect } from "react";

function AddPet() {
  const [photo, setPhoto] = useState("");
  const [newPet, setNewPet] = useState({
    type: "",
    name: "",
    status: "",
    height: 0,
    weight: 0,
    color: "",
    bio: "",
    hypoallergenic: "",
    dietaryRestrictions: "",
    breed: "",
    image: "",
  });

  const addNewPet = async () => {
    fetch("http://localhost:3001/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos enviados:", data);
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });
    console.log(photo);
  };

  const handleUploadPhoto = async (e) => {
    setPhoto(e.target.files[0]);
  };

  const sumarUrl = async () => {
    console.log("foto antes", photo);

    const formData = new FormData();
    formData.append("image", photo);

    const response = await fetch("http://localhost:3001/pet/foto", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    console.log("data", data.url.toString());
    setNewPet((prevState) => ({
      ...prevState,
      image: data.url,
    }));
    console.log("el nuevo pet", newPet);
  };

  useEffect(() => {
    sumarUrl();
  }, [photo]);

  return (
    <div>
      <Modal />
      <div className="user-card">
        <h3>Add a new pet</h3>

        <label className="user-label">Type</label>
        <select
          onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
        >
          <option value="-">-</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>

        <label className="user-label">Name</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
        ></input>
        <label className="user-label">Status</label>
        <select
          onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}
        >
          <option value="-">-</option>

          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fotered</option>
          <option value="Availiable">Availiable</option>
        </select>
        <label className="user-label">Height</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, height: e.target.value })}
        ></input>
        <label className="user-label">Weight</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
        ></input>
        <label className="user-label">Color</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
        ></input>
        <label className="user-label">Hypoallergenic</label>
        <select
          onChange={(e) =>
            setNewPet({ ...newPet, hypoallergenic: e.target.value })
          }
        >
          <option value="-">-</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <label className="user-label">Dietary restrictions</label>
        <select
          onChange={(e) =>
            setNewPet({ ...newPet, dietaryRestrictions: e.target.value })
          }
        >
          <option value="-">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label className="user-label">Breed</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
        ></input>
        <label className="user-label">Bio</label>
        <input
          type="text"
          className="user-input"
          onChange={(e) => setNewPet({ ...newPet, bio: e.target.value })}
        ></input>
        <label className="user-label">Photo</label>
        <input
          type="file"
          name="image"
          className="user-input"
          onChange={handleUploadPhoto}
        ></input>

        <button className="main" onClick={addNewPet}>
          Add New Pet
        </button>
      </div>
    </div>
  );
}

export default AddPet;
