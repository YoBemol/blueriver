import { useState, useEffect } from 'react'
import TableProjects from './TableProjects';
import SearchBar from '../../../components/Search';
import Pagination from './paginacion';

function SearchTable() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;


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
    setCurrentPage(1);
  }

  useEffect(() => {
    getUrl();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredUsers?.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className='search'>
      <SearchBar onSearch={handleSearch} />
      <TableProjects users={currentProjects} />
      {filteredUsers && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / projectsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
export default SearchTable