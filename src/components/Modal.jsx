import { useState } from "react";
import "./modal.css";

const Modal = ({ estado, cambiarEstado, item, updateData }) => {
    console.log(item)
    const [description, setDescription] = useState(item?.description)

  return (
    <>
      {estado && 
        <div className="modalContainer">
          <div className="modalContent">
            <h3>Escribe tu Milestone</h3>
            <input
              type="text"
              className="modalInput"
              placeholder="Escribe aquí"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={() => updateData(description)}>Enviar</button>
            <span className="closeModal" onClick={cambiarEstado}>&times;</span>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
