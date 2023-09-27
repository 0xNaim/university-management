import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// Find last user id
export const findLastUserId = async (role: string): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

// Generate id for student
export const generateStudentId = async (academicSemester: IAcademicSemester, role: string): Promise<string> => {
  const currentId = await findLastUserId(role);

  if (currentId) {
    // Extract the numeric part of the current ID and increment it
    const numericPart = parseInt(currentId.slice(4)) + 1;
    const incrementedId = numericPart.toString().padStart(5, '0');

    const incrementedStudentId = `${academicSemester.year.toString().slice(2)}${academicSemester.code}${incrementedId}`;

    return incrementedStudentId;
  } else {
    // If there is no previous ID, start from 1
    const newId = `${academicSemester.year.toString().slice(2)}${academicSemester.code}00001`;
    return newId;
  }
};

// Generate id for faculty or admin
export const generateAdminOrFacultyId = async (role: string): Promise<string> => {
  const currentId = await findLastUserId(role);

  // Determine the prefix based on the role
  const prefix = role === 'Faculty' ? 'F' : role === 'Admin' ? 'A' : '';

  if (currentId) {
    // Extract the numeric part of the current ID and increment it
    const numericPart = parseInt(currentId.slice(2)) + 1;
    const incrementedId = `${prefix}-${numericPart.toString().padStart(5, '0')}`;
    return incrementedId;
  } else {
    // If there is no previous ID, start from 1
    const newId = `${prefix}-00001`;
    return newId;
  }
};
