import { AiTwotoneExclamationCircle } from 'react-icons/ai';
import './statusIcon.css'
const statusColors = {
  'On Track': 'green',
  'Off Track': 'red',
  'Done': 'blue',
  'Not Started': 'gray',
};

function StatusIcon({ status }) {
  console.log("Estado recibido:", status);

  const iconColor = statusColors[status] || '';
  console.log("Color del ícono:", iconColor);


  return (
    <AiTwotoneExclamationCircle className={`icon-status icon-status-${iconColor}`} />
  );
}

export default StatusIcon;
