import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Search from '../../../components/Search';
import './infoProject.css';
import SelectStatus from './SelectStatus';
import ObjetivesInput from './ObjetivesInput';
import OwnerManagerInfo from './OwnerManagerInfo';
import ResourcesInfo from './ResourcesInfo';
import SaveButton from './SaveButton';
import ProjectDetails from './ProjectDetails';

function InfoProject() {
  // Acceder al id de la URL
  const { id } = useParams();

  // Estado
  const [project, setProject] = useState({});

  // Estado para indicar si los datos del proyecto se han cargado
  const [projectLoaded, setProjectLoaded] = useState(false);

  // Almacenar datos del formulario de milestone
  const [newMilestone, setNewMilestone] = useState({
    milestone: '',
    plan_due_date: '',
  });

  // Estado que almacena la fecha de actualización
  const [updateDate, setUpdateDate] = useState(new Date());

  // Estado para controlar si está editando o guardando
  const [isEditing, setIsEditing] = useState(false);

  const phases = ["Initiation", "Planning", "Execution", "Monitoring", "Closure"];

  // Estado para almacenar la fase seleccionada
  const [selectedPhase, setSelectedPhase] = useState("Initiation"); // Inicialmente seleccionamos "initiation"

  // Opciones para el select del estado
  const options = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'On Track', value: 'On Track' },
    { label: 'Off Track', value: 'Off Track' },
    { label: 'Done', value: 'Done' },
  ];

  // Método GET para traer información del proyecto
  useEffect(() => {
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        setProjectLoaded(true); // Indicar que los datos del proyecto se han cargado
      });
  }, [id]);

  // Función para manejar la actualización de objetivos
  const addObjetives = () => {
    // El componente está en modo guardado
    setIsEditing(false);

    // Cada vez que se ejecute, se actualiza la fecha
    const currentDate = new Date();
    setUpdateDate(currentDate);

    // Objeto que contiene la información actualizada del proyecto
    const updatedProject = {
      project_description: project.project_description,
      project_status: project.status,
    };

    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Actualizada----------:', data);
        console.log('***************', project.status);
      })
      .catch((error) => console.error(error));
  };

  // Agregar un nuevo milestone
 // Agregar un nuevo milestone
const handleAddMilestone = (e) => {
  e.preventDefault();

  const newMilestoneData = {
    phase: selectedPhase,
    milestone: newMilestone.milestone,
    plan_due_date: newMilestone.plan_due_date,
  };

  // Check if milestones[selectedPhase] is an array or initialize it as an empty array
  const newMilestonesArray = Array.isArray(project.milestones[selectedPhase])
    ? project.milestones[selectedPhase]
    : [];

  fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}/milestone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMilestoneData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the state by creating a new object
      setProject((prevProject) => ({
        ...prevProject,
        milestones: {
          ...prevProject.milestones,
          [selectedPhase]: [...newMilestonesArray, data], // Add the new milestone to the array
        },
      }));
      // Restablece el estado del formulario
      setNewMilestone({
        milestone: '',
        plan_due_date: '',
      });
    })
    .catch((error) => console.error(error));
};

  // Función para indicar que el componente está en modo de edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Maneja el cambio de estado cuando el usuario interactúa con el formulario
  const handleSelect = (event) => {
    setProject({ ...project, status: event.target.value });
  };
  const handleDescriptionChange = (event) => {
    setProject({ ...project, project_description: event.target.value });
  };

  // Función para manejar el cambio de fase seleccionada por el usuario
  const handlePhaseChange = (newPhase) => {
    setSelectedPhase(newPhase);
  };
  
  return (
    <div className="search">
      <Search />
      {projectLoaded ? ( // Verificar si los datos del proyecto se han cargado
        <div className="container-info-project">
          <div className="container-project-name d-flex justify-content-between align-items-center">
            <p className="title-info">{project.project_name}</p>
            <SelectStatus options={options} selectedStatus={project.status} onChange={handleSelect} isEditing={isEditing} />
          </div>

          {updateDate && (
            <p className="text-date">Updated {updateDate.toLocaleString()}</p>
          )}

          <div className="container-info d-flex justify-content-between align-items-center">
            <div className="container-input-info">
              {isEditing ? (
                <ObjetivesInput value={project.project_description} onChange={handleDescriptionChange} />
              ) : (
                <>
                  <span className="title-form">Objectives</span>
                  <p className="p-objetives">{project.project_description}</p>
                </>
              )}
              <OwnerManagerInfo project={project} />
            </div>
            <ResourcesInfo project={project} />
          </div>
          <SaveButton isEditing={isEditing} onSave={addObjetives} onEdit={handleEdit} />
          <ProjectDetails project={project} />
          <div>
            <p className="title-form">Select Phase:</p>
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
          </div>
          <form>
            <input
              type="text"
              name="milestone"
              value={newMilestone.milestone}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, milestone: e.target.value })
              }
              placeholder="Nombre del hito"
            />
            <input
              type="date"
              name="plan_due_date"
              value={newMilestone.plan_due_date}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  plan_due_date: e.target.value,
                })
              }
              placeholder="Fecha de vencimiento planificada"
            />
            <button type="submit" onClick={handleAddMilestone}>
              Agregar Hito
            </button>
          </form>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" id="spinner" role="status" />
        </div>
      )}
    </div>
  );
}

export default InfoProject;
