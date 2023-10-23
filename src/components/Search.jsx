import { useState, useEffect } from 'react'

function Search() {
  const [users, setUsers] = useState(null);
  //const [table, setTable] = useState(null);
  const [search, setSearch] = useState("");

  const getUrl = async () => {
    await fetch("https://dev-api.focalpoint.nearshoretc.com/project")
      .then((response) => response.json())      
      .then((response) => setUsers(response))
      //.then((response) => setTable(response))
      //.then((response) => console.log(response))
      // .then((search) => setSearch(search));
      .catch((error) => console.error(error));

  }

  const handleOnChange = (e) => {
    //console.log(e.target.value)
    setSearch(e.target.value)    
    filterSearch(e.target.value)
  }

  const filterSearch = (res) => {
    
    let resultSearch = users.filter((e) => { 
      if (e.project_name.toString().toLowerCase().includes(res.toLowerCase())){
        return e;
      }        
    });
    setUsers(resultSearch)
  }

  useEffect(() => {
    getUrl()
  }, [])

  return (

    <div className='app'>
      <div className='containerInput'>
        <input
          className='form-control inputSearch'
          value={search}
          placeholder='Busqueda por proyecto'
          onChange={handleOnChange}
        />
        <button className='btn btn-success'>Ir</button>
      </div>
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
    </div>

  )
}

export default Search
