import { useState, useEffect } from 'react';
import './projectDetails.css'
import { BsFlag } from 'react-icons/bs';
import { LiaStickyNoteSolid } from 'react-icons/lia';

function ProjectDetails({ project }) {
    // Estado para almacenar la fase seleccionada
    const [selectedPhase, setSelectedPhase] = useState(null);
    // Estado para almacenar el tipo de "Key Update" seleccionado
    const [selectedKeyUpdateType, setSelectedKeyUpdateType] = useState(null);

    useEffect(() => {
        // Verificar si hay una fase seleccionada y tipos de "Key Update" disponibles
        if (selectedPhase && project.key_updates[selectedPhase]) {
            // Obtener la lista de tipos de "Key Update"
            const keyUpdateTypes = Object.keys(project.key_updates[selectedPhase]);

            // Verificar si hay tipos de "Key Update" disponibles
            if (keyUpdateTypes.length > 0) {
                // Establecer el primer tipo de "Key Update" como predeterminado
                setSelectedKeyUpdateType(keyUpdateTypes[0]);
            }
        }
    }, [selectedPhase, project]);

    // Función para manejar el clic en una fase
    const handlePhaseClick = (phaseName) => {
        setSelectedPhase(phaseName);
    };

    // Función para manejar el clic en un tipo de "Key Update"
    const handleKeyUpdateTypeClick = (keyUpdateType) => {
        setSelectedKeyUpdateType(keyUpdateType);
    };

    return (
        <div>
            <div className='container-phase'>
                <ul className='d-flex justify-content-between align-items-center'>
                    {Object.keys(project.milestones).map((phaseName) => (
                        <li
                            key={phaseName}
                            onClick={() => handlePhaseClick(phaseName)}
                            className={`phase-item ${phaseName === selectedPhase ? 'selected-phase' : ''} text-center`}
                        >
                            {phaseName}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='d-flex justify-content-between container-MK '>
                {selectedPhase && project.milestones[selectedPhase] && (
                    <div className='container-milestons'>
                        <p className='title-milestones'><BsFlag /> Milestones</p>
                        <ul className='ul-milestone d-flex justify-content-between'>
                            <li className='title-form'>Description</li>
                            <li className='title-form' id='current-date'>Current Date</li>
                        </ul>
                        <ul className='ul-milestone'>
                            {project.milestones[selectedPhase].map((milestone, index) => (
                                // Itera sobre los milestones y muestra una lista de ellos.
                                <li key={index} className='li-milestones d-flex justify-content-between'>
                                    {milestone.milestone_name} <span className='milestone-date'>{milestone.milestone_plan_due_date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <p className='title-milestones'><LiaStickyNoteSolid /> Other key updates / Notes </p>
                    <div className='d-flex justify-content-between '>
                        {selectedPhase && project.key_updates[selectedPhase] && (
                            <div className='container-type-key'>
                                <ul className='ul-milestone'>
                                    {Object.keys(project.key_updates[selectedPhase]).map((keyUpdateType) => (
                                        <li
                                            key={keyUpdateType}
                                            onClick={() => handleKeyUpdateTypeClick(keyUpdateType)}
                                            className={`key-update-item ${keyUpdateType === selectedKeyUpdateType ? 'selected' : ''}`}
                                        >
                                            {keyUpdateType}
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        )}

                        {selectedKeyUpdateType && project.key_updates[selectedPhase] && project.key_updates[selectedPhase][selectedKeyUpdateType] && (
                            <div className='container-keys'>
                                <ul className='ul-milestone'>
                                    {project.key_updates[selectedPhase][selectedKeyUpdateType].map((keyUpdate) => (
                                        // Itera sobre los valores de "Key Update" para un tipo específico y muestra una lista de ellos.
                                        <li
                                            key={keyUpdate.key_update_id}
                                            className='li-keys'
                                        >
                                            {keyUpdate.key_update_value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
