import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlusLg } from 'react-icons/bs';
function ModalAddKey({
    handleShow,
    show,
    handleClose,
    selectedPhase,
    newKeys,
    setNewKeys,
    phases,
    handlePhaseChange,
    handleAddKeys }) {
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <BsPlusLg /> Add New
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-milestone' closeButton>
                    <Modal.Title>Add Key</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-milestone">

                    <div className="form-group">
                        <label htmlFor="keyValue" className='title-add title-form'>Key Value:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="keyValue"
                            value={newKeys.value}
                            onChange={(e) => setNewKeys({ ...newKeys, value: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="keyUpdate" className='title-add title-form'>Key Update:</label>
                        <select
                            className="form-control"
                            id="keyUpdate"
                            value={newKeys.key_update}
                            onChange={(e) => setNewKeys({ ...newKeys, key_update: e.target.value })}
                        >
                            <option value="">Select Key Update</option>
                            <option value="Highlights & Concerns">Highlights & Concerns</option>
                            <option value="Risks & Mitigations">Risks & Mitigations</option>
                            <option value="Decisions & Delays">Decisions & Delays</option>
                            <option value="Help Needed">Help Needed</option>
                            <option value="Notes">Notes</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className='title-add title-form' htmlFor="phase">Phases</label>
                        <div className="d-flex flex-wrap">
                            {phases.map((phase) => (
                                <div key={phase} className="form-check">
                                    <input
                                        type="radio"
                                        name="selectedPhase"
                                        value={phase}
                                        checked={selectedPhase === phase}
                                        onChange={() => handlePhaseChange(phase)}
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label">{phase}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer className='modal-milestone'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddKeys}>
                        Add
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    )
}
export default ModalAddKey