import "./User.css";
import Button from "../components/Button";

function User() {
  return (
    <div>
      <div className="pet-card">
        <div>aca tiene que ir la foto</div>
        <h3>Nombre del User</h3>
        <div>
          <label className="label">Password</label>
          <input type="text" className="modal-input"></input>
          <label className="label">email</label>
          <input type="text" className="modal-input"></input>
          <label className="label">First Name</label>
          <input type="text" className="modal-input"></input>
          <label className="label">Last Name</label>
          <input type="text" className="modal-input"></input>
          <label className="label">Phone Number</label>
          <input type="text" className="modal-input"></input>
          <label className="label">Bio</label>
          <input type="text" className="modal-input"></input>
        </div>
        <Button content="Save Changes" buttonStyle="main" />
        <Button content="Log Out" buttonStyle="main second" />
      </div>
      <div>
        <h3>My pets</h3>
        <div>Aca viene su perrito</div>
        <div>Aca viene su perrito</div>
        <div>Aca viene su perrito</div>
        <div>Aca viene su perrito</div>
      </div>
    </div>
  );
}

export default User;
