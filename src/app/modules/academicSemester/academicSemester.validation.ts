import { z } from 'zod';
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Semester title is required',
    }),
    year: z
      .number({ required_error: 'Semester year is required', invalid_type_error: 'Year must be a number' })
      .refine((year) => year >= 2023 && year <= 2100, {
        message: 'Semester year must be between 2023 and 2100',
      }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], { required_error: 'Semester code is required' }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Semester start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Semester end month is required',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Semester title is required',
        })
        .optional(),
      year: z
        .number({ required_error: 'Semester year is required', invalid_type_error: 'Year must be a number' })
        .refine((year) => year >= 2023 && year <= 2100, {
          message: 'Semester year must be between 2023 and 2100',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]], {
          required_error: 'Semester code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Semester start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Semester end month is required',
        })
        .optional(),
    }),
  })
  .refine((data) => (data.body.title && data.body.code) || (!data.body.title && !data.body.code), {
    message: 'Either both title and code should be provided or neither',
  });

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
