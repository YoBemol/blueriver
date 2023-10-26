import { PiArrowsDownUpFill } from "react-icons/pi";
import './sortButton.css'
import { BiFileBlank } from 'react-icons/bi';
function SortButton({ onClick, ordenAZ }) {
  return (
    <div className="container-button">
        <div className='container-projects'>
        <BiFileBlank  className='icono-projects'/> <p>Projects</p>
      </div>
      <button onClick={onClick} className='button-sort'>
        <PiArrowsDownUpFill /> {ordenAZ ? 'A - Z' : 'Z - A'}
      </button>
    </div>
  )
}
export default SortButton