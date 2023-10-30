
function OwnerManagerInfo({ project }) {
  return (
    <div className='container-OM d-flex justify-content-between align-items-center'>
      <div className='container-names'>
        <span className='title-form'>Project Owner</span>
        <p className='text-OM'>{project.project_manager ? project.project_manager : 'Javier Mendez'}</p>
      </div>
      <div className='container-names'>
        <span className='title-form'>Project Manager</span>
        <p className='text-OM'>{project.project_owner ? project.project_owner : 'Carlos Gonzales'}</p>
      </div>
    </div>
  );
}
export default OwnerManagerInfo
