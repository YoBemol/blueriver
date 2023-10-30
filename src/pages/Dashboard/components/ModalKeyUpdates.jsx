import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModalKeyUpdates(sendDescription) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [description, setDescription] = useState('');
 

  const handleAddClick = () => {
    // Capturar el value del campo de texto
    const descriptionValue = description;
    sendDescription(descriptionValue);

    // Enviar el value a la función `onAddKeyUpdate`
    // Cerrar el modal
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Other Key updates / Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
            as="textarea" 
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalKeyUpdates;