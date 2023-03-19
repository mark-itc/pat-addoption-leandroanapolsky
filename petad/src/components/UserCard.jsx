import { Link } from "react-router-dom";
import "./PetCard.css";
import "./Button.css";

function UserCard(props) {
  const { username,  id } = props;
  return (
    <div className="pet-short-card">
      <div className="pet-card-right">
        <h4>{username}</h4>
        

        <button className="main">
          <Link to={{ pathname: `/admin/user/${id}` }} className="nav-item">
            See More
          </Link>
        </button>
      </div>
    </div>
  );
}

export default UserCard;
