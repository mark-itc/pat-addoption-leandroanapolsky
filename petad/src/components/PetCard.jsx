import "./PetCard.css";
import "./Button.css";

function PetCard(props) {
  const { name, status } = props;
  return (
    
    <div className="pet-short-card">
      <div>PHOTO</div>
      <div className="pet-card-right">
        <h4>{name}</h4>
        <div>{status}</div>
        <button className="main">See More</button>
      </div>
    </div>
    
    
  );
}

export default PetCard;
