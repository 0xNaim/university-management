import { Types } from 'mongoose';
import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

// Define the Zod schema for creating a student
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    // Student information
    student: z.object({
      // Personal information
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .trim(),
        middleName: z.string().trim().optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .trim(),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .trim(),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),

      // Contact information
      email: z
        .string({
          required_error: 'Email is required',
        })
        .toLowerCase()
        .trim()
        .email(),
      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .trim(),
      emergencyContactNo: z
        .string({
          required_error: 'Emergency contact number is required',
        })
        .trim(),
      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .trim(),
      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .trim(),

      // Guardian information
      guardian: z.object({
        fatherName: z
          .string({
            required_error: 'Father name is required',
          })
          .trim(),
        fatherOccupation: z
          .string({
            required_error: 'Father occupation is required',
          })
          .trim(),
        fatherContactNo: z
          .string({
            required_error: 'Father contact number is required',
          })
          .trim(),
        motherName: z
          .string({
            required_error: 'Mother name is required',
          })
          .trim(),
        motherOccupation: z
          .string({
            required_error: 'Mother occupation is required',
          })
          .trim(),
        motherContactNo: z
          .string({
            required_error: 'Mother contact number is required',
          })
          .trim(),
        address: z
          .string({
            required_error: 'Guardian address is required',
          })
          .trim(),
      }),

      // Local guardian information
      localGuardian: z.object({
        name: z
          .string({
            required_error: 'Local guardian name is required',
          })
          .trim(),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z
          .string({
            required_error: 'Local guardian contact number is required',
          })
          .trim(),
        address: z
          .string({
            required_error: 'Local guardian address is required',
          })
          .trim(),
      }),

      // Academic information
      academicDepartment: z.union([
        z.string({ required_error: 'Academic department is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),
      academicSemester: z.union([
        z.string({ required_error: 'Academic semester is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),
      academicFaculty: z.union([
        z.string({ required_error: 'Academic faculty is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),

      // Profile image
      profileImage: z.string().trim().optional(),
    }),
  }),
});

// Define the Zod schema for creating a faculty
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    // Faculty information
    faculty: z.object({
      // Personal information
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .trim(),
        middleName: z.string().trim().optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .trim(),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .trim(),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),

      // Contact information
      email: z
        .string({
          required_error: 'Email is required',
        })
        .toLowerCase()
        .trim()
        .email(),
      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .trim(),
      emergencyContactNo: z
        .string({
          required_error: 'Emergency contact number is required',
        })
        .trim(),
      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .trim(),
      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .trim(),

      // Academic information
      academicDepartment: z.union([
        z.string({ required_error: 'Academic department is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),
      designation: z.union([
        z.string({ required_error: 'Designation is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),
      academicFaculty: z.union([
        z.string({ required_error: 'Academic faculty is required' }).trim(),
        z.instanceof(Types.ObjectId),
      ]),

      // Profile image
      profileImage: z.string().trim().optional(),
    }),
  }),
});

export const userValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};
