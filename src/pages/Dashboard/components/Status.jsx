import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

function Status() {
  const [ value, setValue ] = useState('')
  const options = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'On Track', value: 'On Track' },
    { label: 'Off Track', value: 'Off Track' },
    { label: 'Done', value: 'Done' },
  ]

  //   useEffect(() => {
  //     fetch(`https://dev-api.focalpoint.nearshoretc.com/project/${status}`)
  //       .then((response) => response.json())
  //       .then((data) => setProject(data));
  //   }, [status]);
  function handleSelect (event) {
    //console.log(event.target.label)
      setValue(event.target.value)
  }

  return (
    <div className='d-flex flex-row-reverse '>
      <div className='w-25 p-3 border rounded'>
        <h4>Status</h4>
        <select className='form-select' onChange={handleSelect}>
          {options.map((option, index) => (
            <option value={option.value} key={index}>{option.label}</option>            
          ))}
        </select>
        <p>{value}</p>
      </div>

    </div>
  );
}

export default Status;