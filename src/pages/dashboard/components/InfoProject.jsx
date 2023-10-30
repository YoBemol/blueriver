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
import ModalAddMilestone from './ModalAddMilestone';

function InfoProject() {

  // Acceder al id de la URL
  const { id } = useParams();

  // Estado
  const [project, setProject] = useState({});

  //Estado para indicar la apertura y cierre del modal 
  const [show, setShow] = useState(false);

  // Estado para indicar si los datos del proyecto se han cargado
  const [projectLoaded, setProjectLoaded] = useState(false);

  // Estado para almacenar la fase seleccionada
  const [selectedPhase, setSelectedPhase] = useState("Initiation");

  // Estado que almacena la fecha de actualización
  const [updateDate, setUpdateDate] = useState(new Date());

  // Estado para controlar si está editando o guardando
  const [isEditing, setIsEditing] = useState(false);


  // Almacenar datos del formulario de milestone
  const [newMilestone, setNewMilestone] = useState({
    milestone: '',
    plan_due_date: '',
  });
  // Almacenar datos del formulario de keys
  const [newKeys, setNewKeys] = useState({
    value: '',
    key_update: ''
  });


  //Almacenar phases
  const [phases, setPhases] = useState([]);
  const [keyUpdate, setKeyUpdate] = useState([])

  // Opciones para el select del estado
  const options = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'On Track', value: 'On Track' },
    { label: 'Off Track', value: 'Off Track' },
    { label: 'Done', value: 'Done' },
  ];

  // Función para convertir la primera letra de una cadena en mayúscula
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  useEffect(() => {
    // Realizar una solicitud GET para obtener la información del proyecto
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);

        // Obtener la lista de fases del proyecto y guárdala en el estado
        if ('milestones' in data) {
          const projectPhases = Object.keys(data.milestones).map((phase) => phase.toLowerCase());
          setPhases(projectPhases);
        }



        console.log('***********************', keyUpdate)
        setProjectLoaded(true);
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
        console.log(data)
      })
      .catch((error) => console.error(error));
  };

  // Agregar un nuevo milestone
  const handleAddMilestone = (e) => {
    e.preventDefault();
    // Objeto que contiene el milestone agregado del proyecto
    const newMilestoneData = {
      phase: capitalizeFirstLetter(selectedPhase), // Usar la fase seleccionada con la primera letra en mayúscula
      milestone: newMilestone.milestone,
      plan_due_date: newMilestone.plan_due_date,
    };

    // Comprobar si milestones[selectedPhase] es un array o inicializarla como un array vacío
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
        // Actualizar el estado creando un nuevo objeto.
        setProject((prevProject) => ({
          ...prevProject,
          milestones: {
            ...prevProject.milestones,
            [selectedPhase]: [...newMilestonesArray, data], // agregar el nuevo milestone al array
          },
        }));
        // Restablece el estado del formulario
        setNewMilestone({
          milestone: '',
          plan_due_date: '',
        });
        handleClose();
      })
      .catch((error) => console.error(error));
  };
  const handleAddKeys = (e) => {
    e.preventDefault();
  
    // Verificar si el campo key_update tiene un valor seleccionado
    if (!newKeys.value || !newKeys.key_update) {
      // Manejar el caso en el que no se haya seleccionado una opción
      console.error('Debes seleccionar un valor y un tipo de clave.');
      return;
    }
  
    // Objeto que contiene el key agregado del proyecto
    const newKeysData = {
      phase: capitalizeFirstLetter(selectedPhase), // Usar la fase seleccionada con la primera letra en mayúscula
      value: newKeys.value,
      key_update: newKeys.key_update,
    };
  
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}/phase-key-updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newKeysData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado creando un nuevo objeto con la nueva clave
        setProject((prevProject) => ({
          ...prevProject,
          keys: {
            ...prevProject.keys,
            [selectedPhase]: data,
          },
        }));
        // Restablece el estado del formulario
        setNewKeys({
          value: '',
          key_update: '', // Restablecer el campo key_update
        });
        handleClose();
      })
      .catch((error) => console.error(error));
  };
  


  //Funciones para abrir y cerrar el modal 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      {projectLoaded ? (
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
          <ProjectDetails project={project} phases={phases} setProject={setProject} />


          <ModalAddMilestone
            handleShow={handleShow}
            show={show}
            handleClose={handleClose}
            selectedPhase={selectedPhase}
            newMilestone={newMilestone}
            handlePhaseChange={handlePhaseChange}
            handleAddMilestone={handleAddMilestone}
            handleMilestoneChange={(e) => setNewMilestone({ ...newMilestone, milestone: e.target.value })}
            handlePlanDueDateChange={(e) => setNewMilestone({ ...newMilestone, plan_due_date: e.target.value })}
            phases={phases}
          />
       <div>
          <label htmlFor="keyValue">Key Value:</label>
            <input
              type="text"
              className="form-control"
              id="keyValue"
              value={newKeys.value}
              onChange={(e) => setNewKeys({ ...newKeys, value: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="keyUpdate">Key Update:</label>
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
              <button type="submit" className="btn btn-primary" onClick={handleAddKeys}>Add Key</button>
            
        </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" id="spinner" role="status" />
    </div>
  )
}
    </div >
  );
}

export default InfoProject;
