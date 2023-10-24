import { useState, useEffect } from 'react'
import TableProjects from './TableProjects';
import SearchBar from '../../../components/Search';

function SearchTable() {
  
   const [users, setUsers] = useState(null);
   const [filteredUsers, setFilteredUsers] = useState(null);  
   const [ loading, setLoading ] = useState(true);
    

  const getUrl = async () => {  
    setLoading(true);  
    await fetch("https://dev-api.focalpoint.nearshoretc.com/project")
      .then((response) => response.json())
      .then((response) => {      
        setUsers(response);
        setFilteredUsers(response);
      })      
      .catch((error) => console.error(error))   
      .finally(() => {
        setLoading(false); 
      });   
  }

  const handleSearch = (query) => {
    const resultSearch = users.filter((e) => {//users
      return e.project_name.toString().toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(resultSearch);
  }

  useEffect(() => {
    getUrl();
    
  }, []);

  return (
    <div className='search'>
      <SearchBar onSearch={handleSearch} />
      {loading?"Cargando...":<TableProjects users={filteredUsers} />}      
    </div>
  );
}
export default SearchTable