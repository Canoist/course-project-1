import React, { useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage, userCrop }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  useEffect(() => {
    onPageChange(1);
  }, [pageCount]);

  const pages = _.range(1, pageCount + 1);
  return (
    pageCount !== 1 && (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={"page-item" + (page === currentPage ? " active" : "")}
              key={"page_" + page}
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  userCrop: PropTypes.array
};

export default Pagination;
