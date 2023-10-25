function SortButton({onClick, ordenAZ}) {
    return (
      <button onClick={onClick} className='button-sort'>
        {ordenAZ ?'A - Z' : 'Z - A'}
    </button>
    )
  }
  export default SortButton