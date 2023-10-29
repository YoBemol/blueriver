import { useState, useEffect } from 'react'
import TableProjects from './TableProjects';
import Search from '../../../components/Search';
import SortButton from './SortButton';
import PaginationHome from './Pagination';


function SearchTable() {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;


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
    setCurrentPage(1);
  }

  useEffect(() => {
    getUrl();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredUsers?.slice(indexOfFirstProject, indexOfLastProject);

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
      <SortButton ordenAZ={ordenAZ} onClick={tableSort} />
      <TableProjects users={currentProjects} />
      {filteredUsers && (
        <PaginationHome
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / projectsPerPage)}
          onPageChange={setCurrentPage}
        />
      )}
    </div> 
  )
}
export default SearchTable