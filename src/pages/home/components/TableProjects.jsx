import { Link } from 'react-router-dom';
import './tableProjects.css'
function TableProjects({ users }) {
    return (
        <table className='table-projects'>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Owner</th>
              <th>Project Manager</th>
              <th>Status</th>
            </tr>
          </thead>
  
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <Link to={`/dashboard/${user.id}`}>
                <td>{user.project_name}</td>
                <td>{user.project_owner}</td>
                <td>{user.project_manager}</td>
                <td>{user.status}</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
    );
  }
  export default TableProjects