import SearchTable from './components/SearchTable';
import SideBar from '../../components/SideBar';
import './home.css'
function Home() {

  return (
    <div className='layout'>
      <SideBar/>
      <SearchTable/>
    </div>
  )
}
export default Home;