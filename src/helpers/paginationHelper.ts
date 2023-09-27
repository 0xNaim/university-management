import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

/**
 * Calculates pagination parameters based on the provided options.
 *
 * @param {IOptions} options - The pagination options.
 * @returns {IOptionsResult} - The calculated pagination parameters.
 */
const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
