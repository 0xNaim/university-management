import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { AcademicFacultyModel, IAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty, AcademicFacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
academicFacultySchema.pre('save', async function (next) {
  const { title } = this;

  const existingFaculty = await AcademicFaculty.findOne({
    title,
  }).lean();

  if (existingFaculty) {
    throw new ApiError(StatusCodes.CONFLICT, 'Academic faculty with the same title already exists');
  }

  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema);
