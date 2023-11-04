
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './paginacion.css';


function PaginationHome({ totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination-container">
      

        {pageNumbers.map((pageNumber) => (
          <Pagination.Item onClick={() => onPageChange(pageNumber)} key={pageNumber}>
            {pageNumber}
          </Pagination.Item>
        ))}

    </nav>
  );
}


export default PaginationHome;

