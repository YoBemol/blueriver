import PropTypes from 'prop-types';
function TableProjects({ users }) {
    return (
      <div className='table-responsive'>
        <table className='table table-sm table-bordered'>
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
                <td>{user.project_name}</td>
                <td>{user.project_owner}</td>
                <td>{user.project_manager}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

TableProjects.propTypes = {
    users: PropTypes.array
  };
  

  export default TableProjects