
import './selectStatus.css'
import StatusIcon from './StatusIcon';

function SelectStatus({ options, selectedStatus, isEditing, onChange }) {
  return isEditing ? (
    <select className="select-info" value={selectedStatus} onChange={onChange}>
      {options.map((option, index) => (
        <option className='option-select' value={option.value} key={index}>
          {option.label} 
        </option>
      ))}
    </select>
  ) : (
    <p className='select-info'><StatusIcon status={selectedStatus} /> {selectedStatus}</p>
  );
}

export default SelectStatus;
