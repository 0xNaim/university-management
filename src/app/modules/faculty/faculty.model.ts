import { Schema, Types, model } from 'mongoose';
import { bloodGroup, gender } from '../user/user.constant';

const facultySchema = new Schema(
  {
    // Personal information
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        middleName: {
          type: String,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: bloodGroup,
    },

    // Contact information
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    // Academic information
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    academicDepartment: {
      type: Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },

    // Profile image
    profileImage: {
      type: String,
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

export const Faculty = model('Faculty', facultySchema);
