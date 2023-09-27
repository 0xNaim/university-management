import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import { IAcademicDepartment, IAcademicDepartmentFilters } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// Create academic department
const createDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment | null> => {
  const response = await AcademicDepartment.create(payload);

  return response;
};

// Get academic departments
const getDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const searchAndFilterOptions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    searchAndFilterOptions.push({
      $or: academicDepartmentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
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

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const query = searchAndFilterOptions.length > 0 ? { $and: searchAndFilterOptions } : {};

  const result = await AcademicDepartment.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty')
    .lean();

  const total = await AcademicDepartment.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get academic department by it's ID
const getDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
  const response = await AcademicDepartment.findById(id).populate('academicFaculty').lean();

  return response;
};

// Update academic department by it's ID
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const { title } = payload;

  const existingFaculty = await AcademicDepartment.findOne({
    title,
  }).lean();

  if (existingFaculty) {
    throw new ApiError(StatusCodes.CONFLICT, 'Department with the same title already exists.');
  }

  const response = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true }).lean();
  return response;
};

// Delete academic department by it's ID
const deleteDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
  const response = await AcademicDepartment.findByIdAndDelete(id);
  return response;
};

export const academicDepartmentService = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
