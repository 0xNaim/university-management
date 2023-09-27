import { Model, Types } from 'mongoose';
import { IUserBloodGroup, IUserGender } from '../../../interfaces/common';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

// Define interfaces for subdocuments
type Name = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
};

// Define the main document interface
export type IFaculty = {
  id: string;
  name: Name;
  dateOfBirth: string;
  gender: IUserGender;
  bloodGroup?: IUserBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string | null;
};

// Define the model
export type StudentModel = Model<IFaculty, Record<string, unknown>>;
