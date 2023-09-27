import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { AcademicDepartmentModel, IAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment, AcademicDepartmentModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
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

// Middleware to handle the duplicate issue for the same title
academicDepartmentSchema.pre('save', async function (next) {
  const { title } = this;

  const existingFaculty = await AcademicDepartment.findOne({
    title,
  }).lean();

  if (existingFaculty) {
    throw new ApiError(StatusCodes.CONFLICT, 'Department with the same title already exists.');
  }

  next();
});

export const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
