import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModalKeyUpdates() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [description, setDescription] = useState('');
  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');

  const handleAddClick = () => {
    const newKeyUpdate = {
      description,
      select1,
      select2,
    };

    onAddKeyUpdate(newKeyUpdate);
    handleClose();
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
            />
        </FloatingLabel>
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1"></option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>

        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1"></option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalKeyUpdates;