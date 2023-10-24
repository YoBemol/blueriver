import './tabs.css'

const Tabs = ({name, active, handleClick}) => {
  return <div onClick={handleClick} className={`tab ${active && 'active'}`} >{name}</div>;
};

export default Tabs
