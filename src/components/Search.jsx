import { useState } from 'react';
import PropTypes from 'prop-types';

function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className='containerInput'>
      <input
        className='form-control inputSearch'
        value={search}
        placeholder='Busqueda por proyecto'
        onChange={handleOnChange}
      />
      <button className='btn btn-success'>Ir</button>
    </div>
  );
}
Search.propTypes = {
    onSearch: PropTypes.func
  };

export default Search;
