import { useState, useEffect } from 'react'
import TableProjects from './TableProjects';
import SearchBar from '../../../components/Search';


function SearchTable() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);

  const getUrl = async () => {
    await fetch("https://dev-api.focalpoint.nearshoretc.com/project")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
        setFilteredUsers(response);
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

  return (
    <div className='search'>
      <SearchBar onSearch={handleSearch} />
      <TableProjects users={filteredUsers} />
    </div>
  );
}
export default SearchTable