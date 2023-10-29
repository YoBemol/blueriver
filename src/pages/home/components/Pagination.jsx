// Pagination.js
// import React from 'react';
import './paginacion.css';

const pageItemStyle = {
  display: 'inline',
  margin: '0.2rem',
};

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} style={pageItemStyle} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
            <button onClick={() => onPageChange(pageNumber)} className="page-link">
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
