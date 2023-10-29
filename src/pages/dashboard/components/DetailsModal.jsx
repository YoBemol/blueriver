import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './detailsModal.css'
import { BsFlag } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';


function DetailsModal({ show, handleClose, item, title }) {
    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Body className='modal-milestone'>
                <div className='d-flex justify-content-between'>
                    <Modal.Title id='selected-title details-modal' className='title-milestones'><BsFlag /> {title}</Modal.Title>
                    <AiOutlineCloseCircle className='icon-close' variant="secondary" onClick={handleClose} />
                </div>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div>
                        <ul className='ul-milestone d-flex justify-content-between'>
                            <li className='title-form'>Description</li>
                            <li className='title-form' id='current-date'>Expiration Date</li>
                        </ul>
                        <ul className='ul-milestone'>
                            {item && (
                                <li className='li-milestones d-flex justify-content-between' >
                                    {item.milestone_name} <span className='milestone-date'>{item.milestone_plan_due_date}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    </div>

                    <div className=' d-flex justify-content-between'>
                   
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        <RiDeleteBinLine className='icon-close'/>
                
                    </div>
                    
               
            </Modal.Body>

        </Modal>
    );
}

export default DetailsModal;
