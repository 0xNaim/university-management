import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from './academicSemester.constant';
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      enum: academicSemesterTitles,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      enum: academicSemesterCodes,
      required: true,
      trim: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
      trim: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Middleware to handle the duplicate issue for the same title and year
academicSemesterSchema.pre('save', async function (next) {
  const existingSemester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  }).lean();

  if (existingSemester) {
    throw new ApiError(StatusCodes.CONFLICT, 'Semester with the same title and year already exists.');
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
