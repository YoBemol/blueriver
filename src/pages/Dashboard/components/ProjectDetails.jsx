import { useState } from 'react';

function ProjectDetails({ project }) {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedKeyUpdateType, setSelectedKeyUpdateType] = useState(null);

  const handlePhaseClick = (phaseName) => {
    setSelectedPhase(phaseName);
    setSelectedKeyUpdateType(null); // Reiniciamos el tipo de "Key Update" seleccionado

  };

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
