import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { bloodGroup, gender } from '../user/user.constant';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema<IStudent, StudentModel>(
  {
    // Personal information
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      enum: gender,
    },
    bloodGroup: {
      type: String,
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

    // Guardian information
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
          trim: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
          trim: true,
        },
        motherName: {
          type: String,
          required: true,
          trim: true,
        },
        motherOccupation: {
          type: String,
          required: true,
          trim: true,
        },
        motherContactNo: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },

    // Local guardian information
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        occupation: {
          type: String,
          required: true,
          trim: true,
        },
        contactNo: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },

    // Academic information
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
      trim: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
      trim: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
      trim: true,
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

// Middleware to handle the duplicate issue for the same email and contactNo
studentSchema.pre('save', async function (next) {
  const { email, contactNo } = this;

  const existingInfo = await Student.findOne({
    $or: [{ email }, { contactNo }],
  }).lean();

  if (existingInfo) {
    if (existingInfo.email === email) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists');
    } else if (existingInfo.contactNo === contactNo) {
      throw new ApiError(StatusCodes.CONFLICT, 'Contact number already exists');
    }
  }

  next();
});

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
