import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { IAcademicFaculty, IAcademicFacultyFilters } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// Create academic faculty
const createFaculty = async (payload: IAcademicFaculty) => {
  const response = await AcademicFaculty.create(payload);
  return response;
};

// Get academic faculties
const getFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const searchAndFilterOptions = [];

  // Search needs $or for searching in specific fields
  if (searchTerm) {
    searchAndFilterOptions.push({
      $or: academicFacultySearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fulfill all the conditions
  if (Object.keys(filtersData).length) {
    searchAndFilterOptions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs fields to do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const query = searchAndFilterOptions.length > 0 ? { $and: searchAndFilterOptions } : {};

  const response = await AcademicFaculty.find(query).sort(sortConditions).skip(skip).limit(limit).lean();

  const total = await AcademicFaculty.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: response,
  };
};

// Get academic faculty by it's ID
const getFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const response = await AcademicFaculty.findById(id).lean();
  return response;
};

// Update academic faculty by it's ID
const updateFaculty = async (id: string, payload: Partial<IAcademicFaculty>): Promise<IAcademicFaculty | null> => {
  const { title } = payload;

  if (title) {
    const existingFaculty = await AcademicFaculty.findOne({
      title,
    }).lean();

    if (existingFaculty) {
      throw new ApiError(StatusCodes.CONFLICT, 'Academic faculty with the same title already exists.');
    }
  }

  const response = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true }).lean();
  return response;
};

// Delete academic faculty by it's ID
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const response = await AcademicFaculty.findByIdAndDelete(id);
  return response;
};

export const academicFacultyService = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
