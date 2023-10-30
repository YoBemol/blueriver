import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlusLg } from 'react-icons/bs';
import './modalAddMilestone.css'

function ModalAddMilestone({
    phases,
    show,
    handleClose,
    selectedPhase,
    newMilestone,
    handlePhaseChange,
    handleAddMilestone,
    handleMilestoneChange,
    handlePlanDueDateChange,
    handleShow
}) {
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <BsPlusLg /> Add New
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-milestone' closeButton>
                    <Modal.Title>Add Milestone</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-milestone">
                    <form>
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

                        <div className="form-group">
                            <label className='title-add title-form' htmlFor="milestone">Description</label>
                            <input
                                type="text"
                                name="milestone"
                                value={newMilestone.milestone}
                                onChange={handleMilestoneChange}
                                placeholder="Nombre del hito"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label className='title-add title-form' htmlFor="plan_due_date">Expiration Date</label>
                            <input
                                type="date"
                                name="plan_due_date"
                                value={newMilestone.plan_due_date}
                                onChange={handlePlanDueDateChange}
                                placeholder="Fecha de vencimiento planificada"
                                className="form-control"
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-milestone'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddMilestone}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddMilestone;
