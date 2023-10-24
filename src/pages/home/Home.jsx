import Search from './components/Search';
import SideBar from '../../components/SideBar';
import './home.css'
function Home() {

  return (
    <div className='home'>
      <SideBar/>
      <Search/>
    </div>
  )
}
export default Home;