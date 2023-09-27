import { StatusCodes } from 'http-status-codes';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

// Get all students
const getStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const searchAndFilterOptions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    searchAndFilterOptions.push({
      $or: studentSearchableFields.map((field) => ({
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

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const query = searchAndFilterOptions.length > 0 ? { $and: searchAndFilterOptions } : {};

  const response = await Student.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .lean();

  const total = await Student.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: response,
  };
};

// Get student by it's ID
const getStudent = async (id: string): Promise<IStudent | null> => {
  // Populate all related fields in a single query
  const response = await Student.findOne({ id })
    .populate([{ path: 'academicSemester' }, { path: 'academicDepartment' }, { path: 'academicFaculty' }])
    .lean();

  return response;
};

// Update student by it's ID
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  // Handle contact number duplication
  const existingInfo = await Student.findOne({
    contactNo: payload?.contactNo,
  }).lean();

  if (existingInfo && existingInfo.contactNo === payload?.contactNo) {
    throw new ApiError(StatusCodes.CONFLICT, 'Contact number already exists');
  }

  // Prevent the user from updating their email address
  if ('email' in payload) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You can't update the email address");
  }

  const response = await Student.findOneAndUpdate({ id }, payload, { new: true })
    .populate([{ path: 'academicSemester' }, { path: 'academicDepartment' }, { path: 'academicFaculty' }])
    .lean();

  return response;
};

// Delete student and user
const deleteStudentAndUser = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Delete student
    const student = await Student.findOneAndDelete({ id }, { session });

    // Delete user
    await User.deleteOne({ id });

    // Commit transaction and return student data
    await session.commitTransaction();
    return student;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const studentService = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudentAndUser,
};
