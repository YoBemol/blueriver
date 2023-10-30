import { useState, useEffect } from 'react';
import './projectDetails.css';
import { BsFlag } from 'react-icons/bs';
import { LiaStickyNoteSolid } from 'react-icons/lia';
import DetailsModal from './DetailsModal';
import { RiDeleteBinLine } from 'react-icons/ri';

function ProjectDetails({ project, phases, setProject }) {
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [selectedKeyUpdateType, setSelectedKeyUpdateType] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [selectedKey, setSelectedKey] = useState(null); 

    const handleClose = () => {
        setShow(false);
        setSelectedMilestone(null);
        setSelectedKey(null)
    };

    const handleShow = () => setShow(true);

  // Agregar esta función para ver detalles de una clave
  const handleViewKeyDetails = (keyToUpdate) => {
    setSelectedKey(keyToUpdate);
    handleShow();
  };


// Agregar esta función para eliminar un milestone
const handleDeleteMilestone = (milestoneToDelete) => {
    // Filtrar la lista de milestones para excluir el milestone que se va a eliminar
    const updatedMilestones = project.milestones[selectedPhase].filter(
      (milestone) => milestone !== milestoneToDelete
    );
  
    // Actualizar el estado local con la nueva lista de milestones
    setProject((prevProject) => ({
      ...prevProject,
      milestones: {
        ...prevProject.milestones,
        [selectedPhase]: updatedMilestones,
      },
    }));
  };
  const handleDeleteKeyUpdate = (keyUpdateToDelete) => {
  // 1. Obtén una copia del objeto key_updates del estado
  const updatedKeyUpdates = { ...project.key_updates };

  // 2. Elimina la clave que deseas eliminar
  if (updatedKeyUpdates[selectedPhase] && updatedKeyUpdates[selectedPhase][selectedKeyUpdateType]) {
    updatedKeyUpdates[selectedPhase][selectedKeyUpdateType] = updatedKeyUpdates[selectedPhase][selectedKeyUpdateType].filter(
      (keyUpdate) => keyUpdate !== keyUpdateToDelete
    );
  }

  // 3. Actualiza el estado con la copia del objeto actualizado
  setProject((prevProject) => ({
    ...prevProject,
    key_updates: updatedKeyUpdates,
  }));
};

    useEffect(() => {
        if (selectedPhase && project.key_updates[selectedPhase]) {
            const keyUpdateTypes = Object.keys(project.key_updates[selectedPhase]);
            if (keyUpdateTypes.length > 0) {
                setSelectedKeyUpdateType(keyUpdateTypes[0]);
            }
        }
    }, [selectedPhase, project]);

    const handlePhaseClick = (phaseName) => {
        setSelectedPhase(phaseName);
    };

    const handleKeyUpdateTypeClick = (keyUpdateType) => {
        setSelectedKeyUpdateType(keyUpdateType);
    };

    const handleMilestoneClick = (milestone) => {
        setSelectedMilestone(milestone);
        handleShow();
    };

    return (
        <div>
            <div className='container-phase'>
                <ul className='d-flex justify-content-between align-items-center'>
                    {phases.map((phaseName) => (
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
                            <li className='title-form' id='current-date'>Expiration Date</li>
                        </ul>
                        <ul className='ul-milestone'>
                            {project.milestones[selectedPhase].map((milestone, index) => (
                                <li key={index} className='li-milestones d-flex justify-content-between' onClick={() => handleMilestoneClick(milestone)}>
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
                                        <li

                                            key={keyUpdate.key_update_id}
                                           className='li-keys d-flex justify-content-between '
                                        >
                                                 
                                           <span> {keyUpdate.key_update_value}</span>
                                            <RiDeleteBinLine className='icon-close' onClick={() => handleDeleteKeyUpdate(keyUpdate)}/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DetailsModal show={show} handleClose={handleClose} item={selectedMilestone} title='Milestones'  handleDelete={handleDeleteMilestone}      onViewKeyDetails={handleViewKeyDetails}/>
        </div>
    );
}

export default ProjectDetails;
