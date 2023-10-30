import Button from 'react-bootstrap/Button';

function SaveButton({ isEditing, onSave, onEdit }) {
  return (
    <Button variant="primary" onClick={isEditing ? onSave : onEdit}>
      {isEditing ? 'Guardar' : 'Editar'}
    </Button>
  );
}

export default SaveButton;
