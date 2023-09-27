import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminOrFacultyId, generateStudentId } from './user.utils';

const createStudent = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  // Set default password if not given
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Set role
  user.role = 'Student';

  // Get academic semester
  const academicSemester = await AcademicSemester.findById(student.academicSemester).lean();

  // Start transaction
  const session = await mongoose.startSession();
  let newStudent;

  try {
    session.startTransaction();

    // Generate student id
    const id = await generateStudentId(academicSemester as IAcademicSemester, 'student');

    // Set id in both student and user
    user.id = id;
    student.id = id;

    // Create the student document
    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id (reference) into user.student
    user.student = createdStudent[0]._id;

    // Create the user document
    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    newStudent = createdUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newStudent) {
    // Populate user with student data
    newStudent = await User.findOne({ id: newStudent.id })
      .populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      })
      .lean();
  }

  return newStudent;
};

const createFaculty = async (faculty: IFaculty, user: IUser): Promise<IUser | null> => {
  // Set default password if not given
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // Set role
  user.role = 'Faculty';

  // Start transaction
  let newFaculty;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate faculty id
    const id = await generateAdminOrFacultyId('Faculty');

    // Set id in both faculty and user
    user.id = id;
    faculty.id = id;

    // Create the faculty document
    const createdFaculty = await Faculty.create([faculty], { session });

    if (!createdFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }

    // set faculty _id (reference) into user.faculty
    user.faculty = createdFaculty[0]._id;

    // Create the user document
    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    newFaculty = createdUser[0];
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newFaculty) {
    newFaculty = await User.findOne({ id: newFaculty.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newFaculty;
};

export const userService = {
  createStudent,
  createFaculty,
};
