import StatusIcon from '../../Dashboard/components/StatusIcon';
import './tableProjects.css';


function TableProjects({ users }) {
  const handleClick = (userId) => {
    window.location.href = `/dashboard/${userId}`;
  };

  return (
    <div className='table-projects'>
      <div className='table-header'>
        <div className='header-cell'>Project Name</div>
        <div className='header-cell'>Project Owner</div>
        <div className='header-cell'>Project Manager</div>
        <div className='header-cell'>Status</div>
      </div>

      <div className='table-body'>
        {users && users.map((user) => (
          <div key={user.id} className='table-row' onClick={() => handleClick(user.id)}>
            <div className='cell cell-name'>{user.project_name}</div>
            <div className='cell cell-OM'>{user.project_manager ? user.project_manager : 'Javier Mendez'}</div>
            <div className='cell cell-OM'>{user.project_owner ? user.project_owner : 'Carlos Gonzales'}</div>
            <div className='cell cell-status'><StatusIcon status={user.status}/> {user.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableProjects;
