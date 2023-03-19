import "./User.css";
import Modal from "../components/Modal";
import PetCard from "../components/PetCard";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { logContext } from "../components/logContext";
import { Link } from "react-router-dom";

function UserAdmin() {
  const { id } = useParams();

  const { loggedUser } = useContext(logContext);

  const [lookedUser, setLookedUser] = useState({});

  const [userPetsIDs, setUserPetsIDs] = useState([]);
  const [fullUserPets, setFullUserPets] = useState({ thePets: [] });

  const getAdminUser = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(`http://localhost:3001/user/${id}`, options);
      const data = await response.json();

      setLookedUser(data);

      return data;
    } catch (e) {
      console.log("error en el fetch del buscar user", e);
    }
  };

  useEffect(() => {
    getAdminUser();
    console.log("el id es", id);
  }, []);

  useEffect(() => {
    console.log(lookedUser);
  }, [lookedUser]);

  const findUserPets = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/user/pets/${id}`,
        options
      );
      const data = await response.json();

      setUserPetsIDs([...data]);

      const response2 = await fetch(
        `http://localhost:3001/user/pets/fostered/${id}`,
        options
      );
      const data2 = await response2.json();

      setUserPetsIDs([...data]);

      return data;
    } catch (e) {
      console.log("error en el fetch del search", e);
    }
  };
  const petFetching = async (petId) => {
    try {
      const response = await fetch(`http://localhost:3001/pet/${petId}`);
      const data = await response.json();
      setFullUserPets((prevState) => ({
        thePets: prevState.thePets.concat(data),
      }));
    } catch (e) {
      console.log("error en el fetch del search por id", e);
    }
  };

  useEffect(() => {
    userPetsIDs.forEach((element) => {
      petFetching(element);
    });

    console.log("userPetIDS", userPetsIDs);
  }, [userPetsIDs]);

  useEffect(() => {
    console.log("fullUserPets", fullUserPets);
  }, [fullUserPets]);

  useEffect(() => {
    findUserPets();
  }, []);

  const deleteUser = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "DELETE",
      headers: headers,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/user/delete/${id}`,
        options
      );
      const data = await response.json();

      return data;
    } catch (e) {
      console.log("error en el fetch del search", e);
    }
  };

  return (
    <div>
      <Modal />
      <div className="user-card">
        <h3>{lookedUser.username}</h3>
        <div>email: {lookedUser.email}</div>
        <div>phone: {lookedUser.phone}</div>

        <button className="main second" onClick={(e) => deleteUser()}>
        <Link to={{ pathname: "/" }} >
          Delete User
        </Link>
        </button>
      </div>
      <h2>{lookedUser.username} Pets</h2>
      <div className="results-card-cont">
        {fullUserPets.thePets.map((item) => (
          <PetCard
            name={item.name}
            status={item.status}
            id={item._id.toString()}
            photo={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default UserAdmin;
