import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  function handleSelect(event) {
    setProject({ ...project, status: event.target.value })
  }

  return (
    <div>
      {project ? (
        <div>
          <h2>{project.project_name}</h2>
          <p>Descripción: {project.project_description}</p>
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
        </div>
      ) : (
        <div>Cargando</div>
      )}
    </div>
  );
}

export default InfoProject;
