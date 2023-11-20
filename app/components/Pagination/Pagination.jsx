import {usePagination, DOTS} from '~/hooks/usePagination';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import './Pagination.css';
import {useEffect} from 'react';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  customClassName = [],
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const pageNumberItem = (pageNumber) => {
    if (pageNumber === DOTS) {
      return (
        <li key={pageNumber} className="pagination-item-dot">
          &#8230
        </li>
      );
    }
    return (
      <li
        className={`pagination-item${
          pageNumber === currentPage ? ' selected' : ''
        }`}
        disabled={pageNumber === currentPage}
        onClick={() => onPageChange(pageNumber)}
        key={pageNumber}
      >
        {pageNumber}
      </li>
    );
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination-container ${customClassName.join(' ')}`}>
      {currentPage !== 1 && (
        <li
          className="pagination-arrow"
          data-testid="previous"
          onClick={onPrevious}
        >
          <IoIosArrowBack />
        </li>
      )}
      {paginationRange.map((pageNumber) => pageNumberItem(pageNumber))}
      {currentPage !== lastPage && (
        <li className="pagination-arrow" data-testid="next" onClick={onNext}>
          <IoIosArrowForward />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
