import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import KeyUpdates from './keyUpdates';
// import ModalKeyUpdates from './modalKeyUpdates';
import ProjectDetails from './ProjectDetails';

function InfoProject() {
  const { id } = useParams();

  const options = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'On Track', value: 'On Track' },
    { label: 'Off Track', value: 'Off Track' },
    { label: 'Done', value: 'Done' },
  ]

  const [project, setProject] = useState({});
  useEffect(() => {
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [id]);

  const updatedProject = {
    project_description: project.project_description,
    project_status: project.status,
  };

  const addObjetives = () => {


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

  //******** Agregar Keys  ***********
  // const handleAddKeys = (newKey) => {
  //   fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}/phase-key-updates`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newKey),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProject(project.concat(data));
  //     })
  //     .catch((error) => console.error(error));
  // };

  function handleSelect(event) {
    setProject({ ...project, status: event.target.value })
  }

  console.log(project)

  return (
    <div>
      {project ? (
        <div>
          <h2>{project.project_name}</h2>
          <p>Descripción: {project.project_description}</p>
          <p>key: {project.key_updates.initiation['Highlights & Concerns'][0].key_update_value}</p>
          <input
            type="text"
            value={project.project_description}
            onChange={(e) => setProject({ ...project, project_description: e.target.value })}
          />

          {/* <h1>{id}</h1> */}
          <div className='d-flex flex-row-reverse '>
            <div className='w-25 p-3 border rounded'>
              <h4>Status</h4>
              <select className='form-select' onChange={handleSelect}>
                {options.map((option, index) => (
                  <option value={option.value} key={index}>{option.label}</option>
                ))}
              </select>
              <p>{project.status}</p>
            </div>

          </div>

          <button onClick={addObjetives}>Agregar</button>
          {/* {project.map((item) => (
            <div key={item.id}>
                <p>{item.key_update_value}</p>
            </div>
          ))}*/}
        {/* <KeyUpdates /> */}
        <ProjectDetails project={project}/>
        </div>
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
}

export default InfoProject;
