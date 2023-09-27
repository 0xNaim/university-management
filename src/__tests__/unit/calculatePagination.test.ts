/* eslint-disable no-undef */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelper';

describe('calculatePagination', () => {
  it('should calculate pagination with default values', () => {
    const options = {};
    const result = paginationHelpers.calculatePagination(options);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(0);
    expect(result.sortBy).toBe('createdAt');
    expect(result.sortOrder).toBe('desc');
  });

  it('should calculate pagination with custom values', () => {
    const options = {
      page: 2,
      limit: 10,
    };

    const result = paginationHelpers.calculatePagination(options);

    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10);
  });

  it('should calculate pagination with missing values', () => {
    const options = {
      page: 2,
    };
    const result = paginationHelpers.calculatePagination(options);

    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10);
  });

  it('should calculate pagination with sorting', () => {
    const options = {
      page: 2,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'asc' as SortOrder,
    };
    const result = paginationHelpers.calculatePagination(options);

    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(10);
    expect(result.sortBy).toBe('createdAt');
    expect(result.sortOrder).toBe('asc');
  });
});
