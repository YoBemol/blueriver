import './objetivesInput.css'
import Form from 'react-bootstrap/Form';
function ObjetivesInput({ value, onChange }) {
    return (
        <>
            <label className='title-form'>Objetives</label>
                <Form.Control
                     as="textarea" 
                    value={value}
                    onChange={onChange}
                    className='input-objetives custom-font-weight'
                />
     
        </>
    );
}

export default ObjetivesInput;
