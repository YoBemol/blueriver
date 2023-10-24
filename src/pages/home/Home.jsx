import SearchTable from './components/SearchTable';
import SideBar from '../../components/SideBar';
import './home.css'
function Home() {

  return (
    <div className='home'>
      <SideBar/>
      <SearchTable/>
    </div>
  )
}
export default Home;