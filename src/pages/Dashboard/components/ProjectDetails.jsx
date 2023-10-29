import { useState, useEffect } from 'react';
import './projectDetails.css';
import { BsFlag } from 'react-icons/bs';
import { LiaStickyNoteSolid } from 'react-icons/lia';
import DetailsModal from './DetailsModal';

function ProjectDetails({ project, phases }) {
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [selectedKeyUpdateType, setSelectedKeyUpdateType] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSelectedMilestone(null);
    };

    const handleShow = () => setShow(true);

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

            <DetailsModal show={show} handleClose={handleClose} item={selectedMilestone} title='Milestones' />
        </div>
    );
}

export default ProjectDetails;
