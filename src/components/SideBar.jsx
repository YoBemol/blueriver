import {MdKeyboardArrowRight} from "react-icons/md";
import {BiHomeAlt, BiFileBlank } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import './sideBar.css';


function SideBar() {

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  }
  return (
    <aside className='aside'>
        <img id='logo-blueriver' src='/assets/logo-blueriver.png'/>

        <ul className='container-link'>
          <li className={`${isActive('/')}`}>
            <BiHomeAlt className='icon-aside'/>
            <Link className='link-navigation' to='/'>Projects</Link>
            {isActive('/') && <MdKeyboardArrowRight className='icon-active'/>}
          </li>
          
          <li className={`${isActive('/dashboard')}`} >
            <BiFileBlank className='icon-aside' />
            <Link className='link-navigation ' to='/dashboard'>Overview</Link>
            {isActive('/dashboard') && <MdKeyboardArrowRight className='icon-active'/>}
          </li>
        </ul>
    </aside>
  )
}
export default SideBar