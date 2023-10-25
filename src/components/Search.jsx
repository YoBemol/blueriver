import { useState } from 'react';
import './search.css'
function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <div className='search-projects'>

      <input
        className='inputSearch'
        value={search}
        placeholder='Search project'
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Search;
