import {useMemo} from 'react';

export const DOTS = -1; // Acts as a separator

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({length}, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumber = siblingCount + 5;

    if (totalPageNumber >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIdx = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const showLeftDots = leftSiblingIdx > 2;
    const showRightDots = rightSiblingIdx < totalPageCount - 2;

    if (!showLeftDots && showRightDots) {
      let leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      let rightRange = range(
        totalPageCount - 2 - 2 * siblingCount,
        totalPageCount,
      );
      return [1, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let midRange = range(leftSiblingIdx, rightSiblingIdx);
      return [1, DOTS, ...midRange, DOTS, totalPageCount];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
};
