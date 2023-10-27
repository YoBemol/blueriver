import { useState } from 'react';

function ProjectDetails({ project }) {
  // Estado para almacenar la fase seleccionada
  const [selectedPhase, setSelectedPhase] = useState(null);
  // Estado para almacenar el tipo de "Key Update" seleccionado
  const [selectedKeyUpdateType, setSelectedKeyUpdateType] = useState(null);

  // Función para manejar el clic en una fase
  const handlePhaseClick = (phaseName) => {
    setSelectedPhase(phaseName);
    setSelectedKeyUpdateType(null); // Reiniciamos el tipo de "Key Update" seleccionado
  };

  // Función para manejar el clic en un tipo de "Key Update"
  const handleKeyUpdateTypeClick = (keyUpdateType) => {
    setSelectedKeyUpdateType(keyUpdateType);
  };

  return (
    <div>
      <h2>{project.project_name}</h2>
      <p>Descripción: {project.project_description}</p>

      <div>
        <h3>Fases:</h3>
        <ul>
          {Object.keys(project.milestones).map((phaseName) => (
            // Itera sobre las fases y muestra una lista de ellas.
            <li
              key={phaseName}
              onClick={() => handlePhaseClick(phaseName)}
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

      {selectedPhase && project.key_updates[selectedPhase] && (
        <div>
          <h3>Tipos de Key Updates para {selectedPhase}:</h3>
          <ul>
            {Object.keys(project.key_updates[selectedPhase]).map((keyUpdateType) => (
              // Itera sobre los tipos de "Key Updates" y muestra una lista de ellos.
              <li
                key={keyUpdateType}
                onClick={() => handleKeyUpdateTypeClick(keyUpdateType)}
                style={{
                  cursor: 'pointer',
                  fontWeight: keyUpdateType === selectedKeyUpdateType ? 'bold' : 'normal',
                }}
              >
                {keyUpdateType}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedKeyUpdateType && project.key_updates[selectedPhase][selectedKeyUpdateType] && (
        <div>
          <h3>{selectedKeyUpdateType}:</h3>
          <ul>
            {project.key_updates[selectedPhase][selectedKeyUpdateType].map((keyUpdate) => (
              // Itera sobre los valores de "Key Update" para un tipo específico y muestra una lista de ellos.
              <li
                key={keyUpdate.key_update_id}
              >
                {keyUpdate.key_update_value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
