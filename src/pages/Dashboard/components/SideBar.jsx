import { Link} from 'react-router-dom';
import './SideBar.css';

function SideBar() {
  return (
    <>
    <div>
        <Link className="barra-navegacion" to='/'>Projects</Link>
        <Link to='/dashboard'>Overview</Link>
    </div>
    </>
  )
}
export default SideBar