import "./table.css";

const Table = ({ headers, data }) => {
  const { title, items } = data;
  return (
    <div className="tableContainer">
      <h3 className="title">{title}</h3>
      <div className="headers">
        {headers.map((header, index) => {
          return <p key={index}>{header}</p>;
        })}
      </div>
      <div className="itemsContainer">
        {items.map((item, index) => {
          return (
            <div key={index} className="item">
              <p>{item.description}</p>
              <p>{item.plannedDate}</p>
              <p>{item.currentDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
