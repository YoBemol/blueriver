import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../../../components/Search';
import './infoProject.css'
import SelectStatus from './SelectStatus';
import ObjetivesInput from './ObjetivesInput';
import OwnerManagerInfo from './OwnerManagerInfo';
import ResourcesInfo from './ResourcesInfo';
import SaveButton from './SaveButton';
import ProjectDetails from './ProjectDetails';

function InfoProject() {

  //Acceder al id de la url
  const { id } = useParams();

  //Estado
  const [project, setProject] = useState({});

  //Estado que almacena la fecha de actualización
  const [updateDate, setUpdateDate] = useState(new Date());

  //Estado para controlar si esta editando o guardando
  const [isEditing, setIsEditing] = useState(false);

  //Opciones para el select del estado
  const options = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'On Track', value: 'On Track' },
    { label: 'Off Track', value: 'Off Track' },
    { label: 'Done', value: 'Done' },
  ]

  //Metodo GET para traer información del proyecto
  useEffect(() => {
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [id]);

  //objeto que contiene la información actualizada del proyecto 
  const updatedProject = {
    project_description: project.project_description,
    project_status: project.status,
  };

  //Metodo PUT para actualizar descripción y select de status
  const addObjetives = () => {
    //El componente esta en modo guardado
    setIsEditing(false)

    //Cada vez que se ejecute, se actualiza la fecha
    const currentDate = new Date();
    setUpdateDate(currentDate);

    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProject)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Actualizada----------:', data);
        console.log('***************', project.status)
      })
      .catch((error) => console.error(error));
  };

  //metodo para indicar que el componente está en modo de edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  //Maneja el cambio de estado cuando el usuario interactua con el formulario
  const handleSelect = (event) => {
    setProject({ ...project, status: event.target.value })
  }
  const handleDescriptionChange = (event) => {
    setProject({ ...project, project_description: event.target.value });
  }

  return (
    <div className='search'>
      <Search />
      {project ? (
        <div className='container-info-project'>

          <div className="container-project-name d-flex justify-content-between align-items-center">
            <p className='title-info'>{project.project_name}</p>
            <SelectStatus options={options} selectedStatus={project.status} onChange={handleSelect} isEditing={isEditing}/>
          </div>

          {updateDate && (
            <p className="text-date">Updated {updateDate.toLocaleString()}</p>
          )}

          <div className='container-info d-flex justify-content-between align-items-center'>
            <div className='container-input-info'>

              {isEditing ? (
                <ObjetivesInput value={project.project_description} onChange={handleDescriptionChange} />

              ) : (
                <>
                  <span className='title-form'>Objetives</span>
                  <p className='p-objetives'>{project.project_description}</p>
                </>
              )}
              <OwnerManagerInfo project={project} />
            </div>
            <ResourcesInfo project={project} />
          </div>

          <SaveButton isEditing={isEditing} onSave={addObjetives} onEdit={handleEdit} />
<ProjectDetails project={project}/>
        </div>
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
}

export default InfoProject;
