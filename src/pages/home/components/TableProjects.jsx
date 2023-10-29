import './tableProjects.css';
import {AiTwotoneExclamationCircle } from "react-icons/ai";


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
            <div className='cell cell-OM'>{user.project_owner}</div>
            <div className='cell cell-OM'>{user.project_manager}</div>
            <div className='cell cell-status'><AiTwotoneExclamationCircle className='icon-status'/>{user.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableProjects;
