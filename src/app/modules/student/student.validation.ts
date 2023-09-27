import { z } from 'zod';
import { bloodGroup, gender } from '../user/user.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    // Personal information
    name: z
      .object({
        firstName: z.string().trim().optional(),
        middleName: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
      })
      .optional(),
    dateOfBirth: z.string().trim().optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),

    // Contact information
    email: z.string().trim().toLowerCase().email().optional(),
    contactNo: z.string().trim().optional(),
    emergencyContactNo: z.string().trim().optional(),
    presentAddress: z.string().trim().optional(),
    permanentAddress: z.string().trim().optional(),

    // Guardian information
    guardian: z
      .object({
        fatherName: z.string().trim().optional(),
        fatherOccupation: z.string().trim().optional(),
        fatherContactNo: z.string().trim().optional(),
        motherName: z.string().trim().optional(),
        motherOccupation: z.string().trim().optional(),
        motherContactNo: z.string().trim().optional(),
        address: z.string().trim().optional(),
      })
      .optional(),

    // Local guardian information
    localGuardian: z
      .object({
        name: z.string().trim().optional(),
        occupation: z.string().trim().optional(),
        contactNo: z.string().trim().optional(),
        address: z.string().trim().optional(),
      })
      .optional(),

    // Academic information
    academicSemester: z.string().trim().optional(),
    academicDepartment: z.string().trim().optional(),
    academicFaculty: z.string().trim().optional(),

    // Optional profile image
    profileImage: z.string().trim().optional(),
  }),
});

export const studentValidation = {
  updateStudentZodSchema,
};
