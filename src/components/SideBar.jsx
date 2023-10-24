import { Link} from 'react-router-dom';
import './sideBar.css';

function SideBar() {
  return (
    <div className='nav'>
        <Link className="link-navigation" to='/'><img className='logo-nav' src='public/assets/home-logo.png' alt='home'/>Projects</Link>
        <Link className="link-navigation" to='/dashboard'><img className='logo-nav' src='public/assets/proyecto-logo.png' alt='proyecto'/>Overview</Link>
    </div>
  )
}
export default SideBar