import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function InfoProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  

  useEffect(() => {
    fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      
  }, [id]);

  return (
    <div>
      {project ? (
        <div>
          <h2>{project.project_name}</h2>
          <h1>{id}</h1>
          <p>{project.status}</p>
        </div>
      ) : (
        <div>Cargando datos del proyecto...</div>
      )}
    </div>
  );
}

export default InfoProject;
