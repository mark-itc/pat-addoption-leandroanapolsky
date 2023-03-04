import "./Pet.css";
import Button from "../components/Button";
import Modal from "../components/Modal";

function Pet() {
  return (
    <div>
      <Modal />
      <div className="pet-card">
        <div>aca tiene que ir la foto</div>
        <h3>Nombre del rope</h3>
        <div>Type: Tipo de bicho</div>
        <div>Height: altura de bicho</div>
        <div>Weight: peso de bicho</div>
        <div>Status: status de bicho</div>
        <button className="main">Adopt</button>
        <button className="main second">Foster</button>
      </div>
    </div>
  );
}

export default Pet;
