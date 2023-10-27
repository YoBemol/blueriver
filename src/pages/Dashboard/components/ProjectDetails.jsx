import { useState } from 'react';

function ProjectDetails({ project }) {
  // Estado para almacenar la fase seleccionada
  const [selectedPhase, setSelectedPhase] = useState(null);

  // Función para manejar el clic en una fase
  const handlePhaseClick = (phaseName) => {
    // Al hacer clic en una fase, actualizamos el estado selectedPhase
    setSelectedPhase(phaseName);
  };
  return (
    <div>
    <h2>{project.project_name}</h2>
    <p>Descripción: {project.project_description}</p>

    <div>
      <h3>Fases:</h3>
      <ul>
        {/* // Mapea todas las fases en el objeto de milestones. */}
        {Object.keys(project.milestones).map((phaseName) => (
          <li
            key={phaseName}
            onClick={() => handlePhaseClick(phaseName)}  //Maneja el clic en la fase
            style={{
              cursor: 'pointer',
              fontWeight: phaseName === selectedPhase ? 'bold' : 'normal',
            }}
          >
            {phaseName}
          </li>
        ))}
      </ul>
    </div>
              {/* // Verifica si una fase está seleccionada y si hay "Key Updates" para esa fase. */}
    {selectedPhase && project.key_updates[selectedPhase] && (
      <div>
        <h3>Key Updates para {selectedPhase}:</h3>
         {/* // Mapea los diferentes tipos de "Key Updates" (como 'Highlights & Concerns', 'Risks & Mitigations', etc.). */}
        {Object.keys(project.key_updates[selectedPhase]).map((keyUpdateType) => (
          <div key={keyUpdateType}>
            <h4>{keyUpdateType}:</h4>
            <ul>
              {/* Crea una lista desordenada para mostrar los valores de "Key Updates" de este tipo. */}
             {/* // Mapea y muestra cada "Key Update" individual con su valor. */}
              {project.key_updates[selectedPhase][keyUpdateType].map((keyUpdate) => (
                <li key={keyUpdate.key_update_id}>{keyUpdate.key_update_value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}
export default ProjectDetails;
