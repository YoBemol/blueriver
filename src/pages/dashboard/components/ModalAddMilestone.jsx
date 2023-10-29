import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
  }) {
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Milestone</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {phases.map((phase) => (
        <label key={phase}>
          <input
            type="radio"
            name="selectedPhase"
            value={phase}
            checked={selectedPhase === phase}
            onChange={() => handlePhaseChange(phase)}
          />
          {phase}
        </label>
      ))}
      <form>
        <input
          type="text"
          name="milestone"
          value={newMilestone.milestone}
          onChange={handleMilestoneChange}
          placeholder="Nombre del hito"
        />
        <input
          type="date"
          name="plan_due_date"
          value={newMilestone.plan_due_date}
          onChange={handlePlanDueDateChange}
          placeholder="Fecha de vencimiento planificada"
        />
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleAddMilestone}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalAddMilestone