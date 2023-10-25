import { useState, useEffect } from 'react'
import TableProjects from './TableProjects';
import Search from '../../../components/Search';
import SortButton from './SortButton';



function SearchTable() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [ordenAZ, setOrdenAZ] = useState(true);
  const getUrl = async () => {
    await fetch("https://dev-api.focalpoint.nearshoretc.com/project")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
        setFilteredUsers([...response]);
      })
      .catch((error) => console.error(error));
  }

  const handleSearch = (query) => {
    const resultSearch = users.filter((e) => {
      return e.project_name.toString().toLowerCase().includes(query.toLowerCase());
    });
    setFilteredUsers(resultSearch);
  }

  useEffect(() => {
    getUrl();
  }, []);

  const tableSort = () => {
    const ordered = [...filteredUsers];  
    ordered.sort((a, b) => {
    if (ordenAZ) {
        return a.project_name.localeCompare(b.project_name); 
    } else {
        return b.project_name.localeCompare(a.project_name); 
    }
    });
    setFilteredUsers(ordered);
    setOrdenAZ(!ordenAZ); 
};

  return (
    <div className='search'>
      <Search onSearch={handleSearch} />
      <SortButton ordenAZ={ordenAZ} onClick={tableSort}/>
      <TableProjects users={filteredUsers} />
    </div>
  );
}
export default SearchTable