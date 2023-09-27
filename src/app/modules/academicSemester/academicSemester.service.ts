import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterSearchableFields, academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester, IAcademicSemesterFilters } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// // Create semester
const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code');
  }

  const response = await AcademicSemester.create(payload);
  return response;
};

// Get all semesters with optional filtering and pagination
const getSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const searchAndFilterOptions = [];

  // Search needs $or for searching in specific fields
  if (searchTerm) {
    searchAndFilterOptions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fulfill all the conditions
  if (Object.keys(filtersData)?.length) {
    searchAndFilterOptions.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  // Dynamic sort needs fields to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const query = searchAndFilterOptions?.length > 0 ? { $and: searchAndFilterOptions } : {};

  const total = await AcademicSemester.countDocuments(query);
  const response = await AcademicSemester.find(query).sort(sortConditions).skip(skip).limit(limit).lean();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: response,
  };
};

// Get semester by it's ID
const getSemester = async (id: string): Promise<IAcademicSemester | null> => {
  const response = await AcademicSemester.findById(id).lean();
  return response;
};

// Update semester by it's ID
const updateSemester = async (id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title as string] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code');
  }

  if (payload.title && payload.year) {
    const existingSemester = await AcademicSemester.findOne({
      title: payload.title,
      year: payload.year,
    });

    if (existingSemester) {
      throw new ApiError(StatusCodes.CONFLICT, 'Semester with the same title and year already exists.');
    }
  }

  const response = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true });
  return response;
};

// Delete semester by it's ID
const deleteSemester = async (id: string): Promise<IAcademicSemester | null> => {
  const response = await AcademicSemester.findByIdAndDelete(id);
  return response;
};

export const academicSemesterService = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
};
