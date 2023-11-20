import {usePagination} from '../../hooks/usePagination'; // Update the import path accordingly

jest.mock('react', () => ({
  useMemo: jest.fn((fn) => fn()),
}));

describe('usePagination', () => {
  it('1. if sentence', () => {
    const totalCount = 10;
    const pageSize = 5;
    const currentPage = 1;

    const paginationRange = usePagination({
      totalCount,
      pageSize,
      currentPage,
    });
    expect(paginationRange).toEqual([1, 2]);
  });

  it('2. if sentence', () => {
    const totalCount = 20;
    const pageSize = 2;
    const siblingCount = 1;
    const currentPage = 3;

    const paginationRange = usePagination({
      totalCount,
      pageSize,
      siblingCount,
      currentPage,
    });
    expect(paginationRange).toEqual([1, 2, 3, 4, 5, -1, 10]);
  });

  it('3. if sentence', () => {
    const totalCount = 15;
    const pageSize = 2;
    const siblingCount = 1;
    const currentPage = 10;
    const paginationRange = usePagination({
      totalCount,
      pageSize,
      siblingCount,
      currentPage,
    });
    expect(paginationRange).toEqual([1, -1, 4, 5, 6, 7, 8]);
  });

  it('4. if sentence', () => {
    const totalCount = 20;
    const pageSize = 2;
    const siblingCount = 1;
    const currentPage = 5;

    const paginationRange = usePagination({
      totalCount,
      pageSize,
      siblingCount,
      currentPage,
    });
    expect(paginationRange).toEqual([1, -1, 4, 5, 6, -1, 10]);
  });

  it('Else option', () => {
    const totalCount = 20;
    const pageSize = 2;
    const siblingCount = 4;
    const currentPage = 5;
    const paginationRange = usePagination({
      totalCount,
      pageSize,
      siblingCount,
      currentPage,
    });
    expect(paginationRange).toEqual(undefined);
  });
});
