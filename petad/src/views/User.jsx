import "./User.css";
import Modal from "../components/Modal";
import PetCard from "../components/PetCard";
import UserCard from "../components/UserCard";
import { useContext, useState, useEffect } from "react";
import { logContext } from "../components/logContext";
import { Link } from "react-router-dom";

function User() {
  const { loggedUser, logUserOut } = useContext(logContext);

  const [updatingObject, setUpdatingObject] = useState({
    username: loggedUser.username,
  });
  const [userPetsIDs, setUserPetsIDs] = useState([]);
  const [fullUserPets, setFullUserPets] = useState({ thePets: [] });
  const [allUsers, setAllUsers] = useState([]);

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
      `http://localhost:3001/user/${loggedUser.userId}`,
      options
    );
    const data = await response.json();
    return data;
  };

  const getAllUsers = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + loggedUser.token);

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(`http://localhost:3001/user`, options);
      const data = await response.json();

      setAllUsers([...data]);

      return data;
    } catch (e) {
      console.log("error en el fetch de todos los users", e);
    }
  };

  useEffect(() => {
    console.log(allUsers);
  });

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
        `http://localhost:3001/user/pets/${loggedUser.userId}`,
        options
      );
      const data = await response.json();

      setUserPetsIDs([...data]);

      const response2 = await fetch(
        `http://localhost:3001/user/pets/fostered/${loggedUser.userId}`,
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
        <button className="main second" onClick={(e) => logUserOut()}>
          Log Out
        </button>
      </div>
      <h2>My Pets</h2>
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

      {loggedUser.role === "Admin" ? (
        <div className="admin-area">
          <h2>Admin Area</h2>
          <button
            onClick={() => {
              getAllUsers();
            }}
           className='main' >
            See All Users
          </button>
          <button className='main' >
          <Link to={{ pathname: "/admin/addpet" }} >
          Add New Pet
        </Link>
          </button>
        </div>
      ) : null}

      <div className="results-card-cont">
        {allUsers.map((item) => (
          <UserCard username={item.username} id={item._id} />
        ))}
      </div>
    </div>
  );
}

export default User;
